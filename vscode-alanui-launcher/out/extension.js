"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode = __importStar(require("vscode"));
const child_process_1 = require("child_process");
function activate(context) {
    // Register the command
    const commandId = 'alanui-launcher.startAndOpen';
    const disposable = vscode.commands.registerCommand(commandId, () => {
        var _a, _b;
        const workspaceFolders = vscode.workspace.workspaceFolders;
        if (!workspaceFolders) {
            vscode.window.showErrorMessage('No workspace folder found.');
            return;
        }
        const rootPath = workspaceFolders[0].uri.fsPath;
        // Run 'npm start' in the workspace root
        const npmStart = (0, child_process_1.exec)('npm start', { cwd: rootPath });
        (_a = npmStart.stdout) === null || _a === void 0 ? void 0 : _a.on('data', (data) => {
            vscode.window.showInformationMessage(data.toString());
        });
        (_b = npmStart.stderr) === null || _b === void 0 ? void 0 : _b.on('data', (data) => {
            vscode.window.showErrorMessage(data.toString());
        });
        // Open http://localhost:3000 in the default browser after a short delay
        setTimeout(() => {
            const url = 'http://localhost:3000';
            let openCmd = '';
            if (process.platform === 'win32') {
                openCmd = `start ${url}`;
            }
            else if (process.platform === 'darwin') {
                openCmd = `open ${url}`;
            }
            else {
                openCmd = `xdg-open ${url}`;
            }
            (0, child_process_1.exec)(openCmd);
        }, 2000); // Wait 2 seconds for the server to (hopefully) start
    });
    context.subscriptions.push(disposable);
    // Add a status bar button
    const statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
    statusBarItem.command = commandId;
    statusBarItem.text = '🟩 $(rocket) Launch Alan on Local 3000';
    statusBarItem.color = new vscode.ThemeColor('statusBarItem.prominentForeground');
    statusBarItem.tooltip = 'Run npm start and open Alan on http://localhost:3000';
    statusBarItem.show();
    context.subscriptions.push(statusBarItem);
}
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map
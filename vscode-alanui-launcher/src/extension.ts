import * as vscode from 'vscode';
import { exec } from 'child_process';
import * as path from 'path';

export function activate(context: vscode.ExtensionContext) {
  // Register the command
  const commandId = 'alanui-launcher.startAndOpen';
  const disposable = vscode.commands.registerCommand(commandId, () => {
    const workspaceFolders = vscode.workspace.workspaceFolders;
    if (!workspaceFolders) {
      vscode.window.showErrorMessage('No workspace folder found.');
      return;
    }
    const rootPath = workspaceFolders[0].uri.fsPath;

    // Run 'npm start' in the workspace root
    const npmStart = exec('npm start', { cwd: rootPath });

    npmStart.stdout?.on('data', (data) => {
      vscode.window.showInformationMessage(data.toString());
    });
    npmStart.stderr?.on('data', (data) => {
      vscode.window.showErrorMessage(data.toString());
    });

    // Open http://localhost:3000 in the default browser after a short delay
    setTimeout(() => {
      const url = 'http://localhost:3000';
      let openCmd = '';
      if (process.platform === 'win32') {
        openCmd = `start ${url}`;
      } else if (process.platform === 'darwin') {
        openCmd = `open ${url}`;
      } else {
        openCmd = `xdg-open ${url}`;
      }
      exec(openCmd);
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

export function deactivate() {}

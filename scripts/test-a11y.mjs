import axe from 'axe-core';
import { glob } from 'glob';
import fs from 'fs';
import { JSDOM } from 'jsdom';

async function runA11yTests() {
  console.log('Starting accessibility tests...');
  const files = await glob('dist/*.html');
  let totalViolations = 0;

  if (files.length === 0) {
    console.error('No HTML files found in dist directory. Did you run "npm run build"?');
    process.exit(1);
  }

  for (const file of files) {
    const html = fs.readFileSync(file, 'utf8');
    const dom = new JSDOM(html, {
      url: `file://${process.cwd()}/${file}`,
      userAgent: 'node.js',
    });

    const results = await axe.run(dom.window.document.documentElement);

    if (results.violations.length > 0) {
      console.error(`\nAccessibility violations found in ${file}:`);
      results.violations.forEach(violation => {
        console.error(`- [${violation.impact}] ${violation.help} (${violation.id})`);
        violation.nodes.forEach(node => {
          console.error(`  - Selector: ${node.target.join(', ')}`);
          console.error(`    HTML: ${node.html}`);
        });
      });
      totalViolations += results.violations.length;
    } else {
      console.log(`\nNo accessibility violations found in ${file}.`);
    }
  }

  if (totalViolations > 0) {
    console.error(`\nFound ${totalViolations} total accessibility violations.`);
    process.exit(1);
  } else {
    console.log('\nAll accessibility checks passed!');
    process.exit(0);
  }
}

runA11yTests().catch(err => {
  console.error('An error occurred during accessibility testing:', err);
  process.exit(1);
});

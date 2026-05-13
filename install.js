#!/usr/bin/env node

/**
 * Nomos UI Component Installer
 *
 * Prerequisites:
 * 1. Add this to your components.json:
 *    "registries": {
 *      "@nomos": "https://raw.githubusercontent.com/ddingyull/style-guide-test/main/public/r/{name}.json"
 *    }
 * 2. Run: node install.js
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Component list
const COMPONENTS = [
  'utils',
  'button',
  'card',
  'input',
  'label',
  'calendar',
  'dialog',
  'dropdown-menu',
  'select',
  'sheet',
  'skeleton',
  'sonner',
  'table',
  'use-toast',
  'theme-patent',
  'login-form'
];

console.log('🚀 Nomos UI Component Installer');
console.log('================================\n');

// Check if components.json exists
if (!fs.existsSync('components.json')) {
  console.error('❌ Error: components.json not found');
  console.error('Please run "npx shadcn@latest init" first\n');
  process.exit(1);
}

// Check if @nomos registry is configured
const componentsJson = fs.readFileSync('components.json', 'utf8');
if (!componentsJson.includes('@nomos')) {
  console.warn('⚠️  Warning: @nomos registry not found in components.json\n');
  console.log('Please add this to your components.json:');
  console.log('  "registries": {');
  console.log('    "@nomos": "https://raw.githubusercontent.com/ddingyull/style-guide-test/main/public/r/{name}.json"');
  console.log('  }\n');
}

// Detect package manager
let pkgManager = 'npx --yes';
try {
  execSync('pnpm --version', { stdio: 'ignore' });
  pkgManager = 'pnpm dlx';
} catch {
  // npx is default
}

console.log(`📦 Using package manager: ${pkgManager}\n`);
console.log(`📦 Installing ${COMPONENTS.length} components...\n`);

let successCount = 0;
let failCount = 0;
const failedComponents = [];

// Install each component
for (const component of COMPONENTS) {
  console.log(`➤ Installing: ${component}`);

  try {
    execSync(
      `${pkgManager} shadcn@latest add "@nomos/${component}" --yes --overwrite`,
      { stdio: 'inherit' }
    );
    console.log(`✓ ${component} installed successfully\n`);
    successCount++;
  } catch (error) {
    console.error(`✗ Failed to install ${component}\n`);
    failCount++;
    failedComponents.push(component);
  }
}

// Summary
console.log('================================');
console.log('Installation Summary');
console.log('================================');
console.log(`✓ Success: ${successCount}`);
if (failCount > 0) {
  console.log(`✗ Failed: ${failCount}\n`);
  console.log('Failed components:');
  failedComponents.forEach(comp => console.log(`  - ${comp}`));
  console.log('\n⚠️  Some components failed to install. Please check the errors above.');
  process.exit(1);
} else {
  console.log('\n🎉 All components installed successfully!');
}

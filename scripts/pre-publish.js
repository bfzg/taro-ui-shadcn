#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔍 执行发布前检查...\n');

// 检查必要文件是否存在
const requiredFiles = [
  'dist/index.js',
  'dist/index.d.ts',
  'dist/cli/add.js',
  'dist/cli/init.js',
  'bin/cli.js',
  'README.md',
  'LICENSE'
];

let allFilesExist = true;

requiredFiles.forEach(file => {
  if (fs.existsSync(path.join(__dirname, '..', file))) {
    console.log(`✅ ${file}`);
  } else {
    console.log(`❌ ${file} - 文件不存在`);
    allFilesExist = false;
  }
});

// 检查package.json配置
const packageJson = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'package.json'), 'utf8'));

console.log('\n📋 Package.json 检查:');

const checks = [
  { key: 'name', value: packageJson.name, required: true },
  { key: 'version', value: packageJson.version, required: true },
  { key: 'description', value: packageJson.description, required: true },
  { key: 'main', value: packageJson.main, required: true },
  { key: 'types', value: packageJson.types, required: true },
  { key: 'bin', value: packageJson.bin, required: true },
  { key: 'author', value: packageJson.author, required: true },
  { key: 'license', value: packageJson.license, required: true },
  { key: 'repository', value: packageJson.repository, required: false },
  { key: 'keywords', value: packageJson.keywords, required: false }
];

checks.forEach(check => {
  if (check.value) {
    console.log(`✅ ${check.key}: ${typeof check.value === 'object' ? JSON.stringify(check.value) : check.value}`);
  } else if (check.required) {
    console.log(`❌ ${check.key}: 缺失`);
    allFilesExist = false;
  } else {
    console.log(`⚠️  ${check.key}: 建议添加`);
  }
});

console.log('\n📦 Files 字段检查:');
if (packageJson.files) {
  packageJson.files.forEach(file => {
    if (fs.existsSync(path.join(__dirname, '..', file))) {
      console.log(`✅ ${file}`);
    } else {
      console.log(`❌ ${file} - 目录/文件不存在`);
      allFilesExist = false;
    }
  });
} else {
  console.log('❌ files 字段缺失');
  allFilesExist = false;
}

if (allFilesExist) {
  console.log('\n🎉 所有检查通过！可以发布到npm。');
  process.exit(0);
} else {
  console.log('\n❌ 发现问题，请修复后再发布。');
  process.exit(1);
}
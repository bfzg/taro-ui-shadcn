#!/usr/bin/env node

const { program } = require('commander');
const { init } = require('../dist/cli/init');
const { add } = require('../dist/cli/add');

program
  .name('taro-ui-shadcn')
  .description('基于Taro的UI组件库CLI工具')
  .version('1.0.0');

program
  .command('init')
  .description('初始化项目配置')
  .action(init);

program
  .command('add <component>')
  .description('添加组件到项目中')
  .option('-p, --path <path>', '指定组件安装路径', 'src/components/ui')
  .action(add);

program.parse();
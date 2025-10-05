import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';
import inquirer from 'inquirer';

export async function init() {
  console.log(chalk.blue('🚀 初始化 Taro UI Shadcn...'));

  try {
    // 检查是否在Taro项目中
    const packageJsonPath = path.join(process.cwd(), 'package.json');
    if (!fs.existsSync(packageJsonPath)) {
      console.log(chalk.red('❌ 未找到 package.json 文件，请确保在项目根目录中运行此命令'));
      return;
    }

    const packageJson = await fs.readJson(packageJsonPath);
    const isTaroProject = packageJson.dependencies?.['@tarojs/taro'] || 
                         packageJson.devDependencies?.['@tarojs/taro'];

    if (!isTaroProject) {
      console.log(chalk.yellow('⚠️  警告：未检测到 Taro 依赖，请确保这是一个 Taro 项目'));
    }

    // 询问用户配置
    const answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'componentsPath',
        message: '组件安装路径:',
        default: 'src/components/ui',
      },
    ]);

    // 创建配置文件 - 默认使用 TypeScript 和 Tailwind CSS
    const config = {
      componentsPath: answers.componentsPath,
      typescript: true,
      tailwind: true,
    };

    await fs.writeJson(path.join(process.cwd(), 'taro-ui-shadcn.json'), config, { spaces: 2 });

    // 创建组件目录
    const componentsDir = path.join(process.cwd(), answers.componentsPath);
    await fs.ensureDir(componentsDir);

    // 创建工具函数目录和文件
    const utilsDir = path.join(process.cwd(), 'src/utils');
    await fs.ensureDir(utilsDir);

    // 复制工具函数 - 直接从源文件复制
    const cnSourcePath = path.join(__dirname, '../../src/utils/cn.ts');
    const cvaSourcePath = path.join(__dirname, '../../src/utils/cva.ts');
    
    await fs.copy(cnSourcePath, path.join(utilsDir, 'cn.ts'));
    await fs.copy(cvaSourcePath, path.join(utilsDir, 'cva.ts'));

    // 总是创建 Tailwind CSS 基础样式文件
      const stylesDir = path.join(process.cwd(), 'src/styles');
      await fs.ensureDir(stylesDir);

      // 从模板文件读取 globals.css 内容
      const globalsTemplatePath = path.join(__dirname, '../../templates/globals.css');
      const globalCssContent = await fs.readFile(globalsTemplatePath, 'utf-8');

      await fs.writeFile(path.join(stylesDir, 'globals.css'), globalCssContent);

    // 创建或更新 Tailwind 配置文件
    const tailwindConfigPath = path.join(process.cwd(), 'tailwind.config.js');
    const templatePath = path.join(__dirname, '../../templates/tailwind.config.js');
    const tailwindConfigContent = await fs.readFile(templatePath, 'utf-8');

    if (!fs.existsSync(tailwindConfigPath)) {
      await fs.writeFile(tailwindConfigPath, tailwindConfigContent);
      console.log(chalk.blue('🎨 Tailwind 配置文件已创建:'), 'tailwind.config.js');
    } else {
      console.log(chalk.yellow('⚠️  tailwind.config.js 已存在，请手动更新颜色配置'));
    }

    console.log(chalk.green('✅ 初始化完成！'));
    console.log(chalk.blue('📁 组件将安装到:'), answers.componentsPath);
    console.log(chalk.blue('🔧 配置文件已创建:'), 'taro-ui-shadcn.json');
    console.log(chalk.blue('🎨 全局样式文件已创建:'), 'src/styles/globals.css');
    console.log(chalk.yellow('💡 请确保在你的应用中引入 globals.css 文件'));
    console.log(chalk.yellow('💡 请确保安装 Tailwind CSS: npm install -D tailwindcss postcss autoprefixer'));

    console.log(chalk.blue('\n🚀 现在你可以添加组件了:'));
    console.log(chalk.gray('  npx taro-ui-shadcn add button'));
    console.log(chalk.gray('  npx taro-ui-shadcn add input'));
    console.log(chalk.gray('  npx taro-ui-shadcn add card'));

  } catch (error) {
    console.error(chalk.red('❌ 初始化失败:'), error);
  }
}
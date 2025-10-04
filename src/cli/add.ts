import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';

interface Config {
  componentsPath: string;
}

export async function add(component: string, options: { path?: string } = {}) {
  console.log(chalk.blue(`📦 添加组件: ${component}`));

  try {
    // 获取可用组件列表（动态读取 src/components 目录）
    // 从 dist 目录向上两级到项目根目录，然后进入 src/components
    const sourceComponentsDir = path.join(__dirname, '../../src/components');
    const availableComponents = await getAvailableComponents(sourceComponentsDir);

    // 检查组件是否可用
    if (!availableComponents.includes(component)) {
      console.log(chalk.red(`❌ 组件 "${component}" 不可用`));
      console.log(chalk.blue('可用组件:'), availableComponents.join(', '));
      return;
    }

    // 读取配置文件
    const configPath = path.join(process.cwd(), 'taro-ui-shadcn.json');
    let config: Config;

    if (fs.existsSync(configPath)) {
      config = await fs.readJson(configPath);
    } else {
      console.log(chalk.yellow('⚠️  未找到配置文件，使用默认配置'));
      config = {
        componentsPath: 'src/components/ui',
      };
    }

    // 使用命令行参数覆盖配置
    const targetPath = options.path || config.componentsPath;
    const targetComponentDir = path.join(process.cwd(), targetPath, component);
    const sourceComponentDir = path.join(sourceComponentsDir, component);

    // 检查源组件目录是否存在
    if (!(await fs.pathExists(sourceComponentDir))) {
      console.log(chalk.red(`❌ 源组件目录不存在: ${sourceComponentDir}`));
      return;
    }

    // 检查目标目录是否已存在
    if (await fs.pathExists(targetComponentDir)) {
      console.log(chalk.yellow(`⚠️  组件 "${component}" 已存在，将覆盖现有文件`));
    }

    // 确保目标目录存在
    await fs.ensureDir(path.dirname(targetComponentDir));

    // 直接复制组件目录
    await fs.copy(sourceComponentDir, targetComponentDir, {
      overwrite: true,
    });

    // 修复导入路径
    await fixImportPaths(targetComponentDir, targetPath);

    console.log(chalk.green(`✅ 组件 "${component}" 已添加到 ${targetPath}/${component}`));
    
    // 列出复制的文件
    const files = await fs.readdir(targetComponentDir);
    console.log(chalk.blue('📁 文件:'));
    for (const file of files) {
      console.log(chalk.gray(`  ${targetPath}/${component}/${file}`));
    }

    console.log(chalk.blue('\n🚀 使用方法:'));
    console.log(chalk.gray(`  import { ${capitalize(component)} } from '@/components/ui/${component}';`));

  } catch (error) {
    console.error(chalk.red('❌ 添加组件失败:'), error);
  }
}

/**
 * 获取可用组件列表
 */
async function getAvailableComponents(sourceDir: string): Promise<string[]> {
  try {
    if (!(await fs.pathExists(sourceDir))) {
      return [];
    }

    const items = await fs.readdir(sourceDir);
    const components = [];

    for (const item of items) {
      const itemPath = path.join(sourceDir, item);
      const stat = await fs.stat(itemPath);
      
      if (stat.isDirectory()) {
        // 检查是否包含 index.tsx 文件
        const indexFile = path.join(itemPath, 'index.tsx');
        if (await fs.pathExists(indexFile)) {
          components.push(item);
        }
      }
    }

    return components;
  } catch (error) {
    console.error(chalk.yellow('⚠️  读取组件目录失败:'), error);
    return [];
  }
}

/**
 * 修复组件文件中的导入路径
 */
async function fixImportPaths(componentDir: string, targetPath: string): Promise<void> {
  try {
    const files = await fs.readdir(componentDir);
    
    for (const file of files) {
      if (file.endsWith('.tsx') || file.endsWith('.ts')) {
        const filePath = path.join(componentDir, file);
        let content = await fs.readFile(filePath, 'utf-8');
        
        // 修复相对路径导入
        // 将 '../../utils/cn' 替换为正确的路径
        const utilsPath = path.relative(
          path.dirname(path.join(targetPath, path.basename(componentDir))),
          'src/utils'
        ).replace(/\\/g, '/');
        
        content = content.replace(
          /from ['"]\.\.\/\.\.\/utils\/(.*?)['"];/g,
          `from '@/utils/$1';`
        );
        
        await fs.writeFile(filePath, content);
      }
    }
  } catch (error) {
    console.error(chalk.yellow('⚠️  修复导入路径失败:'), error);
  }
}

function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
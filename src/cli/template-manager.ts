import fs from 'fs-extra';
import path from 'path';

export interface ComponentTemplate {
  name: string;
  description: string;
  dependencies: string[];
  files: {
    [key: string]: string;
  };
}

export class TemplateManager {
  private templatesDir: string;

  constructor(templatesDir: string) {
    this.templatesDir = templatesDir;
  }

  /**
   * 获取可用的组件模板列表
   */
  async getAvailableTemplates(): Promise<string[]> {
    try {
      const items = await fs.readdir(this.templatesDir);
      const templates = [];

      for (const item of items) {
        const itemPath = path.join(this.templatesDir, item);
        const stat = await fs.stat(itemPath);
        
        if (stat.isDirectory()) {
          templates.push(item);
        }
      }

      return templates;
    } catch (error) {
      return [];
    }
  }

  /**
   * 检查模板是否存在
   */
  async templateExists(templateName: string): Promise<boolean> {
    const templatePath = path.join(this.templatesDir, templateName);
    return fs.pathExists(templatePath);
  }

  /**
   * 复制模板到目标目录
   */
  async copyTemplate(
    templateName: string,
    targetDir: string,
    options: {
      typescript?: boolean;
      overwrite?: boolean;
    } = {}
  ): Promise<void> {
    const { typescript = true, overwrite = false } = options;
    const templatePath = path.join(this.templatesDir, templateName);
    
    if (!(await this.templateExists(templateName))) {
      throw new Error(`模板 "${templateName}" 不存在`);
    }

    // 确保目标目录存在
    await fs.ensureDir(targetDir);

    // 检查目标目录是否已存在文件
    const targetExists = await fs.pathExists(path.join(targetDir, 'index.tsx'));
    if (targetExists && !overwrite) {
      throw new Error(`组件已存在于 ${targetDir}，使用 --overwrite 参数强制覆盖`);
    }

    // 复制模板文件
    await fs.copy(templatePath, targetDir, {
      overwrite,
      filter: (src) => {
        // 根据 TypeScript 选项过滤文件
        if (!typescript && src.endsWith('.tsx')) {
          return false;
        }
        return true;
      }
    });

    // 如果不使用 TypeScript，需要转换文件扩展名
    if (!typescript) {
      await this.convertToJavaScript(targetDir);
    }
  }

  /**
   * 将 TypeScript 文件转换为 JavaScript
   */
  private async convertToJavaScript(targetDir: string): Promise<void> {
    const files = await fs.readdir(targetDir);
    
    for (const file of files) {
      if (file.endsWith('.tsx')) {
        const tsxPath = path.join(targetDir, file);
        const jsxPath = path.join(targetDir, file.replace('.tsx', '.jsx'));
        
        let content = await fs.readFile(tsxPath, 'utf-8');
        
        // 移除 TypeScript 类型注解（简单处理）
        content = this.removeTypeAnnotations(content);
        
        await fs.writeFile(jsxPath, content);
        await fs.remove(tsxPath);
      }
    }
  }

  /**
   * 移除 TypeScript 类型注解（简单实现）
   */
  private removeTypeAnnotations(content: string): string {
    // 移除接口定义
    content = content.replace(/export interface \w+Props \{[\s\S]*?\}/g, '');
    
    // 移除类型注解
    content = content.replace(/: React\.FC<\w+Props>/g, '');
    content = content.replace(/: \w+\[\]/g, '');
    content = content.replace(/: string/g, '');
    content = content.replace(/: number/g, '');
    content = content.replace(/: boolean/g, '');
    content = content.replace(/: \(\) => void/g, '');
    content = content.replace(/: React\.ReactNode/g, '');
    
    // 移除类型导入
    content = content.replace(/export type \{ \w+Props \} from '\.\/index';/g, '');
    
    return content;
  }

  /**
   * 获取模板信息
   */
  async getTemplateInfo(templateName: string): Promise<ComponentTemplate | null> {
    const templatePath = path.join(this.templatesDir, templateName);
    const configPath = path.join(templatePath, 'template.json');
    
    if (await fs.pathExists(configPath)) {
      return fs.readJson(configPath);
    }
    
    // 如果没有配置文件，返回默认信息
    return {
      name: templateName,
      description: `${templateName} 组件`,
      dependencies: [],
      files: {}
    };
  }
}
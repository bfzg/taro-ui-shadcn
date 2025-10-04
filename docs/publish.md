# 📦 NPM 发布指南

## 发布前准备

### 1. 🔐 登录npm账户
```bash
npm login
```

### 2. 🔍 检查包名是否可用
```bash
npm view taro-ui-shadcn
```
如果返回404，说明包名可用。如果已存在，需要修改package.json中的name字段。

### 3. 📝 更新必要信息
在发布前，请确保更新以下信息：

**package.json:**
- `author`: 替换为你的真实姓名和邮箱
- `repository.url`: 替换为你的GitHub仓库地址
- `homepage`: 替换为你的项目主页
- `bugs.url`: 替换为你的issues页面

**README.md:**
- 更新安装和使用说明
- 添加项目描述和特性
- 添加贡献指南

## 发布流程

### 🚀 首次发布

1. **构建项目**
   ```bash
   npm run build
   ```

2. **运行发布前检查**
   ```bash
   node scripts/pre-publish.js
   ```

3. **发布到npm**
   ```bash
   # 发布正式版本
   npm run publish:latest
   
   # 或者先发布beta版本测试
   npm run publish:beta
   ```

### 🔄 版本更新发布

1. **更新版本号**
   ```bash
   # 补丁版本 (1.0.0 -> 1.0.1)
   npm run version:patch
   
   # 次要版本 (1.0.0 -> 1.1.0)
   npm run version:minor
   
   # 主要版本 (1.0.0 -> 2.0.0)
   npm run version:major
   ```

2. **推送到Git**
   ```bash
   git push origin main --tags
   ```

3. **发布到npm**
   ```bash
   npm run publish:latest
   ```

## 发布检查清单

- [ ] 所有代码已提交到Git
- [ ] 项目可以正常构建 (`npm run build`)
- [ ] CLI工具功能正常 (`node bin/cli.js --help`)
- [ ] 更新了版本号
- [ ] 更新了CHANGELOG.md (如果有)
- [ ] README.md信息准确
- [ ] package.json信息完整
- [ ] 已登录npm账户
- [ ] 包名可用或有权限发布

## 发布后验证

1. **检查npm包页面**
   ```bash
   npm view taro-ui-shadcn
   ```

2. **测试安装**
   ```bash
   # 在其他目录测试安装
   npm install taro-ui-shadcn
   
   # 测试CLI工具
   npx taro-ui-shadcn --help
   ```

3. **测试组件导入**
   ```javascript
   import { Button } from 'taro-ui-shadcn';
   ```

## 常见问题

### Q: 发布失败，提示权限错误
A: 确保已登录npm账户，且有发布权限。如果是组织包，需要相应权限。

### Q: 包名已存在
A: 修改package.json中的name字段，或使用scoped包名 `@username/taro-ui-shadcn`

### Q: 发布后无法安装
A: 检查package.json中的files字段，确保包含了所有必要文件。

### Q: CLI工具无法使用
A: 检查bin字段配置和bin/cli.js文件的可执行权限。

## 撤销发布

如果需要撤销发布（仅限发布后24小时内）：
```bash
npm unpublish taro-ui-shadcn@版本号 --force
```

**注意：** 撤销发布会影响已经使用该包的用户，请谨慎操作。
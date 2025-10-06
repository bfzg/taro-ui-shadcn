import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';

export default [
  // 主库构建
  {
    input: 'src/index.ts',
    output: [
      {
        file: 'dist/index.js',
        format: 'cjs',
        exports: 'named'
      },
      {
        file: 'dist/index.esm.js',
        format: 'esm'
      }
    ],
    external: [
      'react',
      'react/jsx-runtime',
      '@tarojs/taro',
      '@tarojs/components'
    ],
    plugins: [
      resolve(),
      commonjs(),
      typescript({
        tsconfig: './tsconfig.json',
        declaration: true,
        declarationDir: 'dist'
      })
    ]
  },
  // CLI构建
  {
    input: {
      'cli/add': 'src/cli/add.ts',
      'cli/init': 'src/cli/init.ts',
      'cli/template-manager': 'src/cli/template-manager.ts'
    },
    output: {
      dir: 'dist',
      format: 'cjs',
      exports: 'named'
    },
    external: [
      'fs',
      'path',
      'commander',
      'inquirer',
      'chalk',
      'fs-extra'
    ],
    plugins: [
      resolve(),
      commonjs(),
      typescript({
        tsconfig: './tsconfig.json',
        declaration: true,
        declarationDir: 'dist'
      })
    ]
  }
];
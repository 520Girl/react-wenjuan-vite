import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import AutoImport from 'unplugin-auto-import/vite'
import AntdResolver from 'unplugin-auto-import-antd'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    AutoImport({
      dts: true, // or a custom path// 生成ts 文件用来ts inculde 声明配置
      eslintrc: {
        enabled: true,  // 1、改为true用于生成eslint配置。2、生成后改回false，避免重复生成消耗
      },
      include: [   
        /\.[tj]sx?$/, 
        /\.md$/, 
      ],
      imports:[
        'react',
        'react-router-dom',
        'ahooks'
      ],
      resolvers: [AntdResolver({
          prefix: 'A'
        })]
    })
  ],
  resolve:{
    alias: {
      '@': path.resolve(__dirname,'src')
    }
  },
  server: {
    proxy:{
          '/api': 'http://localhost:3001',
    }
  }
})

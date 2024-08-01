import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import AutoImport from 'unplugin-auto-import/vite'
import AntdResolver from 'unplugin-auto-import-antd'
import path from 'path';
import { visualizer } from "rollup-plugin-visualizer";
import rollupAnalyzerPlugin from 'rollup-plugin-analyzer';
import viteCompression from 'vite-plugin-compression' 
import legacyPlugin from '@vitejs/plugin-legacy'
import { chunkSplitPlugin } from 'vite-plugin-chunk-split';


// https://vitejs.dev/config/
export default defineConfig({
  
  plugins: [
    react(),
    legacyPlugin({ //兼容性插件
      targets: ['chrome 52'], // 需要兼容的目标列表，可以设置多个
      additionalLegacyPolyfills: ['regenerator-runtime/runtime'] // 面向IE11时需要此插件
    }),
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
    }),
    viteCompression({ //开启gzip压缩
    verbose: true,
    disable: false,
    threshold: 10240,
    algorithm: 'gzip',
    ext: '.gz',
    }),
    rollupAnalyzerPlugin(),
    visualizer({ //开启 Analyzer 插件，生成 bundle 分析报告
          gzipSize: true,
          brotliSize: true,
          emitFile: false,
          filename: "test.html", //分析图生成的文件名
          open:true //如果存在本地服务端口，将在打包后自动展示
    }),
    // chunkSplitPlugin({ // 按需打包配置
    //   customSplitting:{
    //       'react-vendor': [/react/,/react-dom/], // 将react react-dom react-router-dom ahooks单独打包
    //       'library': [/antd/], // 将antd单独打包
    //       // 'vendor':[/\/node_modules\//]
    //   }
    // }),
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
  },
  build: {
    rollupOptions: { // 构建配置
          // external: ['antd'], // 排除 antd 的打包
      output: {
        entryFileNames: `assets/[name].[hash].js`,
        chunkFileNames: `assets/[name].[hash].js`,
        assetFileNames: `assets/[name].[hash][extname]`,
        manualChunks: { //这样手动分包可能存在循环嵌套的问题
            'vendor': ['react','react-dom','react-router-dom','ahooks'], // 将react react-dom react-router-dom ahooks单独打包
            'library': ['antd'], // 将antd单独打包
            // 'common': ['lodash'] // 将lodash单独打包
        },
        // manualChunks(id){
        //     if (id.includes('node_modules')) { // 静态资源分拆打包
        //     return id.toString().split('node_modules/')[1].split('/')[0].toString();
        //   }
        // }
      }
    },
    terserOptions:{ //去除console和debugger
      compress: {
          drop_console: true,
          drop_debugger: true,
        },

    }
  }
})

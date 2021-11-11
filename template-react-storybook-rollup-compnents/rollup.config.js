// rollup.config.js
// Rollup plugins
// babel插件用于处理es6代码的转换，使转换出来的代码可以用于不支持es6的环境使用
import babel from 'rollup-plugin-babel';
// 处理less的后缀文件
// import less from 'rollup-plugin-less';
// resolve将我们编写的源码与依赖的第三方库进行合并
import resolve from 'rollup-plugin-node-resolve';
// 解决rollup.js无法识别CommonJS模块
import commonjs from 'rollup-plugin-commonjs';
// 全局替换变量比如process.env
import replace from 'rollup-plugin-replace';
// 使rollup可以使用postCss处理样式文件less、css等
import postcss from 'rollup-plugin-postcss';
// 可以处理组件中import图片的方式，将图片转换成base64格式，但会增加打包体积，适用于小图标
import image from '@rollup/plugin-image';
// 压缩打包代码
import { terser } from 'rollup-plugin-terser';
// PostCSS plugins
// 处理css定义的变量
import simplevars from 'postcss-simple-vars';
// 处理less嵌套样式写法
import nested from 'postcss-nested';
// 可以提前适用最新css特性
import postcssPresetEnv from 'postcss-preset-env';
// css代码压缩
import cssnano from 'cssnano';
// 支持typescript
import typescript from 'rollup-plugin-typescript2';
// 用于打包生成*.d.ts文件
import dts from 'rollup-plugin-dts';
// 引入package
import pkg from './package.json';

const env = process.env.NODE_ENV;

const config = [
  {  
    // 入口文件我这里在components下统一导出所有自定义的组件
    input: 'src/components/index.tsx',
    // 输出文件夹，可以是个数组输出不同格式（umd,cjs,es...）通过env是否是生产环境打包来决定文件命名是否是.min
    output: [
      {
        file: `dist/index.umd${env === 'production' ? '.min' : ''}.js`,
        format: 'umd',
        name: 'wcpnts',
      },
      {
        file: `dist/index.esm${env === 'production' ? '.min' : ''}.js`,
        format: 'esm',
      },
      {
        file: `lib/index${env === 'production' ? '.min' : ''}.js`,
        format: 'cjs',
      },
    ],
    // 注入全局变量比如jQuery的$这里只是尝试 并未启用
    // globals: {
    //   react: 'React',                                         // 这跟external 是配套使用的，指明global.React即是外部依赖react
    //   antd: 'antd'
    // },
    // 自定义警告事件，这里由于会报THIS_IS_UNDEFINED警告，这里手动过滤掉
    onwarn: function (warning) {
      if (warning.code === 'THIS_IS_UNDEFINED') {
        return;
      }
    },
    // 将模块视为外部模块，不会打包在库中
    external: ['react', 'react-dom'],
    // 插件
    plugins: [
      typescript(),
      image(),
      postcss({
        plugins: [
          simplevars(),
          nested(),
          // cssnext({ warnForDuplicates: false, }),
          postcssPresetEnv(),
          cssnano(),
        ],
        // 处理.css和.less文件
        extensions: ['.css', '.less'],
      }),
      // 告诉 Rollup 如何查找外部模块并安装它
      resolve(),
      // babel处理不包含node_modules文件的所有js
      babel({
        exclude: 'node_modules/**',
        runtimeHelpers: true,
        plugins: ['@babel/plugin-external-helpers'],
        extensions: ['.js', '.ts', 'tsx'],
      }),
      // 将 CommonJS 转换成 ES2015 模块
      // 这里有些引入使用某个库的api但报未导出该api通过namedExports来手动导出
      commonjs({
        namedExports: {
          'node_modules/react-is/index.js': ['isFragment'],
          'node_modules/react/index.js': [
            'Fragment',
            'cloneElement',
            'isValidElement',
            'Children',
            'createContext',
            'Component',
            'useRef',
            'useImperativeHandle',
            'forwardRef',
            'useState',
            'useEffect',
            'useMemo',
          ],
          'node_modules/react-dom/index.js': [
            'render',
            'unmountComponentAtNode',
            'findDOMNode',
          ],
          'node_modules/gojs/release/go.js': [
            'Diagram',
            'GraphLinksModel',
            'Overview',
            'Spot',
          ],
          'node_modules/react/jsx-runtime.js': ['jsx', 'jsxs'],
        },
      }),
      // 全局替换NODE_ENV，exclude表示不包含某些文件夹下的文件
      replace({
        // exclude: 'node_modules/**',
        'process.env.NODE_ENV': JSON.stringify(env || 'development'),
      }),
      // 生产环境执行terser压缩代码
      env === 'production' && terser(),
    ],
  },
  {
    // 入口文件我这里在components下统一导出所有自定义的组件
    input: 'src/components/index.tsx',
    // 输出文件夹，可以是个数组输出不同格式（umd,cjs,es...）通过env是否是生产环境打包来决定文件命名是否是.min
    output: [
      {
        file: `${pkg.types}`,
        format: 'esm',
      },
    ],
    plugins: [
      dts(),
      postcss({
        plugins: [
          simplevars(),
          nested(),
          // cssnext({ warnForDuplicates: false, }),
          postcssPresetEnv(),
          cssnano(),
        ],
        // 处理.css和.less文件
        extensions: ['.css', '.less'],
      }),
    ],
  },
];

export default config;

## 启动可以调试组件

1、启动 npm run storybook

## 生成文档静态站

1、 npm run build-storybook


## 自动生成changelog

1、 git add .

2、 git cz

3、 npm run changelog

4、 git push -u origin main
## gulp、babel进行编译构建

1、npm run build

## 如何使用组件库

import { Button } from 'react-components/lib/components/Button'

import 'react-components/lib/components/Button/index.css'

也可以引入less文件

import 'react-components/lib/components/Button/index.less'


## 按需加载

可以配置babel-plugin-import做引入






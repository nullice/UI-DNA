# UI-DNA

UI 设计构建工具 - Photoshop 扩展 - Windows/MacOS



<p align="center">
<img  src="http://ww1.sinaimg.cn/large/c35419f1gy1feqxe7s6cmg20go0gojx9.gif">
<br>  <br>
<img  src="http://ww1.sinaimg.cn/large/c35419f1gy1feqxe7ya49g20go0goaqx.gif">
<br>  <br>
<img src="http://ww1.sinaimg.cn/large/c35419f1gy1feqxe8an8mg20go0godqk.gif">
</p>




## 技术概览

- 本项目是一个 CEP 应用，也就说是基于 Node.js 
- 界面框架使用的是 ：Vue.js 1
- 本项目使用 Webpack 2 来打包代码模块
- 本项目使用 Babel 6 （es2015, stage-0）转换 JavaScript ，主要是为了使用 ` await/async` （所有从 CEP 中对 Photoshop 的操作都是异步的）


## Build

 `./DVE` 为工作目录
 
 要编译本项目首先需要一个 Node.js 开发环境，首先下载并安装 [Node.js](https://nodejs.org/zh-cn/), 然后
 
1. 下载或克隆项目后，在  `./DVE` 目录中中执行 `npm install` 或者  [`yarn`](https://yarnpkg.com/zh-Hans/) 安装依赖 
2. 在  `./DVE` 目录下执行 `npm run webpack` 即可开始构建项目  
3. 构建后的代码生成在 `./DVE/bin` 中， `bin` 文件夹可直接放入 Photoshop 的扩展目录中运行（由于未签名所以需要打开 Photoshop 的调试模式）



## 结构
UI-DNA 基本结构如下：

![](http://ww1.sinaimg.cn/large/c35419f1gy1fer61z31u7j20nn0rbt9q.jpg)


更多信息慢慢详细写....
 


## License
[LGPL](http://www.fsf.org/licensing/licenses/lgpl.html)



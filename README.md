# vue2-webpack2-demo
实际开发项目中vue2-webpack2的结合实战demo

## 现有功能：

1. 对less编译

2. 对js es6语法支持

3. 编译.vue组件，并自动内联组件样式

4. 图片打包，包括对html内图片处理（利用html-loader和es6字符串模板），对小图片生成base64

5. 利用htmlWebpackPlugin动态拼接html 的公共部分和内容部分，引入相应css/js资源，并构建到指定目录， 对ejs模板支持

6. 对js内依赖的css分离并压缩

7. 对js引用的公共模块抽取分离成单独文件

8. 区分开发环境和生产环境

9. js 压缩

10. 静态文件（css/js/img）hash版本支持

11. 清除目标文件目录

12. eslint支持并实现自动修复部分问题 

13. vue接口请求axios支持

14. 热更新，自动编译并刷新支持*

const layout = require('./layout.ejs')
const header = require( './header.ejs') // 页头的模板
const footer = require('./footer.ejs') // 页脚的模板
const topNav = require('./top-nav.ejs') // 顶部栏的模板
const sideMenu = require('./side-menu.ejs') // 侧边栏的模板

/* 整理渲染公共部分所用到的模板变量 */

const pf= {
	pageTitle: ''
}
const moduleExports = {
  /* 处理各个页面传入而又需要在公共区域用到的参数 */
	init(pageTitle) {
		pf.pageTitle = pageTitle // 比如说页面名称，会在<title>或面包屑里用到
    
		//console.log('pf.pageTitle'+pf.pageTitle)

		return this
	},
  /* 整合各公共组件和页面实际内容，最后生成完整的HTML文档 */
	run(content) {
		const renderData = {
			header: header(),
			footer: footer(),
			topNav: topNav(pf),
			sideMenu: sideMenu(),
			content: content,
		}
		return layout(renderData)
	},
}

module.exports = moduleExports
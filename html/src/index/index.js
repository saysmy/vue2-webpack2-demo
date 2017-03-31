
/* 选自webpack-seed/pages/alert/index/html.js  */
const content = require('./index.ejs') 
const layout = require('../layouts/layout.js')  
const pageTitle		= '消息通知' 

module.exports = layout.init(pageTitle).run(content({ pageTitle })) 
//console.log('common')
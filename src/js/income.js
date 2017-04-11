import '../css/income.less'
/* 引入vue和主页 */
import Vue from 'vue'
import axios from 'axios'

import App from './App.vue'

/* 实例化一个vue */
new Vue({
	el: '#app',
	render: h => h(App)
})
console.log(112)
new Vue({
	el: '.article',
	methods: {
		showAvatar: function(){
			console.log('coming')
			axios.get( '/mock/income/index.json')
			.then(function(res){
				console.log(res.data)
			},function(errRes){
				console.log(errRes)
			})
			.catch(function(response) {
				console.log(response)
			})
		}
	}
})

/*new Vue({
	el: '.article',
	methods: {
		showAvatar: () => {

		}
	}
})*/

//console.log('income-ready');
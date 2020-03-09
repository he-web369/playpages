import Vue from 'vue'
import App from './App.vue'
import 'element-ui/lib/theme-chalk/index.css'
import ElementUI from 'element-ui'
import {format} from 'date-fns'

import router from './router/router'
import store from './vuex/store'

Vue.prototype.$format=format
Vue.use(ElementUI)
Vue.config.productionTip = false
new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')

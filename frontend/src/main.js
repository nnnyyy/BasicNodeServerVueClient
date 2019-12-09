import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import G from './globalvariables'
import 'expose-loader?$!expose-loader?jQuery!jquery'

import CustomBtn from './views/components/CustomBtn'
import PermanentWnd from './views/components/PermanentWnd'
Vue.component('CustomBtn', CustomBtn)
Vue.component('PermanentWnd', PermanentWnd)
Vue.config.productionTip = false

Vue.prototype.$EventBus = new Vue();
Vue.prototype.G = G;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
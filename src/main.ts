import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { ReactiveFormConfig, ClientLibrary } from '@rxweb/reactive-forms'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

ReactiveFormConfig.clientLib = ClientLibrary.Vue
ReactiveFormConfig.set({
  validationMessage: {
    required: 'Field is required',
    minLength: 'Field minLength not reached',
    maxLength: 'Field maxLength not reached'
  }
})

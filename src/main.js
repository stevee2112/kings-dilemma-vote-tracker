import Vue from 'vue'
import VueMeta from 'vue-meta'
import App from './App.vue'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

Vue.config.productionTip = false

Vue.use(VueMeta)

new Vue({
  metaInfo: () => ({
    title: "King's Dilemma Vote Tracker"
  }),
  render: h => h(App),
}).$mount('#app')

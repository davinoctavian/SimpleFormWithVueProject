import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import './styles/index.styl';
// import $ from 'jquery';
Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount('#app');

import Vue from 'vue';
import Vuelidate from 'vuelidate';
import App from './App.vue';
import VuelidateFormGroup from '../../src';
import lang from './support/locales/en';

Vue.config.productionTip = false;

Vue.use(Vuelidate);
Vue.use(VuelidateFormGroup, { templates: lang.validation });

new Vue({
  render: h => h(App)
}).$mount('#app');

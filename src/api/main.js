import Vue from 'vue';
import Vuex from 'vuex';
import ElementUI from 'element-ui';
import VueI18n from 'vue-i18n';
import VueClipboard from 'vue-clipboard2';
import '@/styles/element-variables.scss';
import App from './App.vue';
import router from './router';
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome';
import {en} from '@/constants';
import * as filters from '@/utils/filters.js';
import rootStore from './store/index.js';
import Page from '@/components/Page';
import Card from '@/components/Card';
import DataItem from '@/components/DataItem';
import BtnPanel from '@/components/Panel/BtnPanel.vue';
import AddressCopy from '@/components/AddressCopy';
import Socket from './utils/Socket';

Vue.config.productionTip = false;

Vue.use(VueI18n);
const lang = localStorage.getItem('lang') || window.navigator.language || window.navigator.userLanguage;
const i18n = new VueI18n({
    locale: 'en',
    messages: {en}
});

Vue.use(ElementUI, {
    locale: en
});
Vue.use(Vuex);
Vue.use(VueClipboard);
Object.keys(filters).forEach(key => Vue.filter(key, filters[key]));

const store = new Vuex.Store(rootStore);

Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.component('s-page', Page);
Vue.component('s-card', Card);
Vue.component('s-item', DataItem);
Vue.component('s-btn-card', BtnPanel);
Vue.component('s-address', AddressCopy);
Socket.connect();

new Vue({
    i18n,
    router,
    store,
    render: h => h(App)
}).$mount('#app');

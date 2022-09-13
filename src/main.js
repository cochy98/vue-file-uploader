import Vue from 'vue'
import App from './App.vue'

// Importo globalmente axios e le sue configurazioni
import http from './http/index.js';

Vue.config.productionTip = false

// Setto una variabile globale Vue che contiene l'indirizzo del server
Vue.prototype.$apiUri = process.env.VUE_APP_API_URI;

// Setto una variabile globale Vue che contiene axios
Vue.prototype.$http = http;

import VueFileAgent from 'vue-file-agent';
import VueFileAgentStyles from 'vue-file-agent/dist/vue-file-agent.css';
Vue.use(VueFileAgent, VueFileAgentStyles);

new Vue({
  render: h => h(App),
}).$mount('#app')

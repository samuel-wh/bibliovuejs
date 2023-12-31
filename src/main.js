import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";
import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import 'sweetalert2/dist/sweetalert2.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';

loadFonts();

createApp(App)
  .use(router)
  .use(store)
  .use(vuetify)
  .use(VueSweetalert2)
  .mount('#app');

import 'bootstrap/dist/js/bootstrap.bundle.js';

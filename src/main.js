import { createApp } from 'vue'
import PrimeVue from 'primevue/config';
import App from './App.vue'
import router from './router'
import resource from './Resource/MisaReource'
import i18nEnum from './i18ns/i18nEnum';
const app = createApp(App);
app.use(PrimeVue);
app.use(resource)
app.use(i18nEnum)
app.use(router).mount('#app')


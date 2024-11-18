import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

// Importar o CSS do Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

// Font Awesome
import '@fortawesome/fontawesome-free/css/all.css';
import '@fortawesome/fontawesome-free/js/all.js';

// Vuetify
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

// Configurar Font Awesome no Vuetify
import { aliases, fa } from 'vuetify/iconsets/fa';
import { mdi } from 'vuetify/iconsets/mdi';

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'fa', // Define Font Awesome como padrão
    aliases,
    sets: {
      fa,   // Font Awesome
      mdi,  // Material Design Icons
    },
  },
});

const app = createApp(App);

app.use(router);
app.use(vuetify);

app.mount('#app');

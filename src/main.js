import { createApp } from "vue";
import App from "./App.vue";
import vuetify from "vuetify";
import router from "./router";
import { auth } from "./firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import "bootstrap/dist/css/bootstrap.css";
import "vuetify/dist/vuetify.css";

let app;

onAuthStateChanged(auth, () => {
  if (!app) {
    app = createApp(App).use(router).mount("#app");
  }
});

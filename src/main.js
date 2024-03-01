import "bootstrap/dist/css/bootstrap.css";
import { createApp } from "vue";
import App from "./App.vue";

// font awesome
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

// importo le icone
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

// le aggiungo alla libreria
library.add(faMagnifyingGlass);

const app = createApp(App);
app.component("font-awesome-icon", FontAwesomeIcon);
app.mount("#app");

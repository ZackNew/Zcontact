import Vue from "vue";
import Vuetify from "vuetify";
import colors from "vuetify/es5/util/colors";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: colors.blue.accent2,
        secondary: colors.blueGrey.darken1,
        text_primary: "#616161",
        primary_light: "#2979FF",
      },
    },
  },
});

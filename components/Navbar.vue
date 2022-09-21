<template>
  <v-navigation-drawer
    :clipped="$vuetify.breakpoint.smAndUp"
    :permanent="$vuetify.breakpoint.smAndUp"
    app
    v-model="drawer"
  >
    <p>hi</p>
  </v-navigation-drawer>
</template>

<script>
export default {
  data() {
    return {
      drawer: true,
    };
  },
};
</script>

<style></style>

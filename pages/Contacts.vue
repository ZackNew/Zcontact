<template>
  <v-app>
    <Navbar />
    <v-content>
      <h1>Contacts List</h1>
      <ContactsList />
    </v-content>
  </v-app>
</template>

<script>
import Navbar from "../components/Navbar.vue";
import ContactsList from "~/components/ContactsList.vue";
export default { components: { Navbar, ContactsList } };
</script>

<style lang="scss" scoped></style>

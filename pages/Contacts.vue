<template>
  <v-app>
    <Navbar />
    <v-main class="mt-16 mx-10">
      <h1 class="mb-5 text_primary--text">Contacts List</h1>
      <ContactsList />
    </v-main>
  </v-app>
</template>

<script>
import Navbar from "../components/Navbar.vue";
import ContactsList from "~/components/ContactsList.vue";
export default { components: { Navbar, ContactsList } };
</script>

<style lang="scss" scoped></style>

<template>
  <v-navigation-drawer
    color="#fcfcfc"
    :clipped="$vuetify.breakpoint.smAndUp"
    :permanent="$vuetify.breakpoint.smAndUp"
    app
    v-model="drawer"
  >
    <v-layout justify-center v-for="user in users" :key="user.id">
      <div>
        <v-hover class="mt-16" v-slot:default="{ hover }">
          <v-card :elevation="hover ? 5 : 2" id="rounded-card">
            <v-img :src="user.image_url" height="200" width="200"></v-img>
          </v-card>
        </v-hover>
        <p class="text-center mt-5">
          <span class="font-weight-bold secondary--text">Name:</span>
          {{ user.username }}
        </p>
        <p class="text-center">
          <span class="font-weight-bold secondary--text">Phone Number:</span>
          {{ user.phone_number }}
        </p>
        <p class="text-center">
          <span class="font-weight-bold secondary--text">Email:</span>
          {{ user.email }}
        </p>
        <v-btn
          rounded
          fab
          outlined
          color="primary"
          class="mt-5"
          block
          @click="$store.commit('TOOGLE_EDIT_USER_DIALOG')"
        >
          Edit Profile
        </v-btn>
        <!-- <div v-for="user in users" :key="user.id">
        </div> -->
        <EditUserDialog v-if="users" :user="users" />
        <v-btn
          rounded
          fab
          outlined
          color="primary"
          class="mt-5"
          block
          @click="logout"
          >Logout</v-btn
        >
      </div>
    </v-layout>
  </v-navigation-drawer>
</template>

<script>
import getcurrentUser from "~/apollo/queries/getCurrentUser.gql";
import EditUserDialog from "~/components/EditUserDialog.vue";
export default {
  data() {
    return {
      drawer: true,
    };
  },
  apollo: {
    users: {
      query: getcurrentUser,
      fetchPolicy: "cache-and-network",
    },
  },
  methods: {
    logout() {
      this.$store.dispatch("access/logout");
    },
  },
  components: { EditUserDialog },
};
</script>

<style scoped>
#rounded-card {
  border-radius: 50%;
  max-height: 200px;
  max-width: 200px;
}
</style>

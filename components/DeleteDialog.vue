<template>
  <div>
    <v-dialog persistent :value="dialog" max-width="530px">
      <v-card>
        <v-card-title class="text-h5"
          >Are you sure you want to delete this contact?</v-card-title
        >
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="$store.commit('TOOGLE_DELETE_DIALOG')"
            >Cancel</v-btn
          >
          <v-btn color="blue darken-1" text @click="confirmDelete">OK</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import deleteContact from "~/apollo/mutations/deleteContact.gql";
import contactsList from "~/apollo/queries/contacts.gql";

export default {
  data() {
    return {};
  },
  methods: {
    confirmDelete() {
      this.$apollo
        .mutate({
          mutation: deleteContact,
          variables: { id: this.deleteContact.id },
          refetchQueries: [{ query: contactsList }],
        })
        .then((data) => {
          this.$store.commit("TOOGLE_DELETE_DIALOG");
          console.log("yes you deleted", data);
        })
        .catch((err) => {
          console.log("you cant delete coz", err);
        });
    },
  },
  computed: {
    deleteContact() {
      return this.$store.getters.clickedContactState;
    },
    dialog() {
      return this.$store.getters.deleteContactDialogState;
    },
  },
};
</script>

<style></style>

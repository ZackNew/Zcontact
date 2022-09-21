<template>
  <div>
    <v-dialog persistent :value="dialog" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="text-h5">Edit Contact</span>
        </v-card-title>

        <v-card-text>
          <v-container>
            <v-text-field
              dense
              outlined
              label="Name"
              name="Name"
              prepend-icon="person"
              type="text"
              color="primary"
              v-model="username"
              @input="hhh"
            />
            <v-text-field
              dense
              outlined
              label="Phone Number"
              name="Phone Number"
              prepend-icon="phone"
              type="text"
              color="primary"
              v-model="phone_number"
            />
            <v-text-field
              dense
              outlined
              label="Email"
              name="Email"
              prepend-icon="email"
              type="text"
              color="primary"
              v-model="email"
            />
            <v-text-field
              dense
              outlined
              label="Image Url"
              name="Image Url"
              prepend-icon="image"
              type="text"
              color="primary"
              v-model="image_url"
            />
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="$store.commit('TOOGLE_EDIT_DIALOG')"
          >
            Cancel
          </v-btn>
          <v-btn color="blue darken-1" text @click="updateContact">
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import editContact from "~/apollo/mutations/editContact";
import contactsList from "~/apollo/queries/contacts.gql";

export default {
  name: "editContact",
  data() {
    return {
      username: "",
      email: "",
      phone_number: "",
      image_url: "",
    };
  },
  computed: {
    editContact() {
      return this.$store.getters.clickedContactState;
    },
    dialog() {
      return this.$store.getters.editContactDialogState;
    },
  },
  methods: {
    hhh() {
      console.log("ghjhfg", this.username);
    },
    updateContact() {
      this.$apollo
        .mutate({
          mutation: editContact,
          variables: {
            id: this.editContact.id,
            email: this.email,
            image_url: this.image_url,
            name: this.username,
            phone_number: this.phone_number,
          },
          refetchQueries: [{ query: contactsList }],
        })
        .then((data) => {
          this.$store.commit("TOOGLE_EDIT_DIALOG");
          console.log("yes you updated", data);
        })
        .catch((err) => {
          console.log("error while updating", err);
        });
    },
  },
  created() {
    this.username = this.editContact.name;
    this.email = this.editContact.email;
    this.phone_number = this.editContact.phone_number;
    this.image_url = this.editContact.image_url;
  },
};
</script>

<style></style>

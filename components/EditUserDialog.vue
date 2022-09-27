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
              label="name"
              name="Name"
              prepend-icon="person"
              type="text"
              :rules="$store.state.rules.nameRules"
              color="primary"
              v-model="username"
            />
            <div class="d-flex mb-5">
              <v-icon class="mr-3">phone</v-icon>
              <VuePhoneNumberInput
                valid-color="#448AFF"
                default-country-code="ET"
                required
                color="#000000"
                v-model="phone_number"
              />
            </div>
            <v-text-field
              dense
              outlined
              label="Email"
              name="Email"
              prepend-icon="email"
              type="text"
              :rules="$store.state.rules.emailRules"
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
            @click="$store.commit('TOOGLE_EDIT_USER_DIALOG')"
          >
            Cancel
          </v-btn>
          <v-btn color="blue darken-1" text @click="updateUser"> Save </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import VuePhoneNumberInput from "vue-phone-number-input";
import editUser from "~/apollo/mutations/editUser.gql";
import getcurrentUser from "~/apollo/queries/getCurrentUser.gql";

export default {
  data() {
    return {
      username: null,
      phone_number: null,
      email: null,
      image_url: null,
    };
  },
  computed: {
    dialog() {
      return this.$store.state.editUserDialog;
    },
  },
  methods: {
    updateUser() {
      this.$apollo
        .mutate({
          mutation: editUser,
          variables: {
            username: this.username,
            phone_number: this.phone_number,
            email: this.email,
            image_url: this.image_url,
          },
          refetchQueries: [{ query: getcurrentUser }],
        })
        .then((data) => {
          console.log("updated user");
          this.$store.commit("TOOGLE_EDIT_USER_DIALOG");
        })
        .catch((err) => {
          console.log("no update", err);
        });
    },
  },
  components: {
    VuePhoneNumberInput,
  },
  created() {
    this.username = this.user[0].username;
    this.phone_number = this.user[0].phone_number;
    this.email = this.user[0].email;
    this.image_url = this.user[0].image_url;
    console.log("miiiiii", this.user);
  },
  props: {
    user: Array,
  },
};
</script>

<style></style>

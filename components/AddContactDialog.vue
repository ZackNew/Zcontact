<template>
  <div>
    <v-dialog v-model="dialog" max-width="500px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
          Add New Contact
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="text-h5">Add Contact</span>
        </v-card-title>

        <v-card-text>
          <v-form ref="form">
            <v-text-field
              dense
              outlined
              label="Name"
              name="Name"
              prepend-icon="person"
              type="text"
              :rules="$store.state.rules.nameRules"
              color="primary"
              v-model="username"
            />
            <!-- <v-text-field
              dense
              outlined
              label="Phone Number"
              name="Phone Number"
              prepend-icon="phone"
              type="number"
              color="primary"
              v-model="phone_number"
            /> -->
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
          </v-form>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">
            Cancel
          </v-btn>
          <v-btn color="blue darken-1" text @click="createOneContact">
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import createContact from "~/apollo/mutations/createContact.gql";
import contactsList from "~/apollo/queries/contacts.gql";
import VuePhoneNumberInput from "vue-phone-number-input";

export default {
  name: "AddContactDialog",
  data() {
    return {
      dialog: false,
      username: null,
      email: null,
      phone_number: null,
      image_url: null,
    };
  },
  methods: {
    createOneContact() {
      if (this.$refs.form.validate()) {
        this.$apollo
          .mutate({
            mutation: createContact,
            variables: {
              name: this.username,
              email: this.email,
              phone_number: this.phone_number,
              image_url: this.image_url,
            },
            refetchQueries: [{ query: contactsList }],
          })
          .then((data) => {
            this.username = null;
            this.email = null;
            this.phone_number = null;
            this.image_url = null;
            this.dialog = false;
            console.log("this is log of add contacts");
          })
          .catch((err) => {
            console.log("this is the error happned when", err);
          });
      }

      // this.$apollo.queries.contacts.refetch();
    },
  },
  components: {
    VuePhoneNumberInput,
  },
};
</script>

<style></style>

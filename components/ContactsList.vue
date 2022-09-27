<template>
  <v-app>
    <v-card>
      <v-data-table
        :headers="headers"
        :items="contacts"
        sort-by="calories"
        class="elevation-1"
        :search="search"
      >
        <template v-slot:item.image="{ item }">
          <v-avatar size="38">
            <img
              :src="
                item.image_url ||
                'https://www.stignatius.co.uk/wp-content/uploads/2020/10/default-user-icon.jpg'
              "
              alt=""
            />
          </v-avatar>
        </template>
        <template v-slot:top>
          <v-toolbar flat>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
            <v-spacer></v-spacer>
            <AddContactDialog />
            <DeleteDialog />
            <EditContact v-if="$store.getters.editContactDialogState" />
          </v-toolbar>
        </template>
        <template v-slot:item.action="{ item }">
          <v-icon small class="mr-2" @click="editPopup(item)">
            mdi-pencil
          </v-icon>
          <v-icon small @click="deletePopup(item)"> mdi-delete </v-icon>
        </template>
        <template v-slot:no-data>
          <v-btn color="primary"> Reset </v-btn>
        </template>
      </v-data-table>
    </v-card>
  </v-app>
</template>
<script>
import contactsList from "~/apollo/queries/contacts.gql";
import AddContactDialog from "./AddContactDialog.vue";
import DeleteDialog from "./DeleteDialog.vue";
import EditContact from "./EditContact.vue";
export default {
  name: "Contacts",
  data() {
    return {
      vvv: "",
      search: "",
      headers: [
        {
          text: "Image",
          align: "start",
          sortable: false,
          value: "image",
        },
        {
          text: "Name",
          value: "name",
        },
        { text: "Phone Number", value: "phone_number" },
        { text: "Email", value: "email" },
        { text: "Actions", value: "action" },
      ],
      username: "",
      email: "",
      image_url: "",
      phone_number: "",
    };
  },
  apollo: {
    contacts: {
      query: contactsList,
      fetchPolicy: "cache-and-network",
    },
  },
  methods: {
    mineeer() {
      console.log("mimimi");
    },
    deletePopup(event) {
      console.log(event);
      this.$store.dispatch("toogleDeleteDialog");
      this.$store.commit("SET_CLICKED_CONTACT", { target: event });
    },
    editPopup(event) {
      console.log(event);
      this.$store.commit("TOOGLE_EDIT_DIALOG");
      this.$store.commit("SET_CLICKED_CONTACT", { target: event });
    },
  },
  components: {
    AddContactDialog,
    DeleteDialog,
    EditContact,
  },
};
</script>

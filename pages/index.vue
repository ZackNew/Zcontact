<template>
  <div>
    <button @click="signin">signin</button>
    <input v-model="name" type="text" />
    <input v-model="pass" type="text" />
  </div>
</template>

<script>
// import signin from "~/apollo/mutations/auth.js";
import gql from "graphql-tag";

export default {
  name: "IndexPage",
  data() {
    return {
      name: "",
      pass: "",
    };
  },
  methods: {
    signin() {
      this.$apollo
        .mutate({
          mutation: gql`
            mutation ($password: String!, $username: String!) {
              signin(password: $password, username: $username) {
                token
              }
            }
          `,
          variables: {
            username: this.name,
            password: this.pass,
          },
        })
        .then((data) => {
          console.log("himi himi", data);
        })
        .catch((err) => {
          console.log("asfa", err);
        });
      console.log("dhyen erheyr");
    },
  },
};
</script>

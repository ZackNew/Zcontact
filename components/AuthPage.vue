<template>
  <v-app id="inspire">
    <v-main>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="8">
            <v-card class="elevation-2">
              <v-window v-model="step">
                <v-window-item :value="1">
                  <v-row>
                    <v-col cols="12" md="8" class="px-10">
                      <v-card-text class="mt-12">
                        <h1
                          class="text-center display-2 text_primary--text mb-8"
                        >
                          Sign in to Zapp
                        </h1>
                        <v-form ref="form_signin">
                          <v-text-field
                            required
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
                          <v-text-field
                            required
                            dense
                            outlined
                            id="password"
                            label="Password"
                            name="password"
                            prepend-icon="lock"
                            type="password"
                            :rules="$store.state.rules.passwordRules"
                            color="primary"
                            v-model="password"
                          />
                        </v-form>
                        <h3 class="text-center mt-4">Forgot your password ?</h3>
                      </v-card-text>
                      <div class="text-center">
                        <v-btn
                          @click="signin"
                          color="primary_light"
                          dark
                          class="mb-12"
                          >SIGN IN</v-btn
                        >
                      </div>
                    </v-col>
                    <v-col cols="12" md="4" class="primary pt-16">
                      <v-card-text class="white--text text-center">
                        <h1 class="text-center display-1">Hello, Friend!</h1>
                        <h5 class="text-center">
                          Enter your personal details and start journay with us
                        </h5>
                      </v-card-text>
                      <div class="text-center">
                        <v-btn outlined dark @click="step++">SIGN UP</v-btn>
                      </div>
                    </v-col>
                  </v-row>
                </v-window-item>
                <v-window-item :value="2">
                  <v-row class="fill-height">
                    <v-col cols="12" md="4" class="primary pt-16">
                      <v-card-text class="white--text mt-2">
                        <h1 class="text-center display-1">Welcome Back!</h1>
                        <h5 class="text-center">
                          To Keep connected with us please login with your
                          personnel info
                        </h5>
                      </v-card-text>
                      <div class="text-center">
                        <v-btn outlined dark @click="step--">Sign in</v-btn>
                      </div>
                    </v-col>
                    <v-col cols="12" md="8" class="px-10">
                      <v-card-text class="mt-2">
                        <h1
                          class="text-center display-2 text_primary--text mb-8"
                        >
                          Create Account
                        </h1>
                        <v-form ref="form_signup">
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
                          <div class="d-flex mb-5">
                            <v-icon class="mr-3">phone</v-icon>
                            <VuePhoneNumberInput
                              error-color="#440000"
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
                            required
                            dense
                            outlined
                            id="password"
                            label="Password"
                            name="password"
                            prepend-icon="lock"
                            type="password"
                            :rules="$store.state.rules.passwordRules"
                            color="primary"
                            v-model="password"
                          />
                        </v-form>
                      </v-card-text>
                      <div class="text-center mt-n5">
                        <v-btn
                          color="primary_light"
                          dark
                          class="mb-4"
                          @click="signup"
                          >SIGN UP</v-btn
                        >
                      </div>
                    </v-col>
                  </v-row>
                </v-window-item>
              </v-window>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import signinUser from "~/apollo/mutations/signin.gql";
import signupUser from "~/apollo/mutations/signup.gql";
import VuePhoneNumberInput from "vue-phone-number-input";

export default {
  name: "Authentication",
  data() {
    return {
      username: "",
      password: "",
      email: "",
      phone_number: "",
      step: 1,
    };
  },
  methods: {
    signin() {
      if (this.$refs.form_signin.validate()) {
        this.$apollo
          .mutate({
            mutation: signinUser,
            variables: {
              username: this.username,
              password: this.password,
            },
          })
          .then((data) => {
            localStorage.setItem("token", data.data.signin.token);
            this.$router.push({ path: "/Contacts" });
          })
          .catch((err) => {
            console.log("asfa", err);
          });
      }
    },
    signup() {
      if (this.$refs.form_signup.validate()) {
        this.$apollo
          .mutate({
            mutation: signupUser,
            variables: {
              username: this.username,
              email: this.email,
              phone_number: this.phone_number,
              password: this.password,
            },
          })
          .then((data) => {
            localStorage.setItem("token", data.data.signup.token);
            this.$router.push({ path: "/Contacts" });
          })
          .catch((err) => {
            console.log("errrrr", err);
          });
      }
    },
  },
  components: {
    VuePhoneNumberInput,
  },
};
</script>

<style></style>

export const state = () => ({
  nameRules: [
    (v) => !!v || "Name is required",
    (v) => v?.length <= 15 || "Name must be less than 15 characters",
  ],
  emailRules: [
    (v) =>
      !v ||
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
      "E-mail must be valid",
  ],
  passwordRules: [(v) => !!v || "Password is required"],
});

export const getters = {};

export const mutations = {};

export const actions = {};

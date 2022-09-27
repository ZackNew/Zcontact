export const state = () => ({
  isAuthenticated: localStorage.getItem("token") ? true : false,
});

export const getters = {
  getIsAuthenticated: (state) => state.isAuthenticated,
};

export const mutations = {};

export const actions = {
  logout() {
    localStorage.removeItem("token");
    this.$router.push({ path: "/" });
  },
};

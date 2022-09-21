export const state = () => ({
  editContactDialog: false,
  deleteContactDialog: false,
  clickedContact: null,
});

export const getters = {
  editContactDialogState: (state) => state.editContactDialog,
  deleteContactDialogState: (state) => state.deleteContactDialog,
  clickedContactState: (state) => state.clickedContact,
};

export const mutations = {
  TOOGLE_EDIT_DIALOG(state) {
    state.editContactDialog = !state.editContactDialog;
  },
  TOOGLE_DELETE_DIALOG(state) {
    state.deleteContactDialog = !state.deleteContactDialog;
  },
  SET_CLICKED_CONTACT(state, payload) {
    state.clickedContact = payload.target;
  },
};

export const actions = {
  toogleDeleteDialog: ({ commit }) => {
    commit("TOOGLE_DELETE_DIALOG");
  },
};

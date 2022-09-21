export default ({ redirect }) => {
  if (localStorage.getItem("token")) {
    return redirect("/Contacts");
  }
};

import session from "./Session";

let auth = {
  isAuthenticated: false,
  activeUser: null,

  authenticate(user, token, callback) {
    this.isAuthenticated = true;
    this.activeUser = user;
    session.set("token", token);
    callback();
  },

  signout() {
    this.isAuthenticated = false;
    this.activeUser = null;
    session.remove("token");
  },

  getCurrentUser() {
    return this.activeUser;
  }
};

export default auth;

import AuthServiceClient from "../services/Web/auth.service";
import AuthServiceAdmin from "../services/Admin/auth.service";

const client = JSON.parse(localStorage.getItem("client"));
const admin = JSON.parse(localStorage.getItem("admin"));
const initialState =
  client || admin
    ? { status: { loggedIn: true } }
    : { status: { loggedIn: false } };
initialState.admin = admin ? admin : null;
initialState.client = client ? client : null;

export const auth = {
  namespaced: true,
  state: initialState,
  actions: {
    login({ commit }, client) {
      return AuthServiceClient.login(client).then(
        (user) => {
          if (!user) {
            commit("loginFailureClient");
            let err = {
              message: { message: "Ошибка входа" },
            };
            return Promise.reject(err);
          }
          commit("loginSuccessClient", user);
          return Promise.resolve(user);
        },
        (error) => {
          commit("loginFailureClient");

          return Promise.reject(error);
        }
      );
    },
    logout({ commit }) {
      AuthServiceClient.logout();
      commit("logoutClient");
    },
    register({ commit }, user) {
      return AuthServiceClient.register(user).then(
        (response) => {
          commit("registerSuccess");
          return Promise.resolve(response.data);
        },
        (error) => {
          commit("registerFailure");
          return Promise.reject(error);
        }
      );
    },
    changePassword({ commit }, user) {
      return AuthServiceClient.changePassword(user).then(
        (user) => {
          return Promise.resolve(user);
        },
        (error) => {
          return Promise.reject(error);
        }
      );
    },
    resetPassword({ commit }, email) {
      return AuthServiceClient.resetPassword(email).then(
        (info) => {
          return Promise.resolve(info);
        },
        (error) => {
          return Promise.reject(error);
        }
      );
    },
  },
  mutations: {
    loginSuccessClient(state, user) {
      state.status.loggedIn = true;
      state.client = user;
    },
    loginFailureClient(state) {
      state.status.loggedIn = false;
      state.client = null;
    },
    logoutClient(state) {
      state.status.loggedIn = false;
      state.client = null;
    },
    registerSuccess(state) {
      state.status.loggedIn = false;
    },
    registerFailure(state) {
      state.status.loggedIn = false;
    },
  },
};

import AuthService from "../services/auth.service";

const client = JSON.parse(localStorage.getItem("user"));

var initialState = Object.create(null);
initialState = client ? { loggedIn: true, info: client } : { loggedIn: false };

export const auth = {
  namespaced: true,
  state: initialState,
  actions: {
    login({ commit }, data) {
      return AuthService.login(data).then(
        (user) => {
          if (!user) {
            commit("loginFailure");
            let err = {
              message: { message: "Ошибка входа" },
            };
            return Promise.reject(err);
          }
          commit("loginSuccess", user);
          return Promise.resolve(user);
        },
        (error) => {
          commit("loginFailure");

          return Promise.reject(error);
        }
      );
    },
    logout({ commit }) {
      AuthService.logout();
      commit("logout");
    },

    register({ commit }, user) {
      return AuthService.register(user).then(
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
    changePassword({ commit }, data) {
      return AuthService.changePassword(data).then(
        (user) => {
          return Promise.resolve(user);
        },
        (error) => {
          return Promise.reject(error);
        }
      );
    },
  },
  mutations: {
    loginSuccess(state, user) {
      state.loggedIn = true;
      state.info = user;
    },
    loginFailure(state) {
      state.loggedIn = false;
      state.info = null;
    },
    logout(state) {
      state.loggedIn = false;
      state.info = null;
    },
    registerSuccess(state) {
      state.loggedIn = false;
    },
    registerFailure(state) {
      state.loggedIn = false;
    },
  },
};

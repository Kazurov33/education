import axios from "axios";
import authHeader from "./auth-header";

const api = "http://localhost:3081/api/auth/";

class AuthServiceAdmin {
  login(user) {
    return axios
      .post(api + "signin", {
        PhoneNumber: user.PhoneNumber,
        Password: user.Password,
      })
      .then((response) => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(user) {
    return axios.post(api + "signup", user);
  }

  changePassword(user) {
    return axios.put(passApi + "changepassword", user, {
      crossDomain: true,
      headers: user.accessToken
        ? { "x-access-token": user.accessToken }
        : authHeader(),
    });
  }

  resetPassword(data) {
    return axios.put(api + "resetPass", data, {
      crossDomain: true,
    });
  }
}

export default new AuthServiceAdmin();

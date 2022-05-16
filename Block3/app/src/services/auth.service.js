import axios from "axios";
import authHeader from "./auth-header";
import { productPaths, developPaths } from "../../../../basicConfigs/paths";

const api = "http://localhost:3080/api/auth";

const passApi =
  process.env.NODE_ENV == "production"
    ? productPaths.request
    : developPaths.request;

class AuthServiceAdmin {
  login(user) {
    return axios
      .post(api + "signin", {
        PhoneNumber: user.PhoneNumber,
        Password: user.Password,
        userType: 1,
      })
      .then((response) => {
        if (response.data.Role == 5) {
          return false;
        }
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
    user.userType = 1;
    return axios.post(api + "signup", user);
  }

  changePassword(user) {
    return axios.put(passApi + "/user/changepassword", user, {
      crossDomain: true,
      headers: user.accessToken
        ? { "x-access-token": user.accessToken }
        : authHeader(),
    });
  }

  setPassword(user) {
    return axios.put(passApi + "/m/user/setPass", user, {
      crossDomain: true,
      headers: user.accessToken
        ? { "x-access-token": user.accessToken }
        : authHeader(),
    });
  }

  checkToken() {
    return axios.get(api + "checktoken", {
      crossDomain: true,
      headers: authHeader(),
    });
  }

  resetPassword(data) {
    return axios.put(api + "resetPass", data, {
      crossDomain: true,
    });
  }
}

export default new AuthServiceAdmin();

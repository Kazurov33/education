import axios from "axios";
import authHeader from "./auth-header";

export class BaseService {
  api = "http://localhost:3081/api";
  _get(url, cancelSource) {
    return new Promise((resolve, reject) => {
      axios
        .get(`${this.api}${url}`, {
          crossDomain: true,
          headers: authHeader(),
          cancelToken: cancelSource != null ? cancelSource.token : null,
        })
        .then(function (response) {
          resolve(response.data);
        })
        .catch(function (error) {
          if (error.response.status == 401) {
            localStorage.removeItem("user");
            window.location.reload();
          }
          reject(error);
        });
    });
  }
  _post(url, data) {
    return new Promise((resolve, reject) => {
      axios
        .post(`${this.api}${url}`, data, {
          crossDomain: true,
          headers: authHeader(),
        })
        .then(function (response) {
          resolve(response.data);
        })
        .catch(function (error) {
          reject(error);
        });
    });
  }

  _put(url, data) {
    return new Promise((resolve, reject) => {
      axios
        .put(`${this.api}${url}`, data, {
          crossDomain: true,
          headers: authHeader(),
        })
        .then(function (response) {
          resolve(response.data);
        })
        .catch(function (error) {
          reject(error);
        });
    });
  }

  _delete(url, data) {
    return new Promise((resolve, reject) => {
      axios({
        url: `${this.api}${url}`,
        method: "delete",
        data: data,
        headers: authHeader(),
        crossDomain: true,
      })
        .then(function (response) {
          resolve(response.data);
        })
        .catch(function (error) {
          reject(error);
        });
    });
  }
}

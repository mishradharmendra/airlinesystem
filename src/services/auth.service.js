//import axios from 'axios';
import http from './http-common';

const API_URL = '/user/';

class AuthService {
  login(user) {
    return http
      .post(API_URL + 'loginUser', {
        email: user.email,
        password: user.password
      })
      .then(response => {
        if (response.data.auth_TOKEN) {
          localStorage.setItem('user', JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem('user');
  }

  register(user) {
    console.log('Calling register api for user ' + JSON.stringify(user));
    return http.post(API_URL + 'registerUser', {
      userName: user.userName,
      email: user.email,
      password: user.password,
      age: user.age,
      userType: user.userType
    })
    // .then(response => {
    //   console.table(response.data);
    //   return response.data;

    // }).catch (e => {
    //   console.log(e);
    //   return e;
    // });
  }
}

export default new AuthService();

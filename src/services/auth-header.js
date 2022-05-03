export default function authHeader() {
  let user = JSON.parse(localStorage.getItem('user'));


  if (user && user.auth_TOKEN) {
    return { AUTH_TOKEN: user.auth_TOKEN }; // for Spring Boot back-end
  } else {
    return {};
  }
}

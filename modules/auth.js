export function saveAuth(token, name) {
  localStorage.setItem("token", token);
  localStorage.setItem("name", name);
}

export function getToken() {
  return localStorage.getItem("token");
}

export function getUserName() {
  return localStorage.getItem("name");
}

export function isAuthorized() {
  return Boolean(getToken());
}

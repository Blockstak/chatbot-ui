export function getToken() {
  return window.sessionStorage.getItem("access_token") || "";
}

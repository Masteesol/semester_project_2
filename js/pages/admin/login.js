import { api } from "../../data/api.js";
import { setLocalStorage } from "../../utils/storage.js";

export default function (event) {
  event.preventDefault();
  const [email, password] = [this[0], this[1]];
  newLogin(email.value, password.value)
}

export async function newLogin(email, password) {

  const apiCall = await api(
    JSON.stringify({ identifier: email, password: password }),
    {"Content-Type": "application/json"},
    "auth/local/",
    "POST"
  );

  const { json, response } = apiCall;

  if (response.status === 200) {
    setLocalStorage("token", json.jwt);
    setLocalStorage("user", json.user);
    location.reload()
  } else {
    alert("Wrong password or email");
  }
}

import axios from "../utils/axios";
import { setToken } from "./TokenService";

// File ini digunakan untuk menghandle autentikasi user

// login
export async function login(credentials) {
  const { data } = await axios.post("/login", credentials);
  // menyimpan token di secure store
  await setToken(data.token);
}

// Register
export async function register(registerInfo) {
  const { data } = await axios.post("/register", registerInfo);
  await setToken(data.token);
}

// Forgot Password
export async function sendPasswordResetLink(email) {
  const { data } = await axios.post("/forgot-password", { email });
  return data.status;
}

// load user (mengambil data-data user yang login)
export async function loadUser() {
  const { data: user } = await axios.get("/user");
  return user;
}

// logout
export async function logout() {
  await axios.post("/logout", {});
  await setToken(null);
}

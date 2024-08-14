import * as SecureStore from "expo-secure-store";

// File ini untuk menyimpan token autentikasi didalam device
// inisialisai variabel token
let token = null;

// seToken digunakan untuk menyimpan token
export async function setToken(newToken) {
  token = newToken;

  if (token !== null) {
    //   jika variabel token ada, simpan di secure store
    await SecureStore.setItemAsync("token", token);
  } else {
    //   jika variabel token tidak ada, hapus token
    await SecureStore.deleteItemAsync("token");
  }
}

// getToken digunakan untuk mendapatkan token untuk digunakan untuk session di seluruh apps
export async function getToken() {
  // jika varaiabel token sudah ada, langsung return
  if (token !== null) {
    return token;
  }

  // jika variabel token tidak ada, ambil token dari secure store (pernyimpanan token di device)
  token = await SecureStore.getItemAsync("token");
  return token;
}

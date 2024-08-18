import axios from "../utils/axios";

// File ini digunakan untuk menghandle content

// Get item
export async function getProducts() {
  const { data } = await axios.get("/products");
  return data;
}

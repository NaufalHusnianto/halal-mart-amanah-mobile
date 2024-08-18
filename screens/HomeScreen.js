import { useContext, useEffect, useState } from "react";
import {
  Button,
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from "react-native";
import AuthContext from "../contexts/AuthContext";
import { logout } from "../services/AuthService";
import { getProducts } from "../services/ContentService";

export default function () {
  const { user, setUser } = useContext(AuthContext);
  const [products, setProducts] = useState([]);

  async function handleLogout() {
    try {
      await logout();
      setUser(null);
      console.log("Logout Successfull");
    } catch (err) {
      console.log(err);
    }
  }

  // Get Product
  useEffect(() => {
    async function fetchProducts() {
      try {
        const data = await getProducts();
        // console.log("Data Found", data);
        console.log("data found");
        setProducts(data);
      } catch (err) {
        console.log("Failed to fetch products", err);
      }
    }

    fetchProducts();
  }, []);

  return (
    <SafeAreaView className="h-full pt-8">
      <View className="flex flex-row justify-between items-center border-b border-white p-4">
        <View>
          <Text>{user.name}</Text>
          <Text>{user.email}</Text>
        </View>
        <Pressable
          onPress={handleLogout}
          className="bg-gray-700 px-4 py-1 rounded-full"
        >
          <Text>LOGOUT</Text>
        </Pressable>
      </View>

      <View className="px-4 py-4">
        <Text className="text-lg">Products</Text>
        <ScrollView className="h-4/5 mt-4">
          {products.map((product) => (
            <View
              key={product.id}
              className="p-4 rounded-lg mt-2 w-full max-w-xs border border-slate-500"
            >
              <Image
                source={{
                  uri: "http://192.168.43.49:8080/storage/" + product.image,
                }}
                className="w-full h-40"
              />
              <Text className="text-white text-base">{product.name}</Text>
              <Text className="text-white text-sm">{product.description}</Text>
              <View className="flex flex-row justify-between mt-4">
                <Text className="text-white text-sm">{product.price}</Text>
                <Pressable
                  className="bg-blue-500 px-4 py-1 rounded-full"
                  onPress={() => console.log(`${product.id} add to cart`)}
                >
                  <Text className="text-white text-sm">+ Keranjang</Text>
                </Pressable>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

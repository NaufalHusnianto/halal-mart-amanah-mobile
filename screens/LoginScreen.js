import { Platform, Pressable, SafeAreaView, Text, View } from "react-native";
import FormTextField from "../components/FormTextField";
import { useState, useContext } from "react";
import { loadUser, login } from "../services/AuthService";
import AuthContext from "../contexts/AuthContext";

export default function ({ navigation }) {
  const { setUser } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  async function handleLogin() {
    // ubah state errors jadi object kosong
    setErrors({});

    try {
      // login dengan menggunakan function pada AuthService
      await login({
        email,
        password,
        device_name: `${Platform.OS}-${Platform.Version}`,
      });

      // load user (function pada AuthService)
      const user = await loadUser();
      console.log(user);

      setUser(user);
    } catch (error) {
      if (error.response?.status === 422) {
        // set errors jika terjadi kesalahan validasi
        setErrors(error.response.data.errors);
      }
    }
  }

  return (
    <SafeAreaView className="flex justify-center min-h-screen px-8">
      <Text className="text-2xl font-bold text-center">Login</Text>
      <View>
        <FormTextField
          label="Email Address :"
          value={email}
          onChangeText={(text) => setEmail(text)}
          keyboardType="email-address"
          errors={errors.email}
        />
        <FormTextField
          label="Password :"
          secureTextEntry={true}
          value={password}
          onChangeText={(text) => setPassword(text)}
          errors={errors.password}
        />
      </View>
      <View className="mt-6 flex items-center">
        <Pressable
          className="bg-blue-500 w-full py-2 rounded-lg"
          onPress={handleLogin}
        >
          <Text className="text-center text-white font-bold">Sign In</Text>
        </Pressable>
        <View className="flex flex-row space-x-8 mt-3">
          <Pressable onPress={() => navigation.navigate("Create account")}>
            <Text>Don't have an account?</Text>
          </Pressable>
          <Pressable onPress={() => navigation.navigate("Forgot Password")}>
            <Text>Forgot Password?</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

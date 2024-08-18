import {
  Button,
  Platform,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import FormTextField from "../components/FormTextField";
import { useState, useContext } from "react";
import { loadUser, register } from "../services/AuthService";
import AuthContext from "../contexts/AuthContext";

export default function ({ navigation }) {
  const { setUser } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [errors, setErrors] = useState({});

  async function handleRegister({ navigation }) {
    // ubah state errors jadi object kosong
    setErrors({});

    try {
      // Register dengan menggunakan function pada AuthService
      await register({
        name,
        email,
        password,
        password_confirmation: passwordConfirmation,
        device_name: `${Platform.OS}-${Platform.Version}`,
      });

      // load user (function pada AuthService)
      const user = await loadUser();
      console.log(user);

      setUser(user);
      navigation.replace("Home");
    } catch (error) {
      if (error.response?.status === 422) {
        // set errors jika terjadi kesalahan validasi
        setErrors(error.response.data.errors);
      }
    }
  }

  return (
    <SafeAreaView className="flex justify-center min-h-screen px-8">
      <Text className="text-2xl font-bold text-center">Register</Text>
      <View className="mt-3">
        <FormTextField
          label="Username :"
          value={name}
          onChangeText={(text) => setName(text)}
          errors={errors.name}
        />
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
        <FormTextField
          label="Password Confirmation :"
          secureTextEntry={true}
          value={passwordConfirmation}
          onChangeText={(text) => setPasswordConfirmation(text)}
          errors={errors.password_confirmation}
        />
      </View>
      <View className="mt-6 flex items-center">
        <Pressable
          onPress={handleRegister}
          className="bg-blue-500 w-full py-2 rounded-lg"
        >
          <Text className="text-center text-white font-bold">Register</Text>
        </Pressable>
        <Pressable
          onPress={() => navigation.navigate("Login")}
          className="mt-3"
        >
          <Text>Already have an account?</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

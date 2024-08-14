import { Button, Platform, SafeAreaView, StyleSheet, View } from "react-native";
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
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.container}>
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
        <Button title="Login" onPress={handleLogin} />
        <Button
          title="Create account"
          onPress={() => navigation.navigate("Create account")}
        />
        <Button
          title="Forgot Password"
          onPress={() => navigation.navigate("Forgot Password")}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    padding: 20,
    rowGap: 16,
  },
});

import { Button, Platform, SafeAreaView, StyleSheet, View } from "react-native";
import FormTextField from "../components/FormTextField";
import { useState, useContext } from "react";
import { loadUser, register } from "../services/AuthService";
import AuthContext from "../contexts/AuthContext";

export default function () {
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
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.container}>
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
        <Button title="Register" onPress={handleRegister} />
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

import { Button, SafeAreaView, StyleSheet, View, Text } from "react-native";
import FormTextField from "../components/FormTextField";
import { useState } from "react";
import { sendPasswordResetLink } from "../services/AuthService";

export default function () {
  const [email, setEmail] = useState("");
  const [resetStatus, setResetStatus] = useState("");
  const [errors, setErrors] = useState({});

  async function handleForgotPassword() {
    // ubah state errors jadi object kosong
    setErrors({});
    setResetStatus("");

    try {
      // login dengan menggunakan function pada AuthService
      const status = await sendPasswordResetLink(email);
      setResetStatus(status);
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
        {resetStatus && <Text style={styles.resetStatus}>{resetStatus}</Text>}
        <FormTextField
          label="Email Address :"
          value={email}
          onChangeText={(text) => setEmail(text)}
          keyboardType="email-address"
          errors={errors.email}
        />
        <Button
          title="Email reset password link"
          onPress={handleForgotPassword}
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
  resetStatus: {
    color: "green",
    marginBottom: 10,
  },
});

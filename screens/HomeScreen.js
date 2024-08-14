import { useContext } from "react";
import { Button, SafeAreaView, Text } from "react-native";
import AuthContext from "../contexts/AuthContext";
import { logout } from "../services/AuthService";

export default function () {
  const { user, setUser } = useContext(AuthContext);

  async function handleLogout() {
    try {
      await logout();
      setUser(null);
      console.log("Logout Successfull");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <SafeAreaView>
      <Text>Welcome, {user.name}</Text>
      <Button title="Logout" onPress={handleLogout} />
    </SafeAreaView>
  );
}

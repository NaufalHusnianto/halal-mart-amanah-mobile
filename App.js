import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";
import { useEffect, useState } from "react";
import AuthContext from "./contexts/AuthContext";
import { loadUser } from "./services/AuthService";
import SplashScreen from "./screens/SplashScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ForgotPasswordScreen from "./screens/ForgotPasswordScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  const [user, setUser] = useState();
  const [status, setStatus] = useState("loading");

  // load data user untuk digunakan pada halaman yang diperlukan
  useEffect(() => {
    async function runEffect() {
      try {
        const user = await loadUser();
        setUser(user);
      } catch (error) {
        console.log("Failed to load user", error);
      }

      setStatus("idle");
    }

    runEffect();
  }, []);

  if (status === "loading") {
    return <SplashScreen />;
  }

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <NavigationContainer>
        <Stack.Navigator>
          {user ? (
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{ headerShown: false }}
            />
          ) : (
            <>
              <Stack.Screen
                name="Login"
                component={LoginScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Create account"
                component={RegisterScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Forgot Password"
                component={ForgotPasswordScreen}
              />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

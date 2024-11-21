// AppNavigator.tsx
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { Platform } from "react-native";
import Home from "../app/index/index";
import Login from "../app/login/login";
import Register from "../app/register/register";
import ForgotPassword from "../app/forgotPassword/forgotPassword";
import LinkEmail from "../app/linkEmail/linkEmail";
import ResetPassword from "../app/resetPassword/resetPassword";

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} options={{ title: "Página Inicial" }} />
        <Stack.Screen name="Login" component={Login} options={{ title: "Login" }} />
        <Stack.Screen name="Register" component={Register} options={{ title: "Cadastro" }} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{ title: "Esqueceu a Senha" }}/>
        <Stack.Screen name="LinkEmail" component={LinkEmail} options={{ title: "Envio E-mail" }}/>
        <Stack.Screen name="ResetPassword" component={ResetPassword} options={{ title: "Reset de Senha" }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

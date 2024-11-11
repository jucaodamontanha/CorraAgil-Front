// AppNavigator.tsx
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Home from "../app/index/index";
import Login from "../app/login/login";
import Register from "../app/register/register";
import ForgotPassword from "../app/forgotPassword/forgotPassword";
import LinkEmail from "../app/linkEmail/linkEmail";

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LinkEmail">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen name="LinkEmail" component={LinkEmail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

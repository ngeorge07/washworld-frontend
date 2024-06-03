import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LoginScreen } from "./LoginScreen";
import { SignupScreen } from "./SignupScreen";

export type AuthParams = {
  login:
    | {
        email: string;
        password: string;
      }
    | undefined;
  signup: undefined;
};

const Stack = createNativeStackNavigator<AuthParams>();

export default function AuthScreen() {
  return (
    <Stack.Navigator initialRouteName="signup">
      <Stack.Screen
        name="login"
        component={LoginScreen}
        options={{ title: "Log in to Wash World", headerBackVisible: false }}
      />
      <Stack.Screen
        name="signup"
        component={SignupScreen}
        options={{ title: "Sign up to Wash World" }}
      />
    </Stack.Navigator>
  );
}

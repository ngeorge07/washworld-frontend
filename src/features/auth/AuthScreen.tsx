import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LoginScreen } from "./LoginScreen";
import { SignupScreen } from "./SignupScreen";

export type AuthStackParamList = {
  login: {
    email: string;
    password: string;
  };
  signup: undefined;
};

const Stack = createNativeStackNavigator<AuthStackParamList>();

export default function AuthScreen() {
  return (
    <Stack.Navigator initialRouteName="signup">
      <Stack.Screen name="login" component={LoginScreen} />
      <Stack.Screen
        name="signup"
        component={SignupScreen}
        options={{ title: "Sign up to Wash World" }}
      />
    </Stack.Navigator>
  );
}

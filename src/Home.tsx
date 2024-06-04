import { Spinner, View } from "@gluestack-ui/themed";
import { NavigationContainer } from "@react-navigation/native";
import { useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./app/store";
import AuthScreen from "./features/auth/AuthScreen";
import { autoSignIn } from "./features/auth/authSlice";
import DashboardScreen from "./features/dashboard/DashboardScreen";

export default function Home() {
  const auth = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();

  useLayoutEffect(() => {
    dispatch(autoSignIn());
  }, []);

  if (auth.status === "loading") {
    return (
      <View h="$full" display="flex" justifyContent="center">
        <Spinner size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {auth.isSignedIn ? <DashboardScreen /> : <AuthScreen />}
    </NavigationContainer>
  );
}

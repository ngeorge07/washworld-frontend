import { Button, ButtonText, Text, View } from "@gluestack-ui/themed";
import { useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../app/store";
import { fetchUser, signOut } from "../../features/auth/authSlice";
import { colors } from "../../styles";

export default function DashboardScreen() {
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();

  useLayoutEffect(() => {
    if (user?.sub) {
      dispatch(fetchUser(user.sub));
    }
  }, [dispatch, user?.fullName]);

  return (
    <View mt="$16" mx="$9" display="flex" gap="$6">
      <Text>Full name: {user?.fullName}</Text>
      <Text>Email: {user?.email}</Text>

      <Button bg={colors.primary.errorRed} onPress={() => dispatch(signOut())}>
        <ButtonText>Log out</ButtonText>
      </Button>
    </View>
  );
}

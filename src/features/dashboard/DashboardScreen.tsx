import { Text } from "@gluestack-ui/themed";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";

export default function DashboardScreen() {
  const { user } = useSelector((state: RootState) => state.auth);

  return <Text>{user?.fullName}</Text>;
}

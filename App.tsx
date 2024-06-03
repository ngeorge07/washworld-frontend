import { config } from "@gluestack-ui/config";
import { GluestackUIProvider } from "@gluestack-ui/themed";
import { NavigationContainer } from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "./src/app/store";
import AuthScreen from "./src/features/auth/AuthScreen";

export default function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ReduxProvider store={store}>
        <GluestackUIProvider config={config}>
          <NavigationContainer>
            <AuthScreen />
          </NavigationContainer>
        </GluestackUIProvider>
      </ReduxProvider>
    </QueryClientProvider>
  );
}

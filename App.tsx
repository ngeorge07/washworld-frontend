import { config } from "@gluestack-ui/config";
import { GluestackUIProvider } from "@gluestack-ui/themed";
import { NavigationContainer } from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AuthScreen from "./src/features/auth/AuthScreen";

export default function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <GluestackUIProvider config={config}>
        <NavigationContainer>
          <AuthScreen />
        </NavigationContainer>
      </GluestackUIProvider>
    </QueryClientProvider>
  );
}

import { config } from "@gluestack-ui/config";
import {
  Box,
  GluestackUIProvider,
  SafeAreaView,
  Text,
} from "@gluestack-ui/themed";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StatusBar, StyleSheet } from "react-native";

export default function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <GluestackUIProvider config={config}>
        <SafeAreaView style={styles.container}>
          <Box justifyContent="center" alignItems="center">
            <Text>Open up App.js to start working on your app!</Text>
          </Box>
        </SafeAreaView>
      </GluestackUIProvider>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight,
  },
});

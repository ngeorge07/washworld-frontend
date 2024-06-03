import { config } from "@gluestack-ui/config";
import { GluestackUIProvider } from "@gluestack-ui/themed";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "./src/app/store";
import Home from "./src/Home";

export default function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ReduxProvider store={store}>
        <GluestackUIProvider config={config}>
          <Home />
        </GluestackUIProvider>
      </ReduxProvider>
    </QueryClientProvider>
  );
}

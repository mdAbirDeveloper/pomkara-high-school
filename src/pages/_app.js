import "@/styles/globals.css";
import Layout from "./Layout";
import { Provider } from "react-redux";
import store from "@/pages/Redux/app/store";
import Authentication from "./Authentication";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function App({ Component, pageProps }) {
  const queryClient = new QueryClient();
  const getLayout = Component.getLayout ?? ((page) => page);
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Authentication>
          <Layout>{getLayout(<Component {...pageProps} />)}</Layout>
        </Authentication>
      </QueryClientProvider>
    </Provider>
  );
}

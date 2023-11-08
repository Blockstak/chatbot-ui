import "@/styles/globals.css";
import { store } from "@/state/store";
import { Provider } from "react-redux";
import type { AppProps } from "next/app";
import Loader from "@/comps/ui/Loader/Loader";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      {/* <Loader /> */}
      <Component {...pageProps} />
      <ToastContainer />
    </Provider>
  );
}

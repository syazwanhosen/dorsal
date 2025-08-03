import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store, persistor } from "@/store";
import { PersistGate } from "redux-persist/integration/react";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sooner";
import AppRouter from "./AppRouter";
import "./App.css";
import "leaflet/dist/leaflet.css";
import ScrollToTop from "./ScrollToTop";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={<div>Loading...</div>} persistor={persistor}> 
        <ThemeProvider>
          <BrowserRouter>
          <ScrollToTop />
            <AppRouter />
          </BrowserRouter>
          <Toaster />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  </StrictMode>
);

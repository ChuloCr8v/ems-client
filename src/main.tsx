import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { MsalProvider } from "@azure/msal-react";
import { Provider } from "react-redux";
import { store } from "./store/store.ts";
import { PublicClientApplication } from "@azure/msal-browser";
import { msalConfig } from "./api/msal.ts";

const msalInstance = new PublicClientApplication(msalConfig);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MsalProvider instance={msalInstance}>
      <Provider store={store}>
        <App />
      </Provider>
    </MsalProvider>
  </StrictMode>
);

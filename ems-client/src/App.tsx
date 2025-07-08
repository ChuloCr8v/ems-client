import { Suspense } from "react";

import "./App.css";
import { ConfigProvider } from "antd";
import { BrowserRouter } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import AppRoutes from "./routes/AppRoutes";
import { PopupProvider } from "./context/PopupContext";
import PageError from "./component/PageError";
import { Loading } from "./component/global/Loading";

function App() {
  return (
    <ErrorBoundary fallback={<PageError />}>
      <Suspense fallback={<Loading />}>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: "#0A96CC",
            },
            components: {
              Form: {
                itemMarginBottom: 6,
                verticalLabelPadding: 1,
                labelFontSize: 13,
              },

              Input: {
                activeBg: "inherit",
              },
              Tabs: {
                itemSelectedColor: "green",
                itemHoverColor: "green",
                colorPrimary: "green",
              },
            },
          }}
        >
          <PopupProvider>
            <BrowserRouter>
              <AppRoutes />
            </BrowserRouter>
          </PopupProvider>
        </ConfigProvider>
      </Suspense>
    </ErrorBoundary>
  );
}

export default App;

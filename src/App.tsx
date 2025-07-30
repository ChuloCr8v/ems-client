import { Suspense } from "react";

import "./App.css";
import { ConfigProvider } from "antd";
import { BrowserRouter } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import AppRoutes from "./routes/AppRoutes";
import { PopupProvider } from "./context/PopupContext";
import PageError from "./component/PageError";
import { Loading } from "./component/global/Loading";
import AuthContext from "./context/AuthContext";
import { UploaderProvider, useUploaderProvider } from "./context/UploadContext";

function App() {
  const uploader = useUploaderProvider();

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
                verticalLabelPadding: 4,
                labelFontSize: 13,
              },

              Input: {
                activeBg: "inherit",
                colorBorder: "#e6eae8",
              },
              Select: {
                colorBorder: "#e6eae8",
              },
              Tabs: {
                itemSelectedColor: "green",
                itemHoverColor: "green",
                colorPrimary: "green",
              },
            },
          }}
        >
          <UploaderProvider value={uploader}>
            <PopupProvider>
              <BrowserRouter>
                <AuthContext>
                  <AppRoutes />
                </AuthContext>
              </BrowserRouter>
            </PopupProvider>
          </UploaderProvider>
        </ConfigProvider>
      </Suspense>
    </ErrorBoundary>
  );
}

export default App;

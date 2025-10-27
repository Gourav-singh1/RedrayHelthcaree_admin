import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "primeflex/primeflex.css";
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/lara-light-blue/theme.css";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { store } from "./redux/store.js";
import GlobalToast from "./components/GlobalToast.jsx";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <GlobalToast />
        <App />
      </Provider>
    </BrowserRouter>
  </StrictMode>
);

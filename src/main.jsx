import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App.jsx";
import "modern-normalize";
import { Provider } from "react-redux";
import { store } from "./redux/store.js";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
        <Toaster />
    </BrowserRouter>
  </Provider>
);

/* цей файл є точкою входу в проект */

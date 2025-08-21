import React from "react";
import ReactDOM from "react-dom/client";
import MobileCompany from "./components/MobileCompany";
import { Provider } from "react-redux";
import store from "./components/redux/store";

const root = ReactDOM.createRoot(document.getElementById("container"));

root.render(
  <Provider store={store}>
    <MobileCompany />
  </Provider>,
);

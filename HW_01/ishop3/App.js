import React from "react"; // не нужен с реактом 17+ по идее
import ReactDOM from "react-dom/client";
import Shop from "./components/Shop";

import logo from "./components/logo.png"; // картинка логотипа

import products from "./products.json"; // импортируем список товаров из JSON-файла

// рендер реакт 18+
const root = ReactDOM.createRoot(document.getElementById("container"));
root.render(
  <Shop
    name="iShop"
    address="г. Минск, ул. Вкусная, 1"
    logo={logo} // логотип
    products={products} // список товаров
  />,
);

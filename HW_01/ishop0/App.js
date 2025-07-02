import React from "react"; // не нужен с реактом 17+ по идее
import ReactDOM from "react-dom/client";
import Shop from "./components/Shop";

import logo from "./components/logo.png"; // картинка логотипа

// Массив товаров
const products = [
    { id: 1, name: "Хлеб", price: 1.50 },
    { id: 2, name: "Молоко", price: 2.50 },
    { id: 3, name: "Сыр", price: 5.00 },
    { id: 4, name: "Творог", price: 7.00 },
];

const root = ReactDOM.createRoot(document.getElementById("container"));
root.render(<Shop 
    name="iShop" 
    address="г. Минск, ул. Вкусная, 1" 
    products={products} // список товаров
    logo={logo} // логотип
    />
);

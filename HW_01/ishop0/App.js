import React from "react"; // не нужен с реактом 17+ по идее
import ReactDOM from "react-dom/client";
import Shop from "./components/Shop";

import logo from "./components/logo.png"; // картинка логотипа

// Массив товаров
const products = [
    { 
        id: 1, 
        name: "Хлеб", 
        price: 1.50,
        photoUrl: "https://tagilhleb.ru/upload/resize_cache/iblock/515/450_450_0/515831aec3fa50047741c68b170541ac.png",
        count: 10,
    }, 
    {
        id: 2,
        name: "Молоко",
        price: 2.50,
        photoUrl: "https://eda.ru/images/Article/1500x804/moloko-polza-i-vred.webp",
        count: 5
    },
    {
        id: 3,
        name: "Сыр",
        price: 5.00,
        photoUrl: "https://eda.show/content/images/2022/11/queijo-vaca-curado-2.jpeg",
        count: 8
    },
    {
        id: 4,
        name: "Творог",
        price: 7.00,
        photoUrl: "https://thumb.tildacdn.com/tild6336-3034-4062-a336-366533633235/-/format/webp/bowl-3366480_1920.jpg",
        count: 3
    },
];

const root = ReactDOM.createRoot(document.getElementById("container"));
root.render(<Shop 
    name="iShop" 
    address="г. Минск, ул. Вкусная, 1" 
    logo={logo} // логотип
    products={products} // список товаров
    />
);

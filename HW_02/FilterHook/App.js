import React from "react"; // не нужен с реактом 17+ по идее
import ReactDOM from "react-dom/client";
import Filter from "./components/Filter";
import words from "./words.json";

// рендер реакт 18+
const root = ReactDOM.createRoot(document.getElementById("container"));
root.render(<Filter words={words} />);

import React from "react"; // не нужен с реактом 17+ по идее
import ReactDOM from "react-dom/client";
import BR2JSX from "./components/BR2JSX";

const text = "первый<br>второй<br/>третий<br />последний";

const root = ReactDOM.createRoot(document.getElementById("container"));
root.render(<BR2JSX text={text} />);

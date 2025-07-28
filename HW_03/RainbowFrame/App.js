import React from "react"; // не нужен с реактом 17+ по идее
import ReactDOM from "react-dom/client";
import RainbowFrame from "./components/RainbowFrame";

const colors = ['red','orange', 'yellow','green', '#00BFFF', 'blue', 'purple'];

const root = ReactDOM.createRoot(document.getElementById("container"));
root.render(
  <RainbowFrame colors={colors}>
    <span style={{ 
        display: "inline-block",
        fontWeight: "bold", 
        fontSize: "1.2em", 
        color: "black", 
        padding: "10px 50px" }}>
      Hello!
    </span>
  </RainbowFrame>
);
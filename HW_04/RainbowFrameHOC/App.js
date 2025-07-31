import React from "react";
import ReactDOM from "react-dom/client";
import withRainbowFrame from "./components/withRainbowFrame";
import PropTypes from "prop-types";

const colors = ['red','orange', 'yellow','green', '#00BFFF', 'blue', 'purple'];

// функциональный компонент для обертки текста
const SpanComponent = (props) => <span {...props}>{props.children}</span>;
SpanComponent.propTypes = {
  children: PropTypes.node,
};

// оборачиваем SpanComponent в HOC withRainbowFrame
const RainbowSpan = withRainbowFrame(colors)(SpanComponent);

const root = ReactDOM.createRoot(document.getElementById("container"));
root.render(
  <RainbowSpan
    style={{
      display: "inline-block",
      fontWeight: "bold",
      fontSize: "1.2em",
      color: "black",
      padding: "10px 50px"
    }}
  >
    Hello!
  </RainbowSpan>
);
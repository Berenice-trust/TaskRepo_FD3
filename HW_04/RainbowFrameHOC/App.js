import React from "react";
import ReactDOM from "react-dom/client";
import withRainbowFrame from "./components/withRainbowFrame";
import PropTypes from "prop-types";
import DoubleButton from "./components/DoubleButton";

const colors = [
  "red",
  "orange",
  "yellow",
  "green",
  "#00BFFF",
  "blue",
  "purple",
];

// функциональный компонент для обертки текста
const SpanComponent = (props) => <span {...props}>{props.children}</span>;
SpanComponent.displayName = "SpanElement";
SpanComponent.propTypes = {
  children: PropTypes.node,
};

// оборачиваем SpanComponent в HOC withRainbowFrame
const RainbowSpan = withRainbowFrame(colors)(SpanComponent);
const RainbowDoubleButton = withRainbowFrame(colors)(DoubleButton);

const root = ReactDOM.createRoot(document.getElementById("container"));
root.render(
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "20px",
    }}
  >
    <RainbowSpan
      style={{
        display: "inline-block",
        fontWeight: "bold",
        fontSize: "1.2em",
        color: "black",
        padding: "10px 50px",
      }}
    >
      Hello! This is test
    </RainbowSpan>

    <DoubleButton
      style={{
        display: "inline-block",
        fontWeight: "bold",
        fontSize: "1.2em",
        color: "black",
        padding: "10px 50px",
      }}
      caption1="однажды"
      caption2="пору"
      cbPressed={(num) => alert(num)}
    >
      в студеную зимнюю
    </DoubleButton>

    <RainbowDoubleButton
      style={{
        display: "inline-block",
        fontWeight: "bold",
        fontSize: "1.2em",
        color: "black",
        padding: "10px 50px",
      }}
      caption1="я из лесу"
      caption2="мороз"
      cbPressed={(num) => alert(num)}
    >
      вышел, был сильный
    </RainbowDoubleButton>
  </div>,
);

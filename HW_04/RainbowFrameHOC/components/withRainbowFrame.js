import React from "react";
import PropTypes from "prop-types";

// функция для рамок
const wrapWithFrames = (content, colors) =>
  colors.reduce(
    (acc, color) => (
      <div
        style={{
          border: `6px solid ${color}`,
          padding: "6px",
          display: "inline-block",
        }}
      >
        {acc}
      </div>
    ),
    content,
  );

// HOF для обертки компонента с рамками
const withRainbowFrame = (colors) => (SpanComponent) => {
  const RainbowFrameHOC = (props) => {
    let content = <SpanComponent {...props}/>; // children входит в props
    return wrapWithFrames(content, colors);
  };

  // отображение для отладки в devtools
  RainbowFrameHOC.displayName = `withRainbowFrame(${SpanComponent.displayName || SpanComponent.name || "Component"})`;
  RainbowFrameHOC.propTypes = {
    children: PropTypes.node,
  };
  return RainbowFrameHOC;
};

export default withRainbowFrame;

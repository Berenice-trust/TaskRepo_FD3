import React from "react";
import PropTypes from "prop-types";

// Вспомогательная функция для рамок
function wrapWithFrames(content, colors) {
  colors.forEach(color => {
    content = (
      <div
        style={{
          border: `6px solid ${color}`,
          padding: "6px",
          display: "inline-block",
        }}
      >
        {content}
      </div>
    );
  });
  return content;
}

const withRainbowFrame = colors => WrappedComponent => {
  const RainbowFrameHOC = props => {
    let content = <WrappedComponent {...props}>{props.children}</WrappedComponent>;
    return wrapWithFrames(content, colors);
  };
  RainbowFrameHOC.displayName = `withRainbowFrame(${WrappedComponent.displayName || WrappedComponent.name || "Component"})`;
  RainbowFrameHOC.propTypes = {
    children: PropTypes.node,
  };
  return RainbowFrameHOC;
};

export default withRainbowFrame;
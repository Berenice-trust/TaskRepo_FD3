import React from "react";
import PropTypes from "prop-types";

function RainbowFrame({ colors, children }) {
  // рамки чеорез reduce
  return colors.reduce(
    (accum, color) => (
      <div style={{ 
        border: `6px solid ${color}`, 
        padding: "6px", 
        display: "inline-block" 
        }}>
            {accum}
      </div>
    ),
    children // начальное значение
  );
}

RainbowFrame.propTypes = {
  colors: PropTypes.arrayOf(PropTypes.string).isRequired,
  children: PropTypes.node, // любой дочерний элемент
};

export default RainbowFrame;
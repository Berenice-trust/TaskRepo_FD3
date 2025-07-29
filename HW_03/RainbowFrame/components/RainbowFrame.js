import React from "react";
import PropTypes from "prop-types";

class RainbowFrame extends React.Component {
  static propTypes = {
    colors: PropTypes.arrayOf(PropTypes.string).isRequired,
    children: PropTypes.node,
  };

  render() {
    const { colors, children } = this.props;
    // рамки через reduce
    const framed = colors.reduce(
      (accum, color) => (
        <div
          style={{
            border: `6px solid ${color}`,
            padding: "6px",
            display: "inline-block",
          }}
        >
          {accum}
        </div>
      ),
      children // начальное значение
    );
    return framed;
  }
}

export default RainbowFrame;
import React from "react";
import PropTypes from "prop-types";

class DoubleButton extends React.Component {
  static propTypes = {
    caption1: PropTypes.string.isRequired,
    caption2: PropTypes.string.isRequired,
    cbPressed: PropTypes.func.isRequired,
    children: PropTypes.node,
  };

  render() {
    const { caption1, caption2, cbPressed, children } = this.props;
    return (
      <div
        style={{
          padding: "10px 20px",
          fontSize: "1.2em",
          color: "black",
          fontWeight: "bold",
        }}
      >
        <input
          style={{
            margin: "5px",
            backgroundColor: "lightgreen",
            border: "1px solid black",
            borderRadius: "5px",
            padding: "5px",
            fontSize: "1em",
            color: "black",
            fontWeight: "bold",
          }}
          type="button"
          value={caption1}
          onClick={() => cbPressed(1)}
        />
        {children}
        <input
          style={{
            margin: "5px",
            backgroundColor: "lightgreen",
            border: "1px solid black",
            borderRadius: "5px",
            padding: "5px",
            fontSize: "1em",
            color: "black",
            fontWeight: "bold",
          }}
          type="button"
          value={caption2}
          onClick={() => cbPressed(2)}
        />
      </div>
    );
  }
}

export default DoubleButton;

import React from "react";
import PropTypes from "prop-types";

class BR2JSX extends React.Component {

  textToJSX(text) {
    const words = text.split(/<br\s*\/?>/);
    const result = [];
    words.forEach((word, index) => {
      result.push(word);
      if (index < words.length - 1) {
        result.push(<br key={index} />); 
      }
    });
    return result;
  }


  render() {
    return (
      <div
      // стили квадратика
        style={{
          background: "#2c3e3f",
          color: "white",
          width: "200px",
          margin: "20px auto",
          padding: "20px 0",
          textAlign: "center",
          fontSize: "2em",
        }}
      >
        {this.textToJSX(this.props.text)}
      </div>
    );
  }

  static propTypes = {
    text: PropTypes.string.isRequired,
  };
}

export default BR2JSX;

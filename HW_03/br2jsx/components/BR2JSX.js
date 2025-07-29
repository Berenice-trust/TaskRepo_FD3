import React from "react";
import PropTypes from "prop-types";

function BR2JSX({ text }) {
  // Разбиваем текст по тегам <br>, <br/> или <br />
  const parts = text.split(/<br\s*\/?>/);

  // Формируем массив элементов: текст + <br /> между ними
  const result = [];
  parts.forEach((part, idx) => {
    result.push(part);
    if (idx < parts.length - 1) {
      result.push(<br key={idx} />);
    }
  });

  return result;
}

BR2JSX.propTypes = {
  text: PropTypes.string.isRequired,
};

export default BR2JSX;
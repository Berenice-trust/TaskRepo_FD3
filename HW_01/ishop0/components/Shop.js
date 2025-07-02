import React from "react";
import PropTypes from "prop-types"; // импортируем PropTypes
import "./Shop.scss"; // импортируем SCSS

class Shop extends React.Component {
  render() {
    return (
      <div className="Shop">
        <span className="title">{this.props.name}</span>
        <p>Адрес: {this.props.address}</p>
      </div>
    );
  }
}

// добавляем валидацию props, тип и обязательность
Shop.propTypes = {
  name: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
};

export default Shop;

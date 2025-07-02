import React from "react";
import PropTypes from "prop-types"; // импортируем PropTypes для валидации
import "./Shop.scss"; 

class Shop extends React.Component {
  render() {
    return (
      <div className="Shop">
        <div className="shop-header">
          <img className="shop-logo" src={this.props.logo} alt="Логотип" />
          <div className="shop-info">
            <span className="title">{this.props.name}</span>
            <p>Адрес: {this.props.address}</p>
          </div>
        </div>
        <h3>Товары:</h3>
        <ul className="products-list">
          {this.props.products.map(product => (
            <li key={product.id}>
              {product.name} — {product.price} руб.
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

// Валидация props, тип и обязательность
Shop.propTypes = {
  name: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  logo: PropTypes.string.isRequired,
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default Shop;

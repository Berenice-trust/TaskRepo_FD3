import React from "react";
import PropTypes from "prop-types"; // импортируем PropTypes для валидации
import "./Shop.scss"; 
import Product from "./Product"; // компонент Product

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
        <table className="products-table">
          <thead>
            <tr>
              <th>Название</th>
              <th>Цена</th>
              <th>Фото</th>
              <th>Количество</th>
            </tr>
          </thead>
          <tbody>
            {this.props.products.map(product => (
              // рисует одну строку для каждого товара
              <Product
                key={product.id} // для правильного вывода списка
                name={product.name}
                price={product.price}
                photoUrl={product.photoUrl}
                count={product.count}
              />
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

// Типы props, тип и обязательность
Shop.propTypes = {
  name: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  logo: PropTypes.string.isRequired,
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      photoUrl: PropTypes.string.isRequired,
      count: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default Shop;

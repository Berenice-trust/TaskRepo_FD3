import React from "react";
import PropTypes from "prop-types"; // импортируем PropTypes для валидации
import "./Shop.scss";
import Product from "./Product"; // компонент Product

// классовый коспонент, расширяет React.Component
class Shop extends React.Component {
  // свойство
  state = {
    products: this.props.products, // копируем товары из props в state
    selectedProductId: null, // id выбранного товара, пока null
  };

  // методы
  selectProduct = (id, name) => {
    console.log(`Выбран товар - ${name} с id = ${id}`);
    this.setState({ selectedProductId: id }); //устанавливаем id в state
  };

  deleteProduct = (id, name) => {
    if (window.confirm(`Удалить товар "${name}"?`)) {
      this.setState((state) => {
        // новый массив без товала с id
        const newProducts = state.products.filter(
          (product) => product.id !== id,
        );
        // если удалён выбранный товар — снять выделение
        const selectedProductId =
          state.selectedProductId === id ? null : state.selectedProductId;

        console.log(`Удалён товар - ${name} с id = ${id}`);
        return {
          products: newProducts,
          selectedProductId,
        };
      });
    }
  };

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
            {this.state.products.map((product) => (
              //берем из стейта products
              // рисует одну строку для каждого товара
              // передаем в Product props
              <Product
                key={product.id} // для правильного вывода списка
                id={product.id}
                name={product.name}
                price={product.price}
                photoUrl={product.photoUrl}
                count={product.count}
                selectedProductId={this.state.selectedProductId}
                cbSelectProduct={this.selectProduct} // callback, вызовет продукт если будет клик
                cbDeleteProduct={this.deleteProduct} // callback удаления товара
              />
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

// Типы props, тип и обязательность
// это то, что получено от родителя App.js
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
    }),
  ).isRequired,
};

export default Shop;

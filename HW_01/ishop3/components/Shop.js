// компонент магазина, главный компонент

import React from "react";
import PropTypes from "prop-types"; // PropTypes для валидации
import "./Shop.scss";
import Product from "./Product";
import ProductCard from "./ProductCard";
import { validateField, validateProduct } from "./validateProduct";

class Shop extends React.Component {
  // стейты
  state = {
    products: this.props.products, // копируем товары из props в state
    selectedProductId: null, // id выбранного товара, пока null
    // для редактирования и добавления
    isEditing: false,
    editingProduct: null, // товар для редактирования, объект
    isAdding: false,
    isFormDirty: false,
    formErrors: {}, // ошибоки формы
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
          products: newProducts, // обновляем список товаров
          selectedProductId,
        };
      });
    }
  };

  editProduct = (id, name) => {
    console.log(`Редактировать товар - ${name} с id = ${id}`);
    const product = this.state.products.find((p) => p.id === id);
    this.setState({
      isEditing: true,
      editingProduct: { ...product },
      selectedProductId: id,
      isFormDirty: false, // флаг - форма не была изменена
    });
  };

  // обработчики изменений в форме редактирования, обновляет форму редактирования
  handleEditChange = (field, value) => {
    const errors = { ...this.state.formErrors }; // копируем ошибки из стейта

    // Валидация, функция из validateProduct.js
    const error = validateField(field, value); // если значение некорректно вернет текст ошибки
    if (error) {
      errors[field] = error;
    } else {
      delete errors[field];
    }

    this.setState((state) => ({
      // копируем все поля товара и заменяем поле field
      editingProduct: { ...state.editingProduct, [field]: value },
      isFormDirty: true,
      formErrors: errors,
    }));
  };

  // охраняет изменения  в форме редактирования, нажатие Сохранить
  handleEditSave = () => {
    // Валидация
    const errors = validateProduct(this.state.editingProduct);

    if (Object.keys(errors).length > 0) {
      this.setState({ formErrors: errors, isFormDirty: true });
      return;
    }

    // сохранение

    const updatedProducts = this.state.products.map((p) =>
      p.id === this.state.editingProduct.id ? this.state.editingProduct : p,
    );
    this.setState({
      products: updatedProducts,
      isEditing: false,
      editingProduct: null,
      isFormDirty: false,
      formErrors: {},
    });
  };

  // отмена редактирования, нажатие Отмена
  handleEditCancel = () => {
    this.setState({
      isEditing: false,
      editingProduct: null,
      isFormDirty: false,
    });
  };

  // добавление нового товара
  handleAddProduct = () => {
    this.setState({
      isAdding: true,
      isEditing: false,
      editingProduct: { name: "", price: "", count: "", photoUrl: "" },
      selectedProductId: null,
      isFormDirty: false,
      formErrors: {},
    });
  };

  // сохранение нового товара, нажатие Сохранить
  handleAddSave = () => {
    const { editingProduct, products } = this.state;

    // Проверка всех обязательных полей
    const errors = validateProduct(editingProduct);

    // Если есть ошибки — не сохранять, показать ошибки
    if (Object.keys(errors).length > 0) {
      this.setState({ formErrors: errors, isFormDirty: true });
      return;
    }

    const newId =
      products.length > 0 ? Math.max(...products.map((p) => p.id)) + 1 : 1;
    const newProduct = { ...editingProduct, id: newId };

    this.setState((state) => ({
      products: [...state.products, newProduct],
      isAdding: false,
      editingProduct: null,
      isFormDirty: false,
      selectedProductId: newId, // выделяем новый товар
      formErrors: {},
    }));
  };

  handleAddCancel = () => {
    this.setState({
      isAdding: false,
      editingProduct: null,
      isFormDirty: false,
      formErrors: {},
    });
  };

  render() {
    const selectedProduct = this.state.products.find(
      (p) => p.id === this.state.selectedProductId,
    );

    // нужно ли блокировать кнопки
    const disableActions =
      this.state.isEditing || this.state.isAdding || this.state.isFormDirty;

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
                disabled={disableActions}
                cbSelectProduct={this.selectProduct} // callback, вызовет продукт если будет клик
                cbEditProduct={this.editProduct}
                cbDeleteProduct={this.deleteProduct} // callback удаления товара
              />
            ))}
          </tbody>
        </table>
        <div>
          <button
            className="add-btn"
            disabled={disableActions}
            onClick={this.handleAddProduct}
          >
            Добавить продукт
          </button>

          <ProductCard
            product={
              this.state.isAdding ? this.state.editingProduct : selectedProduct
            }
            isEditing={this.state.isEditing}
            isAdding={this.state.isAdding}
            editingProduct={this.state.editingProduct}
            onChange={this.handleEditChange}
            onSave={
              this.state.isAdding ? this.handleAddSave : this.handleEditSave
            }
            onCancel={
              this.state.isAdding ? this.handleAddCancel : this.handleEditCancel
            }
            formErrors={this.state.formErrors}
          />
        </div>
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

import React from "react";
import PropTypes from "prop-types";

class ProductCard extends React.Component {
  render() {
    const {
      product,
      isEditing,
      isAdding,
      editingProduct,
      onChange,
      onSave,
      onCancel,
      formErrors,
    } = this.props;

    if (!product) return null; // если нет товара, ничего не показываем
    // форма при редактировании
    if ((isEditing || isAdding) && editingProduct) {
      return (
        <form className="product-card edit-form">
          <h4>{isAdding ? "Добавление товара" : "Редактирование товара"}</h4>
          <div className="form-group">
            <label htmlFor="name">Название:</label>
            <input
              id="name"
              type="text"
              value={editingProduct.name}
              onChange={(e) => onChange("name", e.target.value)}
            />
            {formErrors?.name && (
              <span className="field-error">{formErrors.name}</span>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="price">Цена:</label>
            <input
              id="price"
              type="text"
              value={editingProduct.price}
              onChange={(e) => onChange("price", e.target.value)}
            />
            {formErrors?.price && (
              <span className="field-error">{formErrors.price}</span>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="count">Количество:</label>
            <input
              id="count"
              type="text"
              value={editingProduct.count}
              onChange={(e) => onChange("count", e.target.value)}
            />
            {formErrors?.count && (
              <span className="field-error">{formErrors.count}</span>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="photoUrl">Фото:</label>
            <input
              id="photoUrl"
              type="text"
              value={editingProduct.photoUrl}
              onChange={(e) => onChange("photoUrl", e.target.value)}
            />
            {formErrors?.photoUrl && (
              <span className="field-error">{formErrors.photoUrl}</span>
            )}
          </div>
          <div className="action-buttons">
            <button
              type="button"
              className="edit-btn"
              onClick={onSave}
              disabled={Object.keys(formErrors).length > 0}
            >
              Сохранить
            </button>
            <button type="button" className="cancel-btn" onClick={onCancel}>
              Отмена
            </button>
          </div>
        </form>
      );
    }

    // форма при просмотре
    return (
      <div className="product-card">
        <h4>Карточка товара</h4>
        <p>
          <b>Название:</b> {product.name}
        </p>
        <p>
          <b>Цена:</b> {product.price}
        </p>
        <p>
          <b>Количество:</b> {product.count}
        </p>
        {product.photoUrl ? (
          <img
            src={product.photoUrl}
            alt={product.name}
            style={{ maxWidth: "100px" }}
          />
        ) : (
          <span className="no-photo">Нет фото</span>
        )}
      </div>
    );
  }
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    count: PropTypes.number.isRequired,
    photoUrl: PropTypes.string.isRequired,
  }),
  isEditing: PropTypes.bool,
  isAdding: PropTypes.bool,
  editingProduct: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    count: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    photoUrl: PropTypes.string,
  }),
  onChange: PropTypes.func,
  onSave: PropTypes.func,
  onCancel: PropTypes.func,
  formErrors: PropTypes.object,
};

export default ProductCard;

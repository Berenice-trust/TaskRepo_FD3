import React from "react"; //  по идее эта строчка и не нужна
import PropTypes from "prop-types";

function Product({
  name,
  price,
  photoUrl,
  count,
  id,
  selectedProductId,
  cbSelectProduct,
  cbDeleteProduct,
}) {
  return (
    <tr
      className={selectedProductId === id ? "selected" : ""}
      onClick={() => cbSelectProduct(id, name)} // вызывается при клике на строку
    >
      <td>{name}</td>
      <td>{price} руб.</td>
      <td>
        <img src={photoUrl} alt={name} />
      </td>
      <td>{count}</td>
      <td>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation(); // отмена всплытия клика, чтобы не выделялась строка
            cbDeleteProduct(id, name); // callback удаления товара
          }}
        >
          Удалить
        </button>
      </td>
    </tr>
  );
}

Product.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  photoUrl: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
  selectedProductId: PropTypes.number, // может быть null
  cbSelectProduct: PropTypes.func.isRequired,
  cbDeleteProduct: PropTypes.func.isRequired, // функция удаления товара
};

export default Product;

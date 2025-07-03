import React from "react";
import PropTypes from "prop-types";

function Product({ name, price, photoUrl, count }) {
    return (
    <tr>
      <td>{name}</td>
      <td>{price} руб.</td>
      <td>
        <img src={photoUrl} alt={name} />
      </td>
      <td>{count}</td>
    </tr>
  );
};

Product.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  photoUrl: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
};

export default Product;

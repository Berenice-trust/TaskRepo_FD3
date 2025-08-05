import React from "react"; 
import PropTypes from "prop-types";
import "./Filter.scss";

function Controls({
  isSorted,
  filterText,
  handleCheckboxChange,     
  handleInputChange,
    handleReset,
}) {
    return (

<div className="filter-controls">
          <input
            className="filter-checkbox"
            type="checkbox"
            checked={isSorted}
            onChange={handleCheckboxChange}
          />

          <input
            type="text"
            value={filterText}
            onChange={handleInputChange}
            placeholder="Введите слово для фильтрации"
          />

          <button
            className="filter-reset"
            type="button"
            onClick={handleReset}
          >
            Сброс
          </button>
        </div>
    );
}

Controls.propTypes = {
  isSorted: PropTypes.bool.isRequired,
  filterText: PropTypes.string.isRequired,
  onSortChange: PropTypes.func.isRequired,
  onFilterChange: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired,
};

export default Controls;


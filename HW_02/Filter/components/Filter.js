import React from "react";
import PropTypes from "prop-types"; // импортируем PropTypes для валидации
import "./Filter.scss";

// классовый коспонент, расширяет React.Component
class Filter extends React.Component {
  // свойства
  state = {
    filterText: "", // начальный текст
    isSorted: false, // начальное - не отсортирован
  };

  handleCheckboxChange = (e) => {
    this.setState({ isSorted: e.target.checked }); // true если выделен
  };

  handleInputChange = (e) => {
    this.setState({ filterText: e.target.value }); // то что введено
  };

  handleReset = () => {
    this.setState({ filterText: "", isSorted: false });
  };

  render() {
    //получаем массив слов из props
    const { words } = this.props;
    const { filterText } = this.state;
    const { isSorted } = this.state;

    //приводит к нижнему регистру и фильтрует по введенному слову
    let displayedWords = words.filter((word) =>
      word.toLowerCase().includes(filterText.toLowerCase()),
    );
    // сортируем, если чекбокс отмечен
    if (isSorted) {
      displayedWords = [...displayedWords].sort(); // сортируем по умолчанию по алфавиту
    }

    return (
      <div className="Filter">
        <h2 className="filter-title">Сортировка и фильтрация слов</h2>

        <div className="filter-controls">
          <input
            className="filter-checkbox"
            type="checkbox"
            checked={isSorted}
            onChange={this.handleCheckboxChange}
          />

          <input
            type="text"
            value={filterText}
            onChange={this.handleInputChange}
            placeholder="Введите слово для фильтрации"
          />

          <button
            className="filter-reset"
            type="button"
            onClick={this.handleReset}
          >
            Сброс
          </button>
        </div>

        <div className="words-list">
          {displayedWords.map((word) => (
            <div className="word-item" key={word}>
              {word}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

// Типы props, тип и обязательность
// это то, что получено от родителя App.js
Filter.propTypes = {
  words: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Filter;

import React from "react";
import PropTypes from "prop-types"; // импортируем PropTypes для валидации
import "./Filter.scss";

// классовый коспонент, расширяет React.Component
class Filter extends React.Component {
  // свойства
  state = {
    filterText: "", // начальный текст
    isSorted: false, // начальное - не отсортирован
    displayedWords: this.props.words, // массив слов для отображения
  };

  handleCheckboxChange = (e) => {
    const isSorted = e.target.checked; // получаем состояние чекбокса
    this.setState(
      { isSorted },
      // функция выполнится после обновления state
      () => this.updateDisplayedWords(this.state.filterText, isSorted),
    );
  };

  handleInputChange = (e) => {
    const filterText = e.target.value; // получаем текст из инпута
    this.setState({ filterText }, () =>
      this.updateDisplayedWords(filterText, this.state.isSorted),
    );
  };

  handleReset = () => {
    this.setState({ filterText: "", isSorted: false }, () =>
      this.updateDisplayedWords("", false),
    ); // сбрасываем фильтр и сортировку
  };

  // метод для сортировки и фильтрации слов
  updateDisplayedWords = (filterText, isSorted) => {
    //приводит к нижнему регистру и фильтрует по введенному слову
    let displayedWords = this.props.words.filter((word) =>
      word.toLowerCase().includes(filterText.toLowerCase()),
    );
    // сортируем, если чекбокс отмечен
    if (isSorted) {
      displayedWords = [...displayedWords].sort(); // сортируем по умолчанию по алфавиту
    }
    this.setState({ displayedWords }); // обновляем состояние
  };

  render() {
    //получаем массив слов из state
    const { filterText, isSorted, displayedWords } = this.state;

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

import React, { useState } from "react";
import PropTypes from "prop-types"; // импортируем PropTypes для валидации
import "./Filter.scss";
import List from "./List"; // импортируем List для отображения списка слов
import Controls from "./Controls"; // импортируем Controls для управления фильтрацией и сортировкой

// функциональный коспонент
const Filter = ({ words }) => {
  // состояние
  const [filterText, setFilterText] = useState(""); // начальный текст
  const [isSorted, setIsSorted] = useState(false); // начальное - не отсортирован
  


  // обработчики событий
  const handleCheckboxChange = (isSorted) => setIsSorted(isSorted);

  const handleInputChange = (filterText) => setFilterText(filterText);

  const handleReset = () => {
    setFilterText(""); // сбрасываем текст фильтра
    setIsSorted(false); // сбрасываем сортировку
  };




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

        <Controls
          isSorted={isSorted}
          filterText={filterText}
          handleCheckboxChange={handleCheckboxChange}
          handleInputChange={handleInputChange}
          handleReset={handleReset}
        />
        {/* отфильтрованные слова: */}
        <List words={displayedWords} /> 
       
      </div>
    );
  }


// Типы props, тип и обязательность
// это то, что получено от родителя App.js
Filter.propTypes = {
  words: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Filter;

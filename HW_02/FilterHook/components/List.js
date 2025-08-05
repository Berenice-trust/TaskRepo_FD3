import React from "react"; 
import PropTypes from "prop-types";
import "./Filter.scss";
 
function List ({words}) {
    return (
        <div className="words-list">
          {words.map((word) => (
            <div className="word-item" key={word}>
              {word}
            </div>
          ))}
        </div>
    );
} 

List.propTypes = {
  words: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default List;

 
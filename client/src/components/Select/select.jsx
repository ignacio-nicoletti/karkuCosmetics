import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretUp, faCaretDown } from "@fortawesome/free-solid-svg-icons";
import "./select.css";

const RenderSelect = ({
  categories,
  selectedCategory,
  setSelectedCategory,
  isPrimary,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [subCategories, setSubCategories] = useState([]);

  useEffect(() => {
    setSubCategories(isPrimary ? categories.primary : categories.secondary);
  }, [isPrimary, categories]);

  const handleOptionSelect = (category) => {
    const updatedCategory = isPrimary
      ? { primary: category, secondary: selectedCategory.secondary }
      : { primary: selectedCategory.primary, secondary: category };

    setSelectedCategory(updatedCategory);
    setIsOpen(false);
  };

  const toggleSelect = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className={`custom-select ${isOpen ? "open" : ""}`}
      onClick={toggleSelect}
    >
      <div className="selected-option">
        <span>
          {isPrimary ? selectedCategory.primary : selectedCategory.secondary}
        </span>
        <FontAwesomeIcon
          icon={isOpen ? faCaretUp : faCaretDown}
          className="arrow"
        />
      </div>
      {isOpen && (
        <div className="options">
          <div className="options-container">
            {subCategories.map((category, index) => (
              <div
                key={index}
                className={`option ${
                  category ===
                  (isPrimary
                    ? selectedCategory.primary
                    : selectedCategory.secondary)
                    ? "selected"
                    : ""
                }`}
                onClick={() => handleOptionSelect(category)}
              >
                {category}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default RenderSelect;

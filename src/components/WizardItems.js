// components/WizardItems.js

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { items } from '../data/items';

const formatDescription = (description) => {
  return description.replace(/(\n[+-]?\d:)/g, '<br />$1');
};

const WizardItems = ({ wizard, setWizard }) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Wizard:", wizard);
    console.log("Selected Items:", selectedItems);
  }, [wizard, selectedItems]);

  const handleItemSelection = (item) => {
    setSelectedItems((prev) => {
      if (prev.includes(item)) {
        return prev.filter((i) => i !== item);
      } else if (prev.length < 3) {
        return [...prev, item];
      }
      return prev;
    });
  };

  const handleNext = () => {
    setWizard({
      ...wizard,
      items: selectedItems,
    });
    navigate('/export'); // Navigate to the export step
  };

  return (
    <div className="container">
      <h2>Select Items</h2>
      <div>
        {items.map((item) => (
          <div
            className={`spell-button ${selectedItems.includes(item) ? "selected" : ""}`}
            key={item.name}
            onClick={() => handleItemSelection(item)}
          >
            <input
              type="checkbox"
              checked={selectedItems.includes(item)}
              readOnly
              style={{ display: "none" }} // Hide the checkbox visually
            />
            <label>{item.name}</label>
            <div className="tooltip-text" dangerouslySetInnerHTML={{ __html: formatDescription(item.description) }}></div>
          </div>
        ))}
      </div>
      <button onClick={handleNext} disabled={selectedItems.length !== 3}>Next</button>
    </div>
  );
};

export default WizardItems;

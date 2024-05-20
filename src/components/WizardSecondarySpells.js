import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { schools } from '../data/spells';

const formatDescription = (description) => {
  return description.replace(/(\n[+-]?\d:)/g, '<br />$1');
};

const WizardSecondarySpells = ({ wizard, setWizard }) => {
  const [selectedSchool, setSelectedSchool] = useState('');
  const [selectedSpells, setSelectedSpells] = useState({
    spell1: '',
    spell2: '',
    spell1Type: '',
    spell2Type: '',
  });

  const navigate = useNavigate();

  useEffect(() => {
    console.log("Wizard:", wizard);
    console.log("Selected School:", selectedSchool);
    console.log("Selected Spells:", selectedSpells);
  }, [wizard, selectedSchool, selectedSpells]);

  const handleSchoolChange = (school) => {
    setSelectedSchool(school);
    setSelectedSpells({
      spell1: '',
      spell2: '',
      spell1Type: '',
      spell2Type: '',
    });
  };

  const handleSpellSelection = (spell, type) => {
    setSelectedSpells((prev) => {
      if (prev.spell1 === spell) {
        return { ...prev, spell1: '', spell1Type: '' };
      } else if (prev.spell2 === spell) {
        return { ...prev, spell2: '', spell2Type: '' };
      } else if (!prev.spell1 && prev.spell2Type !== type) {
        return { ...prev, spell1: spell, spell1Type: type };
      } else if (!prev.spell2 && prev.spell1Type !== type) {
        return { ...prev, spell2: spell, spell2Type: type };
      } else {
        return prev;
      }
    });
  };

  const handleNext = () => {
    setWizard({
      ...wizard,
      secondarySchool: selectedSchool,
      secondarySpells: [selectedSpells.spell1, selectedSpells.spell2],
    });
    navigate('/items'); // Navigate to the export step
  };

  const selectedSchoolData = schools.find((school) => school.name === selectedSchool);

  return (
    <div className="container">
      <h2>Select Secondary School and Spells</h2>
      <div className="input-group">
        <label>Secondary School: </label>
        <select value={selectedSchool} onChange={(e) => handleSchoolChange(e.target.value)}>
          <option value="">Select a school</option>
          {schools.filter(school => school.name !== wizard.primarySchool).map((school) => (
            <option key={school.name} value={school.name}>{school.name}</option>
          ))}
        </select>
      </div>
      {selectedSchoolData && (
        <div>
          <h3>Universal Spells</h3>
          {Object.keys(selectedSchoolData.universal).map((category) => (
            <div key={category}>
              <h4>{category}</h4>
              {selectedSchoolData.universal[category].map((spell) => (
                <div className={`spell-button ${selectedSpells.spell1 === spell || selectedSpells.spell2 === spell ? "selected" : ""}`} key={spell.name} onClick={() => handleSpellSelection(spell, category)}>
                  <input
                    type="checkbox"
                    checked={selectedSpells.spell1 === spell || selectedSpells.spell2 === spell}
                    readOnly
                    style={{ display: "none" }} // Hide the checkbox visually
                  />
                  <label>{spell.name}</label>
                  <div className="tooltip-text" dangerouslySetInnerHTML={{ __html: formatDescription(spell.description) }}></div>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
      <button onClick={handleNext} disabled={!selectedSchool || !selectedSpells.spell1 || !selectedSpells.spell2}>Next</button>
    </div>
  );
};

export default WizardSecondarySpells;

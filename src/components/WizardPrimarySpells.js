import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { schools } from '../data/spells';

const formatDescription = (description) => {
  return description.replace(/(\n[+-]?\d:)/g, '<br />$1');
};

const WizardPrimarySpells = ({ wizard, setWizard }) => {
  const [selectedSchool, setSelectedSchool] = useState('');
  const [selectedSpecialization, setSelectedSpecialization] = useState('');
  const [selectedSpells, setSelectedSpells] = useState({
    specialized: [],
    universal: {
      attack: '',
      defense: '',
      boons: '',
      banes: '',
      summoning: [],
    },
  });

  const navigate = useNavigate();

  useEffect(() => {
    console.log("Wizard:", wizard);
    console.log("Selected School:", selectedSchool);
    console.log("Selected Specialization:", selectedSpecialization);
    console.log("Selected Spells:", selectedSpells);
  }, [wizard, selectedSchool, selectedSpecialization, selectedSpells]);

  const handleSchoolChange = (school) => {
    setSelectedSchool(school);
    setSelectedSpecialization('');
    setSelectedSpells({
      specialized: [],
      universal: {
        attack: '',
        defense: '',
        boons: '',
        banes: '',
        summoning: [],
      },
    });
  };

  const handleSpecializationChange = (specialization) => {
    setSelectedSpecialization(specialization);
    setSelectedSpells((prev) => ({
      ...prev,
      specialized: [],
    }));
  };

  const handleSpellSelection = (type, category, spell) => {
    setSelectedSpells((prev) => {
      if (type === 'specialized') {
        const specialized = prev.specialized.includes(spell)
          ? prev.specialized.filter((s) => s !== spell)
          : [...prev.specialized, spell];
        return { ...prev, specialized: specialized.slice(0, 2) };
      } else if (type === 'universal') {
        if (category === 'summoning') {
          const summoning = prev.universal.summoning.includes(spell)
            ? prev.universal.summoning.filter((s) => s !== spell)
            : [...prev.universal.summoning, spell];
          return { ...prev, universal: { ...prev.universal, summoning: summoning.slice(0, 2) } };
        } else {
          return { ...prev, universal: { ...prev.universal, [category]: prev.universal[category] === spell ? '' : spell } };
        }
      }
      return prev;
    });
  };

  const handleNext = () => {
    setWizard({
      ...wizard,
      primarySchool: selectedSchool,
      primarySpecialization: selectedSpecialization,
      primarySpells: selectedSpells,
    });
    navigate('/secondary-spells'); // Navigate to the secondary spells selection step
  };

  const selectedSchoolData = schools.find((school) => school.name === selectedSchool);

  const allSpellsSelected = () => {
    return (
      selectedSpells.specialized.length === 2 &&
      selectedSpells.universal.attack !== '' &&
      selectedSpells.universal.defense !== '' &&
      selectedSpells.universal.boons !== '' &&
      selectedSpells.universal.banes !== '' &&
      selectedSpells.universal.summoning.length === 2
    );
  };

  return (
    <div className="container">
      <h2>Select Primary School and Spells</h2>
      <div className="input-group">
        <label>Primary School: </label>
        <select value={selectedSchool} onChange={(e) => handleSchoolChange(e.target.value)}>
          <option value="">Select a school</option>
          {schools.map((school) => (
            <option key={school.name} value={school.name}>{school.name}</option>
          ))}
        </select>
      </div>
      {selectedSchoolData && selectedSchoolData.hasSpecializations && (
        <div className="input-group">
          <label>Specialization: </label>
          <select value={selectedSpecialization} onChange={(e) => handleSpecializationChange(e.target.value)}>
            <option value="">Select a specialization</option>
            {Object.keys(selectedSchoolData.specialized).map((specialization) => (
              <option key={specialization} value={specialization}>{specialization}</option>
            ))}
          </select>
        </div>
      )}
      {selectedSchoolData && (
        <div>
          <h3>Specialized Spells</h3>
          <div className="spell-button-container">
            {selectedSchoolData.hasSpecializations ? (
              selectedSpecialization && selectedSchoolData.specialized[selectedSpecialization] && (
                selectedSchoolData.specialized[selectedSpecialization].map((spell) => (
                  <div className={`spell-button ${selectedSpells.specialized.includes(spell) ? "selected" : ""}`} key={spell.name} onClick={() => handleSpellSelection('specialized', null, spell)}>
                    <input
                      type="checkbox"
                      checked={selectedSpells.specialized.includes(spell)}
                      readOnly
                      style={{ display: "none" }} // Hide the checkbox visually
                    />
                    <label>{spell.name}</label>
                    <div className="tooltip-text" dangerouslySetInnerHTML={{ __html: formatDescription(spell.description) }}></div>
                  </div>
                ))
              )
            ) : (
              Object.keys(selectedSchoolData.specialized).map((category) => (
                selectedSchoolData.specialized[category].map((spell) => (
                  <div className={`spell-button ${selectedSpells.specialized.includes(spell) ? "selected" : ""}`} key={spell.name} onClick={() => handleSpellSelection('specialized', null, spell)}>
                    <input
                      type="checkbox"
                      checked={selectedSpells.specialized.includes(spell)}
                      readOnly
                      style={{ display: "none" }} // Hide the checkbox visually
                    />
                    <label>{spell.name}</label>
                    <div className="tooltip-text" dangerouslySetInnerHTML={{ __html: formatDescription(spell.description) }}></div>
                  </div>
                ))
              ))
            )}
          </div>
          <h3>Universal Spells</h3>
          <div className="spell-button-container">
            {Object.keys(selectedSchoolData.universal).map((category) => (
              <div key={category}>
                <h4>{category}</h4>
                {selectedSchoolData.universal[category].map((spell) => (
                  <div className={`spell-button ${category === 'summoning' ? selectedSpells.universal.summoning.includes(spell) ? "selected" : "" : selectedSpells.universal[category] === spell ? "selected" : ""}`} key={spell.name} onClick={() => handleSpellSelection('universal', category, spell)}>
                    <input
                      type="checkbox"
                      checked={category === 'summoning' ? selectedSpells.universal.summoning.includes(spell) : selectedSpells.universal[category] === spell}
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
        </div>
      )}
      <button onClick={handleNext} disabled={!selectedSchool || (selectedSchoolData && selectedSchoolData.hasSpecializations && !selectedSpecialization) || !allSpellsSelected()}>Next</button>
    </div>
  );
};

export default WizardPrimarySpells;

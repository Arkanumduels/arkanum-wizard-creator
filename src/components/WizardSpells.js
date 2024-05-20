import React from 'react';
import { useNavigate } from 'react-router-dom';

const WizardSpells = ({ wizard, setWizard }) => {
  const navigate = useNavigate();

  const handleNext = () => {
    // Save spells to wizard object here
    navigate('/export'); // Proceed to the export step
  };

  return (
    <div>
      <h2>Select Spells</h2>
      {/* Spell selection logic here */}
      <button onClick={handleNext}>Next</button>
    </div>
  );
};

export default WizardSpells;

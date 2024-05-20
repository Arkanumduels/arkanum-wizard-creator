import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const WizardName = ({ wizard, setWizard }) => {
  const [name, setName] = useState(wizard.name || '');
  const navigate = useNavigate();

  const handleNext = () => {
    setWizard({ ...wizard, name });
    navigate('/characteristics');
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleNext();
    }
  };

  return (
    <div className="container">
      <h2>Enter your Wizard's name</h2>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        onKeyPress={handleKeyPress}
        autoFocus
        placeholder="Type your wizard's name"
      />
      <div>
        <button onClick={handleNext}>Next</button>
      </div>
    </div>
  );
};

export default WizardName;

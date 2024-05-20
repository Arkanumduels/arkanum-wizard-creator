// App.js

import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import WizardName from './components/WizardName';
import WizardCharacteristics from './components/WizardCharacteristics';
import WizardPrimarySpells from './components/WizardPrimarySpells';
import WizardSecondarySpells from './components/WizardSecondarySpells';
import WizardItems from './components/WizardItems';
import ExportWizard from './components/ExportWizard';
import './styles.css';

const App = () => {
  const [wizard, setWizard] = useState({
    name: '',
    characteristics: {
      levity: 8,
      vitality: 2,
      warding: 0,
    },
    primarySchool: '',
    primarySpecialization: '',
    primarySpells: {
      specialized: [],
      universal: {
        attack: [],
        defense: [],
        boons: [],
        banes: [],
        summoning: [],
      },
    },
    secondarySchool: '',
    secondarySpells: [],
    items: [], // Add items to the wizard state
  });

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<WizardName wizard={wizard} setWizard={setWizard} />} />
          <Route path="/characteristics" element={<WizardCharacteristics wizard={wizard} setWizard={setWizard} />} />
          <Route path="/primary-spells" element={<WizardPrimarySpells wizard={wizard} setWizard={setWizard} />} />
          <Route path="/secondary-spells" element={<WizardSecondarySpells wizard={wizard} setWizard={setWizard} />} />
          <Route path="/items" element={<WizardItems wizard={wizard} setWizard={setWizard} />} /> {/* Add the new route */}
          <Route path="/export" element={<ExportWizard wizard={wizard} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

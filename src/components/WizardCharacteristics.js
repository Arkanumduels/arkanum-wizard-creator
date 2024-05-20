import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const WizardCharacteristics = ({ wizard, setWizard }) => {
  const [levity, setLevity] = useState(wizard.characteristics.levity);
  const [vitality, setVitality] = useState(wizard.characteristics.vitality);
  const [warding, setWarding] = useState(wizard.characteristics.warding);
  const [points, setPoints] = useState(10);

  useEffect(() => {
    const totalPoints = (levity / 8 - 1) + (vitality / 2 - 1) + warding * 2;
    setPoints(10 - totalPoints);
  }, [levity, vitality, warding]);

  const navigate = useNavigate();

  const handleNext = () => {
    if (points < 0) return;

    setWizard({
      ...wizard,
      characteristics: {
        levity,
        vitality,
        warding,
      },
    });
    navigate('/primary-spells'); // Ensure this matches the route in App.js
  };

  const handleLevityChange = (increment) => {
    if (increment === 8 && (points - 1) >= 0) {
      setLevity(levity + increment);
      setPoints(points - 1);
    } else if (increment === -8 && levity > 8) {
      setLevity(levity + increment);
      setPoints(points + 1);
    }
  };

  const handleVitalityChange = (increment) => {
    if (increment === 2 && (points - 1) >= 0) {
      setVitality(vitality + increment);
      setPoints(points - 1);
    } else if (increment === -2 && vitality > 2) {
      setVitality(vitality + increment);
      setPoints(points + 1);
    }
  };

  const handleWardingChange = (increment) => {
    if (increment === 1 && (points - 2) >= 0) {
      setWarding(warding + increment);
      setPoints(points - 2);
    } else if (increment === -1 && warding > 0) {
      setWarding(warding + increment);
      setPoints(points + 2);
    }
  };

  return (
    <div className="container">
      <h2>Allocate Points to Your Wizard's Characteristics</h2>
      <div className="points-remaining">
        Points remaining: {points}
      </div>
      <div className="characteristics-group">
        <label>Levity (1 point per 8 cm): </label>
        <button className="char-button" onClick={() => handleLevityChange(-8)} disabled={levity <= 8}>-</button>
        <span>{levity} cm</span>
        <button className="char-button" onClick={() => handleLevityChange(8)} disabled={points < 1}>+</button>
      </div>
      <div className="characteristics-group">
        <label>Vitality (1 point per 2 Vitality): </label>
        <button className="char-button" onClick={() => handleVitalityChange(-2)} disabled={vitality <= 2}>-</button>
        <span>{vitality}</span>
        <button className="char-button" onClick={() => handleVitalityChange(2)} disabled={points < 1}>+</button>
      </div>
      <div className="characteristics-group">
        <label>Warding (2 points per 1 Warding): </label>
        <button className="char-button" onClick={() => handleWardingChange(-1)} disabled={warding <= 0}>-</button>
        <span>{warding}</span>
        <button className="char-button" onClick={() => handleWardingChange(1)} disabled={points < 2}>+</button>
      </div>
      <button onClick={handleNext} disabled={points < 0}>Next</button>
    </div>
  );
};

export default WizardCharacteristics;

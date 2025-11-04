import React, { useState } from "react";
import logoWide from "../Images/jepco.png";
import "./Header.css";

const Header: React.FC = () => {
  const [isSpinning, setIsSpinning] = useState(true);

  const toggleSpin = () => setIsSpinning((s) => !s);
  const resetSpin = () => {
    setIsSpinning(false);
    setTimeout(() => setIsSpinning(true), 50);
  };

  return (
    <div className="header-container">
      <div
        className={`logo-wrap ${isSpinning ? "spin" : "paused"}`}
        role="img"
        aria-label="Company Logo"
      >
        <img src={logoWide} alt="Company Logo" className="logo-img" />
      </div>

      <div className="logo-controls">
        <button
          type="button"
          className="logo-control-btn"
          onClick={toggleSpin}
          aria-pressed={!isSpinning}
        >
          {isSpinning ? "Pause" : "Play"}
        </button>
        <button
          type="button"
          className="logo-control-btn"
          onClick={resetSpin}
          aria-label="Reset animation"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default Header;

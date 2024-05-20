import { useState } from "react";
import helpIcon from "../assets/icons/question-mark.svg";
import "../styles/Help.css";

export default function Help() {
  const [showHelp, setShowHelp] = useState(false);

  function handleClick() {
    setShowHelp(!showHelp);
  }

  return (
    <footer className="help-container">
      <div className={`help-message ${showHelp ? "show" : ""}`}>
        Don't click on the same card twice!
      </div>
      <div className="help-icon">
        <button className="help-btn" onClick={handleClick}>
          <img src={helpIcon} alt="Help icon" />
        </button>
      </div>
    </footer>
  );
}

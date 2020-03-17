import React from "react";
import PropTypes from "prop-types";

const RESET_BTN_TEXT = "Reset word";

export default function WordInput({
  inputValue,
  handleInputChange,
  handleInputReset
}) {
  return (
    <div>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        className="word-input"
        data-testid="word-input"
        placeholder="Type a word to start"
      />
      {inputValue && (
        <button onClick={handleInputReset} className="word-reset">
          {RESET_BTN_TEXT}
        </button>
      )}
    </div>
  );
}

WordInput.propTypes = {
  inputValue: PropTypes.string,
  handleInputChange: PropTypes.func
};

WordInput.defaultProps = {
  inputValue: "",
  handleInputChange: () => {}
};

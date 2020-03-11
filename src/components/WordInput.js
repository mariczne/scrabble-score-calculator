import React from "react";
import PropTypes from "prop-types";

export default function WordInput({
  inputValue,
  handleInputChange,
  handleInputReset
}) {
  function renderInputReset() {
    if (inputValue) {
      return (
        <button onClick={handleInputReset} className="word-reset">
          Reset word
        </button>
      );
    }
    return null;
  }

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
      {renderInputReset()}
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

import React from "react";

export default function WordInput({ inputValue, handleInputChange }) {
  return (
    <input
      type="search"
      value={inputValue}
      onChange={handleInputChange}
      className="word-input"
      data-testid="word-input"
      placeholder="Type a word to start"
    />
  );
}

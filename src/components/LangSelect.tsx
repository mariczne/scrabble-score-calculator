import React, { useContext } from "react";
import { WordContext } from "../context/wordContext";
import { getSupportedLanguages } from "../modules/calculator";
import { changeLanguage } from "../actions/wordActions";
import styled from "styled-components";

const languages = getSupportedLanguages();

export default function LangSelect() {
  const {
    wordReducer: [state, dispatch],
  } = useContext(WordContext);

  return (
    <>
      Language:
      <Select
        value={state.language}
        onChange={(e) => dispatch(changeLanguage(e.target.value))}
        data-testid="lang-select"
      >
        {languages.map(({ languageCode, displayName }) => (
          <option key={languageCode} value={languageCode}>
            {displayName}
          </option>
        ))}
      </Select>
    </>
  );
}

const Select = styled.select`
  font-size: 1rem;
  padding: 0.25rem;
  margin-left: 0.5rem;
  border: 1px solid black;
  border-radius: 0.25em;
  background-color: white;

  &:focus {
    outline: none;
    border: 2px solid blue;
  }
`;

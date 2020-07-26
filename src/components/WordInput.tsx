import React, { useContext } from "react";
import { WordContext } from "../context/wordContext";
import { setInput } from "../actions/wordActions";
import styled from "styled-components";

const Input = styled.input`
  display: block;
  font-size: 1.2rem;
  padding: 0.5rem;
  margin: 0.5rem auto;
  border: 1px solid black;
  border-radius: 0.25em;

  &:focus {
    outline: none;
    border: 2px solid blue;
  }
`;

const WordReset = styled.button`
  display: block;
  cursor: pointer;
  background-color: darkred;
  color: white;
  font-size: 1rem;
  padding: 0.5rem;
  margin: 0.25rem auto;
  border: 1px solid black;
  border-radius: 0.25em;

  &:focus {
    outline: none;
    border: 2px solid blue;
  }
`;

export default function WordInput() {
  const {
    wordReducer: [state, dispatch],
  } = useContext(WordContext);

  return (
    <>
      <Input
        type="text"
        value={state.input}
        onChange={(e) => dispatch(setInput(e.target.value))}
        data-testid="word-input"
        placeholder="Type a word to start"
      />
      {state.input && (
        <WordReset onClick={() => dispatch({ type: "WORD_RESET" })}>
          Reset
        </WordReset>
      )}
    </>
  );
}

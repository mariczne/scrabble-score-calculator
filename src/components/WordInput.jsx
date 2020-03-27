import React, { useContext } from "react";
import { WordContext } from "../context/wordContext";
import { setInput } from "../actions/word";

export default function WordInput() {
  const {
    wordReducer: [state, dispatch]
  } = useContext(WordContext);

  return (
    <>
      <input
        type="text"
        value={state.input}
        onChange={e => dispatch(setInput(e.target.value))}
        className="word-input"
        data-testid="word-input"
        placeholder="Type a word to start"
      />
      {state.input && (
        <button
          onClick={() => dispatch({ type: "WORD_RESET" })}
          className="word-reset"
        >
          Reset
        </button>
      )}
    </>
  );
}

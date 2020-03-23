import React, { useContext } from "react";
import { WordContext } from "../context/word";

export default function WordInput() {
  const {
    wordReducer: [state, dispatch]
  } = useContext(WordContext);

  return (
    <>
      <input
        type="text"
        value={state.input}
        onChange={e =>
          dispatch({ type: "CHANGE_INPUT", payload: { input: e.target.value } })
        }
        className="word-input"
        data-testid="word-input"
        placeholder="Type a word to start"
      />
      {state.input && (
        <button
          onClick={() => dispatch({ type: "RESET_WORD" })}
          className="word-reset"
        >
          Reset
        </button>
      )}
    </>
  );
}

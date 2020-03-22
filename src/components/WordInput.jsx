import React, { useContext } from "react";
import { WordContext } from "../context/word";

export default function WordInput() {
  const [state, dispatch] = useContext(WordContext);

  return (
    <div>
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
          onClick={() =>
            dispatch({ type: "RESET" })
          }
          className="word-reset"
        >
          Reset
        </button>
      )}
    </div>
  );
}

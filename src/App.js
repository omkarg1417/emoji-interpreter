import React, { useState } from "react";
import "./styles.css";
import { emojiJSON } from "./emojiDir.js";

export default function App() {
  const [emojiMeaning, emojiChangeHandler] = useState();
  var quickPicks = ["😄", "😢", "😏", "❤️", "🤔", "😍"];
  // to purify the values received from emojiJSON
  function purifyString(str) {
    // removing ':' from Raw meaning
    str = str.slice(1, str.length - 1);
    // splitting string into parts for each "_"
    var answerArray = str.split("_");

    //filling final answer
    var answer = "";
    for (let i = 0; i < answerArray.length; ++i) {
      answer += answerArray[i] + " ";
    }

    return answer;
  }

  function changeEventHandler(event) {
    var emojiInput = event.target.value;
    emojiInput = emojiInput.trim();
    let emojiMeaningRaw = emojiJSON[emojiInput];

    // if input is not a valid key in emojoJSON object
    if (emojiMeaningRaw === undefined) {
      if (emojiInput === "") {
        emojiChangeHandler("");
        return;
      }
      emojiChangeHandler("We don't have this value in our database");
      return;
    }

    emojiChangeHandler(purifyString(emojiMeaningRaw));
  }

  function quickMeaningHandler(event) {
    let emo = event.target.innerHTML;
    emojiChangeHandler(purifyString(emojiJSON[emo]));
  }

  return (
    <div className="App">
      <h1 className="app-heading">Emoji intepreter</h1>
      <input onChange={changeEventHandler} placeholder="Enter emoji here" />

      <div className="emoji-meaning">{emojiMeaning}</div>
      <h2>Quick Picks </h2>

      <div className="quick-picks">
        {quickPicks.map((element, index) => {
          return (
            <span
              key={element}
              className="btn-quick-picks"
              onClick={quickMeaningHandler}
            >
              {element}
            </span>
          );
        })}
      </div>
    </div>
  );
}

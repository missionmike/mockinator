import "./App.scss";

import React, { useEffect, useState } from "react";

import { ImageButton } from "./components/ImageButton";
import { Textarea } from "./components/Textarea";

function App() {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");

  const [spongeBobMode, setSpongeBobMode] = useState(true);
  const [emojiMode, setEmojiMode] = useState(true);
  const [randomAiMode, setRandomAiMode] = useState(true);

  const [textCopied, setTextCopied] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(event.target.value);
  };

  useEffect(() => {
    if (inputText.trim().length === 0) {
      setOutputText("");
      return;
    }

    const randomAiEmojis = ["🚀", "🦾", "🧠", "💻", "🤖"];

    // Replace more than two newlines with two newlines.
    let newOutputText = inputText.replace(/\n{3,}/g, "\n\n");

    if (randomAiMode) {
      newOutputText = inputText
        .split(" ")
        .map((word) => {
          if (word.length > 4) {
            return `${word} —`;
          }

          return word;
        })
        .join(" ");

      // Remove the last em-dash.
      newOutputText = newOutputText.replace(/ —$/, "");
    }

    if (emojiMode) {
      newOutputText.split("\n\n").forEach((paragraph) => {
        // Add a random emoji to the beginning and end of each paragraph.
        const randomEmojiOne =
          randomAiEmojis[Math.floor(Math.random() * randomAiEmojis.length)];
        const randomEmojiTwo =
          randomAiEmojis[Math.floor(Math.random() * randomAiEmojis.length)];
        newOutputText = newOutputText.replace(
          paragraph,
          randomEmojiOne + " " + paragraph + " " + randomEmojiTwo,
        );
      });
    }

    if (spongeBobMode) {
      newOutputText = newOutputText
        .split("")
        .map((char) => {
          const randomNumber = Math.floor(Math.random() * 10);
          if (randomNumber % 2 === 0) {
            return char.toLowerCase();
          } else {
            return char.toUpperCase();
          }
        })
        .join("");
    }

    newOutputText += "\n\n#mockinator";

    setOutputText(newOutputText);
  }, [inputText, spongeBobMode, emojiMode, randomAiMode]);

  return (
    <div className="app">
      <div className="container">
        <h1>🚀 MoCKiNAtOr 🚀</h1>
        <p>
          Enter some text and let the Mockinator mock it. Useful to mock people
          on social when their post is already so devoid of thought there is no
          reasoning with them.
        </p>
        <p>
          <strong>
            Copy/paste to the input and click the output to copy back for some
            high-class mocking.
          </strong>
        </p>

        <Textarea
          placeholder="Enter text here..."
          value={inputText}
          onChange={handleInputChange}
        />
        <p className="options-label">
          <strong>Options (tap/click to toggle):</strong>
        </p>
        <div className="options">
          <ImageButton
            src="images/mocking-spongebob.jpeg"
            alt="Mocking Spongebob"
            onClick={() => setSpongeBobMode(!spongeBobMode)}
            selected={spongeBobMode}
          />
          <ImageButton
            src="images/rocket-emoji.png"
            alt="Emoji Mode"
            onClick={() => setEmojiMode(!emojiMode)}
            selected={emojiMode}
          />
          <ImageButton
            src="images/ai-robot.jpg"
            alt="AI Mode"
            onClick={() => setRandomAiMode(!randomAiMode)}
            selected={randomAiMode}
          />
        </div>

        <div className="copy-textarea">
          {textCopied && <p className="copied-text">📋 Copied!</p>}
          <Textarea
            placeholder="Mockinator output..."
            readOnly
            value={outputText}
            onClick={() => {
              if (outputText.trim().length === 0) return;

              navigator.clipboard.writeText(outputText);
              setTextCopied(true);
              setTimeout(() => {
                setTextCopied(false);
              }, 2000);
            }}
          />
        </div>
      </div>
      <footer>
        <p>
          made with 🤣 by{" "}
          <a
            href="https://github.com/missionmike/mockinator"
            target="_blank"
            rel="nofollow noopener"
          >
            missionmike
          </a>
        </p>
      </footer>
    </div>
  );
}

export default App;

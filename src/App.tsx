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
        <h1>Mockinator</h1>
        <p>
          Want to mock someone? Enter some text and let the Mockinator mock it.
          This is especially useful to mock people on social media, when their
          post is already so devoid of thought there is nothing else to do with
          it.
        </p>
        <p>
          Simply copy/paste post text into the input, then click the output to
          copy back to clipboard for some high-class mocking.
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
            src="public/images/mocking-spongebob.jpeg"
            alt="Mocking Spongebob"
            onClick={() => setSpongeBobMode(!spongeBobMode)}
            selected={spongeBobMode}
          />
          <ImageButton
            src="public/images/rocket-emoji.png"
            alt="Emoji Mode"
            onClick={() => setEmojiMode(!emojiMode)}
            selected={emojiMode}
          />
          <ImageButton
            src="public/images/ai-robot.jpg"
            alt="AI Mode"
            onClick={() => setRandomAiMode(!randomAiMode)}
            selected={randomAiMode}
          />
        </div>

        <Textarea
          placeholder="Mockinator output..."
          readOnly
          value={outputText}
          onClick={() => {
            navigator.clipboard.writeText(outputText);
            alert("Copied to clipboard!");
          }}
        />
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

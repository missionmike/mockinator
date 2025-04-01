import "./App.css";

import React, { useEffect, useState } from "react";

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
          post is already so stupid there is literally nothing else to do with
          it.
        </p>
        <p>
          Simply copy/paste their post into the input, then click the output to
          copy back to clipboard for some high-class mocking.
        </p>

        <h2>Input 🧠</h2>
        <Textarea
          placeholder="Enter text here..."
          value={inputText}
          onChange={handleInputChange}
        />
        <h2>Output 🚀</h2>
        <Textarea
          placeholder="AI-inator output..."
          readOnly
          value={outputText}
          onClick={() => {
            navigator.clipboard.writeText(outputText);
            alert("Copied to clipboard!");
          }}
        />

        <p style={{ display: "flex", alignItems: "center" }}>
          <input
            type="checkbox"
            checked={spongeBobMode}
            onChange={() => setSpongeBobMode(!spongeBobMode)}
            style={{ marginRight: "10px", width: "20px", height: "20px" }}
            id="spongeBobModeToggle"
          />
          <label htmlFor="spongeBobModeToggle">SpongeBob Mode</label> - wHeN yOU
          waNT tHiS aNNOyINg eFFecT
        </p>
        <p style={{ display: "flex", alignItems: "center" }}>
          <input
            type="checkbox"
            checked={emojiMode}
            onChange={() => setEmojiMode(!emojiMode)}
            style={{ marginRight: "10px", width: "20px", height: "20px" }}
            id="emojiModeToggle"
          />
          <label htmlFor="emojiModeToggle">Emoji Mode</label> - Add random
          emojis 🚀
        </p>
        <p style={{ display: "flex", alignItems: "center" }}>
          <input
            type="checkbox"
            checked={randomAiMode}
            onChange={() => setRandomAiMode(!randomAiMode)}
            style={{ marginRight: "10px", width: "20px", height: "20px" }}
            id="randomAiModeToggle"
          />
          <label htmlFor="randomAiModeToggle">AI Mode</label> - Ensure
          there&apos;s &mdash; em-dashes &mdash;
        </p>
      </div>
      <footer>
        <p>
          made with 🤖 by{" "}
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

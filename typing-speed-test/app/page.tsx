"use client";
import React, { useState } from "react";

const paragraphs = [
  "The quick brown fox jumps over the lazy dog.",
  "Typing fast can improve your productivity significantly.",
  "Practice daily to enhance your typing speed and accuracy.",
  "JavaScript is a versatile language for web development.",
  "Next.js makes server-side rendering and static site generation simple.",
  "In the world of technology, staying updated with the latest advancements is crucial. The digital landscape evolves rapidly, requiring individuals to adapt and learn new skills continuously. Dedication and practice are the keys to mastering the complexities of modern development tools.",
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec dui vel ligula gravida volutpat. Praesent sit amet vehicula erat. Nam interdum ipsum id dui cursus, sed pellentesque odio suscipit. Duis efficitur, risus id lacinia pharetra, enim elit ultrices nulla, sit amet rutrum urna lacus ut justo.",
  "The development of full-stack applications involves both front-end and back-end technologies. Mastering this skill set allows developers to build and maintain entire systems effectively, bridging the gap between user experience and functionality.",
];

export default function Home() {
  const [selectedParagraph, setSelectedParagraph] = useState(paragraphs[0]);
  const [userInput, setUserInput] = useState("");
  const [timeLimit, setTimeLimit] = useState(15); // Default 15 seconds
  const [timeRemaining, setTimeRemaining] = useState(15);
  const [isRunning, setIsRunning] = useState(false);
  const [wpm, setWpm] = useState(0);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);
  const [missedWords, setMissedWords] = useState(0);
  const [spellingMistakes, setSpellingMistakes] = useState(0);

  const startTest = () => {
    setIsRunning(true);
    setTimeRemaining(timeLimit);
    setUserInput("");
    setWpm(0);
    setMissedWords(0);
    setSpellingMistakes(0);

    if (intervalId) clearInterval(intervalId);

    const id = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(id);
          setIsRunning(false);
          calculateWPM();
          calculateMistakes();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    setIntervalId(id);
  };

  const calculateWPM = () => {
    const wordsTyped = userInput.trim().split(/\s+/).length;
    const minutes = timeLimit / 60;
    setWpm(Math.round(wordsTyped / minutes));
  };

  const calculateMistakes = () => {
    const typedWords = userInput.trim().split(/\s+/);
    const originalWords = selectedParagraph.trim().split(/\s+/);

    let missed = 0;
    let spelling = 0;

    originalWords.forEach((word, index) => {
      if (!typedWords[index]) {
        missed++;
      } else if (typedWords[index] !== word) {
        spelling++;
      }
    });

    setMissedWords(missed);
    setSpellingMistakes(spelling);
  };

  const shareOnLinkedIn = () => {
    const url = `https://www.linkedin.com/shareArticle?mini=true&url=https://typing-speed-test-yn31.vercel.app/&title=My Typing Speed&summary=I just scored ${wpm} WPM on the Typing Speed Test!`;
    window.open(url, "_blank");
  };

  const shareOnTwitter = () => {
    const url = `https://twitter.com/intent/tweet?text=I just scored ${wpm} WPM on the Typing Speed Test! Try it out: https://typing-speed-test-yn31.vercel.app/`;
    window.open(url, "_blank");
  };

  return (
    <div className="flex flex-col items-center p-8 min-h-screen bg-gradient-to-b from-purple-600 to-blue-500 text-white">
      <h1 className="text-4xl font-bold mb-4 animate-bounce">
        Typing Speed Test
      </h1>

      <div className="w-full max-w-3xl p-6 bg-white text-black rounded-xl shadow-lg">
        {/* Paragraph Selection */}
        <h2 className="text-lg font-semibold mb-2">Select Paragraph:</h2>
        <select
          className="w-full p-3 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
          onChange={(e) => setSelectedParagraph(e.target.value)}
          value={selectedParagraph}
        >
          {paragraphs.map((para, index) => (
            <option key={index} value={para}>
              {para}
            </option>
          ))}
        </select>

        {/* Time Selection */}
        <h2 className="text-lg font-semibold mb-2">Select Time Limit:</h2>
        <div className="flex gap-2 mb-4">
          {[15, 30, 45, 60, 120].map((time) => (
            <button
              key={time}
              className={`p-3 border rounded-lg transform hover:scale-105 transition-transform duration-200 ${
                timeLimit === time ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}
              onClick={() => setTimeLimit(time)}
            >
              {time / 60 >= 1 ? `${time / 60} min` : `${time} sec`}
            </button>
          ))}
        </div>

        {/* Display Paragraph */}
        <h2 className="text-lg font-semibold mb-2">Typing Text:</h2>
        <div className="p-4 border rounded-lg bg-gray-100 mb-4 shadow-inner">
          {selectedParagraph}
        </div>

        {/* Timeline Bar */}
        <div className="w-full h-3 bg-gray-300 rounded-lg mb-4 relative overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-green-400 to-blue-500 rounded-lg animate-pulse"
            style={{
              width: `${((timeLimit - timeRemaining) / timeLimit) * 100}%`,
            }}
          ></div>
        </div>

        {/* Typing Input */}
        <textarea
          className="w-full p-3 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Start typing here..."
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          disabled={!isRunning}
        ></textarea>

        {/* Start Button */}
        <button
          className="w-full p-3 bg-blue-500 text-white rounded-lg disabled:bg-gray-400 transform hover:scale-105 transition-transform duration-200"
          onClick={startTest}
          disabled={isRunning}
        >
          {isRunning ? "Test Running..." : "Start Test"}
        </button>

        {/* WPM Display */}
        {!isRunning && wpm > 0 && (
          <div className="mt-4">
            <h2 className="text-2xl font-bold text-green-500 animate-fade-in">
              Your WPM: {wpm}
            </h2>
            <p className="mt-2 text-lg">Missed Words: {missedWords}</p>
            <p className="mt-2 text-lg">
              Spelling Mistakes: {spellingMistakes}
            </p>
            <div className="flex gap-4 mt-4">
              <button
                className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                onClick={shareOnLinkedIn}
              >
                Share on LinkedIn
              </button>
              <button
                className="p-2 bg-blue-400 text-white rounded-lg hover:bg-blue-500"
                onClick={shareOnTwitter}
              >
                Share on Twitter
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

"use client";
import React, { useState } from "react";

const paragraphs = {
  easy: {
    15: [
      "The quick brown fox jumps over the lazy dog.",
      "Typing fast can improve your productivity significantly.",
    ],
    30: [
      "Learning new technologies is essential for growth, especially for developers aiming to stay competitive in tech.",
      "Collaboration among developers fosters innovation, helping teams solve complex problems and create impactful software solutions.",
    ],
    45: [
      "The city lights sparkled as night fell, casting long shadows on the streets. People hurried by, lost in their thoughts, while the distant hum of traffic filled the air.",
      "The quiet forest echoed with the rustle of leaves as a gentle wind passed through. Sunlight filtered through the trees, casting dappled shadows on the soft forest floor.",
    ],
    60: [
      "The sun set over the horizon, casting a warm golden glow across the landscape. Birds chirped softly as the breeze carried the scent of blooming flowers, creating a peaceful, serene atmosphere.",
      "The city buzzed with energy as people hurried through bustling streets, each lost in their own world. Bright lights illuminated the night sky, and the sound of music spilled from nearby cafes.",
    ],
    120: [
      "Artificial intelligence (AI) is transforming industries with applications in healthcare, autonomous vehicles, and virtual assistants. While offering immense benefits like efficiency and innovation, AI raises ethical concerns about privacy, bias, and automation, requiring responsible development to maximize its potential.",
      "Artificial intelligence is reshaping the modern world, enhancing fields like healthcare, education, and technology. Its ability to analyze data and make decisions promises innovation, but ethical challenges like transparency, bias, and accountability remain critical for responsible AI development.",
    ],
  },
  medium: {
    15: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      "Continuous learning and adapting to new frameworks and tools is crucial for developers to stay relevant and succeed professionally.",
    ],
    30: [
      "The sun set behind the mountains, casting a warm glow over the landscape. Birds chirped in the distance, while the air grew cooler with dusk.",
      "Staying updated with the latest trends in technology is key for developers, allowing them to innovate, improve skills, and create more efficient, scalable, and user-friendly software solutions.",
    ],
    45: [
      "As the evening sky turned shades of pink and orange, the sound of waves crashing gently against the shore created a peaceful atmosphere. The cool breeze carried the scent of saltwater, and the horizon seemed endless.",
      "The city streets were bustling with activity as people hurried to their destinations. Street vendors sold their goods, and the sound of traffic blended with conversations, creating a vibrant atmosphere that echoed through the night.",
    ],
    60: [
      "The park was peaceful in the early morning, with dew still glistening on the grass. Birds sang from the trees, and the soft rustling of leaves added to the serene atmosphere. A few joggers passed by, their footsteps echoing in the stillness of the dawn.",
      "The sun slowly rose over the horizon, casting a warm golden light across the landscape. The air was crisp and fresh, filled with the earthy scent of morning dew. Birds chirped in the distance, while the gentle rustling of trees created a soothing melody. It was a moment of quiet serenity before the world awoke.",
    ],
    120: [
      "As the evening sky deepened into hues of pink and orange, the city began to buzz with life. Streetlights flickered on, casting a soft glow over the bustling sidewalks. People hurried by, each absorbed in their own world, while the distant hum of traffic filled the air. The aroma of street food mixed with the faint scent of fresh rain, creating a familiar, comforting atmosphere. Above, the stars began to appear, twinkling in the vast expanse of the darkening sky, offering a peaceful contrast to the city’s energetic pulse.",
      "The forest was alive with sounds, from the chirping of crickets to the rustling of leaves as a gentle breeze passed through. Sunlight filtered through the canopy above, casting dappled shadows on the forest floor. The air was cool and fresh, filled with the earthy scent of pine and moss. As I walked deeper into the woods, the world seemed to fade away, leaving behind only the serenity of nature. Each step felt like a connection to something ancient and timeless, offering a sense of peace and calm that was hard to find elsewhere.",
    ],
  },
  hard: {
    15: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.",
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur euismod magna eu orci suscipit.",
    ],
    30: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus tincidunt purus vel tortor elementum, sed volutpat lorem fermentum. Curabitur euismod sapien et tortor fermentum.",
      "The sky was painted with hues of orange and pink as the sun set behind the mountains. A gentle breeze rustled the trees, creating a peaceful atmosphere that calmed the soul.",
    ],
    45: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      "The development of full-stack applications is highly valuable.",
    ],
    60: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ut augue a mauris iaculis aliquam. Proin venenatis, libero non facilisis tincidunt, metus libero suscipit turpis, at varius urna elit ac urna. Sed nec tortor et turpis eleifend maximus. Nunc volutpat ante vel lectus convallis, sed sodales leo tempus.",
      "The early morning fog rolled over the hills, casting a soft glow on the quiet town below. Birds chirped in the distance, and the streets slowly began to wake up as people started their day. The air was fresh and cool, carrying the scent of dew-covered grass and blooming flowers, signaling the start of a new adventure.",
    ],
    120: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec dui vel ligula gravida volutpat. Praesent sit amet vehicula erat. Nam interdum ipsum id dui cursus, sed pellentesque odio suscipit.",
      "Artificial intelligence (AI) is revolutionizing the way we interact with technology and shaping the future of countless industries. From autonomous vehicles to personalized healthcare, AI is enabling machines to perform tasks that typically require human intelligence, such as learning, reasoning, and problem-solving. At the core of AI lies machine learning, a subset that uses algorithms to analyze vast amounts of data and make predictions or decisions without explicit programming. The rise of AI-powered tools has transformed daily life, with applications ranging from virtual assistants like Siri and Alexa to sophisticated systems that detect diseases or optimize supply chains. Despite its potential, AI raises ethical concerns, including privacy, bias, and the future of work, as automation increasingly replaces human labor. As we navigate these challenges, the need for responsible AI development and regulation becomes crucial to ensure its benefits are accessible to all while minimizing its risks. In this rapidly evolving field, staying informed and adaptable is key to leveraging AI’s transformative power responsibly.",
    ],
  },
};

export default function Home() {
  const [difficultyLevel, setDifficultyLevel] = useState<
    "easy" | "medium" | "hard"
  >("easy");
  const [timeLimit, setTimeLimit] = useState(15);
  const [selectedParagraph, setSelectedParagraph] = useState(
    paragraphs[difficultyLevel][timeLimit as 15 | 30 | 45 | 60 | 120][0]
  );

  const [userInput, setUserInput] = useState("");
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

    originalWords.forEach((word: string, index: number) => {
      if (!typedWords[index]) {
        missed++;
      } else if (typedWords[index] !== word) {
        spelling++;
      }
    });

    setMissedWords(missed);
    setSpellingMistakes(spelling);
  };

  return (
    <div className="flex flex-col items-center p-8 min-h-screen bg-gradient-to-b from-purple-600 to-blue-500 text-white">
      <h1 className="text-4xl font-bold mb-4 animate-bounce">
        Typing Speed Test
      </h1>
      <div className="w-full max-w-3xl p-6 bg-white text-black rounded-xl shadow-lg">
        <h2 className="text-lg font-semibold mb-2">Select Difficulty Level:</h2>
        <div className="flex gap-2 mb-4">
          {["easy", "medium", "hard"].map((level) => (
            <button
              key={level}
              className={`p-3 border rounded-lg transform hover:scale-105 transition-transform duration-200 ${
                difficultyLevel === level
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200"
              }`}
              onClick={() => {
                setDifficultyLevel(level as "easy" | "medium" | "hard");
                setSelectedParagraph(
                  paragraphs[level as "easy" | "medium" | "hard"][
                    timeLimit as 15 | 30 | 45 | 60 | 120
                  ][0]
                );
              }}
            >
              {level.charAt(0).toUpperCase() + level.slice(1)}
            </button>
          ))}
        </div>

        <h2 className="text-lg font-semibold mb-2">Select Time Limit:</h2>
        <div className="flex gap-2 mb-4">
          {[15, 30, 45, 60, 120].map((time) => (
            <button
              key={time}
              className={`p-3 border rounded-lg transform hover:scale-105 transition-transform duration-200 ${
                timeLimit === time ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}
              onClick={() => {
                setTimeLimit(time);
                setSelectedParagraph(
                  paragraphs[difficultyLevel][
                    time as 15 | 30 | 45 | 60 | 120
                  ][0]
                );
              }}
            >
              {time / 60 >= 1 ? `${time / 60} min` : `${time} sec`}
            </button>
          ))}
        </div>

        <h2 className="text-lg font-semibold mb-2">Typing Text:</h2>
        <div className="p-4 border rounded-lg bg-gray-100 mb-4 shadow-inner">
          {selectedParagraph}
        </div>

        <textarea
          className="w-full p-3 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Start typing here..."
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          disabled={!isRunning}
        ></textarea>

        <button
          className="w-full p-3 bg-blue-500 text-white rounded-lg disabled:bg-gray-400 transform hover:scale-105 transition-transform duration-200"
          onClick={startTest}
          disabled={isRunning}
        >
          {isRunning ? "Test Running..." : "Start Test"}
        </button>

        {!isRunning && wpm > 0 && (
          <div className="mt-4">
            <h2 className="text-2xl font-bold text-green-500 animate-fade-in">
              Your WPM: {wpm}
            </h2>
            <p className="mt-2 text-lg">Missed Words: {missedWords}</p>
            <p className="mt-2 text-lg">
              Spelling Mistakes: {spellingMistakes}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

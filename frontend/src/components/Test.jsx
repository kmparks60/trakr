import { useState, useEffect } from "react";
import { promptsData } from "../../db.json";

function Test() {
	const [prompt, setPrompt] = useState("");
	const [inputValue, setInputValue] = useState("");
	const [timeLeft, setTimeLeft] = useState(60);
	const [isActive, setIsActive] = useState(false);
	const [wpm, setWpm] = useState(0);
	const [accuracy, setAccuracy] = useState(100);
	const [typedChars, setTypedChars] = useState(0);
	const [mistakes, setMistakes] = useState(0);
	const [testEnded, setTestEnded] = useState(false);

	useEffect(() => {
	resetTest();
	}, []);

	useEffect(() => {
	let timer;
	if (isActive && timeLeft > 0) {
		timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
	} else if (timeLeft === 0) {
		endTest();
	}
	return () => clearTimeout(timer);
	}, [isActive, timeLeft]);

	const resetTest = () => {
	if (!promptsData || promptsData.length === 0) {
		console.error("Error: promptsData is undefined or empty.");
		return;
	}

	const randomPrompt = promptsData[Math.floor(Math.random() * promptsData.length)];
	setPrompt(randomPrompt);
	setInputValue("");
	setTimeLeft(60);
	setIsActive(false);
	setTestEnded(false);
	setWpm(0);
	setAccuracy(100);
	setTypedChars(0);
	setMistakes(0);
	};

	const handleInputChange = (e) => {
	if (!isActive) setIsActive(true);
	const userInput = e.target.value;
	setInputValue(userInput);
	setTypedChars(userInput.length);

	let mistakesCount = 0;
	const words = prompt.split(" ");
	const userWords = userInput.split(" ");

	userWords.forEach((word, index) => {
		if (words[index] && word !== words[index]) mistakesCount++;
	});

	setMistakes(mistakesCount);
	const accuracyPercentage =
		typedChars > 0 ? ((typedChars - mistakes) / typedChars) * 100 : 100;
	setAccuracy(accuracyPercentage.toFixed(2));
	};

	const endTest = () => {
	setIsActive(false);
	setTestEnded(true);
	const wordsTyped = inputValue.trim().split(/\s+/).length;
	setWpm(wordsTyped);
	};

	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
			<h1 className="text-3xl font-bold mb-4">Typing Test</h1>

			<div className="text-4xl font-bold text-blue-600 mb-4">
				{timeLeft}s
			</div>

			<div className="bg-white border-2 border-gray-300 p-6 w-full max-w-2xl rounded shadow-md relative">
			<p className="whitespace-pre-wrap text-gray-700 text-lg leading-loose">
				{prompt.split("").map((char, index) => {
				let typedChar = inputValue[index] || "";
				let textColor =
					typedChar === char
					? "text-blue-600"
					: typedChar
					? "text-red-600"
					: "text-gray-400";

				return (
					<span key={index} className={`${textColor}`}>
					{char}
					</span>
				);
				})}
			</p>
			</div>

			<textarea
				value={inputValue}
				onChange={handleInputChange}
				disabled={testEnded}
				className="mt-4 p-2 w-full max-w-2xl h-20 border border-gray-300 rounded"
				placeholder="Start typing here..."
			></textarea>

			<div className="mt-4 flex space-x-4">
				<button
					onClick={endTest}
					className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 transition"
				>
					Stop
				</button>
				<button
					onClick={resetTest}
					className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
				>
					Reset
				</button>
			</div>

			{testEnded && (
			<div className="mt-6 p-4 bg-white shadow-md rounded w-full max-w-md text-center">
				<h2 className="text-2xl font-semibold mb-2">Test Results</h2>
				<p>
					<strong>WPM:</strong> {wpm}
				</p>
				<p>
					<strong>Accuracy:</strong> {accuracy}%
				</p>
			</div>
			)}
		</div>
	);
};

export default Test;
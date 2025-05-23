import { useState, useEffect } from "react";
import { promptsData } from "../assets/db.json";
import { Link } from "react-router-dom";

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
	const [token, setToken] = useState(null);
	const [resultsSaved, setResultsSaved] = useState(false);
	
	useEffect(() => {
		const storedToken = localStorage.getItem('token');
		setToken(storedToken);
	}, []);

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

		let correctChars = 0;
		for (let i = 0; i < userInput.length; i++) {
			if (userInput[i] === prompt[i]) correctChars++;
		}

		const totalTyped = userInput.length;
		const mistakesCount = totalTyped - correctChars;

		setTypedChars(totalTyped);
		setMistakes(mistakesCount);

		const accuracyPercentage = totalTyped > 0 ? (correctChars / totalTyped) * 100 : 0;
		setAccuracy(accuracyPercentage.toFixed(2));
	};

	const endTest = () => {
		setIsActive(false);
		setTestEnded(true);

		const trimmedInput = inputValue.trim();
		const wordsTyped = trimmedInput === "" ? 0 : trimmedInput.split(/\s+/).length;

		setWpm(wordsTyped);
	};

	const decodeJWT = (token) => {
		try {
			const [header, payload] = token.split(".");
			const decodedPayload = JSON.parse(atob(payload));
			return decodedPayload;
		} catch (error) {
			console.error("Error decoding JWT:", error);
			return null;
		}
	};

	const saveTestResult = async (wpm, accuracy, timeTaken) => {
	try {
		if (!token || resultsSaved) return;

		const decodedToken = decodeJWT(token);
		const userId = decodedToken?.userId;

		if (!userId) throw new Error("User ID not found in the token");

		const response = await fetch("http://localhost:5000/api/testResults", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({
				userId,
				duration: timeTaken,
				wpm,
				accuracy,
			}),
		});

		if (!response.ok) throw new Error(`Failed to save test result: ${response.statusText}`);

		setResultsSaved(true);
			} catch (error) {
				console.error("Error saving test result:", error);
			}
		};

	useEffect(() => {
	}, [inputValue, accuracy]);

	const closeModal = () => {
		setTestEnded(false);
	};

	return (
		<div className="flex flex-col items-center justify-start pb-6 px-6 bg-[#001F3F]">
			<h1 className="text-3xl font-bold mb-4 text-[#FFE8F0]">Start typing to begin</h1>

			<div className="text-4xl font-bold text-[#FFE8F0] mb-4">
				{timeLeft}s
			</div>

			<div className="bg-[#FFFFFF] border-2 border-[#FFE8F0] p-6 w-full max-w-3xl rounded shadow-md relative">
				<p className="whitespace-pre-wrap text-[#3a3a3a] text-lg leading-loose">
					{prompt.split("").map((char, index) => {
						let typedChar = inputValue[index] || "";
						let textColor =
							typedChar === char
								? "text-[#001F3F]"
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
				className="bg-[#FFFFFF] mt-4 p-2 w-full max-w-3xl h-20 border border-[#001F3F] rounded text-[#001F3F]"
				placeholder="Start typing here..."
			></textarea>

			<div className="mt-4 flex flex-col items-center space-y-4">
				<div className="flex space-x-4">
					<button onClick={endTest} className="bg-[#FF8532] text-[#FFFFFF] py-2 px-6 rounded-md hover:bg-[#FFE8F0] hover:text-[#001F3F] focus:outline-none">
						Stop
					</button>
					<button onClick={resetTest} className="bg-[#FF8532] text-[#FFFFFF] py-2 px-6 rounded-md hover:bg-[#FFE8F0] hover:text-[#001F3F] focus:outline-none">
						Reset
					</button>
				</div>
				<Link to="/timeboard" className="px-4 py-2 bg-[#FF8532] text-[#FFFFFF] rounded-md hover:bg-[#FFE8F0] hover:text-[#001F3F] focus:outline-none">
					Leaderboard
				</Link>
			</div>

			{testEnded && (
			<div className="fixed inset-0 flex justify-center items-center bg-transparent z-50">
				<div className="bg-[#FFE8F0] p-6 rounded-lg w-full max-w-md border border-4 border-red-500 text-center shadow-xl relative">
					<h2 className="text-2xl font-semibold mb-2 text-[#001F3F]">Test Results</h2>
					<p className="text-[#001F3F]"><strong>WPM:</strong> {wpm}</p>
					<p className="text-[#001F3F]"><strong>Accuracy:</strong> {accuracy}%</p>

					<div className="mt-4 flex flex-col items-center space-y-2">
						<button
							onClick={() => saveTestResult(wpm, accuracy, 60 - timeLeft)}
							disabled={resultsSaved}
							className={`mt-4 py-2 px-6 rounded-md focus:outline-none ${
								resultsSaved
									? "bg-gray-400 text-white cursor-not-allowed"
									: "bg-[#FF8532] text-[#FFFFFF] hover:bg-[#FFE8F0] hover:text-[#001F3F]"
							}`}
						>
							{resultsSaved ? "Results Saved" : "Save Results"}
						</button>

						<button
							onClick={closeModal}
							className="bg-[#FF8532] text-[#FFFFFF] py-2 px-6 rounded-md hover:bg-[#FFE8F0] hover:text-[#001F3F] focus:outline-none"
						>
							Close
						</button>
					</div>
				</div>
			</div>
		)}
		</div>
	);
}

export default Test;

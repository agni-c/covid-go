import { useState, useEffect } from 'react';

const UseQuiz = (questions = {}) => {
	const [quizData, setQuizData] = useState(questions);
	const [questionNo, setQuestionNo] = useState(0);
	const [quizScore, setQuizScore] = useState(0);
	const [isQuizEnd, setIsQuizEnd] = useState(false);

	const goNext = isCorrect => {
		if (isCorrect) setQuizScore(quizScore + 1);
		let nextQuiz = questionNo + 1;
		nextQuiz < quizData.length ? setQuestionNo(nextQuiz) : setIsQuizEnd(true);
	};

	const COLORS = ['#FF8042', '#FFBB28'];
	const getPercent = (score, tot) => {
		let temp = (score / tot) * 100;

		return temp;
	};

	const processChartData = (score, tot) => {
		const percentage = getPercent(score, tot);
		console.log(percentage);
		const data = [
			{
				name: 'Sick',
				value: percentage || 0,
			},
			{
				name: 'Healthy',
				value: 100 - percentage || 0,
			},
		];
		return data;
	};

	return {
		quizData,
		questionNo,
		quizScore,
		isQuizEnd,
		goNext,
		getPercent,
		processChartData,
		COLORS,
	};
};

export default UseQuiz;

import { useState, useEffect } from 'react';
import { PieChart, Pie } from 'recharts';

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

	const COLORS = ['#FFBB28', '#FF8042'];
	const getPercent = (score, tot) => (score / tot) * 100;

	const processChartData = (score, tot) => {
		const data = [
			{
				name: 'Probability: Sick',
				value: getPercent(score, tot),
			},
			{
				name: 'Probability: Healthy',
				value: 100 - getPercent(score, tot),
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

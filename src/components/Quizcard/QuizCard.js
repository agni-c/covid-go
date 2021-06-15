import './QuizCard.scss';
import { questions } from './seed';
import useQuiz from './useQuiz';
import { ResponsiveContainer, PieChart, Pie, Tooltip, Cell } from 'recharts';

const QuizCard = () => {
	const {
		quizData,
		questionNo,
		quizScore,
		isQuizEnd,
		goNext,
		getPercent,
		processChartData,
		COLORS,
	} = useQuiz(questions);

	return (
		<>
			{isQuizEnd ? (
				<div className='quiz-container'>
					<ResponsiveContainer width='100%' height='50%'>
						<PieChart width={400} height={400}>
							<Pie
								dataKey='value'
								isAnimationActive={true}
								data={processChartData(quizScore, quizData.length)}
								cx='50%'
								cy='50%'
								outerRadius={80}
								fill='#8884d8'
								label>
								{processChartData(quizScore, quizData.length).map(
									(entry, index) => (
										<Cell key={`cell-${index}`} fill={COLORS[index]} />
									)
								)}
							</Pie>

							<Tooltip />
						</PieChart>
					</ResponsiveContainer>

					<h4>
						Probability of having COVID {getPercent(quizScore, quizData.length)}
						%
					</h4>
					<h4>
						{getPercent(quizScore, quizData.length) > 40
							? 'Please Do A checkup'
							: "Stay Safe And Don't forget to ware proper safety precautions"}
					</h4>
					{/* <h4>you got {percent}%</h4> */}
				</div>
			) : (
				<div className='quiz-container'>
					<div className='quiz-question'>
						<h1> {quizData[questionNo].questionText}</h1>
					</div>
					<div className='quiz-answers'>
						{quizData[questionNo].answerOptions.map(answer => {
							return (
								<button
									onClick={() => goNext(answer.isCorrect)}
									className='options'>
									{answer.answerText}
								</button>
							);
						})}
					</div>
				</div>
			)}
		</>
	);
};

export default QuizCard;

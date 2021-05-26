import Navbar from './components/Navbar/Navbar';
import QuizCard from './components/Quizcard/QuizCard';
import Evaluation from './routes/Evaluation/Evaluation';

const App = () => {
	return (
		<>
			<Navbar />
			<Evaluation />
		</>
	);
};

export default App;

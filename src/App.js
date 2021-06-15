import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import QuizCard from './components/Quizcard/QuizCard';
import Evaluation from './routes/Evaluation/Evaluation';
import Layout from './components/Layout.js';

const App = () => {
	return (
		<>
			<Router>
				<Switch>
					<Layout>
						<Route exact path='/' component={Evaluation} />
					</Layout>
				</Switch>
			</Router>
		</>
	);
};

export default App;

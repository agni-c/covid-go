import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Layout from './components/Layout.js';
import virusImg from './img/covid19-1600x900_adobespark.png';
import Evaluation from './routes/Evaluation/Evaluation';
const imgArr = [virusImg, virusImg, virusImg, virusImg, virusImg, virusImg];

const App = () => {
	return (
		<Router>
			<Switch>
				<Layout>
					<Route exact path='/' component={Evaluation} />
					<span className='virus'>
						{imgArr.map(img => {
							return <img src={img} alt='' />;
						})}
					</span>
				</Layout>
			</Switch>
		</Router>
	);
};

export default App;

import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Layout from './components/Layout.js';
import virusImg from './img/covid19-1600x900_adobespark.png';
import Cowin from './routes/cowin/Cowin.js';
import Evaluation from './routes/Evaluation/Evaluation';
import Stat from './routes/Stat/Stat.js';
const imgArr = [virusImg, virusImg, virusImg, virusImg, virusImg, virusImg];

const App = () => {
	return (
		<Router>
			<Switch>
				<Layout>
					<Route exact path='/' component={Evaluation} />
					<Route exact path='/covid-overview' component={Stat} />
					<Route exact path='/lead-aggregation' component={Cowin} />
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

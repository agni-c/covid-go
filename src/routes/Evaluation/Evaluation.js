import React from 'react';
import QuizCard from '../../components/Quizcard/QuizCard';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
	container: {
		// flex: 1,
		height: '100%',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	},
});

const Evaluation = () => {
	const classes = useStyles();
	return (
		<>
			<div className={classes.container}>
				<QuizCard />
			</div>
		</>
	);
};

export default Evaluation;

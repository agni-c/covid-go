import React from 'react';
import { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import {
	Mail,
	MoveToInbox,
	HomeOutlined,
	People,
	InfoOutlined,
} from '@material-ui/icons';
import { Link, useHistory, useLocation } from 'react-router-dom';
import Logo from '../img/Logo_2.png';
const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
	root: {
		display: 'flex',
	},
	appBar: {
		zIndex: theme.zIndex.drawer + 1,
	},
	drawer: {
		width: drawerWidth,
		flexShrink: 0,
	},
	drawerPaper: {
		width: drawerWidth,
		backgroundColor: '#3f51b5',
		color: 'white',
	},
	drawerContainer: {
		overflow: 'auto',
	},
	content: {
		flexGrow: 1,
		padding: theme.spacing(3),
		color: '#a4b2ff',
	},
	active: {
		backgroundColor: 'red',
	},
	title: {
		display: 'flex',
		alignItems: 'center',
	},
}));

const ClippedDrawer = ({ children }) => {
	const classes = useStyles();
	const history = useHistory();
	const location = useLocation();

	useEffect(() => {
		console.log(location.pathname);
	}, [location.pathname]);

	const menuList = [
		{
			text: ' Lead Aggregation',
			icon: <HomeOutlined />,
			path: '/',
		},
		{
			text: 'Covid Infographics',
			icon: <HomeOutlined />,
			path: '/covid-overview',
		},
		{ text: 'Evaluator', icon: <HomeOutlined />, path: '/eval' },
	];
	return (
		<div className={classes.root}>
			<CssBaseline />
			<AppBar position='fixed' className={classes.appBar}>
				<Toolbar>
					<Typography variant='h6' noWrap>
						<div className={classes.title}>
							<img id='logo' src={Logo} alt='COVID GO' />{' '}
							<span style={{ padding: '0 10px', fontSize: '30px' }}>
								{' '}
								COVID GO{' '}
							</span>
						</div>
					</Typography>
				</Toolbar>
			</AppBar>
			<Drawer
				className={classes.drawer}
				variant='permanent'
				classes={{
					paper: classes.drawerPaper,
				}}>
				<Toolbar />
				<div className={classes.drawerContainer}>
					<List>
						{menuList.map(({ text, icon, path }, index) => (
							<ListItem
								selected={location.pathname === path}
								component={Link}
								to={path}
								button
								key={text}>
								<ListItemIcon style={{ color: 'white' }}>{icon}</ListItemIcon>
								<ListItemText primary={text} />
							</ListItem>
						))}
					</List>
				</div>
			</Drawer>
			<main className={classes.content}>
				<Toolbar />
				{children}
			</main>
		</div>
	);
};

export default ClippedDrawer;

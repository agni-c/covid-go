import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import axios from 'axios';
import {
	BarChart,
	Bar,
	Cell,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer,
} from 'recharts';
import './stat.scss';

const StatGraph = ({ data }) => (
	<ResponsiveContainer width='100%' height={250}>
		<BarChart
			width={400}
			height={300}
			data={data}
			margin={{
				top: 5,
				right: 30,
				left: 20,
				bottom: 5,
			}}>
			<CartesianGrid strokeDasharray='3 3' />
			<XAxis dataKey='name' />
			<YAxis />
			<Tooltip />
			<Legend />
			<Bar dataKey='active' fill='#B7B200' />
			<Bar dataKey='confirmed' fill=' #FF0000' />
			<Bar dataKey='recovered' fill='#65FF43 ' />
		</BarChart>
	</ResponsiveContainer>
);

const Stat = () => {
	const [covidStateData, setCovidStateData] = useState({});
	const [states, setStates] = useState([]);
	const [districtData, setDistrictData] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [err, setErr] = useState();
	const customStyles = {
		option: (provided, state) => ({
			...provided,
			// borderBottom: '1px dotted pink',
			color: state.isSelected ? 'white' : 'blue',
			padding: 20,
		}),
	};
	const mockData = [
		{
			name: 'kolkata',
			recovered: 4000,
			dead: 2400,
			amt: 2400,
		},
	];
	const renderChart = stateName => {
		let tempData = [];
		let district = covidStateData[stateName].districtData;
		for (const data in district) {
			tempData.push({ name: data, ...district[data] });
		}
		setDistrictData(tempData);
	};
	console.log('district', districtData);

	useEffect(() => {
		setIsLoading(true);
		axios
			.get('https://api.covid19india.org/state_district_wise.json')
			.then(covid => {
				setCovidStateData(covid.data);
				let tempState = [];
				for (const state in covid.data) {
					const option = { value: state, label: state };
					tempState.push(option);
				}
				setStates(tempState);
				// console.log(tempState);
			})
			.catch(err => setErr(err));
		setIsLoading(false);
	}, []);
	return (
		<div className='stat-main'>
			<Select
				className='basic-single'
				classNamePrefix='select'
				styles={customStyles}
				defaultValue={states[4]}
				isDisabled={isLoading}
				isLoading={isLoading}
				isClearable={true}
				isSearchable={true}
				name='states'
				options={states}
				onChange={state => renderChart(state.value)}
			/>
			<div className='chart-container'>
				{districtData.length > 0 ? (
					districtData.map(data => <StatGraph data={[data]} />)
				) : (
					<h1>Select Your State</h1>
				)}
			</div>
		</div>
	);
};

export default Stat;

import React, { useEffect, useState, useRef } from 'react';
import './cowin.scss';
import { makeStyles } from '@material-ui/core/styles';

// eslint-disable-next-line import/no-webpack-loader-syntax
import mapboxgl from '!mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"

import axios from 'axios';
import VaccineCenterCard from '../../components/cowin/VaccineCenterCard';

mapboxgl.accessToken =
	'pk.eyJ1IjoiYWduaS1jIiwiYSI6ImNrcXJlcTd1ajB3dzUyb28xdWo5ems5M2EifQ.TF-znWiQx1RYqn7bRMxEPQ';
// mapboxgl.accessToken = process.env.REACT_APP_MAP_BOX_KEY;

const useStyles = makeStyles({
	container: {
		// flex: 1,
		height: '95%',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		position: 'relative',
		flexDirection: 'column',
	},
});

const Cowin = () => {
	const classes = useStyles();
	const mapContainer = useRef(null);
	const map = useRef(null);
	const marker = useRef(null);
	const [lat, setLat] = useState(22.5448);
	const [long, setLong] = useState(88.3426);
	const [zoom, setZoom] = useState(5.73);
	const [vaccineData, setVaccineData] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState();

	const getVaccineData = async (latitude, longitude) => {
		setIsLoading(true);
		const vaccine = await axios
			.get(
				`https://cdn-api.co-vin.in/api/v2/appointment/centers/public/findByLatLong?lat=${latitude}&long=${longitude}`
			)
			.catch(err => setError(err.message));
		if (vaccine.data.centers.length === 0)
			return setError('Cant find any vaccine centers around you');
		setVaccineData(vaccine.data.centers);
		setIsLoading(false);
	};

	//base map initialization
	useEffect(() => {
		if (map.current) return; // initialize map only once
		map.current = new mapboxgl.Map({
			container: mapContainer.current, // container ID
			style: 'mapbox://styles/agni-c/ck8d4mddc2hmo1iqq8n2hmio3', // style URL
			center: [long, lat], // starting position [lng, lat]
			zoom: zoom, // starting zoom
		});

		map.current.addControl(
			new mapboxgl.GeolocateControl({
				positionOptions: {
					enableHighAccuracy: true,
				},
				trackUserLocation: true,
			})
		);
		marker.current = new mapboxgl.Marker({ color: 'black', rotation: 45 });
		map.current.on('move', () => {
			setLong(map.current.getCenter().lng.toFixed(4));
			setLat(map.current.getCenter().lat.toFixed(4));
			setZoom(map.current.getZoom().toFixed(2));
		});
		map.current.on('click', e => {
			const { lat, lng } = e.lngLat;
			setLat(lat);
			setLong(lng);
			marker.current.setLngLat([lng, lat]).addTo(map.current);
			getVaccineData(lat, lng);
		});

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	//events and marker initialization

	console.log({ vaccineData });
	// console.log({ lat, long });
	return (
		<React.Fragment>
			<div className={classes.container}>
				<div className='sidebar'>
					Longitude: {long} | Latitude: {lat} | Zoom: {zoom}
				</div>
				<div ref={mapContainer} className='map-container' />
				{vaccineData.length > 0 ? (
					<div className='vaccineCardDeck'>
						{vaccineData.map(vCenters => {
							const {
								name,
								district_name,
								state_name,
								location,
								pincode,
								center_id,
							} = vCenters;
							return (
								<VaccineCenterCard
									districtName={district_name}
									name={name}
									stateName={state_name}
									location={location}
									pincode={pincode}
									key={center_id}
								/>
							);
						})}
					</div>
				) : error ? (
					<h2>{error.message}</h2>
				) : (
					<h2> Find Vaccine centers around you </h2>
				)}
			</div>
		</React.Fragment>
	);
};

export default Cowin;

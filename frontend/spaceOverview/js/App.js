import React, {useEffect} from 'react';
import SpaceGrid from './SpaceGrid';
import {invoke} from '@forge/bridge';
import useStore from './store';
import LoadingAnimation from './LoadingAnimation';

function App() {
	const updatePages = useStore(state => state.setPages);
	const updateProperties = useStore(state => state.setProperties);
	const updateLabels = useStore(state => state.setLabels);
	const pages = useStore(state => state.pages);

	useEffect(() => {
		invoke('getSpacePages', { example: 'my-invoke-variable' }).then(data => {
			const values = JSON.parse(data);
			updateProperties(values.properties);
			updateLabels(values.labels);
			updatePages(values.pages);
			console.log(values);
		});
	}, []);

	return (
		<div>
			{!pages.length ? <LoadingAnimation /> : <SpaceGrid />}
		</div>
	);
}

export default App;

import React, { useEffect } from 'react';
import { invoke } from '@forge/bridge';
import PageGrid from './panels/PageGrid';
import useStore from './store';
import ContentLoading from './ContentLoading';

function App() {
	const updatePagesInSpace = useStore(state => state.setPages);
	const updateContextPage = useStore(state => state.setContextPage);

	const pages = useStore(state => state.pages);
	const contextPage = useStore(state => state.contextPage);

	useEffect(() => {
		invoke('getSimilarPages', { example: 'my-invoke-variable' }).then(data => {
			const values = JSON.parse(data).values;
			updatePagesInSpace(values);
		});

		invoke('getProperties', { example: 'my-invoke-variable' }).then(data => {
			const props = JSON.parse(data);
			updateContextPage(props);
		});
	}, []);

	return (
		<div>
			{(pages.length && contextPage) ? <PageGrid /> : <ContentLoading />}
		</div>
	);
}

export default App;

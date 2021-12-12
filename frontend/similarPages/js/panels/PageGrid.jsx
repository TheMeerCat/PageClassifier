import React, {useMemo} from 'react';
import PagePanel from './PagePanel';
import FadeIn from 'react-fade-in';
import styled from 'styled-components';
import useStore from '../store';
import SelfPagePanel from './panel/SelfPagePanel';

const GridWrapper = styled(FadeIn)`
    padding: 2rem;
    display: grid;
    grid-gap: 1.5rem;
    
`;

function PageGrid() {
	const pageCount = useStore(state => state.pageCount);
	const context = useStore(state => state.contextPage);
	const panelIds = useMemo(() => {
		let result = [];

		if (pageCount > 0) {
			result = [...Array(pageCount).keys()];
		}

		return result;
	}, [pageCount]);

	return (
		<GridWrapper>
			{context && <SelfPagePanel />}
			<h3>... Compared to other pages, it means that</h3>
			{panelIds.map(id => <PagePanel key={id} id={id} />)}
		</GridWrapper>
	);
}

export default PageGrid;

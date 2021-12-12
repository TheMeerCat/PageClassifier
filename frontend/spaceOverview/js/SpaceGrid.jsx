import React, {useMemo} from 'react';
import FadeIn from 'react-fade-in';
import styled from 'styled-components';
import useStore from './store';
import SpacePanel from './SpacePanel';
import SpaceLabelMenu from './SpaceLabelMenu';

const GridWrapper = styled(FadeIn)`
    padding: 2rem;
    display: grid;
    grid-gap: 1rem;
    grid-template-columns: repeat(auto-fit, 400px, 1fr));
    overflow: hidden; 
 
    > div {
        display: flex;
        flex-direction: column;
        min-height: 350px;
        max-height: 500px;
        
        > :first-child {
            flex: 1;
        }
    }
`;

function SpaceGrid() {
	const pagesCount = useStore(state => state.pagesCount);
	const pageIds = useMemo(() => {
		let result = [];

		if (pagesCount > 0) {
			result = [...Array(pagesCount).keys()];
		}

		return result;
	}, [pagesCount]);

	return (
		<GridWrapper>
			<SpaceLabelMenu />
			{pageIds.map(id => <SpacePanel key={id} id={id} />)}
		</GridWrapper>
	);
}

export default SpaceGrid;

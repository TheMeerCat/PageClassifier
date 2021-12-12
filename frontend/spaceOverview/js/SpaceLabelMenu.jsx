import useStore from './store';
import styled from 'styled-components';
import FadeIn from 'react-fade-in';
import React from 'react';
import {Checkbox} from '@atlaskit/checkbox';
import HighlightsIcon from '@atlaskit/icon/glyph/highlights';
import StatusIcon from '@atlaskit/icon/glyph/status';

const GridPanel = styled.div`
    padding: 25px;
    box-shadow: 0px 2px 8px 2px rgba(0,0,0,0.2);
    transition: 0.3s;
    border-radius: 6px;
    
    &:hover {
        box-shadow: 2px 4px 8px 2px rgba(0,0,0,0.2);
    }
`;

const GridWrapper = styled(FadeIn)`
    padding: 2rem;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    overflow: hidden;
`;

const Header = styled.h4`
	display: grid;
	grid-template-columns: 3em 1fr;
`;
const capitalize = ([first, ...rest], lowerRest = false) =>
	first.toUpperCase() + (lowerRest ? rest.join('').toLowerCase() : rest.join(''));

function SpaceLabelMenu() {
	const labels = useStore(state => state.labels);
	const setFilter = useStore(state => state.addFilter);
	const removeFilter = useStore(state => state.removeFilter);

	return (
		<GridPanel>
			<Header>
				<HighlightsIcon/>
				<span>Select <u>categories</u> you want to filter</span>
			</Header>
			<GridWrapper>
				{labels.map(label => (
					<Checkbox
						key={label}
						value={label}
						label={capitalize(label, true)}
						onChange={(event) => {
							if (event.target.checked) {
								setFilter(label);
							} else {
								removeFilter(label);
							}
						}}
						name={label}
						testId={label}
					/>
				))}
			</GridWrapper>
		</GridPanel>
	);
}

export default SpaceLabelMenu;

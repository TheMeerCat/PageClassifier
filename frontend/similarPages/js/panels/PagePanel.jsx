import React, {useMemo} from 'react';
import styled from 'styled-components';
import useStore from '../store';
import TagGroup from '@atlaskit/tag-group';
import { SimpleTag as Tag } from '@atlaskit/tag';
import CountUp from 'react-countup';
import PageHeader from './panel/PageHeader';

const GridPanel = styled.div`
    padding: 25px;
    box-shadow: 0px 2px 8px 2px rgba(0,0,0,0.2);
    transition: 0.3s;
    border-radius: 6px;
    
    &:hover {
        box-shadow: 2px 4px 8px 2px rgba(0,0,0,0.2);
    }
`;

const GridPanelContent = styled.div`
    max-width: 80%;
    display: grid;
    padding-top: 10px;
    margin: 0 auto;
    grid-template-columns: 20% 80%;
`;

function compareProperties(currentPage, contextPage) {
	const same = [];
	const distinct = [];

	if (currentPage.properties) {
		for (const property of currentPage.properties) {
			if (contextPage.properties.includes(property)) {
				same.push(property);
			} else {
				distinct.push(property);
			}
		}
	}

	return {same, distinct};
}

const capitalize = ([first, ...rest], lowerRest = false) =>
	first.toUpperCase() + (lowerRest ? rest.join('').toLowerCase() : rest.join(''));

// eslint-disable-next-line react/prop-types
function PagePanel({id}) {
	const currentPage = useStore(state => state.pages[id]);
	const contextPage = useStore(state => state.contextPage);

	const compareResult = useMemo(() => {
		return compareProperties(currentPage, contextPage);
	}, [currentPage, contextPage]);
	const similarity = currentPage.properties ? (100 / currentPage.properties.length * compareResult.same.length) : 0;

	return (
		<GridPanel>
			<PageHeader pageTitle={currentPage.title} pageId={currentPage.id} spaceKey={currentPage.spaceKey} labels={currentPage.labels}/>
			<GridPanelContent>
				<h1>
					<CountUp duration={3} end={similarity}/>%
				</h1>
				<TagGroup>
					{compareResult.same.map(prop => <Tag key={prop} text={capitalize(prop)} color="green"/>)}
					{compareResult.distinct.map(prop => <Tag key={prop} text={capitalize(prop)} color="standard"/>)}
				</TagGroup>
			</GridPanelContent>
		</GridPanel>
	);
}

export default PagePanel;

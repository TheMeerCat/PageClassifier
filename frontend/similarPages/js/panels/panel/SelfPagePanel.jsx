import React from 'react';
import styled from 'styled-components';
import useStore from '../../store';
import TagGroup from '@atlaskit/tag-group';
import { SimpleTag as Tag } from '@atlaskit/tag';

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

const capitalize = ([first, ...rest], lowerRest = false) =>
	first.toUpperCase() + (lowerRest ? rest.join('').toLowerCase() : rest.join(''));

function SelfPagePanel() {
	const currentPage = useStore(state => state.contextPage);

	return (
		<GridPanel>
			<GridPanelContent>
				<h3>
                    Classifier found the following topics
				</h3>
				<TagGroup>
					{currentPage.properties.map(prop => <Tag key={prop} text={capitalize(prop)} />)}
				</TagGroup>
			</GridPanelContent>
		</GridPanel>
	);
}

export default SelfPagePanel;

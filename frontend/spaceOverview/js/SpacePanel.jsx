import React from 'react';
import styled from 'styled-components';
import useStore from './store';
import TagGroup from '@atlaskit/tag-group';
import Page24Icon from '@atlaskit/icon-object/glyph/page/24';
import Button from '@atlaskit/button';
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

const PageHeaderWrapper = styled.h3`
    margin-left: 30px;
    
    svg, button {
        vertical-align: unset;
    }
`;

// eslint-disable-next-line react/prop-types
function SpacePanel({id}) {
	const page = useStore(state => state.pages[id]);
	const filters = useStore(state => state.filters);

	const shouldDisplay = page.labels?.some(label => filters?.includes(label));

	let component;

	if (shouldDisplay) {
		component = (
			<GridPanel>
				<PageHeaderWrapper>
					<Page24Icon/>
					<Button appearance="link" onClick={() => {}}>
						{page.title}
					</Button>
				</PageHeaderWrapper>
				<GridPanelContent>
					<h4>Page categories</h4>
					<TagGroup>
						{page.labels.map(prop => <Tag key={prop} text={prop} color="yellowLight"/>)}
					</TagGroup>
					<h4>Page topics</h4>
					<TagGroup>
						{page.properties.map(prop => <Tag key={prop} text={prop} color="blueLight"/>)}
					</TagGroup>
				</GridPanelContent>
			</GridPanel>
		);
	} else {
		component = <></>;
	}

	return component;
}

export default SpacePanel;

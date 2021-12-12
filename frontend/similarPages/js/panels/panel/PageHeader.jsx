import Page24Icon from '@atlaskit/icon-object/glyph/page/24';
import React from 'react';
import Button from '@atlaskit/button';
import {router} from '@forge/bridge';
import styled from 'styled-components';
import {SimpleTag as Tag} from '@atlaskit/tag';
import TagGroup from '@atlaskit/tag-group';

const PageHeaderWrapper = styled.h3`
    max-width: 90%;
    margin: 0 auto;
    align-items: baseline;
     
    svg, button, span {
        vertical-align: unset;
    }
`;

const PageTitle = styled.a`
	margin-left: 15px;
`;

// eslint-disable-next-line react/prop-types
function PageHeader({pageId, pageTitle, spaceKey, labels}) {
	return (
		<PageHeaderWrapper>
			<div>
				<Page24Icon/>
				<PageTitle onClick={(e) => {
					e.preventDefault();
					router.open(`/wiki/spaces/${spaceKey}/pages/${pageId}`);
				}}>
					{pageTitle}
				</PageTitle>
			</div>
			<TagGroup>
				{labels && labels.map(label => <Tag key={label} text={label} color="blueLight"/>)}
			</TagGroup>
		</PageHeaderWrapper>
	);
}

export default PageHeader;

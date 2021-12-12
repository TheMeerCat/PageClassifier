import React, {useEffect, useState} from 'react';
import {invoke, router} from '@forge/bridge';
import Tag from '@atlaskit/tag';
import Button from '@atlaskit/button';
import styled from 'styled-components';
import ContentLoading from './ContentLoading';

const TagButton = styled(Button)`
  margin: 0;
  padding: 0 !important;
  
  > span > span {
    cursor: pointer;
    
    > span:hover {
      background-color: rgb(76, 154, 255);
      color: rgb(23, 43, 77);
    }
  }
`;

const capitalize = ([first, ...rest], lowerRest = false) =>
	first.toUpperCase() + (lowerRest ? rest.join('').toLowerCase() : rest.join(''));

function App() {
	const [data, setData] = useState([]);
	let component;

	useEffect(() => {
		invoke('getProperties', {example: 'my-invoke-variable'}).then((data) => {
			console.log(JSON.parse(data).properties);
			setData(JSON.parse(data).properties);
		});
	}, []);

	if (data) {
		if (data.length) {
			component =
				<div>
					<h5>Classifier identified the following topics:</h5>
					{data.map((label) =>
						<TagButton
							key={label}
							appearance="subtle-link"
							onClick={() => router.open('https://en.wikipedia.org/wiki/' + encodeURIComponent(label))}>
							<Tag
								isRemovable={false}
								text={capitalize(label)}
								color="blueLight"
							/>
						</TagButton>)}
				</div>;
		} else {
			component = <ContentLoading />;
		}
	} else {
		component = <h5>Oops, we did not find any topics. Your text is probably too short.</h5>;
	}

	return component;
}

export default App;

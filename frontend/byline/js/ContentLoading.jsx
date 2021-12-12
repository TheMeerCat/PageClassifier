import styled from 'styled-components';
import LabelIcon from '@atlaskit/icon/glyph/label';
import React from 'react';
import PageIcon from '@atlaskit/icon/glyph/page';
import {colors} from '@atlaskit/theme';

const AnimationWrapper = styled.div`
	display: grid;
	text-align: center;
`;

const LabelLeftAnimation = styled.div`
	span {
		margin: ${(props) => props.marginTop}em ${(props) => props.marginRight}em ${(props) => props.marginBottom}em -25em;
   		position: absolute;
   		color: ${(props) => props.color};
   		
   		animation-name: markAnimationLeft;
   		animation-iteration-count: infinite;
		animation-duration: 4s;
		animation-delay: ${(props) => props.delay}s;
		
		@keyframes markAnimationLeft {
		  0%	{ margin-left: -25em; }
		  5%	{ margin-left: -23em; }
		  10% { margin-left: -22em; }
		  15% { margin-left: -20em; }
		  20% { margin-left: -18em; }
		  25% { margin-left: -13em; }
		  30% { margin-left: -12em; }
		  35% { margin-left: -10em; }
		  40% { margin-left: -8em; }
		  45% { margin-left: -4em; }
		  50%   { margin-left: -1.5em; }
		  100%   { margin-left: -1.5em; }
		}
	}
`;

const LabelRightAnimation = styled.div`
	span {
		margin: ${(props) => props.marginTop}em ${(props) => props.marginRight}em ${(props) => props.marginBottom}em 25em;
   		position: absolute;
   		color: ${(props) => props.color};
   		
   		animation-name: markAnimationRight;
   		animation-iteration-count: infinite;
		animation-duration: 4s;
		animation-delay: ${(props) => props.delay}s;
		
		@keyframes markAnimationRight {
		  0%	{ margin-left: 25em; }
		  5%	{ margin-left: 23em; }
		  10% { margin-left: 22em; }
		  15% { margin-left: 20em; }
		  20% { margin-left: 18em; }
		  25% { margin-left: 15em; }
		  30% { margin-left: 12em; }
		  35% { margin-left: 10em; }
		  40% { margin-left: 8em; }
		  45% { margin-left: 4em; }
		  50%   { margin-left: 0em; }
		  100%   { margin-left: 0em; }
		}
	}
`;

const PageAnimation = styled.div`
    color: gainsboro;
	svg {
		height: 7em;
    	width: 7em;
	}
`;

const TextWrapper = styled.h5`
	margin-top: 2em;
`;

function ContentLoading() {
	return (
		<AnimationWrapper>
			<PageAnimation>
				<PageIcon />
			</PageAnimation>
			<LabelLeftAnimation color={colors.B500} delay={0} marginTop={-3.5} marginRight={0} marginBottom={0} margin-left={-0.9}>
				<LabelIcon/>
			</LabelLeftAnimation>
			<LabelLeftAnimation color={colors.B100} delay={0.8} marginTop={-4.6} marginRight={0} marginBottom={0} marginLeft={-1.3}>
				<LabelIcon/>
			</LabelLeftAnimation>
			<LabelLeftAnimation color={colors.B400} delay={0.4} marginTop={-5.7} marginRight={0} marginBottom={0}  marginLeft={-1.1}>
				<LabelIcon/>
			</LabelLeftAnimation>
			<LabelRightAnimation color={colors.B300} delay={0.6} marginTop={-3.5} marginRight={0} marginBottom={0} marginLeft={-0.5}>
				<LabelIcon/>
			</LabelRightAnimation>
			<LabelRightAnimation color={colors.B75} delay={0.2} marginTop={-4.6} marginRight={0} marginBottom={0}  marginLeft={-0.7}>
				<LabelIcon/>
			</LabelRightAnimation>
			<LabelRightAnimation color={colors.B200} delay={1} marginTop={-5.7} marginRight={0} marginBottom={0}  marginLeft={0}>
				<LabelIcon/>
			</LabelRightAnimation>
			<TextWrapper>We are fetching content topics for you...</TextWrapper>
		</AnimationWrapper>
	);
}

export default ContentLoading;

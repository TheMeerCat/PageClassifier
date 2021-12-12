import React from 'react';
import PageIcon from '@atlaskit/icon/glyph/page';
import styled from 'styled-components';
import SearchIcon from '@atlaskit/icon/glyph/search';
import QuestionIcon from '@atlaskit/icon/glyph/question';

const AnimatedPageIcon = styled.div`
	color: gainsboro;
	svg {
		height: 10em;
    	width: 10em;
	}
`;

const AnimatedSearchIcon = styled.div`
	span {
		position: absolute;
		margin: -4em -0em 0em -1em;
		
		svg {
			height: 5em;
			width: 5em;
		}
		
		animation-name: animatedIcon;
		animation-duration: 2s;
		animation-delay: 0s;
		animation-fill-mode: forwards;
		animation-iteration-count: infinite;
		
		@keyframes animatedIcon {
			0% { margin: -4em -0em 0em -1em; }
			5% { margin: -5em -0em 0em -1em; }
			10% { margin: -6em -0em 0em -1em; }
			15% { margin: -7em -0em 0em -1em; }
			20% { margin: -8em -0em 0em -1em; }
			25% { margin: -9em -0em 0em -1em; }
			30% { margin: -10em -0em 0em -1em; }
			35% { margin: -10em -0em 0em -1.5em; }
			40% { margin: -10em -0em 0em -2em; }
			45% { margin: -10em -0em 0em -2.5em; }
			50% { margin: -10em -0em 0em -3em; }
			55% { margin: -9em -0em 0em -3em; }
			60% { margin: -8em -0em 0em -3em; }
			65% { margin: -7em -0em 0em -3em; }
			70% { margin: -6em -0em 0em -3em; }
			75% { margin: -5em -0em 0em -3em; }
			80% { margin: -4em -0em 0em -3em; }
			85% { margin: -4em -0em 0em -2.5em; }
			90% { margin: -4em -0em 0em -2em; }
			95% { margin: -4em -0em 0em -1.5em; }
			100% { margin: -4em -0em 0em -1em; }
		}
	}
`;

const QuestionMarkAnimated = styled.div`
	span {
		margin: ${(props) => props.marginTop}em ${(props) => props.marginRight}em ${(props) => props.marginBottom}em ${(props) => props.marginLeft}em;
   		position: absolute;
   		
   		animation-name: markAnimation;
		animation-duration: 2s;
		animation-delay: ${(props) => props.delay}s;
		animation-iteration-count: infinite;
		opacity: 0;
		
		@keyframes markAnimation {
		  0%	{ opacity: 0; }
		  100%   { opacity: 1; }
		}
	}
`;

const AnimationWrapper = styled.div`
	display: grid;
	text-align: center;
`;

const TextWrapper = styled.h5`
	margin-top: 4em;
`;

function LoadingAnimation() {

	return (
		<AnimationWrapper>
			<AnimatedPageIcon>
				<PageIcon size="x-large" />
			</AnimatedPageIcon>
			<AnimatedSearchIcon>
				<SearchIcon />
			</AnimatedSearchIcon>
			<QuestionMarkAnimated delay={1.8} marginTop={-4} marginRight={6} marginBottom={0} marginLeft={-6}>
				<QuestionIcon />
			</QuestionMarkAnimated>
			<QuestionMarkAnimated delay={1.5} marginTop={-8} marginRight={6} marginBottom={0} marginLeft={-5}>
				<QuestionIcon />
			</QuestionMarkAnimated>
			<QuestionMarkAnimated delay={1.2} marginTop={-4} marginRight={0} marginBottom={0} marginLeft={4}>
				<QuestionIcon />
			</QuestionMarkAnimated>
			<QuestionMarkAnimated delay={0.9} marginTop={-7} marginRight={0} marginBottom={0} marginLeft={3.2}>
				<QuestionIcon />
			</QuestionMarkAnimated>
			<QuestionMarkAnimated delay={0.7} marginTop={-9} marginRight={0} marginBottom={0} marginLeft={5}>
				<QuestionIcon />
			</QuestionMarkAnimated>
			<QuestionMarkAnimated delay={0.4} marginTop={0} marginRight={0} marginBottom={0} marginLeft={0}>
				<QuestionIcon />
			</QuestionMarkAnimated>
			<QuestionMarkAnimated delay={0.2} marginTop={1} marginRight={0} marginBottom={0} marginLeft={-3}>
				<QuestionIcon />
			</QuestionMarkAnimated>
			<TextWrapper>We are analyzing the space content for you!</TextWrapper>
		</AnimationWrapper>
	);

}

export default LoadingAnimation;

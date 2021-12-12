import styled from 'styled-components';
import React from 'react';
import PageIcon from '@atlaskit/icon/glyph/page';
import EditorHorizontalRuleIcon from '@atlaskit/icon/glyph/editor/horizontal-rule';
import ArrowRightIcon from '@atlaskit/icon/glyph/arrow-right';
import QuestionIcon from '@atlaskit/icon/glyph/question';
import {colors} from '@atlaskit/theme';
import PageFilledIcon from '@atlaskit/icon/glyph/page-filled';

const AnimationWrapper = styled.div`
	display: grid;
	grid-template-columns: 1fr 0fr 1fr;
	text-align: center;
	margin: 0 auto;
	width: 90%;
`;

const PageWrapper = styled.div`
	padding: 8em;
`;

const MainPage = styled.div`
    color: gainsboro;
	svg {
		height: 7em;
    	width: 7em;
	}
`;

const CompareToPages = styled.div`
	svg {
		height: 7em;
    	width: 7em;
	}
`;

const InnerPage = styled.div`
	span {
		margin-left: ${(props) => props.margin}em;
		position: absolute;
		
		animation-name: pageAnimation;
   		animation-fill-mode: forwards;
		animation-duration: 1s;
		animation-delay: ${(props) => props.delay}s;
		opacity: 0;
		
		@keyframes pageAnimation {
		  0%	{ opacity: 0; }
		  100%   { opacity: 1; }
		}
	}
`;

const Arrow = styled.div`
	span {
		position: absolute;
		margin-top: 1.7em;
		
		svg {
			height: 4em;
    		width: 4em;
		}
		
		&:nth-child(1) {
			margin-left: -5em;
		}
		
		&:nth-child(2) {
			margin-left: -2em;
		}
		
		&:nth-child(3) {
			margin-left: 1em;
		}
		
		animation-name: arrowAnnotation;
   		animation-iteration-count: 4;
   		animation-fill-mode: forwards;
		animation-duration: 1s;
		animation-delay: 0s;
		opacity: 0;
		
		@keyframes arrowAnnotation {
		  0%	{ opacity: 0; }
		  100%   { opacity: 1; }
		}
	}
`;


const TextWrapper = styled.h5`
	margin-top: 2em;
    text-align: center;
`;

function ContentLoading() {
	return (
		<PageWrapper>
			<AnimationWrapper>
				<MainPage>
					<PageFilledIcon />
				</MainPage>
				<Arrow>
					<EditorHorizontalRuleIcon />
					<QuestionIcon />
					<ArrowRightIcon />
				</Arrow>
				<CompareToPages>
					<InnerPage margin={-4} delay={0}>
						<PageFilledIcon primaryColor={colors.B200} />
					</InnerPage>
					<InnerPage margin={-2.5} delay={1}>
						<PageFilledIcon primaryColor={colors.B75} />
					</InnerPage>
					<InnerPage margin={-1} delay={2}>
						<PageFilledIcon primaryColor={colors.B400} />
					</InnerPage>
					<InnerPage margin={0.5} delay={3}>
						<PageFilledIcon primaryColor={colors.B300} />
					</InnerPage>
				</CompareToPages>
			</AnimationWrapper>
			<TextWrapper>We are fetching content topics for you...</TextWrapper>
		</PageWrapper>
	);
}

export default ContentLoading;

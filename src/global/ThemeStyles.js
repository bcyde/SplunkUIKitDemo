import styled from 'styled-components';
import { variables, mixins } from '@splunk/themes';

const StyledContainer = styled.div`
    ${mixins.reset('inline-block')};
    font-size: ${variables.fontSizeLarge};
    line-height: 200%;
    margin: ${variables.spacing} ${variables.spacingHalf};
    padding: ${variables.spacing} ${variables.spacingXXLarge};    
    background-color: ${variables.backgroundColor};
`;
/*
box-shadow: ${variables.overlayShadow};
border-radius: ${variables.borderRadius};    
*/

const StyledGreeting = styled.div`
    font-weight: bold;
    color: ${variables.brandColor};
    font-size: ${variables.fontSizeXXLarge};
`;

export { StyledContainer, StyledGreeting };

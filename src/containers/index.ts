import styled from 'styled-components';
import { breakpoints } from '../styles/global';

export const Container = styled.div`
  max-width: 960px;
  width: 100%;
  margin: 0 auto;

  // border: 1px purple solid; //

  @media screen and (max-width: ${breakpoints.tablet.maxWidth}) {
    max-width: 90vw;
  }
`;

export const FlexContainer = styled(Container)<{
  flexDirection?: string;
  alignItems?: string;
  justifyContent?: string;
}>`
  display: flex;
  flex-direction: ${({ flexDirection }) => flexDirection || 'column'};
  align-items: ${({ alignItems }) => alignItems || 'center'};
  justify-content: ${({ justifyContent }) => justifyContent || 'center'};

  max-width: 100%; // qualquer coisa, coloca isso dentro de um media query pra mobile
`;

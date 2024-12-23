import styled from 'styled-components';

export const Container = styled.div`
  // border: 1px yellow solid;
  max-width: 960px;
  width: 100%;
  margin: 0 auto;
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
`;

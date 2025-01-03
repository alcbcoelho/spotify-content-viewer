import styled from 'styled-components';

import { colors, font } from '../styles/global';

export default styled.button<{ max_width?: string }>`
  padding: 8px 16px;
  max-width: ${({ max_width }) => max_width || 'max-content'};
  width: 100%;
  font-size: ${font.size.medium};
  font-weight: 700;
  background-color: ${colors.green.default};
  transition: background-color 0.2s, box-shadow 0.4s, transform ease-in-out 0.2s;
  border-radius: 24px;

  color: ${colors.gray.dark};
  text-decoration: none;
  cursor: pointer;

  &:hover {
    background-color: ${colors.green.light};
    transform: scale(1.025);
    box-shadow: 0 0 12px ${colors.green.light + '3f'};
  }
`;

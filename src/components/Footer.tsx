import styled from 'styled-components';
import { colors, font } from '../styles/global';

const Style = styled.footer`
  margin-top: 32px;
  padding: 16px 0;
  border-top: 1px ${colors.gray.default} dotted;
  text-align: center;
  font-size: ${font.size.small};
  float: none;

  p {
    color: ${colors.gray.default};
  }
`;

export default function Footer() {
  return (
    <Style>
      <p>&copy; 2024 - André Coêlho</p>
    </Style>
  );
}

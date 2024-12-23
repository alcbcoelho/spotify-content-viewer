import { IoMdArrowBack } from 'react-icons/io';
import { Link } from 'react-router';
import styled from 'styled-components';

import { Container, FlexContainer } from '../containers';
import { colors, font } from '../styles/global';

const Style = styled.header`
  padding: 16px;
  font-size: ${font.size.default};
  //   color: ${colors.green.default};
  background-color: ${colors.gray.default};
  margin-bottom: 16px;

  a {
    color: ${colors.white};
    transition: all 0.2s;

    &:hover {
      color: ${colors.green.light};
    }
  }

  svg {
    display: inline;
    margin-right: 8px;
  }
`;

export default function Header() {
  return (
    <Style>
      <Container>
        <Link to="/">
          <FlexContainer flexDirection="row" justifyContent="flex-start">
            <IoMdArrowBack />
            Back to home
          </FlexContainer>
        </Link>
      </Container>
    </Style>
  );
}
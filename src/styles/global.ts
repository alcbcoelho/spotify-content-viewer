import { createGlobalStyle } from 'styled-components';

export const colors = {
  gray: {
    light: '#616161',
    default: '#3b3b3b',
    dark: '#0f0f0f',
    darker: '#050505'
  },
  green: {
    light: '#9EF4C9' /* '#75f0b2' */,
    default: '#19e68c',
    dark: '#11A163',
    darker: '#0A5C38',
    darkest: '#052E1C'
  },
  white: '#ffffff',
  black: '#000000'
};

export const font = {
  size: {
    micro: '0.35rem',
    extraSmall: '0.5rem',
    small: '0.75rem',
    default: '1rem',
    medium: '1.25rem',
    mediumLarge: '1.5rem',
    large: '2rem'
  },
  family: {
    default: 'sans-serif',
    display: '"DM Sans", sans-serif'
  }
};

type Breakpoints = {
  mobile: Breakpoint;
  tablet: Breakpoint;
  default: Breakpoint;
};

export const breakpoints: Breakpoints = {
  mobile: {
    maxWidth: '767px'
  },
  tablet: {
    minWidth: '768px',
    maxWidth: '1023px'
  },
  default: {
    minWidth: '1024px'
  }
};

export default createGlobalStyle`
  @keyframes spring-up {
    0% {
      transform: scale(50%, 50%);
    }
    95% {
      transform: scale(100.75%, 100.75%);
    }
    100% {
      transform: scale(100%, 100%);
    }
  }

  @keyframes rotate {
    0% {
      transform: rotate(-45deg);
    }
    100% {
      transform: rotate(0deg);
    }
  }

  @keyframes fade-in {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  * {
      padding: 0;
      margin: 0;
      box-sizing: border-box;
      list-style: none;
      font-family: ${font.family.default};
  }

  body {
    color: ${colors.white};
    background-color: ${colors.gray.dark};
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: bold;
  }
    
  h1 {
    font-size: ${font.size.large};
  }

  h2 {
    font-size: ${font.size.mediumLarge};
  }
  
  button {
    font-size: 1rem;
    padding: 8px;
    border-radius: 4px;
    border: none;
    cursor: pointer;
  }

  .full-height {
    height: calc(100vh - 50.8px - 32px);
  }

  .title {
    text-align: center;
    font-size: 2rem;
    font-weight: 700;
  }

  .text--display {
    font-family: ${font.family.display};
  }

  .text--green {
    color: ${colors.green.default};
  }
`;

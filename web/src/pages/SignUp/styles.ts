import styled from 'styled-components';

import signUpBackground from '../../assets/sign-up-bg.png';
import { shade } from 'polished';

export const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: stretch;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 700px;

  form {
    margin: 5em 0;
    width: 340px;
    text-align: center;

    h1 {
      font-size: 1.5em;
      margin-bottom: 1.5em;
    }

    a {
      color: #f4ede8;
      display: block;
      margin-top: 1.5em;
      text-decoration: none;
      transition: color 0.2s;
      font-size: 1em;

      &:hover {
        color: ${shade(0.2, '#f4ede8')};
      }
    }
  }

  > a {
    color: #f4ede8;
    margin-top: 1.5em;
    text-decoration: none;
    transition: color 0.2s;
    display: flex;
    align-items: center;

    svg {
      margin-right: 1em;
    }

    &:hover {
      color: ${shade(0.2, '#f4ede8')};
    }
  }
`;

export const Background = styled.div`
  flex: 1;
  background: url(${signUpBackground}) no-repeat center;
  background-size: cover;
`;

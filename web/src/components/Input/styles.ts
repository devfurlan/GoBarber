import styled, { css } from 'styled-components';
import Tooltip from '../Tooltip';

interface IContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
}

export const Container = styled.div<IContainerProps>`
  background: #232129;
  color: #666360;
  border-radius: 10px;
  border: 2px solid #232129;
  padding: 0 1em;
  width: 100%;
  display: flex;
  align-items: center;

  & + div {
    margin-top: .5em;
  }

  ${props => props.isErrored && css`
    border-color: #c53030;
  `}
  ${props => props.isFocused && css`
    color: #ff9000;
    border-color: #ff9000;
  `}
  ${props => props.isFilled && css`
    color: #ff9000;
  `}
  input {
    color: #f4ede8;
    flex: 1;
    background: transparent;
    border: 0;
    padding: 1em 1em 1em 0;

    &::placeholder {
      color: #666360;
    }
  }

  > svg {
    margin-right: 1em;
  }
`;

export const Error = styled(Tooltip)`
  span {
    background: #c53030;
    color: #f4ede8;
    
    &::before {
      border-color: #c53030 transparent;
    }
  }
  
  //height: 20px;
  //margin-right: 1em;

  //svg {
  //  //margin: 0;
  //  margin-right: 1em;
  //}
`;

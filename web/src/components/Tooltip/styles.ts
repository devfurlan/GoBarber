import styled from 'styled-components';

export const Container = styled.div`
  position: relative;

  span {
    width: 160px;
    background: #ff9000;
    padding: .5em;
    border-radius: .25em;
    font-size: .75em;
    font-weight: 500;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.4s;
    position: absolute;
    bottom: calc(100% + .75em);
    left: 50%;
    transform: translateX(-50%);
    color: #312e38;

    &::before {
      content: '';
      border-style: solid;
      border-color: #ff9000 transparent;
      border-width: 6px 6px 0 6px;
      top: 100%;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
    }
  }

  &:hover span {
    opacity: 1;
    visibility: visible;
    transition: opacity 0.4s;
  }
`;

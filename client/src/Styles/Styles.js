import styled from 'styled-components';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    background: lightgreen;
    font-family: Open-Sans, Helvetica, Sans-Serif;
  }
`;

const DataContainer = styled.div`
  height: 100vh;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
  width: 100vw;
`;

const Container = styled.div`
  display: flex;
  overflow: hidden;
`;

const StyledEdge = styled.div`
  /* height: 100vh;
  background-color: #dc3545;
  width: 50px; */
`;

export { DataContainer, StyledEdge, Container, GlobalStyle };

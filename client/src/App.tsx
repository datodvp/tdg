import ChartComponent from './components/ChartComponent';
import Table from './components/Table';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  DataContainer,
  StyledEdge,
  Container,
  GlobalStyle,
} from './Styles/Styles';

const App = () => {
  return (
    <>
      <GlobalStyle />
      <Container>
        <StyledEdge />
        <DataContainer>
          <Table />
          <ChartComponent />
        </DataContainer>
        <StyledEdge />
      </Container>
    </>
  );
};

export default App;

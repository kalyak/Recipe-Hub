import { Container } from "react-bootstrap";

const QueryResultsDisplay = (props) => {
  return (
    <Container style={{ border: "1px blue solid" }}>
      <h1>Display</h1>
      <p>{props.queryResults}</p>
    </Container>
  );
};

export default QueryResultsDisplay;

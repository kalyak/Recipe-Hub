import { Container } from "react-bootstrap";

const QueryResultsDisplay = (props) => {
  return (
    <Container style={{ border: "1px blue solid" }}>
      <h1>Display</h1>
      <p>
        {props.filteredResults.map((x) => {
          return (
            <p>
              {x._id} = {x.tags}
            </p>
          );
        })}
      </p>
    </Container>
  );
};

export default QueryResultsDisplay;

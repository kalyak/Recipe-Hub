import { Container, Card, Button, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const QueryResultsDisplay = (props) => {
  console.log(props.filteredResults.imageURL);
  const display = props.filteredResults.map((x) => {
    return (
      <Col sm="auto">
        <Card style={{ width: "18rem" }}>
          <Card.Img variant="top" src={x.imageURL} alt={x.recipeName} />
          <Card.Body>
            <Card.Title>{x.recipeName}</Card.Title>
            <Card.Text>{x.description}</Card.Text>
            <Card.Text>Tags: </Card.Text>
            <Card.Text>
              {x.tags.map((tag) => {
                return <Button variant="success">{tag}</Button>;
              })}
            </Card.Text>
            <Link to={`/recipe/${x._id}`}>
              <Button variant="primary">Show More</Button>
            </Link>
          </Card.Body>
        </Card>
      </Col>
    );
  });

  return (
    <Container style={{ border: "1px blue solid" }}>
      <h1>Results Display</h1>

      {props.filteredResults.length > 0 ? (
        <Row>{display}</Row>
      ) : (
        <p>No results found</p>
      )}
    </Container>
  );
};

export default QueryResultsDisplay;

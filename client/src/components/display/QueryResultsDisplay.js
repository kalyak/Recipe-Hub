import { Container, Card, Button, Col, Row, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";

const QueryResultsDisplay = (props) => {
  // console.log(props.filteredResults.imageURL);
  const display = props.filteredResults.map((x) => {
    return (
      <Col sm="auto">
        <Card style={{ width: "18rem" }}>
          <Card.Img variant="top" src={x.imageURL} alt={x.recipeName} />
          <Card.Body>
            <Card.Title>{x.recipeName}</Card.Title>
            <Card.Text>{x.description}</Card.Text>
            <Card.Text>
              Tags:
              <br />
              {x.tags.map((tag) => {
                return (
                  <>
                    <Link to="/browse">
                      <Badge variant="success">{tag}</Badge>
                    </Link>
                  </>
                );
              })}
            </Card.Text>
            <Row className="justify-content-md-center">
              <Link to={`/recipe/${x._id}`}>
                <Button variant="primary">Show More</Button>
              </Link>
            </Row>
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

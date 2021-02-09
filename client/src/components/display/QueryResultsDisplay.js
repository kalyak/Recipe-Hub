import { Container, Card, Button, Col, Row, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";

const QueryResultsDisplay = (props) => {
  console.log(props.filteredResults);
  const display = props.filteredResults.map((recipe) => {
    return (
      <Col sm="auto">
        <Card style={{ width: "18rem" }}>
          <Card.Img
            variant="top"
            src={recipe.imageURL}
            alt={recipe.recipeName}
          />
          <Card.Body>
            <Card.Title>
              {recipe.recipeName}
              <ReactStars value={recipe.avgRating} edit={false} />
            </Card.Title>
            <Card.Text>{recipe.description}</Card.Text>
            <Card.Text>
              Tags:
              <br />
              {recipe.tags
                .sort((a, b) => (a > b ? 1 : -1))
                .map((tag) => {
                  return (
                    <>
                      <Link to="/browse">
                        <Badge variant="success" className="text-capitalize">
                          {tag}
                        </Badge>
                      </Link>
                    </>
                  );
                })}
            </Card.Text>
            <Row className="justify-content-md-center">
              <Link to={`/recipe/${recipe._id}`}>
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
      <h1>Results:</h1>

      {props.filteredResults.length > 0 ? (
        <Row>{display}</Row>
      ) : (
        <h4 className="text-center">No results found</h4>
      )}
    </Container>
  );
};

export default QueryResultsDisplay;

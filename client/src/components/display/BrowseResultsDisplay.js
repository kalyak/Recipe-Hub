import { Container, Card, Button, Col, Row, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Fragment } from "react";
import ReactStars from "react-rating-stars-component";

const BrowseResultsDisplay = (props) => {
  // console.log(props.filteredResults);
  // console.log(typeof props.filteredResults);

  // console.log(props.filteredResults.imageURL);
  const display = props.filteredResults.map((recipe) => {
    return (
      <Col sm="auto" key={recipe._id}>
        <Card style={{ width: "18rem" }}>
          <Card.Img variant="top" src={recipe.imgURL} alt={recipe.recipeName} />
          <Card.Body>
            <Card.Title>
              <p className="text-capitalize">{recipe.recipeName}</p>
              <ReactStars value={recipe.avgRating} edit={false} isHalf={true} />
            </Card.Title>
            <Card.Text>{recipe.description}</Card.Text>
            <Card.Text>
              Tags:
              <br />
              {recipe.tags
                .sort((a, b) => (a.tagName > b.tagName ? 1 : -1))
                .map((tag) => {
                  return (
                    <Fragment key={tag._id}>
                      <Link
                        to={`/browse`}
                        onClick={(e) => {
                          props.setBrowsingTag({ tag: tag._id });
                        }}
                      >
                        <Badge variant="success" className="text-capitalize">
                          {tag.tagName}
                        </Badge>
                      </Link>
                    </Fragment>
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
      <h1>Results Display</h1>

      {props.filteredResults.length > 0 ? (
        <Row>{display}</Row>
      ) : (
        <h4 className="text-center">No results found</h4>
      )}
    </Container>
  );
};

export default BrowseResultsDisplay;

import { useEffect, useState, Fragment } from "react";
import { Row, Col, Card, Button, Badge, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import sampleImage from "../pages/sampleimage.jpg";

const TopRating = () => {
  const [topRating, setTopRating] = useState([]);

  useEffect(() => {
    axios
      .get("/recipes?sort=-avgRating&limit=3")
      .then((response) => {
        setTopRating(response.data);
      })
      .catch((error) => {
        console.log(error.response);
      });
  }, []);

  return (
    <Container>
      <Row>
        {topRating.length > 0 &&
          topRating.map((recipe) => {
            return (
              <Col md={4} key={recipe._id}>
                <Card style={{ width: "18rem" }} className="mb-5 ml-5">
                  <Card.Img variant="top" src={sampleImage} />
                  <Card.Body>
                    <Card.Title>{recipe.recipeName}</Card.Title>
                    <Card.Text>{recipe.description}</Card.Text>
                    <Card.Text>
                      Tags:
                      <br />
                      {recipe.tags.map((tag) => {
                        return (
                          <Fragment key={tag._id}>
                            <Link to={`/browse?tag=${tag._id}`}>
                              <Badge variant="success">{tag.tagName}</Badge>
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
          })}
      </Row>
    </Container>
  );
};
export default TopRating;

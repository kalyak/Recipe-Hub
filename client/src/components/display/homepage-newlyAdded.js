import { useEffect, useState, Fragment } from "react";
import { Row, Col, Card, Button, Badge, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import sampleImage from "../pages/sampleimage.jpg";
import ReactStars from "react-rating-stars-component";

const NewlyAdded = () => {
  const [newlyAdded, setNewlyAdded] = useState([]);

  useEffect(() => {
    axios
      .get("/recipes?sort=-createdAt&limit=3")
      .then((response) => {
        setNewlyAdded(response.data);
      })
      .catch((error) => {
        console.log(error.response);
      });
  }, []);

  return (
    <Container>
      <Row>
        {newlyAdded.length > 0 &&
          newlyAdded.map((recipe) => {
            return (
              <Col md={4} key={recipe._id}>
                <Card style={{ width: "18rem" }} className="mb-5 ml-5">
                  <Card.Img variant="top" src={sampleImage} />
                  <Card.Body>
                    <Card.Title className="text-capitalize">
                      {recipe.recipeName}
                      <ReactStars
                        value={recipe.avgRating}
                        edit={false}
                        isHalf={true}
                      />
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
                              <Link to={`/browse?tag=${tag._id}`}>
                                <Badge
                                  className="text-capitalize"
                                  variant="success"
                                >
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
          })}
      </Row>
    </Container>
  );
};
export default NewlyAdded;

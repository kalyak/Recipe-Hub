import { useEffect, useState } from "react";
import { Row, Col, Card, Button } from "react-bootstrap";
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
    <Row>
      {topRating.length > 0 &&
        topRating.map((recipe) => {
          return (
            <Col md={4}>
              <Card style={{ width: "18rem" }} className="mb-5 ml-5">
                <Card.Img variant="top" src={sampleImage} />
                <Card.Body>
                  <Card.Title>{recipe.recipeName}</Card.Title>
                  <Card.Text>{recipe.description}</Card.Text>
                  <Link to={`/recipe/${recipe._id}`}>
                    <Button variant="primary">Show More</Button>
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
    </Row>
  );
};
export default TopRating;

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card, Button, Row, Col } from "react-bootstrap";
import axios from "axios";
import HomePageData from "./sampleData";
import sampleImage from "./sampleimage.jpg";

const HomePage = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    // axios
    //   .get()
    //   .then((response) => {
    //     setData(response.data);
    //   })
    //   .catch((error) => {
    //     console.log(error.response);
    //   });
    console.log(HomePageData);
    setData(HomePageData);
  }, []);

  return (
    <>
      <h1>RECIPE HUB</h1>
      <h1>Placeholder for some headlines </h1>
      <h3>Top Rating Recipes</h3>
      <Row>
        {data.topRating !== undefined &&
          data.topRating.map((recipe) => {
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
      <h3>Newly Added Recipes</h3>
      <Row>
        {data.newlyAdded !== undefined &&
          data.topRating.map((recipe) => {
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
      <h3>Browse by categories for your meal</h3>
      <Row>
        {data.categories !== undefined &&
          data.categories.map((category) => {
            return (
              <Col md={4}>
                <Link to={`/search/${category}`}>
                  <Button variant="info">{category}</Button>
                </Link>
              </Col>
            );
          })}
      </Row>
    </>
  );
};

export default HomePage;

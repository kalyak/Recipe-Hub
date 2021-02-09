import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Row, Col, Container } from "react-bootstrap";
import axios from "axios";
import TopRating from "../display/homepage-topRating";
import NewlyAdded from "../display/homepage-newlyAdded";

const HomePage = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    console.log("home page");
    axios
      .get("/tags/categories")
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.log(error.response);
      });
  }, []);

  return (
    <Container>
      <h1>RECIPE HUB</h1>
      <h1>Placeholder for some headlines </h1>
      <h3>Top Rating Recipes</h3>
      <TopRating />
      <h3>Newly Added Recipes</h3>
      <NewlyAdded />
      <h3>Browse by categories for your meal</h3>
      <Row>
        {categories.length > 0 &&
          categories
            .sort((a, b) => (a > b ? 1 : -1))
            .map((category) => {
              return (
                <Col md="auto" key={category}>
                  <Link to={`/browse`}>
                    <Button
                      variant="info"
                      className="mb-5 ml-5 text-capitalize"
                    >
                      {category}
                    </Button>
                  </Link>
                </Col>
              );
            })}
      </Row>
    </Container>
  );
};

export default HomePage;

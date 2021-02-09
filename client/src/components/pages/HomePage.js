import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Row, Col } from "react-bootstrap";
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
    <>
      <h1>RECIPE HUB</h1>
      <h1>Placeholder for some headlines </h1>
      <h3>Top Rating Recipes</h3>
      <TopRating />
      <h3>Newly Added Recipes</h3>
      <NewlyAdded />
      <h3>Browse by categories for your meal</h3>
      <Row>
        {categories.length > 0 &&
          categories.map((category) => {
            return (
              <Col md={4}>
                <Link to={`/search/${category}`}>
                  <Button variant='info' className='mb-5 ml-5'>
                    {category}
                  </Button>
                </Link>
              </Col>
            );
          })}
      </Row>
    </>
  );
};

export default HomePage;

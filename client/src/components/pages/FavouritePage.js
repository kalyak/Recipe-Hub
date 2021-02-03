import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card, Button, Row, Col } from "react-bootstrap";
import HomePageData from "./sampleData";
import sampleImage from "./sampleimage.jpg";

const FavouritePage = () => {
  const [fave, setFave] = useState([]);

  useEffect(() => {
    // axios
    //   .get()
    //   .then((response) => {
    //     setFave(response.data);
    //   })
    //   .catch((error) => {
    //     console.log(error.response);
    //   });
    console.log(HomePageData.topRating);
    setFave(HomePageData.topRating);
  }, []);

  return (
    <>
      <h1>My Favourite Recipes</h1>
      <br />
      <Row>
        {fave.length > 0 &&
          fave.map((recipe) => {
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
    </>
  );
};

export default FavouritePage;

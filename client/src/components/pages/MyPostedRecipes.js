import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card, Button, Row, Col } from "react-bootstrap";
import HomePageData from "./sampleData";
import sampleImage from "./sampleimage.jpg";

const MyPostedRecipes = () => {
  const [myRecipes, setMyRecipes] = useState("");

  useEffect(() => {
    // axios
    //   .get("/recipes/user", { withCredentials: true })
    //   .then((response) => {
    //     setMyRecipes(response.data);
    //   })
    //   .catch((error) => {
    //     console.log(error.response);
    //   });
    console.log(HomePageData.topRating);
    setMyRecipes(HomePageData.topRating);
  }, []);

  return (
    <>
      <h1>My Recipes</h1>
      <br />
      <Row>
        {myRecipes === "" ? (
          <p>Loading..</p>
        ) : myRecipes.length === 0 ? (
          <p>You have not posted any recipe yet</p>
        ) : (
          myRecipes.map((recipe) => {
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
          })
        )}
      </Row>
    </>
  );
};

export default MyPostedRecipes;
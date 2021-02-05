import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card, Button, Row, Col } from "react-bootstrap";
import axios from "axios";
import DeleteRecipe from "../buttons/DeleteRecipe";
import sampleImage from "./sampleimage.jpg";

const MyPostedRecipes = () => {
  const [myRecipes, setMyRecipes] = useState("");

  useEffect(() => {
    axios
      .get("/recipes/user", { withCredentials: true })
      .then((response) => {
        setMyRecipes(response.data);
      })
      .catch((error) => {
        console.log(error.response);
      });
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
                    <Card.Link as={Link} to={`/recipe/${recipe._id}`}>
                      Show More
                    </Card.Link>
                    <Card.Link as={Link} to={`/recipe/${recipe._id}/edit`}>
                      Edit Recipe
                    </Card.Link>
                    <DeleteRecipe recipe={recipe} />
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

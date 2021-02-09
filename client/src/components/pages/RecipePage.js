import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container } from "react-bootstrap";
import axios from "axios";
import RecipeDisplay from "../display/RecipeDisplay.js";
import ReviewDisplay from "../display/ReviewDisplay.js";
import AddReviewButton from "../display/AddReviewButton.js";

const RecipePage = () => {
  const recipeID = useParams().recipeID;
  const [recipeData, setRecipeData] = useState({
    recipeName: "No data",
    servingSize: 0,
    prepTime: 0,
    prepTimeUnit: "mins",
    cookTime: 0,
    cookTimeUnit: "mins",
    tags: [{ _id: 0, tagName: "No data", tagCategory: "No data" }],
    description: "No data",
    ingredientList: [
      {
        quantity: 0,
        units: "No data",
        ingredient: {
          _id: "No data",
          ingredientName: "No data",
        },
        _id: 0,
      },
    ],
    instructions: ["No data"],
    userID: { username: "", _id: "" },
    avgRating: 0,
    reviews: [
      {
        userID: {
          _id: 0,
          username: "No data",
        },
        userRating: 0,
        userReview: "No data",
      },
    ],
    imageURL: "",
  });

  // console.log(recipeData);

  useEffect(() => {
    axios
      .get(`/recipes/${recipeID}`)
      .then((response) => {
        // console.log(response);
        setRecipeData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <Container>
      <br />
      <br />
      {/* <h1>Recipe</h1> */}
      <RecipeDisplay recipeData={recipeData} />
      <br />
      <br />
      <AddReviewButton
        reviews={recipeData.reviews}
        setRecipeData={setRecipeData}
      />
      <br />
      <br />
      <ReviewDisplay reviews={recipeData.reviews} />
    </Container>
  );
};

export default RecipePage;

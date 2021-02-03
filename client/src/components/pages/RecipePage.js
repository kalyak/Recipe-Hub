import { useEffect, useState } from "react";
import { Row } from "react-bootstrap";
import axios from "axios";
import RecipeDisplay from "../display/RecipeDisplay.js";
import ReviewDisplay from "../display/ReviewDisplay.js";
import sampleimg from "./sampleimage.jpg";
import AddReviewButton from "../display/AddReviewButton.js";

const RecipePage = () => {
  const [recipeData, setRecipeData] = useState({
    recipeName: "Recipe Name",
    servingSize: 2,
    prepTime: 30,
    prepTimeUnit: "mins",
    cookTime: 30,
    cookTimeUnit: "mins",
    tags: [
      { _id: 1, tagName: "chinese", tagCategory: "meal" },
      { _id: 2, tagName: "lunch", tagCategory: "meal" },
    ],
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia possimus repudiandae exercitationem ipsa sunt illo aperiam reiciendis beatae nesciunt! Hic, animi aperiam possimus sint voluptatibus veniam aut quibusdam ducimus cupiditate tempora voluptatem culpa aspernatur exercitationem deleniti temporibus facilis velit, sequi totam ad earum libero, eveniet iste nesciunt. Sunt, provident sit!",
    ingredientList: [
      {
        quantity: 1,
        units: "piece",
        ingredient: "tomato",
      },
      {
        quantity: 12,
        units: "piece",
        ingredient: "egg",
      },
    ],
    instructions: [
      "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      "Mollitia possimus repudiandae exercitationem ipsa sunt illo aperiam reiciendis beatae nesciunt.",
      "Hic, animi aperiam possimus sint voluptatibus veniam aut quibusdam ducimus cupiditate tempora.",
    ],
    // userID: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
    avgRating: 2,
    reviews: [
      {
        userID: "Username",
        userRating: 1,
        userReview:
          "vsequi totam ad earum libero, eveniet iste nesciunt. Sunt, provident sit!",
      },
      {
        userID: "Username2",
        userRating: 2,
        userReview:
          "vsequi totam ad earum libero, eveniet iste nesciunt. Sunt, provident sit!",
      },
      {
        userID: "Username3",
        userRating: 3,
        userReview:
          "vsequi totam ad earum libero, eveniet iste nesciunt. Sunt, provident sit!",
      },
    ],
    imageURL: sampleimg,
  });

  console.log(recipeData);

  //   useEffect(() => {
  //     axios
  //       .get()
  //       .then((response) => {
  //         console.log(response);
  //         setRecipeData();
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   });

  return (
    <>
      <h1>Recipe Page</h1>
      <RecipeDisplay recipeData={recipeData} />
      <br />
      <br />
      <AddReviewButton />
      <br />
      <br />
      <ReviewDisplay reviews={recipeData.reviews} />
    </>
  );
};

export default RecipePage;

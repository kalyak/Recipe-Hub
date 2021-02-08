import { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import HomePageData from "./sampleData";

const RandomRecipePage = () => {
  const [randomRecipeID, setRandomRecipeID] = useState("");

  useEffect(() => {
    axios
      .get("/recipes/random")
      .then((response) => {
        console.log(response.data[0]._id);
        setRandomRecipeID(response.data[0]._id);
      })
      .catch((error) => {
        console.log(error.response);
      });
    // console.log(HomePageData);
    // setRandomRecipeID(HomePageData.topRating[0]._id);
  }, []);

  if (randomRecipeID !== "") {
    return <Redirect to={`/recipe/${randomRecipeID}`} />;
  }

  return <h1>Loading your random recipe..</h1>;
};

export default RandomRecipePage;

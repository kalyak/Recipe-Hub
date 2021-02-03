import { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import HomePageData from "./sampleData";

const RandomRecipePage = () => {
  const [randomRecipeID, setRandomRecipeID] = useState("");

  useEffect(() => {
    // axios
    //   .get()
    //   .then((response) => {
    //     setRandomRecipeID(response.data._id);
    //   })
    //   .catch((error) => {
    //     console.log(error.response);
    //   });
    console.log(HomePageData);
    setRandomRecipeID(HomePageData.topRating[0]._id);
  }, []);

  if (randomRecipeID !== "") {
    return <Redirect to={`/recipe/${randomRecipeID}`} />;
  }

  return <h1>Loading your random recipe..</h1>;
};

export default RandomRecipePage;

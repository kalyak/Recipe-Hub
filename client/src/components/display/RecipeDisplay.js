import { useState, useEffect } from "react";
import axios from "axios";
import sampleimg from "../pages/sampleimage.jpg";
import { Container, Row, Col } from "react-bootstrap";
import RecipeInfo from "./RecipeInfo";
import InstructionList from "./InstructionList.js";
import IngredientList from "./IngredientList.js";
import TagList from "./TagList.js";

const RecipeDisplay = (props) => {
  return (
    <Container style={{ border: "1px black solid" }}>
      <Row className="justify-content-md-center">
        <h1>{props.recipeData.recipeName}</h1>
      </Row>
      <br />

      <Row className="justify-content-md-center">
        <img
          src={props.recipeData.imageURL}
          alt={props.recipeData.recipeName}
        />
      </Row>
      <br />

      <RecipeInfo recipeData={props.recipeData} />
      <br />

      <TagList tags={props.recipeData.tags} />
      <br />
      <br />
      <IngredientList ingredientList={props.recipeData.ingredientList} />
      <InstructionList instructions={props.recipeData.instructions} />
    </Container>
  );
};

export default RecipeDisplay;

import { Container, Row, Col } from "react-bootstrap";
import RecipeInfo from "./RecipeInfo";
import InstructionList from "./InstructionList.js";
import IngredientList from "./IngredientList.js";
import TagList from "./TagList.js";
import dayjs from "dayjs";
import AddtoFavePlanner from "./AddtoFavePlanner";

const RecipeDisplay = (props) => {
  let now = dayjs(props.recipeData.updatedAt).format("DD/MMM/YYYY");
  // console.log(now);

  return (
    <Container>
      <Row className="justify-content-md-center">
        <h1 className="text-capitalize">{props.recipeData.recipeName}</h1>
      </Row>
      <Row className="justify-content-md-center">
        <Col sm="auto">Posted by: {props.recipeData.userID.username}</Col>
        <Col sm="auto">Posted on: {now}</Col>
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

      <AddtoFavePlanner recipeID={props.recipeData._id} />

      <TagList tags={props.recipeData.tags} />
      <br />
      <br />
      <IngredientList ingredientList={props.recipeData.ingredientList} />
      <InstructionList instructions={props.recipeData.instructions} />
    </Container>
  );
};

export default RecipeDisplay;

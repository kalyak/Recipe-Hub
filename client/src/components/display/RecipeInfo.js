import { Row, Col, OverlayTrigger, Tooltip } from "react-bootstrap";
import ReactStars from "react-rating-stars-component";
import cuttingImg from "../icons/cutting.svg";
import fryingpanImg from "../icons/frying-pan.svg";
import servingImg from "../icons/food-serving.svg";

const RecipeInfo = (props) => {
  return (
    <>
      <Row className="justify-content-md-center">
        <Col md="auto">
          <ReactStars
            value={props.recipeData.avgRating}
            isHalf={true}
            edit={false}
            size={30}
          />
          <p>Average Rating: {props.recipeData.avgRating} / 5</p>
        </Col>
        <Col md="auto">
          <OverlayTrigger
            placement="bottom"
            overlay={<Tooltip>Estimated Preparation Time</Tooltip>}
          >
            <img src={cuttingImg} style={{ height: "50px" }} />
          </OverlayTrigger>
          <p>
            {props.recipeData.prepTime} {props.recipeData.prepTimeUnit}
          </p>
        </Col>
        <Col md="auto">
          <OverlayTrigger
            placement="bottom"
            overlay={<Tooltip>Estimated Cooking Time</Tooltip>}
          >
            <img src={fryingpanImg} style={{ height: "50px" }} />
          </OverlayTrigger>
          <p>
            {props.recipeData.cookTime} {props.recipeData.cookTimeUnit}
          </p>
        </Col>
        <Col md="auto">
          <OverlayTrigger
            placement="bottom"
            overlay={<Tooltip>Serving Size</Tooltip>}
          >
            <img src={servingImg} style={{ height: "50px" }} />
          </OverlayTrigger>
          <p>{props.recipeData.servingSize} pax</p>
        </Col>
      </Row>
      <br />
      <p>{props.recipeData.description}</p>
    </>
  );
};

export default RecipeInfo;

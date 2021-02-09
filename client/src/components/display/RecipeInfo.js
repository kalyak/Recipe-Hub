import { Row, Col, OverlayTrigger, Tooltip, Container } from "react-bootstrap";
import ReactStars from "react-rating-stars-component";
import cuttingImg from "../icons/cutting.svg";
import fryingpanImg from "../icons/frying-pan.svg";
import servingImg from "../icons/food-serving.svg";

const RecipeInfo = (props) => {
  // console.log(props.recipeData.avgRating);
  let rating = props.recipeData.avgRating;

  const Stars = () => {
    return (
      <ReactStars
        value={props.recipeData.avgRating}
        isHalf={true}
        edit={false}
        size={30}
      />
    );
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md="auto">
          <Stars />
          {rating !== undefined ? (
            <p className="text-center">
              Average Rating: {props.recipeData.avgRating} / 5
            </p>
          ) : (
            <p className="text-center">No rating yet</p>
          )}
        </Col>
        <Col md="auto" className="text-center">
          {/* <OverlayTrigger
            placement="bottom"
            overlay={<Tooltip>Estimated Preparation Time</Tooltip>}
          > */}
          <img src={cuttingImg} alt="icon" style={{ height: "50px" }} />
          {/* </OverlayTrigger> */}
          <p>
            {props.recipeData.prepTime} {props.recipeData.prepTimeUnit}
          </p>
        </Col>
        <Col md="auto" className="text-center">
          {/* <OverlayTrigger
            placement="bottom"
            overlay={<Tooltip>Estimated Cooking Time</Tooltip>}
          > */}
          <img src={fryingpanImg} alt="icon" style={{ height: "50px" }} />
          {/* </OverlayTrigger> */}
          <p>
            {props.recipeData.cookTime} {props.recipeData.cookTimeUnit}
          </p>
        </Col>
        <Col md="auto" className="text-center">
          {/* <OverlayTrigger
            placement="bottom"
            overlay={<Tooltip>Serving Size</Tooltip>}
          > */}
          <img src={servingImg} alt="icon" style={{ height: "50px" }} />
          {/* </OverlayTrigger> */}
          <p>{props.recipeData.servingSize} pax</p>
        </Col>
      </Row>
      <br />
      <h2>Description</h2>
      <p>{props.recipeData.description}</p>
    </Container>
  );
};

export default RecipeInfo;

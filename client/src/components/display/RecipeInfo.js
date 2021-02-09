import { Row, Col, OverlayTrigger, Tooltip, Container } from "react-bootstrap";
import ReactStars from "react-rating-stars-component";
import cuttingImg from "../icons/cutting.svg";
import fryingpanImg from "../icons/frying-pan.svg";
import servingImg from "../icons/food-serving.svg";

const RecipeInfo = ({ recipeData }) => {
  // console.log(recipeData.avgRating);
  let rating = recipeData.avgRating;

  const Stars = () => {
    return (
      <ReactStars
        value={recipeData.avgRating}
        isHalf={true}
        edit={false}
        size={30}
      />
    );
  };

  return (
    <Container>
      <Row className='justify-content-md-center'>
        <Col md='auto'>
          <Stars />
          {rating !== undefined ? (
            <p className='text-center'>
              Average Rating: {recipeData.avgRating} / 5
            </p>
          ) : (
            <p className='text-center'>No rating yet</p>
          )}
        </Col>
        <Col md='auto' className='text-center'>
          {/* <OverlayTrigger
            placement="bottom"
            overlay={<Tooltip>Estimated Preparation Time</Tooltip>}
          > */}
          <img src={cuttingImg} alt='icon' style={{ height: "50px" }} />
          {/* </OverlayTrigger> */}
          <p>
            {recipeData.prepTime} {recipeData.prepTimeUnit}
          </p>
        </Col>
        <Col md='auto' className='text-center'>
          {/* <OverlayTrigger
            placement="bottom"
            overlay={<Tooltip>Estimated Cooking Time</Tooltip>}
          > */}
          <img src={fryingpanImg} alt='icon' style={{ height: "50px" }} />
          {/* </OverlayTrigger> */}
          <p>
            {recipeData.cookTime} {recipeData.cookTimeUnit}
          </p>
        </Col>
        <Col md='auto' className='text-center'>
          {/* <OverlayTrigger
            placement="bottom"
            overlay={<Tooltip>Serving Size</Tooltip>}
          > */}
          <img src={servingImg} alt='icon' style={{ height: "50px" }} />
          {/* </OverlayTrigger> */}
          <p>{recipeData.servingSize} pax</p>
        </Col>
      </Row>
      <br />
      <h2>Description</h2>
      <p>{recipeData.description}</p>
    </Container>
  );
};

export default RecipeInfo;

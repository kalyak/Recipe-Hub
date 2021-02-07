import axios from "axios";
import { Row, Col, Container } from "react-bootstrap";
import favourite from "../icons/like.svg";
import planner from "../icons/notebook.svg";

const AddtoFavePlanner = (props) => {
  const handleAddToFavourite = (event) => {
    console.log("added");
    console.log(props.recipeID);

    // axios
    //   .post()
    //   .then((response) => {
    //     console.log(response);
    //   })
    //   .catch((error) => console.log(error));
  };

  const handleAddToPlanner = (event) => {
    console.log("added");
    console.log(props.recipeID);

    // axios
    //   .post()
    //   .then((response) => {
    //     console.log(response);
    //   })
    //   .catch((error) => console.log(error));
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col
          sm="auto"
          className="text-center"
          onClick={(e) => {
            handleAddToFavourite(e);
          }}
        >
          <img src={favourite} alt="icon" style={{ height: "50px" }} />
          <p>Add to Favourite</p>
        </Col>
        <Col
          sm="auto"
          className="text-center"
          onClick={(e) => {
            handleAddToPlanner(e);
          }}
        >
          <img src={planner} alt="icon" style={{ height: "50px" }} />
          <p>Add to Planner</p>
        </Col>
      </Row>
    </Container>
  );
};

export default AddtoFavePlanner;

import axios from "axios";
import { Row, Col, Container } from "react-bootstrap";
import favourite from "../icons/like.svg";
import planner from "../icons/notebook.svg";

const AddtoFavePlanner = ({ recipeID }) => {
  // const handleAddToFavourite = (event) => {
  //   console.log("added");
  //   console.log(props.recipeID);

  //   // axios
  //   //   .post()
  //   //   .then((response) => {
  //   //     console.log(response);
  //   //   })
  //   //   .catch((error) => console.log(error));
  // };

  // const handleAddToPlanner = (event) => {
  //   console.log("added");
  //   console.log(props.recipeID);

  //   // axios
  //   //   .post()
  //   //   .then((response) => {
  //   //     console.log(response);
  //   //   })
  //   //   .catch((error) => console.log(error));
  // };

  const handleAdd = (event) => {
    const key = event.target.id ? event.target.id : event.target.name;
    console.log(key, recipeID);
    const data =
      key === "planner"
        ? { [key]: { recipeID: recipeID } }
        : { [key]: recipeID };
    console.log(data);
    axios
      .put("/users", data)
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Container>
      <Row className='justify-content-md-center'>
        <Col
          sm='auto'
          className='text-center'
          id='favourites'
          // onClick={(e) => {
          //   handleAddToFavourite(e);
          // }}
          onClick={handleAdd}
        >
          <img
            src={favourite}
            alt='icon'
            style={{ height: "50px" }}
            name='favourites'
          />
          <p>Add to Favourite</p>
        </Col>
        <Col
          sm='auto'
          className='text-center'
          id='planner'
          // onClick={(e) => {
          //   handleAddToPlanner(e);
          // }}
          onClick={handleAdd}
        >
          <img
            src={planner}
            alt='icon'
            style={{ height: "50px" }}
            name='planner'
          />
          <p>Add to Planner</p>
        </Col>
      </Row>
    </Container>
  );
};

export default AddtoFavePlanner;

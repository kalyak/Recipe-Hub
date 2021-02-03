import { Button, Row, Modal } from "react-bootstrap";
import { useState } from "react";
import ReactStars from "react-rating-stars-component";
import axios from "axios";

// CHIlD COMPONENT
const MyVerticallyCenteredModal = (props) => {
  const [reviewData, setReviewData] = useState({});

  const handleChange = (event) => {
    setReviewData((state) => {
      return { ...state, [event.target.name]: event.target.value };
    });
  };

  const handleRating = (event) => {
    console.log(event);
    setReviewData((state) => {
      return { ...state, userRating: event };
    });
  };

  const handleClose = (event) => {
    props.onHide();
    setReviewData({});
  };

  const handleSubmit = (event) => {
    console.log("clicked");

    // axios
    //   .post()
    //   .then((response) => {
    //     console.log(response);
    //     setReviewData({ });
    //     props.onHide();
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">New Review</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ReactStars
          value={reviewData.userRating}
          size={20}
          onChange={(e) => handleRating(e)}
        />

        <textarea
          onChange={(e) => handleChange(e)}
          name="userReview"
          value={reviewData.userReview}
          style={{ width: "100%", height: "100px" }}
        ></textarea>
      </Modal.Body>
      <Modal.Footer>
        <Button type="submit" onClick={(e) => handleSubmit(e)}>
          Submit Review
        </Button>
        <Button variant="danger" onClick={(e) => handleClose(e)}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

// PARENT COMPONENT
const AddReviewButton = (props) => {
  const [modalShow, setModalShow] = useState(true);

  return (
    <>
      <Row className="justify-content-md-center">
        <Button onClick={() => setModalShow(true)}>Add a Review</Button>
        <MyVerticallyCenteredModal
          show={modalShow}
          onHide={() => setModalShow(false)}
        />
      </Row>
    </>
  );
};

export default AddReviewButton;

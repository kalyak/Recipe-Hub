import { Button, Row, Modal } from "react-bootstrap";
import { useState } from "react";
import ReactStars from "react-rating-stars-component";
import axios from "axios";

// CHIlD COMPONENT
const MyVerticallyCenteredModal = (props) => {
  const [isInputValid, setIsInputValid] = useState(false);
  const [reviewData, setReviewData] = useState({ recipeID: props.recipeID });
  console.log("review", reviewData);
  const handleChange = (event) => {
    if (reviewData.userRating !== undefined && event.target.value.length > 0) {
      setIsInputValid(true);
    } else {
      setIsInputValid(false);
    }
    setReviewData((state) => {
      return { ...state, [event.target.name]: event.target.value };
    });
  };

  const handleRating = (event) => {
    if (
      event > 0 &&
      reviewData.userReview !== undefined &&
      reviewData.userReview.length > 0
    ) {
      setIsInputValid(true);
    } else {
      setIsInputValid(false);
    }
    // console.log(event);
    setReviewData((state) => {
      return { ...state, userRating: event };
    });
  };

  const handleClose = (event) => {
    props.onHide();
    setReviewData({});
  };

  const handleSubmitReview = (event) => {
    console.log("clicked");
    reviewData["userID"] = {
      _id: 1,
      username: "",
    };
    let newReviews = props.reviews;
    newReviews.unshift(reviewData);
    // console.log(oldReviews);
    props.setRecipeData((state) => {
      return { ...state, reviews: newReviews };
    });
    props.onHide();

    axios
      .post("/reviews/new", reviewData, { withCredentials: true })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Modal
      show={props.show}
      onHide={props.onHide}
      // {...props}
      size='lg'
      aria-labelledby='contained-modal-title-vcenter'
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id='contained-modal-title-vcenter'>New Review</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ReactStars
          value={reviewData.userRating}
          size={20}
          onChange={(e) => handleRating(e)}
        />

        <textarea
          onChange={(e) => handleChange(e)}
          name='userReview'
          value={reviewData.userReview}
          style={{ width: "100%", height: "100px" }}
          placeholder='Input your review here'
        />
      </Modal.Body>
      <Modal.Footer>
        {isInputValid ? (
          <Button type='submit' onClick={(e) => handleSubmitReview(e)}>
            Submit Review
          </Button>
        ) : (
          ""
        )}
        <Button variant='danger' onClick={(e) => handleClose(e)}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

// PARENT COMPONENT
const AddReviewButton = (props) => {
  const [modalShow, setModalShow] = useState(false);

  return (
    <>
      <Row className='justify-content-md-center'>
        <Button onClick={() => setModalShow(true)}>Add a Review</Button>
        <MyVerticallyCenteredModal
          show={modalShow}
          onHide={() => setModalShow(false)}
          reviews={props.reviews}
          setRecipeData={props.setRecipeData}
          recipeID={props.recipeID}
        />
      </Row>
    </>
  );
};

export default AddReviewButton;

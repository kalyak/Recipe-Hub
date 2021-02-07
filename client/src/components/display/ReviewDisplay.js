import ReviewList from "./ReviewList";
import { Container, Button, Row } from "react-bootstrap";

const ReviewDisplay = (props) => {
  const NoReview = () => {
    return (
      <>
        <p>No reviews found.</p>
      </>
    );
  };

  return (
    <Container style={{ border: "1px red solid" }}>
      <h2>Reviews</h2>

      {props.reviews.length === 0 ? (
        <NoReview />
      ) : (
        <ReviewList reviews={props.reviews} />
      )}
    </Container>
  );
};

export default ReviewDisplay;

import ReviewList from "./ReviewList";
import { Container, Button, Row } from "react-bootstrap";

const ReviewDisplay = (props) => {
  return (
    <Container style={{ border: "1px red solid" }}>
      <ReviewList reviews={props.reviews} />
    </Container>
  );
};

export default ReviewDisplay;

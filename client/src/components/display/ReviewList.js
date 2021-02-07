import { Card, Row, Col } from "react-bootstrap";
import ReactStars from "react-rating-stars-component";
import dayjs from "dayjs";

const ReviewList = (props) => {
  const listReviews = props.reviews.map((review) => {
    return (
      <Card key={review.userID._id}>
        <Card.Body>
          <Row>
            <Col sm="auto">
              <Card.Title>
                <ReactStars
                  value={review.userRating}
                  isHalf={true}
                  edit={false}
                />
              </Card.Title>
            </Col>
            <Col sm="auto">
              <Card.Title>{review.userID.username}</Card.Title>
            </Col>
          </Row>
          <Card.Text>{review.userReview}</Card.Text>
        </Card.Body>
      </Card>
    );
  });

  return <>{listReviews}</>;
};

export default ReviewList;

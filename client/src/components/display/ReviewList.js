import { Card, Row, Col } from "react-bootstrap";
import ReactStars from "react-rating-stars-component";

const ReviewList = (props) => {
  const listReviews = props.reviews.map((review) => {
    return (
      <>
        <Card>
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
                <Card.Title>{review.userID}</Card.Title>
              </Col>
            </Row>
            <Card.Text>{review.userReview}</Card.Text>
          </Card.Body>
        </Card>
        <br />
      </>
    );
  });

  return (
    <>
      <h2>Reviews</h2>
      {listReviews}
    </>
  );
};

export default ReviewList;

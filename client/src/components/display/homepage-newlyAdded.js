import { useEffect, useState, Fragment } from "react";
import {
  Row,
  Col,
  Card,
  Button,
  Badge,
  Container,
  CardDeck,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
// import sampleImage from "../pages/sampleimage.jpg";
import noImage from "../icons/600px-No_image_available_600_x_450.png";
import ReactStars from "react-rating-stars-component";

const NewlyAdded = () => {
  const [newlyAdded, setNewlyAdded] = useState([]);

  useEffect(() => {
    axios
      .get("/recipes?sort=-createdAt&limit=3")
      .then((response) => {
        setNewlyAdded(response.data);
      })
      .catch((error) => {
        console.log(error.response);
      });
  }, []);

  return (
    <Container>
      <CardDeck>
        {newlyAdded.length > 0 &&
          newlyAdded.map((recipe) => {
            const image = recipe.imgURL ? recipe.imgURL : noImage;
            return (
              // <Col md={4} key={recipe._id}>
              <Card
                key={recipe._id}
                style={{ width: "18rem" }}
                className='mb-5 ml-5'
              >
                <Card.Img width={288} height={216} variant='top' src={image} />
                <Card.Body>
                  <Card.Title className='text-capitalize'>
                    {recipe.recipeName}
                    <ReactStars value={recipe.avgRating} edit={false} />
                  </Card.Title>
                  <Card.Text>{recipe.description}</Card.Text>{" "}
                  <Row className='justify-content-md-center'>
                    <Link to={`/recipe/${recipe._id}`}>
                      <Button variant='primary'>Show More</Button>
                    </Link>
                  </Row>
                </Card.Body>
                <Card.Footer>
                  {/* <Card.Text> */}
                  Tags:
                  <br />
                  {recipe.tags
                    .sort((a, b) => (a.tagName > b.tagName ? 1 : -1))
                    .map((tag) => {
                      return (
                        <Fragment key={tag._id}>
                          <Link to={`/browse?tag=${tag._id}`}>
                            <Badge
                              className='text-capitalize'
                              variant='success'
                            >
                              {tag.tagName}
                            </Badge>
                          </Link>
                        </Fragment>
                      );
                    })}
                  {/* </Card.Text> */}
                </Card.Footer>
              </Card>
              // </Col>
            );
          })}
      </CardDeck>
    </Container>
  );
};
export default NewlyAdded;

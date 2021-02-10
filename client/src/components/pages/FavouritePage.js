import { useEffect, useState, Fragment } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  Button,
  Row,
  Col,
  CardDeck,
  Container,
  Badge,
} from "react-bootstrap";
import noImage from "../icons/600px-No_image_available_600_x_450.png";
import dayjs from "dayjs";
import ReactStars from "react-rating-stars-component";
import axios from "axios";

const FavouritePage = () => {
  const [fave, setFave] = useState("");

  useEffect(() => {
    axios
      .get("/users/favourites", { withCredentials: true })
      .then((response) => {
        setFave(response.data);
      })
      .catch((error) => {
        console.log(error.response);
      });
    // console.log(HomePageData.topRating);
    // setFave(HomePageData.topRating);
  }, []);

  return (
    <Container>
      <h1 className="text-center">My Favourite Recipes</h1>
      <br />
      <Container>
        {fave === "" ? (
          <p>Loading..</p>
        ) : fave.length === 0 ? (
          <p>You do not have any favourite recipe yet</p>
        ) : (
          <CardDeck className="row row-cols-1 row-cols-sm-2 row-cols-lg-3">
            {fave.map((recipe) => {
              const image = recipe.imgURL ? recipe.imgURL : noImage;
              const updatedDate = dayjs(recipe.updatedAt).format("DD/MMM/YYYY");
              // console.log(recipe);

              return (
                <Col className="pb-5" key={recipe._id}>
                  <Card
                    key={recipe._id}
                    style={{ width: "18rem" }}
                    // className='mb-5 ml-5'
                    className="h-100"
                  >
                    <Card.Img
                      width={288}
                      height={216}
                      variant="top"
                      src={image}
                    />
                    <Card.Body>
                      <Card.Title className="text-capitalize">
                        {recipe.recipeName}
                        <ReactStars
                          value={recipe.avgRating}
                          edit={false}
                          isHalf={true}
                        />
                      </Card.Title>
                      <Card.Text
                        style={{
                          height: "6rem",
                          overflowY: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {recipe.description}
                      </Card.Text>
                      <Row className="justify-content-md-center">
                        <Link to={`/recipe/${recipe._id}`}>
                          <Button variant="primary">Show More</Button>
                        </Link>
                      </Row>
                    </Card.Body>
                    <Card.Footer>
                      {recipe.tags
                        .sort((a, b) => (a.tagName > b.tagName ? 1 : -1))
                        .map((tag) => {
                          return (
                            <Fragment key={tag._id}>
                              <Link to={`/browse?tag=${tag._id}`}>
                                <Badge
                                  className="text-capitalize"
                                  variant="success"
                                >
                                  {tag.tagName}
                                </Badge>
                              </Link>
                            </Fragment>
                          );
                        })}
                      <br />
                      <small className="text-muted">
                        Updated on: {updatedDate}
                      </small>
                    </Card.Footer>
                  </Card>
                </Col>
              );
            })}
          </CardDeck>
        )}
      </Container>
    </Container>
  );
};

export default FavouritePage;

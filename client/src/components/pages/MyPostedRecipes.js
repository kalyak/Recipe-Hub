import { useEffect, useState, Fragment } from "react";
import { Link } from "react-router-dom";
import { Card, Row, Col, CardDeck, Container, Badge } from "react-bootstrap";
import axios from "axios";
import DeleteRecipe from "../buttons/DeleteRecipe";
import noImage from "../icons/600px-No_image_available_600_x_450.png";
import dayjs from "dayjs";
import ReactStars from "react-rating-stars-component";

const MyPostedRecipes = () => {
  const [myRecipes, setMyRecipes] = useState("");

  useEffect(() => {
    axios
      .get("/recipes/user", { withCredentials: true })
      .then((response) => {
        console.log(response.data);
        setMyRecipes(response.data);
      })
      .catch((error) => {
        console.log(error.response);
      });
  }, []);

  return (
    <>
      <h1>My Recipes</h1>
      <br />
      <Container>
        {myRecipes === "" ? (
          <p>Loading..</p>
        ) : myRecipes.length === 0 ? (
          <p>You have not posted any recipe yet</p>
        ) : (
          <CardDeck className="row row-cols-1 row-cols-sm-2 row-cols-lg-3">
            {myRecipes.map((recipe, index) => {
              const image = recipe.imgURL ? recipe.imgURL : noImage;
              const updatedDate = dayjs(recipe.updatedAt).format("DD/MMM/YYYY");

              return (
                <Col className="pb-5">
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
                          height: "5rem",
                          "overflow-y": "hidden",
                          "text-overflow": "ellipsis",
                        }}
                      >
                        {recipe.description}
                      </Card.Text>
                      <Row>
                        <Card.Link as={Link} to={`/recipe/${recipe._id}`}>
                          Show More
                        </Card.Link>
                        <Card.Link as={Link} to={`/recipe/${recipe._id}/edit`}>
                          Edit Recipe
                        </Card.Link>
                      </Row>
                      <br />
                      <DeleteRecipe
                        myRecipes={myRecipes}
                        index={index}
                        setMyRecipes={setMyRecipes}
                      />
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
    </>
  );
};

export default MyPostedRecipes;

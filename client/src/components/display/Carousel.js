import dayjs from "dayjs";
import { Fragment, useState } from "react";
import { Badge, Button, Card, Carousel, Row } from "react-bootstrap";
import ReactStars from "react-rating-stars-component";
import { Link } from "react-router-dom";
import noImage from "../icons/600px-No_image_available_600_x_450.png";

const RecipeCarousel = ({ recipes }) => {
  const [defaultDisplay, setDefault] = useState(true);

  const toggleHover = () => {
    setDefault(!defaultDisplay);
  };

  return (
    <Carousel className='border border-secondary'>
      {recipes.length > 0 &&
        recipes.map((recipe) => {
          const image = recipe.imgURL ? recipe.imgURL : noImage;
          const updatedDate = dayjs(recipe.updatedAt).format("DD MMM YYYY");

          return (
            <Carousel.Item
              key={recipe._id}
              onMouseEnter={toggleHover}
              onMouseLeave={toggleHover}
            >
              <img
                className='d-block w-100'
                src={image}
                alt='recipe.recipeName'
                style={{
                  height: "500px",
                  objectFit: "cover",
                }}
              />

              {defaultDisplay ? (
                <Carousel.Caption
                  className='px-1 bg-light text-dark rounded'
                  style={{ opacity: "0.9" }}
                >
                  <h3 className='text-capitalize'>{recipe.recipeName}</h3>
                  <p>{recipe.description}</p>
                </Carousel.Caption>
              ) : (
                <Carousel.Caption
                  as={Card}
                  className=' pb-0 bg-light text-dark rounded '
                >
                  <Card.Body className='justify-content-center'>
                    <Card.Title className='text-capitalize justify-content-center'>
                      {recipe.recipeName}
                      <Row className='justify-content-center'>
                        <ReactStars
                          value={recipe.avgRating}
                          edit={false}
                          isHalf={true}
                        />
                      </Row>
                    </Card.Title>
                    <Card.Text
                      style={{
                        overflowY: "auto",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {recipe.description}
                    </Card.Text>
                    <Row className='justify-content-md-center'>
                      <Link to={`/recipe/${recipe._id}`}>
                        <Button variant='primary'>Show More</Button>
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
                                className='text-capitalize'
                                variant='success'
                              >
                                {tag.tagName}
                              </Badge>
                            </Link>
                          </Fragment>
                        );
                      })}
                    <br />
                    <small className='text-muted'>
                      Updated on: {updatedDate}
                    </small>
                  </Card.Footer>
                </Carousel.Caption>
              )}
            </Carousel.Item>
          );
        })}
    </Carousel>
  );
};

export default RecipeCarousel;

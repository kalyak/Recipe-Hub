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
import ReactStars from "react-rating-stars-component";
import noImage from "../icons/600px-No_image_available_600_x_450.png";
import dayjs from "dayjs";
import RecipeCarousel from "./Carousel";

const TopRating = () => {
  const [topRating, setTopRating] = useState([]);

  useEffect(() => {
    axios
      .get("/recipes?sort=-avgRating&limit=3")
      .then((response) => {
        // console.log(response.data);
        setTopRating(response.data);
      })
      .catch((error) => {
        console.log(error.response);
      });
  }, []);

  return (
    <Container>
      <RecipeCarousel recipes={topRating} />
    </Container>
  );
};
export default TopRating;

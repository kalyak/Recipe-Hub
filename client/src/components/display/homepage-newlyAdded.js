import { useEffect, useState, Fragment } from "react";
import {
  Row,
  Card,
  Button,
  Badge,
  Container,
  CardDeck,
  Col,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import noImage from "../icons/600px-No_image_available_600_x_450.png";
import ReactStars from "react-rating-stars-component";
import dayjs from "dayjs";
import RecipeCarousel from "./Carousel";

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
      <RecipeCarousel recipes={newlyAdded} />
    </Container>
  );
};
export default NewlyAdded;

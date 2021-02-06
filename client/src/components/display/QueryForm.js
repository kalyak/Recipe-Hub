import { useState, useEffect } from "react";
import { Container, Button, Card, Accordion, Row, Col } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import axios from "axios";
import QueryFilterResults from "./QueryFilterResults.js";
import sampleimg from "../pages/sampleimage.jpg";

const QueryForm = (props) => {
  const queryKeyword = new URLSearchParams(window.location.search).get(
    "keyword"
  );

  const [formData, setFormData] = useState({ keyword: queryKeyword });
  const [queryResults, setQueryResults] = useState([
    {
      _id: "1",
      tags: ["lunch", "dinner"],
      recipeName: "Egg Fried Rice1",
      description:
        "1If you are busy with all the preparations for the festive season, this oldie but goodie is just the thing to whip up for a simple one-dish homecooked meal.",
      avgRating: 3.5,
      imageURL: sampleimg,
    },
    {
      _id: "2",
      tags: ["breakfast", "lunch"],
      recipeName: "Egg Fried Rice2",
      description:
        "2If you are busy with all the preparations for the festive season, this oldie but goodie is just the thing to whip up for a simple one-dish homecooked meal.",
      avgRating: 3.5,
      imageURL: sampleimg,
    },
    {
      _id: "3",
      tags: ["breakfast", "supper"],
      recipeName: "Egg Fried Rice3",
      description:
        "3If you are busy with all the preparations for the festive season, this oldie but goodie is just the thing to whip up for a simple one-dish homecooked meal.",
      avgRating: 3.5,
      imageURL: sampleimg,
    },
    {
      _id: "4",
      tags: ["breakfast", "main"],
      recipeName: "Egg Fried Rice4",
      description:
        "4If you are busy with all the preparations for the festive season, this oldie but goodie is just the thing to whip up for a simple one-dish homecooked meal.",
      avgRating: 3.5,
      imageURL: sampleimg,
    },
    {
      _id: "5",
      tags: ["side dish", "chinese"],
      recipeName: "Egg Fried Rice5",
      description:
        "5If you are busy with all the preparations for the festive season, this oldie but goodie is just the thing to whip up for a simple one-dish homecooked meal.",
      avgRating: 3.5,
      imageURL: sampleimg,
    },
  ]);

  useEffect(() => {
    // axios
    //   .get("/", formData)
    //   .then((response) => {
    //     console.log(response);
    //     setQueryResults(response);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  }, []);

  const handleChange = (event) => {
    setFormData((state) => {
      return { ...state, [event.target.name]: event.target.value };
    });
  };

  const handleClick = (event) => {
    console.log("clicked");
    // axios
    //   .get('/', formData)
    //   .then((response) => {
    //     console.log(response);
    //     setQueryResults(response);
    //   })
    //   .catch((errpr) => {
    //     console.log(error);
    //   });
  };

  console.log(formData);

  return (
    <Container style={{ border: "1px solid black" }}>
      <h1>Query Form</h1>
      <h2>You are searching for {formData.keyword}</h2>
      <form>
        <input
          type="text"
          name="keyword"
          value={formData.keyword}
          placeholder="Enter Keyword"
          onChange={(e) => handleChange(e)}
        />
        <br />
        <br />
        <Button onClick={(e) => handleClick(e)}>Search</Button>
        <br />
        <br />
      </form>
      <QueryFilterResults queryResults={queryResults} />
    </Container>
  );
};

export default QueryForm;

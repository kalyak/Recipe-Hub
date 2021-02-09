import { useState, useEffect } from "react";
import { Container, Button, Form, InputGroup } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import axios from "axios";
import QueryFilterResults from "./QueryFilterResults.js";
import sampleimg from "../pages/sampleimage.jpg";

const QueryForm = (props) => {
  const queryKeyword = new URLSearchParams(window.location.search).get(
    "keyword"
  );

  const [formData, setFormData] = useState({ keyword: queryKeyword || "" });
  const [queryResults, setQueryResults] = useState([
    {
      _id: "",
      tags: [],
      recipeName: "",
      description: "",
      avgRating: 1,
      imageURL: sampleimg,
    },
  ]);

  const apiurl = `/recipes?keyword=${formData.keyword}`;
  // console.log(apiurl);

  useEffect(() => {
    axios
      .get(apiurl)
      .then((response) => {
        // console.log(response.data);
        setQueryResults([...response.data]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleChange = (event) => {
    setFormData((state) => {
      return {
        ...state,
        [event.target.name]: event.target.value.toLowerCase(),
      };
    });
  };

  const handleClick = (event) => {
    console.log("clicked");
    axios
      .get(apiurl)
      .then((response) => {
        // console.log(response.data);
        setQueryResults([...response.data]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // console.log(formData);

  return (
    <Container>
      <h2>You are searching for... {formData.keyword}</h2>
      <br />
      <InputGroup>
        <Form.Control
          type="text"
          name="keyword"
          value={formData.keyword}
          placeholder="Enter Keyword"
          onChange={(e) => handleChange(e)}
        />
        <InputGroup.Append>
          <Button onClick={(e) => handleClick(e)}>Search</Button>
        </InputGroup.Append>
      </InputGroup>
      <br />
      <br />
      <QueryFilterResults queryResults={queryResults} />
    </Container>
  );
};

export default QueryForm;

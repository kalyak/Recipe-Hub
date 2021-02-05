import { useState, useEffect } from "react";
import { Container, Button, Card, Accordion, Row, Col } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import axios from "axios";
import QueryFilterResults from "./QueryFilterResults.js";

const QueryForm = (props) => {
  const queryKeyword = new URLSearchParams(window.location.search).get(
    "keyword"
  );

  const [formData, setFormData] = useState({ keyword: queryKeyword });
  const [queryResults, setQueryResults] = useState("hi");

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
    setQueryResults("new");
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

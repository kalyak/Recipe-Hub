import { useState, useEffect } from "react";
import { Container, Button, Card, Accordion, Row, Col } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import axios from "axios";

const QueryForm = () => {
  const queryKeyword = new URLSearchParams(window.location.search).get(
    "keyword"
  );
  const [formData, setFormData] = useState({ keyword: queryKeyword });
  const [tagData, setTagData] = useState([
    {
      tagName: ["mains", "mains2"],
      tagCategory: "course",
    },
    {
      tagName: ["dinner", "lunch"],
      tagCategory: "meal",
    },
  ]);

  const handleChange = (event) => {
    setFormData((state) => {
      return { ...state, [event.target.name]: event.target.value };
    });
  };

  const handleSelect = (event) => {
    console.log(event.target.value);
    setFormData((state) => {
      return { ...state, [event.target.name]: event.target.value };
    });
  };

  console.log(formData);

  const displayTags = tagData.map((x) => {
    return (
      <Col>
        <h2>{x.tagCategory}</h2>
        <select
          name={x.tagCategory}
          onChange={(e) => {
            handleSelect(e);
          }}
        >
          <option value=""></option>
          {x.tagName.map((y) => {
            return (
              <>
                <option>{y}</option>
              </>
            );
          })}
        </select>
      </Col>
    );
  });

  return (
    <Container style={{ border: "1px solid black" }}>
      <h1>Query Form</h1>
      <h2>You are searching for {formData.keyword}</h2>
      <form>
        <label>Keywords:</label>
        <input
          type="text"
          name="keyword"
          value={formData.keyword}
          onChange={(e) => handleChange(e)}
        />
        <br />
        <br />
        <Row>{displayTags}</Row>
        <br />
        <Button>Search</Button>
      </form>
    </Container>
  );
};

export default QueryForm;

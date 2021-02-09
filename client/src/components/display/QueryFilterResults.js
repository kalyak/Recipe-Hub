import { useState, useEffect } from "react";
import { Container, Col, Row, Accordion, Card } from "react-bootstrap";
import QueryResultsDisplay from "./QueryResultsDisplay";
import axios from "axios";

const QueryFilterResults = (props) => {
  console.log(props.queryResults);

  const [tagData, setTagData] = useState([
    {
      _id: "",
      tag: [{ tagName: "", tagID: "" }],
    },
  ]);
  const [filterTarget, setFilterTarget] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  console.log(filteredResults);

  useEffect(() => {
    axios
      .get("/tags/group") // axios call for tags
      .then((response) => {
        // console.log(response.data);
        setTagData([...response.data]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    console.log("Filtering...");
    let results = props.queryResults;
    let target = [];
    console.log("results:");
    console.log(results);
    results.map((recipe) => {
      let isIncludeTarget = filterTarget.every((target) =>
        recipe.tags.includes(target)
      );
      if (isIncludeTarget) {
        target.push(recipe);
      }
      console.log(isIncludeTarget);
    });
    console.log("target:");
    console.log(target);
    setFilteredResults(target);
  }, [filterTarget]);

  const handleChange = (event) => {
    if (event.target.checked === true) {
      console.log("added " + event.target.value);
      const newFilter = [...filterTarget, event.target.value];
      setFilterTarget(newFilter);
    } else {
      console.log("removed " + event.target.value);
      const cloneArr = [...filterTarget];
      const index = cloneArr.indexOf(event.target.value);
      cloneArr.splice(index, 1);
      setFilterTarget(cloneArr);
    }
  };

  const displayTags = tagData.map((category) => {
    return (
      <Col key={category._id}>
        <h4 className="text-capitalize">{category._id}</h4>
        {category.tag.map((tag, index) => {
          return (
            <Col key={tag.tagID}>
              <label>
                <Row>
                  <Col sm="auto">
                    <input
                      type="checkbox"
                      name={tag.tagID}
                      value={tag.tagName}
                      onChange={(e) => handleChange(e)}
                    />
                  </Col>
                  <Col sm="auto" className="text-capitalize">
                    {tag.tagName}
                  </Col>
                </Row>
              </label>
            </Col>
          );
        })}
      </Col>
    );
  });

  return (
    <Container style={{ border: "1px red solid" }}>
      <h2>Select Filter:</h2>

      <Row>{displayTags}</Row>
      {/* <Accordion defaultActiveKey="0">
        <Card>
          <Accordion.Toggle as={Card.Header} eventKey="1">
            Click here to add filter
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="1">
            <Card.Body>
              <Row>{displayTags}</Row>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion> */}
      <br />
      <br />
      <QueryResultsDisplay filteredResults={props.queryResults} />
    </Container>
  );
};

export default QueryFilterResults;

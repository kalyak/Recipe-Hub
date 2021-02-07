import { useState, useEffect } from "react";
import { Container, Col, Row, Accordion, Card } from "react-bootstrap";
import QueryResultsDisplay from "./QueryResultsDisplay";

const QueryResults = (props) => {
  const [tagData, setTagData] = useState([
    {
      _id: "dietary",
      tagName: ["halal", "low carb", "gluten free", "dairy free"],
    },
    {
      _id: "course",
      tagName: ["appetizer", "mains", "dessert"],
    },
    {
      _id: "meal",
      tagName: ["lunch", "dinner", "breakfast", "supper", "side dish"],
    },
    {
      _id: "cuisine",
      tagName: ["chinese", "italian", "mediteranian", "indonesia"],
    },
  ]);
  const [filterTarget, setFilterTarget] = useState([]);
  const [filteredResults, setFilteredResults] = useState(props.queryResults);

  // useEffect(() => {
  //   axios
  //     .get() // axios call for tags
  //     .then((response) => {
  //       console.log(response);
  //       setTagData(response);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, []);

  // console.log(filterTarget);
  // console.log(filteredResults);

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
    // console.log(event.target.name);
    // console.log(event);
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
      <>
        <Col>
          <h3>{category._id}</h3>
          {category.tagName.map((tag, index) => {
            return (
              <Col>
                <label>
                  <input
                    type="checkbox"
                    key={category._id + index}
                    name={category._id}
                    value={tag}
                    onChange={(e) => handleChange(e)}
                  />
                  {tag}
                </label>
              </Col>
            );
          })}
        </Col>
      </>
    );
  });

  return (
    <Container style={{ border: "1px red solid" }}>
      <h1>Query Results Filtering</h1>
      <h2>Filter By:</h2>

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
      <QueryResultsDisplay filteredResults={filteredResults} />
    </Container>
  );
};

export default QueryResults;

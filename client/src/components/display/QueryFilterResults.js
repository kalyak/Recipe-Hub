import { useState } from "react";
import { Container, Col, Row } from "react-bootstrap";
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

  const handleClick = (event) => {
    console.log(event.target.name);
    console.log(event.target.value);
  };

  const displayTags = tagData.map((category) => {
    return (
      <>
        <Col>
          <h3>{category._id}</h3>
          {category.tagName.map((tag) => {
            return (
              <Col>
                <input
                  type="checkbox"
                  name={category._id}
                  value={tag}
                  onClick={(e) => handleClick(e)}
                />
                <label>{tag}</label>
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

      <QueryResultsDisplay queryResults={props.queryResults} />
    </Container>
  );
};

export default QueryResults;

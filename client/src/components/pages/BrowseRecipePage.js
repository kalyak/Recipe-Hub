import { useEffect, useState } from "react";
import { Row, Col, Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import HomePageData from "./sampleData";
import QueryResultsDisplay from "../display/QueryResultsDisplay";
import sampleimg from "./sampleimage.jpg";

const BrowseRecipePage = () => {
  const [tagData, setTagData] = useState([
    // {
    //   _id: "dietary",
    //   tagName: ["halal", "low carb", "gluten free", "dairy free"],
    // },
    // {
    //   _id: "course",
    //   tagName: ["appetizer", "mains", "dessert"],
    // },
    // {
    //   _id: "meal",
    //   tagName: ["lunch", "dinner", "breakfast", "supper", "side dish"],
    // },
    // {
    //   _id: "cuisine",
    //   tagName: ["chinese", "italian", "mediteranian", "indonesia"],
    // },
  ]);
  const [browsingTag, setBrowsingTag] = useState({ tag: "" });
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

  // console.log(categories);

  useEffect(() => {
    axios
      .get("/tags/group")
      .then((response) => {
        setTagData(response.data);
      })
      .catch((error) => {
        console.log(error.response);
      });
  }, []);

  // useEffect(() => {
  //   axios
  //     .get()
  //     .then((response) => {
  //       console.log(response.data);
  //       // setQueryResults(response.data);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, [browsingTag]);

  const handleClick = (event) => {
    setBrowsingTag({ [event.target.name]: event.target.value });
  };
  console.log(browsingTag);

  const displayTags = tagData.map((category) => {
    return (
      <>
        <Col>
          <h3>{category._id}</h3>
          {category.tagName.map((tag, index) => {
            if (browsingTag.tag === tag) {
              return (
                <Col>
                  <label>
                    <Button
                      variant="danger"
                      key={category._id + index}
                      name="tag"
                      value={tag}
                      onClick={(e) => handleClick(e)}
                    >
                      {tag}
                    </Button>
                  </label>
                </Col>
              );
            } else {
              return (
                <Col>
                  <label>
                    <Button
                      variant="light"
                      key={category._id + index}
                      name="tag"
                      value={tag}
                      onClick={(e) => handleClick(e)}
                    >
                      {tag}
                    </Button>
                  </label>
                </Col>
              );
            }
          })}
        </Col>
      </>
    );
  });

  return (
    <Container>
      <h1>Browse by categories for your meal</h1>
      <Row>
        {/* {categories.length > 0 &&
          categories.map((category) => {
            return (
              <Col md="auto">
                <Link to={`/search/${category}`}>
                  <Button variant="info" className="mb-5 ml-5">
                    {category}
                  </Button>
                </Link>
              </Col>
            );
          })} */}

        {displayTags}
      </Row>
      {browsingTag.tag !== "" ? (
        <QueryResultsDisplay filteredResults={queryResults} />
      ) : (
        ""
      )}
    </Container>
  );
};

export default BrowseRecipePage;

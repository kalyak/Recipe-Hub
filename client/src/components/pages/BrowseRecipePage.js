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
    //   _id: "meal",
    //   tag: [
    //     {
    //       tagName: "lunch",
    //       tagID: "601a4cab1d8a6124f7a12bed",
    //     },
    //     {
    //       tagName: "dinner",
    //       tagID: "601a4e08006c0625affcd17b",
    //     },
    //     {
    //       tagName: "breakfast",
    //       tagID: "601a4e0e006c0625affcd17c",
    //     },
    //     {
    //       tagName: "supper",
    //       tagID: "601a4e65006c0625affcd17d",
    //     },
    //     {
    //       tagName: "side dish",
    //       tagID: "601a87dbdf56c5440ce204a2",
    //     },
    //   ],
    // },
    // {
    //   _id: "cuisine",
    //   tag: [
    //     {
    //       tagName: "chinese",
    //       tagID: "601a4ea7006c0625affcd181",
    //     },
    //     {
    //       tagName: "italian",
    //       tagID: "601a4eac006c0625affcd182",
    //     },
    //     {
    //       tagName: "mediteranian",
    //       tagID: "601a4eb5006c0625affcd183",
    //     },
    //     {
    //       tagName: "indonesia",
    //       tagID: "601a4eba006c0625affcd184",
    //     },
    //   ],
    // },
    // {
    //   _id: "course",
    //   tag: [
    //     {
    //       tagName: "appetizer",
    //       tagID: "601a4e76006c0625affcd17e",
    //     },
    //     {
    //       tagName: "mains",
    //       tagID: "601a4e85006c0625affcd17f",
    //     },
    //     {
    //       tagName: "dessert",
    //       tagID: "601a4e9b006c0625affcd180",
    //     },
    //   ],
    // },
    // {
    //   _id: "dietary",
    //   tag: [
    //     {
    //       tagName: "halal",
    //       tagID: "601a4ec5006c0625affcd185",
    //     },
    //     {
    //       tagName: "low carb",
    //       tagID: "601a4ecc006c0625affcd186",
    //     },
    //     {
    //       tagName: "gluten free",
    //       tagID: "601a4ed2006c0625affcd187",
    //     },
    //     {
    //       tagName: "dairy free",
    //       tagID: "601a4ed8006c0625affcd188",
    //     },
    //   ],
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

  useEffect(() => {
    axios
      .get("/tags/group")
      .then((response) => {
        console.log(response.data);
        setTagData(response.data);
      })
      .catch((error) => {
        console.log(error.response);
      });
  }, []);

  useEffect(() => {
    const url = `/recipes?tags=${browsingTag.tag}`;
    console.log(url);
    axios
      .get(url)
      .then((response) => {
        console.log(response.data);
        // setQueryResults(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [browsingTag]);

  const handleClick = (event) => {
    console.log(event.target.name);
    console.log(event.target.value);
    setBrowsingTag({ [event.target.name]: event.target.value });
  };
  console.log(browsingTag);

  const displayTags = tagData.map((category) => {
    return (
      <>
        <Col>
          <h3>{category._id}</h3>
          {category.tag.map((tag, index) => {
            if (browsingTag.tag === tag.tagID) {
              return (
                <Col>
                  <label>
                    <Button
                      variant="danger"
                      key={index}
                      name="tag"
                      value={tag.tagID}
                      onClick={(e) => handleClick(e)}
                    >
                      {tag.tagName}
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
                      key={index}
                      name="tag"
                      value={tag.tagID}
                      onClick={(e) => handleClick(e)}
                    >
                      {tag.tagName}
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
      <Row>{displayTags}</Row>
      {browsingTag.tag !== "" ? (
        <QueryResultsDisplay filteredResults={queryResults} />
      ) : (
        ""
      )}
    </Container>
  );
};

export default BrowseRecipePage;

import { useEffect, useState } from "react";
import { Row, Col, Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import HomePageData from "./sampleData";
import BrowseResultsDisplay from "../display/BrowseResultsDisplay";
import sampleimg from "./sampleimage.jpg";
import { Fragment } from "react";

const BrowseRecipePage = () => {
  const queryKeyword = new URLSearchParams(window.location.search).get("tag");
  // console.log(queryKeyword);

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
  ]);
  const [browsingTag, setBrowsingTag] = useState({ tag: "" });
  const [queryResults, setQueryResults] = useState([
    // {
    //   _id: "1",
    //   tags: ["lunch", "dinner"],
    //   recipeName: "Egg Fried Rice1",
    //   description:
    //     "1If you are busy with all the preparations for the festive season, this oldie but goodie is just the thing to whip up for a simple one-dish homecooked meal.",
    //   avgRating: 3.5,
    //   imageURL: sampleimg,
    // },
  ]);

  useEffect(() => {
    axios
      .get("/tags/group")
      .then((response) => {
        // console.log(response.data);
        setTagData(response.data);
      })
      .catch((error) => {
        console.log(error.response);
      });

    if (queryKeyword !== null) {
      setBrowsingTag({ tag: queryKeyword });
    }
  }, []);

  useEffect(() => {
    const url = `/recipes?tags=${browsingTag.tag}`;
    // console.log(url);
    axios
      .get(url)
      .then((response) => {
        // console.log(response.data);
        setQueryResults([...response.data]);
      })
      .catch((error) => {
        // console.log(error);
      });
  }, [browsingTag]);

  const handleClick = (event) => {
    // console.log(event.target.name);
    // console.log(event.target.value);
    setBrowsingTag({ [event.target.name]: event.target.value });
  };
  // console.log(browsingTag);

  const displayTags = tagData
    .sort((a, b) => (a._id > b._id ? 1 : -1))
    .map((category, index) => {
      return (
        <Fragment key={category._id}>
          <Col>
            <h3 className="text-capitalize">{category._id}</h3>
            {category.tag
              .sort((a, b) => (a.tagName > b.tagName ? 1 : -1))
              .map((tag, index) => {
                if (browsingTag.tag === tag.tagID) {
                  return (
                    <Col key={tag.tagID}>
                      <label>
                        <Button
                          variant="danger"
                          key={tag.tagID}
                          name="tag"
                          value={tag.tagID}
                          onClick={(e) => handleClick(e)}
                          className="text-capitalize"
                        >
                          {tag.tagName}
                        </Button>
                      </label>
                    </Col>
                  );
                } else {
                  return (
                    <Col key={tag.tagID}>
                      <label>
                        <Button
                          variant="light"
                          key={tag.tagID}
                          name="tag"
                          value={tag.tagID}
                          onClick={(e) => handleClick(e)}
                          className="text-capitalize"
                        >
                          {tag.tagName}
                        </Button>
                      </label>
                    </Col>
                  );
                }
              })}
          </Col>
        </Fragment>
      );
    });

  return (
    <Container style={{ border: "1px black solid" }}>
      <h1>Browse by Tag</h1>
      <br />
      <Row>{displayTags}</Row>
      <br />
      {browsingTag.tag !== "" ? (
        <BrowseResultsDisplay
          filteredResults={queryResults}
          setBrowsingTag={setBrowsingTag}
        />
      ) : (
        ""
      )}
    </Container>
  );
};

export default BrowseRecipePage;

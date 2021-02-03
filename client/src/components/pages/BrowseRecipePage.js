import { useEffect, useState } from "react";
import { Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import HomePageData from "./sampleData";

const BrowseRecipePage = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // axios
    //   .get()
    //   .then((response) => {
    //     setCategories(response.data);
    //   })
    //   .catch((error) => {
    //     console.log(error.response);
    //   });
    console.log(HomePageData.categories);
    setCategories(HomePageData.categories);
  }, []);

  return (
    <>
      <h1>Browse by categories for your meal</h1>
      <Row>
        {categories.length > 0 &&
          categories.map((category) => {
            return (
              <Col md={4}>
                <Link to={`/search/${category}`}>
                  <Button variant="info" className="mb-5 ml-5">
                    {category}
                  </Button>
                </Link>
              </Col>
            );
          })}
      </Row>
    </>
  );
};

export default BrowseRecipePage;

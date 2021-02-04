import { useState } from "react";
import { Form, FormControl, Button } from "react-bootstrap";
import { Redirect } from "react-router-dom";

const SearchBar = () => {
  const [keyword, setKeyword] = useState("");
  const queryStr = `/search?keyword=${keyword}`;

  const handleChange = (e) => {
    setKeyword(e.target.value);
  };

  // const handleSubmit = (event) => {
  //   event.preventDefault();

  //   console.log(queryStr);
  //   return <Redirect to={queryStr} />;
  // };

  return (
    <Form
      action={`/search`}
      inline
      // method="GET"
      // action={`/search/all/${keyword}`}
      // onSubmit={(e) => handleSubmit(e)}
    >
      <FormControl
        name="keyword"
        type="text"
        placeholder="Quick Search"
        className=" mr-sm-4"
        value={keyword}
        onChange={(e) => handleChange(e)}
      />
      <Button
        type="submit"
        variant="outline-info"
        // disabled={keyword === "" ? true : false}
        // onClick={() => {
        //   setKeyword("");
        // }}
      >
        Submit
      </Button>
    </Form>
  );
};
export default SearchBar;

import { useState } from "react";
import { Form, FormControl, Button } from "react-bootstrap";
const SearchBar = () => {
  const [keyword, setKeyword] = useState("");

  const handleChange = (e) => {
    setKeyword(e.target.value);
  };

  //   const handleSubmit = (e) => {
  //     e.preventDefault();
  //   };

  return (
    <Form
      inline
      method="GET"
      action={`/search/all/${keyword}`}
      //   onSubmit={(e) => handleSubmit(e)}
    >
      <FormControl
        type="text"
        placeholder="Quick Search"
        className=" mr-sm-4"
        value={keyword}
        onChange={(e) => handleChange(e)}
      />
      <Button
        type="submit"
        variant="outline-info"
        disabled={keyword === "" ? true : false}
        onclick={() => {
          setKeyword("");
        }}
      >
        Submit
      </Button>
    </Form>
  );
};
export default SearchBar;

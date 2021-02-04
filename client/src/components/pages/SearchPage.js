import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import QueryForm from "../display/QueryForm";

const SearchPage = (props) => {
  // const [query, setQuery] = useState([]);
  // let location = useLocation();
  // let arr = [];
  // const queryURL = location.search
  //   .slice(1)
  //   .split("&")
  //   .forEach((x) => {
  //     let i = x.indexOf("=");
  //     let y = {};
  //     y[x.slice(0, i)] = x.slice(i + 1);
  //     arr.push(y);
  //   });
  // console.log(arr);

  return (
    <>
      <h1>Search Page</h1>
      <QueryForm />
    </>
  );
};

export default SearchPage;

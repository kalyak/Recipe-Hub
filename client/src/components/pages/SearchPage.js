import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import QueryForm from "../display/QueryForm";
import axios from "axios";

const SearchPage = () => {
  return (
    <>
      <h1>Search Page</h1>
      <QueryForm />
    </>
  );
};

export default SearchPage;

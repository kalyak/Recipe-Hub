import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import QueryForm from "../display/QueryForm";
import axios from "axios";

const SearchPage = () => {
  return (
    <Container>
      <h1 className="text-center">Search Page</h1>
      <br />
      <QueryForm />
    </Container>
  );
};

export default SearchPage;

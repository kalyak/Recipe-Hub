import { useState } from "react";
import { Button } from "react-bootstrap";
import axios from "axios";
import { Redirect } from "react-router-dom";

const Logout = () => {
  const [loggedOut, setLoggedOut] = useState(false);

  const handleLogout = () => {
    axios
      .delete("/sessions/", { withCredentials: true })
      .then((response) => {
        setLoggedOut(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  if (loggedOut) {
    return <Redirect to="/" />;
  }
  return <Button onClick={handleLogout}>Logout</Button>;
};

export default Logout;

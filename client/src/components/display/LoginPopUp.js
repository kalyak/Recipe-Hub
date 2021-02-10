import { useState } from "react";
import { Button } from "react-bootstrap";
import SweetAlert from "react-bootstrap-sweetalert";
import LoginForm from "./LoginForm";

const LoginPopUp = ({ action, setLoginModalShow }) => {
  const [selection, setSelection] = useState("");
  const [formSubmitted, setFromSubmit] = useState(false);
  const handleClose = () => {
    setLoginModalShow(false);
  };

  if (formSubmitted) {
    handleClose();
  }

  return (
    <SweetAlert
      title={`An account is needed to ${action}`}
      onConfirm={handleClose}
      onCancel={handleClose}
      type={"controlled"}
      dependencies={selection}
      showConfirm={false}
    >
      {!selection ? (
        <div>
          Please login or sign up below:
          <hr />
          <Button
            variant='success'
            onClick={() => {
              setSelection("login");
            }}
          >
            Increment
          </Button>
          &nbsp;
          <Button
            variant='danger'
            onClick={() => {
              setSelection("signup");
            }}
          >
            Decrement
          </Button>
          <hr />
        </div>
      ) : selection === "login" ? (
        <div>
          <LoginForm afterLoginAction={setFromSubmit} />
        </div>
      ) : (
        <div>signup</div>
      )}
    </SweetAlert>
  );
};

export default LoginPopUp;

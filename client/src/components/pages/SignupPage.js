import { useState } from "react";
import { Redirect } from "react-router-dom";
import { Container, Row } from "react-bootstrap";
import SignupForm from "../display/SignupForm";

const SignupPage = () => {
  const [isLogin, setIsLogin] = useState(false);

  if (isLogin) {
    return <Redirect to="/" />;
  }

  return (
    <Container>
      <Row className="justify-content-md-center">
        <h1>Sign Up Page</h1>
      </Row>
      <br />
      <br />
      <Row className="justify-content-md-center">
        <h3>Create your new account here:</h3>
      </Row>
      <br />
      <br />
      <SignupForm afterLoginAction={setIsLogin} />
    </Container>
  );
};

export default SignupPage;

import { useState } from "react";
import axios from "axios";

const LoginPage = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [isLogin, setIsLogin] = useState(false);
  const [resErrMsg, setResErrMsg] = useState({ username: "", password: "" });

  const handleSubmit = (event) => {
    console.log(formData);
    event.preventDefault();
    axios
      .post("/", formData)
      .then((response) => {
        console.log(response);
        setIsLogin(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleChange = (event) => {
    // console.log(event.target.value);
    setFormData((state) => {
      return { ...state, [event.target.name]: event.target.value };
    });
    setResErrMsg({ username: "", password: "" });
  };

  return (
    <>
      <h1>Login Page</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <label htmlFor="username">Username:</label>
        <input type="text" name="username" onChange={(e) => handleChange(e)} />
        <br />
        <br />
        <label htmlFor="password">Password:</label>
        <input type="text" name="password" onChange={(e) => handleChange(e)} />
        <br />
        <br />
        <button type="submit">Login</button>
      </form>
    </>
  );
};

export default LoginPage;

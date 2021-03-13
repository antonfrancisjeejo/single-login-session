import React, { useState } from "react";
import Header from "../components/Header";
import axios from "../axios";
import { useDispatch } from "react-redux";
import * as authActions from "../store/actions/auth";

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    const config = {
      headers: {
        ContentType: "application/json",
      },
    };
    axios
      .post("/api/student/account/login", input, config)
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        dispatch(authActions.login(res.data.token));
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput((prevInput) => {
      return {
        ...prevInput,
        [name]: value,
      };
    });
  };

  return (
    <div className="home">
      <Header />
      <div className="login">
        <h1>Login</h1>
        <form>
          <input
            name="email"
            type="text"
            placeholder="E-mail"
            value={input.email}
            onChange={handleChange}
          />
          <br />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={input.password}
            onChange={handleChange}
          />
          <br />
          <button type="submit" onClick={handleSubmit}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;

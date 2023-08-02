import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginPage = ({ handleLogin, token }) => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/login", {
        email: formData.email,
        password: formData.password,
      });
      handleLogin(res.data.token);
      navigate("/dashboard");
      alert("Logged In Successfully");
    } catch (error) {
      console.error(error);
      if (error.response && error.response.data && error.response.data.error) {
        setErrorMessage(error.response.data.error);
      } else {
        setErrorMessage("An error occurred during login.");
      }
    }
  };

  if (token) {
    navigate("/dashboard");
  }
  return (
    <>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <input
            id="email"
            type="email"
            name="email"
            className="form-label"
            placeholder="email@gmail.com"
            required
            value={formData.email}
            onChange={handleChange}
          />
          <input
            id="password"
            type="password"
            name="password"
            className="form-label"
            placeholder="atleast 8-characters"
            required
            value={formData.password}
            onChange={handleChange}
          />
          <p className="text-danger">{errorMessage}</p>
          <input type="submit" value="Login" />
        </form>
      </div>
    </>
  );
};

export default LoginPage;

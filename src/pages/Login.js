import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setAuthState } = useContext(AuthContext);

  let navigate = useNavigate();

  const login = () => {
    const data = { username: username, password: password };
    axios.post("https://maturita-api-c2cbef7c0075.herokuapp.com/auth/login", data).then((response) => {
      if (response.data.error) {
        alert(response.data.error);
      } else {
        localStorage.setItem("accessToken", response.data.token);
        setAuthState({
          username: response.data.username,
          id: response.data.id,
          status: true,
        });
        navigate("/");
      }
    });
  };
  return (
    <div className="blackBlock">
    <div className="loginContainer">
      <label className="labelLogin">Uživatel</label>
      <input
        id="inputLogin"
        type="text"
        onChange={(event) => {
          setUsername(event.target.value);
        }}
      />
      <label className="labelLogin">Heslo</label>
      <input
        id="inputLogin"
        type="password"
        onChange={(event) => {
          setPassword(event.target.value);
        }}
      />

      <button className="logB" onClick={login}> Přihlásit </button>
    </div>
    </div>
  );
}

export default Login;

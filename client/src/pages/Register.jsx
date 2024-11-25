import { useContext, useState } from "react";
import { CredentialsContext } from "../App";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../components/navbar";
const handleErrors = async (response) => {
  if (!response.ok) {
    const { message } = await response.json();
    throw Error(message);
  }
  return response.json();
};

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [, setCredentials] = useContext(CredentialsContext);
  const navigate = useNavigate();
  const register = (e) => {
    e.preventDefault();
    fetch("http://localhost:5000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    })
      .then(handleErrors)
      .then(() => {
        setCredentials({ username, password });
        navigate("/");
      })
      .catch((e) => {
        setError(e.message);
      });
  };

  return (
    <div>
      <Navbar />
      <div className="Register">
        <h1 id="register_header">REGISTER</h1>
        {error && <span style={{ color: "red" }}>{error}</span>}
        <form onSubmit={register}>
          <input
            type="text"
            placeholder="username"
            onChange={(e) => setUsername(e.target.value.toUpperCase())}
          />
          <br />
          <input
            type="password"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
}

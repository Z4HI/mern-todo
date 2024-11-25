import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CredentialsContext } from "../App";
import Todos from "../components/todos";
import { Navbar } from "../components/navbar";
export default function Home() {
  const [credentials] = useContext(CredentialsContext); //

  return (
    <div>
      {credentials ? <div>Logout</div> : <Navbar />}
      <h1>Home</h1>
      {credentials ? (
        <div>
          <h2>Welcome {credentials.username}</h2>
          <Todos />
        </div>
      ) : (
        <div>
          <Link to="/register">Register</Link>
          <br />
          <Link to="/login">Login</Link>
        </div>
      )}
    </div>
  );
}

import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./pages/Register";
import Home from "./pages/Home";
import { useState, createContext } from "react";
import login from "./pages/login";

export const CredentialsContext = createContext(null);

function App() {
  const credentials = useState(null);
  return (
    <div className="App">
      <CredentialsContext.Provider value={credentials}>
        <BrowserRouter>
          <Routes>
            <Route path="/" Component={Home}></Route>
          </Routes>
          <Routes>
            <Route path="/register" Component={Register}></Route>
          </Routes>
          <Routes>
            <Route path="/login" Component={login}></Route>
          </Routes>
        </BrowserRouter>
      </CredentialsContext.Provider>
    </div>
  );
}

export default App;

import React from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "../libs/contextLib";
import "./Home.css";


export default function Home() {
  const { isAuthenticated } = useAppContext();

  function renderLander() {
    return (
      <div className="lander">
        <h1>PLACEHOLDER</h1>
        <p>A placeholder title</p>
        <div>
          <Link to="/login" className="btn btn-info btn-lg">
            Login
          </Link>
          <Link to="/signup" className="btn btn-success btn-lg">
            Signup
          </Link>
        </div>
      </div>
    );
  }

  function renderAuthenticatedLander() {
    return (
    <div className='lander'>
      <h1>Welcome!</h1>
      <div>
        <Link to='/image/download' className="btn btn-info btn-lg">
          Download Images
        </Link>
        <Link to='/image/upload' className="btn btn-info btn-lg">
          Upload Images
        </Link>
      </div>  
     </div>
    );
  }

  return (
    <div className="Home">
      {isAuthenticated ? renderAuthenticatedLander() : renderLander()}
    </div>
  );
}
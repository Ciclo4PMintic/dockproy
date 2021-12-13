import { useState, useEffect } from "react";
import axios from "axios";
import '../css/main.css'
import '../css/formatoHome.css'
import '../plugins/fontawesome-free/css/all.min.css'
import'../dist/css/adminlte.min.css'

import { Link } from "react-router-dom";


const Login = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      history.push("/login");
    }
  }, [history]);

  const loginHandler = async (e) => {
    e.preventDefault();

    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.post(
        "/api/auth/login",
        { email, password },
        config
      );

      localStorage.setItem("authToken", data.token);
      sessionStorage.setItem('email',email)
      history.push("/home");
    } catch (error) {
      setError(error.response.data.error);
      
      setTimeout(() => {
        setError("Not authorized");
      }, 5000);
    }
  };

  return (
    <div className="login-screen">
      <form onSubmit={loginHandler} className="login-screen__form">
        <h2>CoroTTo</h2>
        
        {error && <span className="error-message">{error}</span>}
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <br/>
          <div>
          <input
            type="email"
            required
            id="email"
           
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            tabIndex={1}
          />
          </div>
          <br/>
        </div>
        <div >
          <label>
            Password:{" "}
            
          </label>
          <div>
          <input
            type="password"
            required
            id="password"
            autoComplete="true"
           
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            tabIndex={2}
          />
          </div>
         
          <div>
          <Link to="/forgotpassword" >
              Forgot Password?
            </Link>
            </div>
        </div>
        <br/>
        <div>
        <button id="login" type="submit" className="btn btn-primary">
          Login
        </button>
        </div>
        <br/>
        {/* <div>
        <button id="google" type="submit" className="btn btn-primary">
          Ingresar con Gmail
        </button>
        </div> */}

        <span className="login-screen__subtext">
          Don't have an account? <Link to="/register">Register</Link>
        </span>
      </form>
    </div>
  );
};

export default Login;
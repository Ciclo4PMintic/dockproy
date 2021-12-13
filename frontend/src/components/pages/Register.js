import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import '../css/main.css'
import '../css/formatoHome.css'
import '../plugins/fontawesome-free/css/all.min.css'
import'../dist/css/adminlte.min.css'

const Register = ({ history }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [bDate, setBdate] = useState("");
  const [identification, setIdentification] = useState("");
  const [roles, setRoles] = useState("");
  
  const [error, setError] = useState("");

  const registerHandler = async (e) => {
    e.preventDefault();

    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    if (password !== confirmpassword) {
      setPassword("");
      setConfirmPassword("");
      setTimeout(() => {
        setError("");
      }, 5000);
      return setError("Passwords do not match");
    }

    try {
      const { data } = await axios.post(
        "/api/auth/register",
        {
          username,
          email,
          password,
          phone,
          bDate,
          identification,
          roles
          
         

        },
        config
      );
      console.log(data)

     

      history.push("/login");
    } catch {
      setError(error.response.data.error);
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };
  function readValue() {
    var m=document.getElementById('list').value;
    console.log(m)
  
    var z=[]
    if (m=="admin"){
      z.push("admin")
     
     setRoles(z)

    }
    else if (m=="usuario"){
      z.push("usuario")
      setRoles(z)
    }

   else  if (m=="lider"){
    z.push("lider")
    setRoles(z)
    }

  
    else {
    console.log('You selected: ', m)
    }
  }
 



  return (
    <div className="register-screen">
      <form onSubmit={registerHandler} className="register-screen__form">
        <h1 >Register</h1>
        {error && <span className="error-message">{error}</span>}
        <div className="form-group">
          <label htmlFor="name">Username:</label>
          <div>
          <input
            type="text"
            required
            id="name"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          </div>
        </div>
        <br/>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          
          <input
            type="email"
            required
            id="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <br/>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            required
            id="password"
            autoComplete="true"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <br/>
        <div className="form-group">
          <label htmlFor="confirmpassword">Confirm Password:</label>
          <input
            type="password"
            required
            id="confirmpassword"
            autoComplete="true"
            placeholder="Confirm password"
            value={confirmpassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <br/>
        <div className="form-group">
          <label htmlFor="phone">Phone:</label>
          <input
            type="number"
            
            id="phone"
            placeholder="Enter phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <br/>
        <div className="form-group">
          <label htmlFor="bDate">Birthday:</label>
          <input
              type="date"  

              min="1900-01-01" max="2050-12-31"
            
            id="bDate"
            placeholder="Enter Birthday"
            value={bDate}
            onChange={(e) => setBdate(e.target.value)}
          />
        </div>
        <br/>
        <div>
        <label htmlFor="roles">Roles:</label>
        <div>
        <select id="list" className="list" onChange={readValue} >
       
        <option value="none">none</option>
            <option value="admin">admin</option>
            <option value="usuario">usuario</option>
            <option value="lider">lider</option>
           
        </select>
        </div>
        </div>

        <br/>
        <div className="form-group">
          <label htmlFor="idnetification">Cedula:</label>
          <input
            type="number"
            
            id="identification"
            placeholder="cedula"
            value={identification}
            onChange={(e) => setIdentification(e.target.value)}
          />
        </div>


      
        
     
        <br/>
        <div>
        <button id="register" type="submit" className="btn btn-primary">
          Register
        </button>
        </div>
        <span className="register-screen__subtext">
          Already have an account? <Link to="/login">Login</Link>
        </span>
      </form>
    </div>
  );
 

};

export default Register;
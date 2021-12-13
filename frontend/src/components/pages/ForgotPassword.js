import { useState } from "react";
import axios from "axios";
import '../css/main.css'
import '../css/formatoHome.css'
import '../plugins/fontawesome-free/css/all.min.css'
import'../dist/css/adminlte.min.css'

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const forgotPasswordHandler = async (e) => {
    e.preventDefault();

    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.post(
        "/api/auth/forgotpassword",
        { email },
        config
      );

      setSuccess(data.data);
    } catch (error) {
      setError(error.response.data.error);
      setEmail("");
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  return (
    <div>
    <div className="forgotpassword-screen">
      <form
        onSubmit={forgotPasswordHandler}
        className="forgotpassword-screen__form"
      >
        <h1 >Forgot Password</h1>
        {error && <span className="error-message">{error}</span>}
        {success && <span className="success-message">{success}</span>}
        <div className="form-group">
          <p className="forgotpassword-screen__subtext">
            Please enter the email address you register your account with. We
            will send you reset password reset
             to this email
          </p>
          <label htmlFor="email">Email:</label>
          <br/>
          <input
          className="emailforgot"
            type="email"
            required
            id="email"
           
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <br/>
        <button id="forgot" type="submit" className="btn btn-primary">
          Send Email
        </button>
      </form>
    </div>
    </div>
  );
};

export default ForgotPassword;
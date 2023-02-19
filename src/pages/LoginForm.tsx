import React, {useEffect, useState} from "react";
import {NavLink} from "react-router-dom";
import Layout from "../components/Layout";

interface Props {
  handleLogin: (email: string, password: string) => Promise<string | void>;
}

function LoginForm(props: Props) {
  const [email, setEmail]=useState("");
  const [password, setPassword]=useState("");
  const [errorMessage, setErrorMessage]=useState("");


  useEffect(() => {
    if (errorMessage) {
      setErrorMessage('');
    }
  }, [email, password])
  const handleSubmit=(event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    props.handleLogin(email, password).catch((error) => {
      if (error) {
        setErrorMessage('Email or Password is Invalid');
      }
    });
  };

  const handleEmailChange=(event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange=(event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  return (
    <Layout>
      <h1>Welcome back!</h1>
      <h2>Log in to continue.</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label className="d-none" htmlFor="email">Email:</label>
          <input className="input" type="email" id="email" value={email} onChange={handleEmailChange} required
                 placeholder="Email" />
        </div>
        <div>
          <label className="d-none" htmlFor="password">Password:</label>
          <input className="input" type="password" id="password" value={password} onChange={handlePasswordChange}
                 required placeholder="Password" />
        </div>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <NavLink to="/signup" className="link">Don’t have an account? Sign up.</NavLink>
        <button className="btn btn-md btn-primary login-button" type="submit">Log In</button>
      </form>
    </Layout>
  );
}

export default LoginForm;

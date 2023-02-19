import React, {useEffect, useState} from "react";
import {NavLink} from "react-router-dom";
import Layout from "../components/Layout";

interface Props {
  handleSignup: (email: string, password: string, fullName: string) => Promise<string | void>;
}

function SignupForm(props: Props) {
  const [fullName, setFullName]=useState("");
  const [email, setEmail]=useState("");
  const [password, setPassword]=useState("");
  const [errorMessage, setErrorMessage]=useState("");

  const handleSubmit=(event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    props.handleSignup(fullName, email, password).catch((error)=>{
      setErrorMessage(error.message);
    });
  };

  const handleFullNameChange=(event: React.ChangeEvent<HTMLInputElement>) => {
    setFullName(event.target.value);
  };

  const handleEmailChange=(event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange=(event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  useEffect(() => {
    if (errorMessage) {
      setErrorMessage('');
    }
  }, [fullName, email, password])

  return (
    <Layout>
      <h1>Welcome!</h1>
      <h2>Sign up to start using Simpledo today.</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label className="d-none" htmlFor="fullName">Full Name:</label>
          <input className="input" type="text" id="fullName" value={fullName} onChange={handleFullNameChange} required placeholder="Full Name" />
        </div>
        <div>
          <label className="d-none" htmlFor="email">Email:</label>
          <input className="input" type="email" id="email" value={email} onChange={handleEmailChange} required placeholder="Email" />
        </div>
        <div>
          <label className="d-none" htmlFor="password">Password:</label>
          <input className="input" type="password" id="password" value={password} onChange={handlePasswordChange} required placeholder="Password" />
        </div>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <NavLink to="/login" className="link">Do have an account? Sign in.</NavLink>
        <button className="btn btn-md btn-primary login-button" type="submit">Sign up</button>
      </form>
    </Layout>
  );
}

export default SignupForm;

import React, { useState, useEffect } from "react";
import logo from "../logo.svg";
import { withRouter } from "react-router-dom";
import unfetch from "unfetch";

const Login = props => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user");
    console.log("login", user);
    if (user) props.history.push("/dashboard");
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();
    if (loading) return;
    setError("");
    const log = await unfetch("/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          setError(res.statusText);
          setPassword("");
          const error = new Error(res.statusText);
          error.response = res;
          return Promise.reject(error);
        }
      })
      .then(data => data)
      .catch(err => {
        console.log("errr", err);
      });

    if (log) {
      setLoading(true);
      const stringData = JSON.stringify(log);
      localStorage.setItem("user", stringData);
      setTimeout(() => {
        props.history.push("/dashboard");
      }, 1000);
    }
  };

  return (
    <div className="container">
      <div className="card w-50 mx-auto mt-5">
        <div className="card-body">
          <form onSubmit={handleSubmit} noValidate>
            <div className="text-center">
              <img src={logo} className="App-logo" alt="logo" height={120} />
            </div>

            <div className="text-center text-danger">{error}</div>

            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="input-email"
              className="form-control mb-3"
              value={email}
              onChange={e => {
                setEmail(e.target.value);
              }}
              required
            />

            <label htmlFor="">Password</label>
            <input
              id="input-password"
              type="password"
              className="form-control mb-4"
              value={password}
              onChange={e => {
                setPassword(e.target.value);
              }}
              minLength={4}
              required
            />

            <button
              type="submit"
              className="btn btn-lg btn-primary w-100"
              disabled={loading}
            >
              {loading ? (
                <div className="spinner-border text-white" />
              ) : (
                "Submit"
              )}
            </button>
          </form>
        </div>
      </div>
      <div className="text-center">
        <small>
          <a href="/account.json" target="_blank">
            View Sample Account
          </a>
        </small>
      </div>
    </div>
  );
};

export default withRouter(Login);

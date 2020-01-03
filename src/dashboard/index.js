import React, { useEffect, useState } from "react";
import { Link, withRouter } from "react-router-dom";

const Dashboard = props => {
  const [user, setUser] = useState({});
  useEffect(() => {
    let userData = localStorage.getItem("user");
    if (userData) {
      try {
        userData = JSON.parse(userData);
        setUser(userData);
      } catch (err) {
        props.history.push("/");
      }
    } else {
      props.history.push("/");
    }
  }, []);

  return (
    <div className="container">
      <div className="py-3 text-right">
        <Link
          className="btn btn-outline-danger"
          to="/"
          onClick={() => {
            localStorage.removeItem("user");
          }}
        >
          Log out
        </Link>
      </div>
      <div className="my-3">
        <h2>Hello, {user.username || ""}</h2>
      </div>
    </div>
  );
};

export default withRouter(Dashboard);

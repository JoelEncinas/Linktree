import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function Admin() {
  const navigate = useNavigate();
  const location = useLocation();

  const [username, setUserName] = useState(null);

  function logout() {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    navigate("/auth/login");
  }

  useEffect(() => {
    if (location.state && location.state.data) {
      const data = location.state.data;
      setUserName(data.username);
      console.log(data);
    } else {
      navigate("/auth/login");
    }
  }, [location.state, navigate]);

  return (
    <div>
      <button onClick={logout}>Logout</button>
      <h1>Admin</h1>
      {username && <p>Hello {username}</p>}
    </div>
  );
}

export default Admin;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Admin() {
  const navigate = useNavigate();

  const [username, setUserName] = useState(null);

  function logout() {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    navigate("/auth/login");
  }

  useEffect(() => {
    let hasCookie = false;
    const cookies = document.cookie.split("; ");
    for (const cookie of cookies) {
      const [name, value] = cookie.split("=");
      if (name === "token") {
        hasCookie = true;
        fetch(`${process.env.REACT_APP_API_URL}/admin`, {
          headers: {
            "x-access-token": value,
          },
        })
          .then((res) => {
            if (res.status === 200) {
              res.json().then((data) => setUserName(data.username));
            } else if (res.status === 401) {
              navigate("/auth/login");
            }
          })
          .catch((error) => {
            console.log(error);
            navigate("/auth/login");
          });
        break;
      }
    }

    if (hasCookie === false) {
      navigate("/auth/login");
    }
  }, [navigate]);

  return (
    <div>
      <button onClick={logout}>Logout</button>
      <h1>Admin</h1>
      {username && <p>Hello {username}</p>}
    </div>
  );
}

export default Admin;

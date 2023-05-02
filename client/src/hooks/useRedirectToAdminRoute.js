import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function useRedirectToAdminRoute() {
  const navigate = useNavigate();

  useEffect(() => {
    async function checkUser() {
      const cookies = document.cookie.split("; ");
      for (const cookie of cookies) {
        const [name, value] = cookie.split("=");
        if (name === "token") {
          fetch(`${process.env.REACT_APP_API_URL}/admin`, {
            headers: {
              "x-access-token": value,
            },
          })
            .then((res) => res.json())
            .then((data) => (data.isLoggedIn ? navigate("/admin") : null));
          break;
        }
      }
    }

    checkUser();
  }, [navigate]);
}

export default useRedirectToAdminRoute;

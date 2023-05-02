import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function useRedirectToProtectedRoute() {
  const navigate = useNavigate();

  useEffect(() => {
    async function checkUser() {
      const cookies = document.cookie.split("; ");
      for (const cookie of cookies) {
        const [name, value] = cookie.split("=");
        if (name === "token") {
          fetch(`${process.env.REACT_APP_API_URL}/protected`, {
            headers: {
              "x-access-token": value,
            },
          })
            .then((res) => res.json())
            .then((data) => (data.isLoggedIn ? navigate("/protected") : null));
          break;
        }
      }
    }

    checkUser();
  }, [navigate]);
}

export default useRedirectToProtectedRoute;

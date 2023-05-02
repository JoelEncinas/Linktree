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
          const res = await fetch(`${process.env.REACT_APP_API_URL}/admin`, {
            headers: {
              "x-access-token": value,
            },
          });
          if (res.status === 200) {
            const data = await res.json();
            navigate("/admin", { state: { data } });
          } else {
            navigate("/auth/login");
          }

          break;
        }
      }
    }

    checkUser();
  }, [navigate]);
}

export default useRedirectToAdminRoute;

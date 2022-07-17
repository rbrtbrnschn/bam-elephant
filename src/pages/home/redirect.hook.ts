import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function useGameRedirect() {
  const navigate = useNavigate();

  useEffect(() => {
    const lastVisited = window.sessionStorage.getItem("last_visited");
    if (!lastVisited)
      return window.sessionStorage.setItem("last_visited", Date.now() + "");

    if (process.env.NODE_ENV === "production") {
      navigate("/v1");
    }
  }, []);
}

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function useGameRedirect() {
  const navigate = useNavigate();

  useEffect(() => {
    const lastVisited = window.localStorage.getItem("last_visited");
    if (!lastVisited) {
      window?.localStorage?.setItem("last_visited", Date.now() + "");
      return navigate("/walk-through");
    }
  }, []);
}

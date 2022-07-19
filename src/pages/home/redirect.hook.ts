import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useStorage } from "../../utils/useStorage";

export function useGameRedirect() {
  const navigate = useNavigate();
  const { getLocaleStorage, setLocalStorage } = useStorage(localStorage);
  useEffect(() => {
    const lastVisited = getLocaleStorage("site.visited-walkthrough");
    if (!lastVisited) {
      setLocalStorage("site.visited-walkthrough", Date.now() + "");
      return navigate("/walk-through");
    }
  }, []);
}

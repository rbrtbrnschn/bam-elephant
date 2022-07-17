import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { MyNavbar } from "../../components/navbar/navbar";
import { useGameRedirect } from "./redirect.hook";

export const HomePage = () => {
  useGameRedirect();

  return (
    <div>
      <MyNavbar />
    </div>
  );
};

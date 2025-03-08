import Header from "@/components/header/Header";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

let scroll = 0;
const MainLayout = () => {
  const navigate = useNavigate();
  const { auth } = useSelector((state) => state);
  useEffect(() => {
    setTimeout(() => {
      window.scrollTo({ top: scroll, behavior: "smooth" });
    }, 100);
  }, []);
  if (!auth.token) {
    return navigate("/login");
  }

  window.addEventListener("scroll", () => {
    if (window.location.pathname === "/") {
      scroll = window.pageYOffset;
      return scroll;
    }
  });

  return (
    <div>
      <Header />
      <div className="">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;

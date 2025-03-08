import Header from "@/components/header/Header";
import RightSideBar from "@/components/home/RightSideBar";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
let scroll = 0;
const HomeLayout = () => {
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
    <div className="prevent-select">
      <Header />
      <div className="home w-full flex  mx-0 px-2 justify-between">
        <div className="home_left">
          <Sidebar />
        </div>
        <div className="home_content ">
          <Outlet />
        </div>
        <div className="home_right">
          <RightSideBar />
        </div>
      </div>
    </div>
  );
};

export default HomeLayout;

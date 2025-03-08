import Logo from "@/assets/image/bee.png";
import { Link } from "react-router-dom";
import Menu from "./Menu";
import Search from "./Search";

const Header = () => {
  return (
    <div className="header">
      <nav
        className="navbar navbar-expand-lg
           justify-content-between align-middle"
      >
        <Link to="/" className="logo">
          <h1
            className="navbar-brand text-uppercase p-0 m-0"
            onClick={() => window.scrollTo({ top: 0 })}
          >
            <div className="header-group items-center">
              <img
                src={Logo}
                alt="logo"
                className="logo-img"
                style={{ width: "164px", height: "60px" }}
              />
            </div>
          </h1>
        </Link>
        <Search />
        <Menu />
      </nav>
    </div>
  );
};

export default Header;

import { IoHome } from "react-icons/io5";
import { GrLogin } from "react-icons/gr";
import { NavLink, useLocation } from "react-router-dom";
import { MdDashboardCustomize } from "react-icons/md";
import { BiSolidBadgeCheck } from "react-icons/bi";
import { GiFiles } from "react-icons/gi";
import { GiQueenCrown } from "react-icons/gi";
import { TbReportSearch } from "react-icons/tb";
import { BsGraphUpArrow } from "react-icons/bs";
import { useContext } from "react";
import AuthContext from "../../store/auth-context";
const Header = () => {
  const { isLoggedIn, logOut, isPremium } = useContext(AuthContext);
  const location = useLocation();
  return (
    <header>
      <div className="px-3 py-2 text-bg-dark border-bottom">
        <div className="container">
          <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
            {isPremium == true && (
              <GiQueenCrown
                style={{ fontSize: "40px", color: "goldenrod", float: "left" }}
              />
            )}
            <a
              href="/"
              className="d-flex align-items-center my-2 my-lg-0 me-lg-auto text-white text-decoration-none"
            >
              <svg
                className="bi me-2"
                width="40"
                height="32"
                role="img"
                aria-label="Bootstrap"
              >
                <use xlinkHref="#bootstrap"></use>
              </svg>
            </a>

            <ul className="nav col-12 col-lg-auto my-2 justify-content-center my-md-0 text-small">
              <li>
                <NavLink
                  to="/home"
                  className={
                    location.pathname === "/home"
                      ? "nav-link px-2 text-secondary"
                      : "nav-link px-2 text-white"
                  }
                >
                  <svg
                    className="bi d-block mx-auto mb-1"
                    width="24"
                    height="24"
                  >
                    <IoHome style={{ fontSize: "25px" }} />
                  </svg>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/expenses"
                  className={
                    location.pathname === "/expenses"
                      ? "nav-link px-2 text-secondary"
                      : "nav-link px-2 text-white"
                  }
                >
                  <svg
                    className="bi d-block mx-auto mb-1"
                    width="24"
                    height="24"
                  >
                    <MdDashboardCustomize style={{ fontSize: "25px" }} />
                  </svg>
                  Dashboard
                </NavLink>
              </li>
              {isPremium == false && isLoggedIn == true && (
                <li>
                  <NavLink
                    to="/premium"
                    className={
                      location.pathname === "/premium"
                        ? "nav-link px-2 text-secondary"
                        : "nav-link px-2 text-white"
                    }
                  >
                    <svg
                      className="bi d-block mx-auto mb-1"
                      width="24"
                      height="24"
                    >
                      <BiSolidBadgeCheck
                        style={{ fontSize: "25px", color: "goldenrod" }}
                      />
                    </svg>
                    Premium
                  </NavLink>
                </li>
              )}
              {isPremium == true && (
                <li>
                  <NavLink
                    to="/leader-board"
                    className={
                      location.pathname === "/leader-board"
                        ? "nav-link px-2 text-secondary"
                        : "nav-link px-2 text-white"
                    }
                  >
                    <svg
                      className="bi d-block mx-auto mb-1"
                      width="24"
                      height="24"
                    >
                      <BsGraphUpArrow style={{ fontSize: "25px" }} />
                    </svg>
                    LeaderBoard
                  </NavLink>
                </li>
              )}
              {isPremium && (
                <li>
                  <NavLink
                    to="/files"
                    className={
                      location.pathname === "/files"
                        ? "nav-link px-2 text-secondary"
                        : "nav-link px-2 text-white"
                    }
                  >
                    <svg
                      className="bi d-block mx-auto mb-1"
                      width="24"
                      height="24"
                    >
                      <GiFiles
                        style={{ fontSize: "25px", color: "lightblue" }}
                      />
                    </svg>
                    Files
                  </NavLink>
                </li>
              )}
              {isPremium && (
                <li>
                  <NavLink
                    to="/reports"
                    className={
                      location.pathname === "/reports"
                        ? "nav-link px-2 text-secondary"
                        : "nav-link px-2 text-white"
                    }
                  >
                    <svg
                      className="bi d-block mx-auto mb-1"
                      width="24"
                      height="24"
                    >
                      <TbReportSearch
                        style={{ fontSize: "25px", color: "brown" }}
                      />
                    </svg>
                    Reports
                  </NavLink>
                </li>
              )}
              {!isLoggedIn && (
                <li>
                  <NavLink to="/auth" className="nav-link text-white">
                    <svg
                      className="bi d-block mx-auto mb-1"
                      width="24"
                      height="24"
                    >
                      <GrLogin style={{ fontSize: "25px", color: "green" }} />
                    </svg>
                    Login
                  </NavLink>
                </li>
              )}
              {isLoggedIn && (
                <li onClick={() => logOut()}>
                  <NavLink to="/home" className="nav-link text-white">
                    <svg
                      className="bi d-block mx-auto mb-1"
                      width="24"
                      height="24"
                    >
                      <GrLogin style={{ fontSize: "25px", color: "red" }} />
                    </svg>
                    Logout
                  </NavLink>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
};
export default Header;

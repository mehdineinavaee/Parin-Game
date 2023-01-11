import React, { useState, useEffect } from "react";
import http from "../services/httpService";
import config from "../../config.json";
import LargeLogo from "./largeLogo";
import { NavLink } from "react-router-dom";
import { HashLink as Link } from "react-router-hash-link";

const LargeMenu = () => {
  const [token, setToken] = useState();
  const [user, setUser] = useState();

  useEffect(() => {
    const asyncCall = async () => {
      const token = localStorage.getItem("token");
      setToken(token);
      const res = await http.get(config.apiUserDetail + "?phone=" + token);
      setUser(res.data);
    };
    asyncCall();
  }, []);

  return (
    <React.Fragment>
      <div className="main-nav">
        <div className="container-fluid">
          <nav className="navbar navbar-expand-md navbar-light">
            <LargeLogo />
            <div
              className="collapse navbar-collapse mean-menu"
              id="navbarSupportedContent"
              style={{ marginRight: "3rem" }}
            >
              <ul className="navbar-nav ms-auto" style={{ flex: "auto" }}>
                <li className="nav-item">
                  <NavLink to="/" className="nav-link">
                    خانه
                  </NavLink>
                </li>

                <li className="nav-item nav-item-five">
                  <a href="/#" className="nav-link dropdown-toggle">
                    بازی ها
                    <i className="fa fa-angle-down"></i>
                  </a>
                  <ul className="dropdown-menu">
                    <li className="nav-item">
                      <NavLink to="/fekri" className="nav-link">
                        فکری
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink to="/event" className="nav-link">
                        رویداد
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink to="/vije" className="nav-link">
                        ویژه
                      </NavLink>
                    </li>
                  </ul>
                </li>

                <li className="nav-item nav-item-five">
                  <a href="/#" className="nav-link dropdown-toggle">
                    پارین گیم
                    <i className="fa fa-angle-down"></i>
                  </a>
                  <ul className="dropdown-menu">
                    <li className="nav-item">
                      <NavLink to="/about" className="nav-link">
                        درباره ما
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink to="/contact" className="nav-link">
                        تماس با ما
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink to="/faq" className="nav-link">
                        سوالات متداول
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink to="/testimonials" className="nav-link">
                        بازخوردها
                      </NavLink>
                    </li>
                  </ul>
                </li>

                <li className="nav-item">
                  <NavLink to="/cafe" className="nav-link">
                    کافه
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink to="/blog" className="nav-link">
                    وبلاگ
                  </NavLink>
                </li>
              </ul>
              <div className="others-option-vg d-flex align-items-center">
                {!token && (
                  <React.Fragment>
                    <div className="option-item">
                      <Link to="/login" className="default-btn">
                        ثبت نام و ورود
                      </Link>
                    </div>
                  </React.Fragment>
                )}
                {token && (
                  <React.Fragment>
                    <div className="option-item">
                      <Link to="/my-profile" className="default-btn">
                        {user &&
                          user.map((item, i) =>
                            item.fullname === "" ? (
                              <span key={i}>{item.phone}</span>
                            ) : (
                              <span key={i}>{item.fullname}</span>
                            )
                          )}
                      </Link>
                    </div>
                    &nbsp;
                    <div className="option-item">
                      <Link to="/logout" className="default-btn">
                        خروج
                      </Link>
                    </div>
                  </React.Fragment>
                )}
                &nbsp;
                <div className="option-item">
                  <Link to="/#bookingTable" className="default-btn">
                    جدول رزرو
                  </Link>
                </div>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </React.Fragment>
  );
};
export default LargeMenu;

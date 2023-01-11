import React, { useState, useEffect } from "react";
import http from "../services/httpService";
import config from "../../config.json";
import { HashLink as Link } from "react-router-hash-link";

const SmallMenu = () => {
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
      <div className="others-option-for-responsive">
        <div className="container">
          <div className="dot-menu">
            <div className="inner">
              <div className="circle circle-one"></div>
              <div className="circle circle-two"></div>
              <div className="circle circle-three"></div>
            </div>
          </div>
          <div className="container">
            <div className="option-inner">
              <div className="others-option justify-content-center d-flex align-items-center">
                <div className="option-item">
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
                </div>
                &nbsp;
                <div className="option-item">
                  <Link to="/#bookingTable" className="default-btn">
                    جدول رزرو
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
export default SmallMenu;

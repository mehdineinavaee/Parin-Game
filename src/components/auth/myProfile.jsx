import React, { useState, useEffect } from "react";
import http from "../services/httpService";
import config from "../../config.json";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MyProfile = () => {
  const [token, setToken] = useState();
  const [myProfile, setMyProfile] = useState();
  const [userReservation, setUserReservation] = useState();
  const [showFullName, setShowFullName] = useState();

  useEffect(() => {
    const asyncCall = async () => {
      const token = localStorage.getItem("token");
      setToken(token);
      if (token === null || token === "") window.location = "/login";
      const resProfile = await http.get(
        config.apiUserDetail + "?phone=" + token
      );
      if (resProfile.status === 200) {
        setMyProfile(resProfile.data);
        setShowFullName(resProfile.data[0].fullname);
      } else {
        toast.error("خطا در اتصال، لطفاً مجدداً تلاش کنید");
      }
      const resUserReservation = await http.get(
        config.apiUserReservation + "?phone=" + token
      );
      if (resUserReservation.status === 200) {
        setUserReservation(resUserReservation.data);
      } else {
        toast.error("خطا در اتصال، لطفاً مجدداً تلاش کنید");
      }
    };
    asyncCall();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(e.target[0].value);
    const changeName = await http.get(
      config.apiSetProfile +
        "?phone=" +
        token +
        "&fullname=" +
        e.target[0].value
    );
    if (changeName.status === 200) {
      toast.success("نام کاربر تغییر یافت");
    } else {
      toast.error("خطا در اتصال، لطفاً مجدداً تلاش کنید");
    }
  };

  const handleChange = ({ currentTarget: input }) => {
    setShowFullName(input.value);
  };

  return (
    <React.Fragment>
      <div>
        <ToastContainer rtl />
        <div
          style={{
            backgroundColor: "#151b20",
            paddingTop: "80px",
            paddingBottom: "80px",
            position: "relative",
          }}
        >
          <div className="container">
            <div className="page-banner-content">
              <h1>پروفایل من</h1>
              <ul>
                <li>
                  <Link to="/" className="nav-link">
                    خانه
                  </Link>
                </li>
                <li>پروفایل من</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="my-account-area pt-100 pb-100">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 mx-auto">
                <div className="my-account-form">
                  <form onSubmit={handleSubmit}>
                    {myProfile &&
                      myProfile.map((item) => (
                        <div key={item.id} className="section-title">
                          {item.fullname === "" ? (
                            <h2>{item.phone}</h2>
                          ) : (
                            <h2>{item.fullname}</h2>
                          )}
                          <div className="input-group mb-3">
                            <input
                              type="text"
                              className="form-control"
                              id="txtFullName"
                              name="txtFullName"
                              value={showFullName}
                              onChange={handleChange}
                              placeholder="نام و نام خانوادگی"
                            />
                            <div className="input-group-prepend">
                              <button className="default-btn" type="submit">
                                ثبت
                              </button>
                            </div>
                          </div>
                          <br />
                          <label>امتیاز شما:&nbsp;</label>
                          <label className="Vazir">&nbsp;5 امتیاز</label>
                        </div>
                      ))}
                  </form>
                </div>
              </div>
              {userReservation && Object.keys(userReservation).length > 0 && (
                <div style={{ marginTop: "50px" }}>
                  <table className="table table-dark table-hover Vazir">
                    <thead>
                      <tr>
                        <th style={{ textAlign: "center" }}>کد بازی</th>
                        <th style={{ textAlign: "center" }}>سانس</th>
                        <th style={{ textAlign: "center" }}>تعداد بازیکن</th>
                        <th style={{ textAlign: "center" }}>توضیحات</th>
                      </tr>
                    </thead>
                    <tbody>
                      {userReservation &&
                        userReservation.map((item) => (
                          <tr key={item.gameid}>
                            <td style={{ textAlign: "center" }}>
                              {item.gameid}
                            </td>
                            <td style={{ textAlign: "center" }}>
                              {item.admindescription}
                            </td>
                            <td style={{ textAlign: "center" }}>
                              {item.playernumber}
                            </td>
                            <td style={{ textAlign: "center" }}>
                              {item.description}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="faqs-buy-one-area pt-100 pb-100">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-8">
                <div className="faqs-buy-content">
                  <div className="section-title left-title">
                    <h2>هم اکنون بازی ویژه ما را رزرو کنید</h2>
                    <p style={{ textAlign: "justify" }}>
                      لورم ایپسوم به سادگی ساختار چاپ و متن را در بر می گیرد.
                      لورم ایپسوم به مدت 40 سال استاندارد صنعت بوده است.لورم
                      ایپسوم به سادگی ساختار چاپ و متن را در بر می گیرد. لورم
                      ایپسوم به مدت 40 سال استاندارد صنعت بوده است.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="faqs-buy-btn">
                  <Link to="/vije" className="default-btn">
                    نمایش بیشتر
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

export default MyProfile;

import React from "react";
import { Link } from "react-router-dom";

export const Page404 = () => {
  return (
    <React.Fragment>
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
            <h1>خطای 404</h1>
            <ul>
              <li>
                <Link to="/" className="nav-link">
                  خانه
                </Link>
              </li>
              <li>خطای 404</li>
            </ul>
          </div>
        </div>
      </div>

      <div class="error-area ptb-100">
        <div class="container">
          <div class="error-content">
            <h1>
              4<span>0</span>4
            </h1>
            <h2>خطای 404: صفحه یافت نشد</h2>
            <p>
              صفحه ای که به دنبال آن هستید ممکن است در صورت تغییر نام حذف شده
              باشد یا به طور موقت در دسترس نباشد.
            </p>
            <Link to="/" className="nav-link">
              بازگشت به صفحه اصلی
            </Link>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

import React, { useState, useEffect } from "react";
import http from "../services/httpService";
import config from "../../config.json";
import { Link, useParams } from "react-router-dom";

const EventDetails = () => {
  var params = useParams();
  const [result, setResult] = useState();
  useEffect(() => {
    const asyncCall = async () => {
      const res = await http.get(config.apiEvent);
      const filterProduct = res.data.filter((p) => p.id == params.id);
      setResult(filterProduct);
    };
    asyncCall();
  }, []);

  // console.log(result);

  return (
    <React.Fragment>
      <div>
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
              <h1>جزئیات بازی رویداد</h1>
              <ul>
                <li>
                  <Link to="/" className="nav-link">
                    خانه
                  </Link>
                </li>
                <li>جزئیات بازی رویداد</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="portfolio-details-area pt-100 pb-70">
          <div className="container">
            <div className="row">
              {result &&
                result.map((item, i) => (
                  <>
                    <div className="col-lg-8" key={i}>
                      <div className="single-portfolio-details-content">
                        <div className="portfolio-details-img">
                          <img src={item.image} alt="images" />
                          <h2>{item.title}</h2>
                          <p style={{ textAlign: "justify" }}>
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4">
                      <div className="carbonara-pasta-card">
                        <h2>کافه پارین گیم</h2>
                        <ul>
                          <li>
                            <li>
                              <span>عنوان</span>
                              {item.title}
                            </li>
                            <span>گروه</span>
                            {item.categorytitle}
                          </li>
                          <li>
                            <span>زیر گروه</span>
                            {item.subcategorytitle}
                          </li>
                        </ul>
                      </div>
                    </div>
                  </>
                ))}
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default EventDetails;

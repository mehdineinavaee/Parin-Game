import React, { useState, useEffect } from "react";
import http from "../services/httpService";
import config from "../../config.json";
import { Link, useParams } from "react-router-dom";
import moment from "jalali-moment";

const BlogDetails = () => {
  var params = useParams();
  const [result, setResult] = useState();
  useEffect(() => {
    const asyncCall = async () => {
      const res = await http.get(config.apiBlog + "?BlogID=" + params.id);
      setResult(res);
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
              <h1>جزئیات وبلاگ</h1>
              <ul>
                <li>
                  <Link to="/" className="nav-link">
                    خانه
                  </Link>
                </li>
                <li>جزئیات وبلاگ</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="blog-page-area pt-100 pb-100 theme-dark portfolio-page-area">
          <div className="container">
            <div className="row">
              <div className="col">
                <div className="single-blog-details-content">
                  {result &&
                    result.data.map((item, i) => (
                      <>
                        <div key={i} className="blog-details-img">
                          <img src={item.image} alt="images" />
                          <div className="blog-time">
                            <span>
                              {moment(item.date, "YYYY/MM/DD")
                                .locale("fa")
                                .format("DD")}{" "}
                              {moment(item.date, "YYYY/MM/DD")
                                .locale("fa")
                                .format("MMM")}{" "}
                              {moment(item.date, "YYYY/MM/DD")
                                .locale("fa")
                                .format("YYYY")}
                            </span>
                          </div>
                        </div>
                        <h2>{item.title}</h2>
                        <p style={{ textAlign: "justify" }}>
                          {item.description}
                        </p>
                      </>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default BlogDetails;

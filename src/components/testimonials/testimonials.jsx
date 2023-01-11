import React, { Component } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import http from "../services/httpService";
import config from "../../config.json";

class Testimonials extends Component {
  state = {
    comments: [],
    isLoading: false,
  };

  async componentDidMount() {
    this.getProductComment();
  }

  async getProductComment() {
    const comments = await http.get(config.apiProductComment);
    if (comments.status === 200) {
      this.setState({ comments: comments.data });
      this.state.isLoading = true;
      // console.log("apiProductComment", this.state.comments);
    } else {
      toast.error("خطا در ارتباط با بانک اطلاعاتی");
    }
  }

  handleUsername = (username, phone) => {
    if (username === null || username === "") {
      const phoneHide = phone.replace(phone.substring(4, 7), "***");
      return phoneHide;
    } else {
      return username;
    }
  };

  render() {
    const { comments, isLoading } = this.state;
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
                <h1>بازخوردها</h1>
                <ul>
                  <li>
                    <Link to="/" className="nav-link">
                      خانه
                    </Link>
                  </li>
                  <li>بازخوردها</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="testimonials-area testimonials-page-area pt-100 pb-70">
            <div className="container">
              <div className="section-title">
                <span className="top-title">بازخوردهای ما</span>
                <h2>بازخورد مشتری ما</h2>
              </div>
              <div className="row">
                {isLoading == true
                  ? comments &&
                    comments.map((item, i) => (
                      <div
                        key={i}
                        className="col-lg-6 col-md-6"
                        data-duration="800"
                      >
                        <div className="testimonials-card testimonials-card-page">
                          <div
                            className="testimonials-text"
                            style={{ paddingRight: "0" }}
                          >
                            <h3
                              style={{ direction: "ltr", textAlign: "right" }}
                            >
                              {this.handleUsername(
                                item.userfullname,
                                item.userphone
                              )}
                            </h3>
                            <div className="testimonials-shape-1">
                              <img
                                src="assets/images/testimonials/testimonials-shape-2.png"
                                alt="images"
                              />
                            </div>
                          </div>
                          <p style={{ textAlign: "justify" }}>
                            {item.comment1}
                          </p>
                        </div>
                      </div>
                    ))
                  : null}
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Testimonials;

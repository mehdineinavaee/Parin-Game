import React, { Component } from "react";
import { Link } from "react-router-dom";

class Faq extends Component {
  state = {};

  render() {
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
                <h1>سوالات متداول</h1>
                <ul>
                  <li>
                    <Link to="/" className="nav-link">
                      خانه
                    </Link>
                  </li>
                  <li>سوالات متداول</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="faqs-area pt-100 pb-100">
            <div className="container">
              <div className="row align-items-center">
                <div className="col-lg-6">
                  <div className="faqs-img">
                    <img src="assets/images/faqs-img-1.jpg" alt="images" />
                    <div className="faqs-img-two">
                      <img src="assets/images/faqs-img-2.jpg" alt="images" />
                    </div>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="single-faq-item">
                    <div className="section-title left-title">
                      <span className="top-title">چند سوال</span>
                      <h2>سوالات متداول</h2>
                      <p style={{ textAlign: "justify" }}>
                        لورم ایپسوم به سادگی ساختار چاپ و متن را در بر می گیرد.
                        لورم ایپسوم به مدت 40 سال استاندارد صنعت بوده است.لورم
                        ایپسوم به سادگی ساختار چاپ و متن را در بر می گیرد.
                      </p>
                    </div>
                    <div className="accordion" id="accordionExample">
                      <div className="accordion-item">
                        <h2 className="accordion-header" id="headingOne">
                          <button
                            className="accordion-button"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapseOne"
                            aria-expanded="true"
                            aria-controls="collapseOne"
                          >
                            چگونه می توانم یک میز رزرو کنم؟
                          </button>
                        </h2>
                        <div
                          id="collapseOne"
                          className="accordion-collapse collapse show"
                          aria-labelledby="headingOne"
                          data-bs-parent="#accordionExample"
                        >
                          <div className="accordion-body">
                            <p style={{ textAlign: "justify" }}>
                              لورم ایپسوم به سادگی ساختار چاپ و متن را در بر می
                              گیرد. لورم ایپسوم به مدت 40 سال استاندارد صنعت
                              بوده است.لورم ایپسوم به سادگی ساختار چاپ و متن را
                              در بر می گیرد. لورم ایپسوم به مدت 40 سال استاندارد
                              صنعت بوده است.
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="accordion-item">
                        <h2 className="accordion-header" id="headingTwo">
                          <button
                            className="accordion-button collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapseTwo"
                            aria-expanded="false"
                            aria-controls="collapseTwo"
                          >
                            چگونه می توانم یک میز رزرو کنم؟
                          </button>
                        </h2>
                        <div
                          id="collapseTwo"
                          className="accordion-collapse collapse"
                          aria-labelledby="headingTwo"
                          data-bs-parent="#accordionExample"
                        >
                          <div className="accordion-body">
                            <p style={{ textAlign: "justify" }}>
                              لورم ایپسوم به سادگی ساختار چاپ و متن را در بر می
                              گیرد. لورم ایپسوم به مدت 40 سال استاندارد صنعت
                              بوده است.لورم ایپسوم به سادگی ساختار چاپ و متن را
                              در بر می گیرد. لورم ایپسوم به مدت 40 سال استاندارد
                              صنعت بوده است.
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="accordion-item">
                        <h2 className="accordion-header" id="headingThree">
                          <button
                            className="accordion-button collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapseThree"
                            aria-expanded="false"
                            aria-controls="collapseThree"
                          >
                            چگونه می توانم یک میز رزرو کنم؟
                          </button>
                        </h2>
                        <div
                          id="collapseThree"
                          className="accordion-collapse collapse"
                          aria-labelledby="headingThree"
                          data-bs-parent="#accordionExample"
                        >
                          <div className="accordion-body">
                            <p style={{ textAlign: "justify" }}>
                              لورم ایپسوم به سادگی ساختار چاپ و متن را در بر می
                              گیرد. لورم ایپسوم به مدت 40 سال استاندارد صنعت
                              بوده است.لورم ایپسوم به سادگی ساختار چاپ و متن را
                              در بر می گیرد. لورم ایپسوم به مدت 40 سال استاندارد
                              صنعت بوده است.
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="accordion-item">
                        <h2 className="accordion-header" id="headingFore">
                          <button
                            className="accordion-button collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapseFore"
                            aria-expanded="false"
                            aria-controls="collapseFore"
                          >
                            چگونه می توانم یک میز رزرو کنم؟
                          </button>
                        </h2>
                        <div
                          id="collapseFore"
                          className="accordion-collapse collapse"
                          aria-labelledby="headingFore"
                          data-bs-parent="#accordionExample"
                        >
                          <div className="accordion-body">
                            <p style={{ textAlign: "justify" }}>
                              لورم ایپسوم به سادگی ساختار چاپ و متن را در بر می
                              گیرد. لورم ایپسوم به مدت 40 سال استاندارد صنعت
                              بوده است.لورم ایپسوم به سادگی ساختار چاپ و متن را
                              در بر می گیرد. لورم ایپسوم به مدت 40 سال استاندارد
                              صنعت بوده است.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
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
            <div className="faqs-buy-shape-1">
              <img src="assets/images/faqs-shape-1.png" alt="images" />
            </div>
            <div className="faqs-buy-shape-2">
              <img src="assets/images/faqs-shape-2.png" alt="images" />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Faq;

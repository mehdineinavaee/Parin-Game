import React, { Component } from "react";
import { Link } from "react-router-dom";
import http from "../services/httpService";
import config from "../../config.json";

class Footer extends Component {
  state = {
    footer: [],
    isLoading: false,
  };

  componentDidMount() {
    this.getSetting();
  }

  async getSetting() {
    const footer = await http.get(config.apiSetting);
    if (footer.status === 200) {
      this.setState({ footer: footer.data });
      this.state.isLoading = true;
      // console.log("apiSetting", this.state.footer);
    } else {
      alert("Error");
    }
  }

  handlePhone() {
    if (this.state.isLoading == true) return this.state.footer[0].phone;
  }

  handleAddress() {
    if (this.state.isLoading == true) return this.state.footer[0].address;
  }

  handleTellHref() {
    if (this.state.isLoading == true)
      return "tel:" + this.state.footer[0].phone;
  }

  handleFacebook() {
    if (this.state.isLoading == true) {
      if (this.state.footer[0].facebook !== "") {
        return (
          <li>
            <a href={this.state.footer[0].facebook}>
              <i className="bx bxl-facebook"></i>
            </a>
          </li>
        );
      }
    }
  }

  handleInstagram() {
    if (this.state.isLoading == true) {
      if (this.state.footer[0].instagram !== "") {
        return (
          <li>
            <a href={this.state.footer[0].instagram}>
              <i className="bx bxl-instagram"></i>
            </a>
          </li>
        );
      }
    }
  }

  handleTelegram() {
    if (this.state.isLoading == true) {
      if (this.state.footer[0].telegram !== "") {
        return (
          <li>
            <a href={this.state.footer[0].telegram}>
              <i className="bx bxl-telegram"></i>
            </a>
          </li>
        );
      }
    }
  }

  handleWhatsapp() {
    if (this.state.isLoading == true) {
      if (this.state.footer[0].whatsapp !== "") {
        return (
          <li>
            <a href={this.state.footer[0].whatsapp}>
              <i className="bx bxl-whatsapp"></i>
            </a>
          </li>
        );
      }
    }
  }

  handleYoutube() {
    if (this.state.isLoading == true) {
      if (this.state.footer[0].youtube !== "") {
        return (
          <li>
            <a href={this.state.footer[0].youtube}>
              <i className="bx bxl-youtube"></i>
            </a>
          </li>
        );
      }
    }
  }

  render() {
    return (
      <React.Fragment>
        <div>
          <div className="footer-widget-area  pt-100 pb-70">
            <div className="container">
              <div className="row">
                <div
                  className="col-lg-3 col-sm-6 col-md-6"
                  data-cue="slideInUp"
                >
                  <div className="footer-widget">
                    <Link to="/" className="nav-link bg-border-top">
                      <img src="assets/images/LogoParin.png" alt="images" />
                    </Link>
                    <p style={{ textAlign: "justify" }}>
                      لورم ایپسوم به سادگی ساختار چاپ و متن را در بر می گیرد.
                      لورم ایپسوم به مدت 40 سال استاندارد صنعت بوده است.
                    </p>
                    <ul className="footer-widget-list">
                      {this.handleFacebook()}
                      {this.handleInstagram()}
                      {this.handleTelegram()}
                      {this.handleWhatsapp()}
                      {this.handleYoutube()}
                    </ul>
                  </div>
                </div>
                <div
                  className="col-lg-3 col-sm-6 col-md-6"
                  data-cue="slideInUp"
                >
                  <div className="footer-widget">
                    <h2>منوها</h2>
                    <ul className="footer-list">
                      <li>
                        <Link to="/" className="nav-link bg-border-top">
                          <i className="bx bxs-downvote"></i>
                          خانه
                        </Link>
                      </li>
                      <li>
                        <Link to="/cafe" className="nav-link bg-border-top">
                          <i className="bx bxs-downvote"></i>
                          کافه
                        </Link>
                      </li>
                      <li>
                        <Link to="/blog" className="nav-link bg-border-top">
                          <i className="bx bxs-downvote"></i>
                          وبلاگ
                        </Link>
                      </li>
                      <li>
                        <Link to="/about" className="nav-link bg-border-top">
                          <i className="bx bxs-downvote"></i>
                          درباره ما
                        </Link>
                      </li>
                      <li>
                        <Link to="/contact" className="nav-link bg-border-top">
                          <i className="bx bxs-downvote"></i>
                          تماس با ما
                        </Link>
                      </li>
                      <li>
                        <Link to="/faq" className="nav-link bg-border-top">
                          <i className="bx bxs-downvote"></i>
                          سوالات متداول
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/testimonials"
                          className="nav-link bg-border-top"
                        >
                          <i className="bx bxs-downvote"></i>
                          بازخوردها
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
                <div
                  className="col-lg-3 col-sm-6 col-md-6"
                  data-cue="slideInUp"
                >
                  <div className="footer-widget footer-services">
                    <h2>ساعت های کاری</h2>
                    <ul className="footer-list">
                      <li>
                        شنبه <span>08:00 عصر – 05:00 صبح</span>
                      </li>
                      <li>
                        یک شنبه <span>09:00 عصر – 06:00 صبح</span>
                      </li>
                      <li>
                        دوشنبه <span>10:00 عصر – 05:00 صبح</span>
                      </li>
                      <li>
                        سه شنبه <span>09:00 عصر – 05:00 صبح</span>
                      </li>
                      <li>
                        چهارشنبه <span>09:00 عصر – 05:00 صبح</span>
                      </li>
                      <li>
                        پنج شنبه <span>09:00 عصر – 05:00 صبح</span>
                      </li>
                      <li>
                        جمعه <span>09:00 عصر – 05:00 صبح</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div
                  className="col-lg-3 col-sm-6 col-md-6"
                  data-cue="slideInUp"
                >
                  <div className="footer-widget">
                    <h2>در تماس باشید</h2>
                    <div className="footer-item">
                      <i className="bx bxs-phone-call"></i>
                      <a href={this.handleTellHref()}>{this.handlePhone()}</a>
                    </div>
                    <div className="footer-item">
                      <i className="bx bx-map"></i>
                      <p>{this.handleAddress()}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="footer-shape-1">
              <img src="assets/images/footer/footer-shape-1.png" alt="images" />
            </div>
            <div className="footer-shape-2">
              <img src="assets/images/footer/footer-shape-2.png" alt="images" />
            </div>
            <div className="footer-shape-3">
              <img src="assets/images/footer/footer-shape-3.png" alt="images" />
            </div>
            <div className="footer-shape-4">
              <img src="assets/images/footer/footer-shape-4.png" alt="images" />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Footer;

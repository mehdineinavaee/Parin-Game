import React, { Component } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import http from "../services/httpService";
import config from "../../config.json";

class Contact extends Component {
  state = {
    contact: [],
    isLoading: false,
  };

  componentDidMount() {
    this.getSetting();
  }

  async getSetting() {
    const contact = await http.get(config.apiSetting);
    if (contact.status === 200) {
      this.setState({ contact: contact.data });
      this.state.isLoading = true;
      // console.log("apiSetting", this.state.contact);
    } else {
      toast.error("خطا در ارتباط با بانک اطلاعاتی");
    }
  }

  handlePhone() {
    if (this.state.isLoading == true) return this.state.contact[0].phone;
  }

  handleAddress() {
    if (this.state.isLoading == true) return this.state.contact[0].address;
  }

  handleTellHref() {
    if (this.state.isLoading == true)
      return "tel:" + this.state.contact[0].phone;
  }

  render() {
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
                <h1>تماس با ما</h1>
                <ul>
                  <li>
                    <Link to="/" className="nav-link">
                      خانه
                    </Link>
                  </li>
                  <li>تماس با ما</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="contact-from-area pt-100 pb-100">
            <div className="container">
              <div className="contact-form-box">
                <div className="row">
                  <div className="col-lg-5">
                    <div className="contact-form-content">
                      <div className="section-title left-title">
                        <h2>با ما در تماس باشید</h2>
                      </div>
                      <div className="contact-widget">
                        <div className="contact-item">
                          <i className="bx bxs-phone-call"></i>
                          <h3>تلفن:</h3>
                          <a href={this.handleTellHref()}>
                            {this.handlePhone()}
                          </a>
                        </div>
                        <div className="contact-item">
                          <i className="bx bx-map"></i>
                          <h3>آدرس:</h3>
                          <p>{this.handleAddress()}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="contact-map-area">
            <div className="container-fluid">
              <div className="google-map">
                <iframe
                  className="maps"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1144.2944823772139!2d51.37673309194808!3d35.78634154859075!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f8e07c543e1b7b1%3A0xca1ca3118c99c858!2sTehran%20Province%2C%20Tehran%2C%20District%202%2C%20S%202nd%20St%2C%20Q9PG%2BHX5%2C%20Iran!5e0!3m2!1sen!2s!4v1671812683215!5m2!1sen!2s"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Contact;

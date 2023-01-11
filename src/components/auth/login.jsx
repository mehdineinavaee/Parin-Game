import React, { Component } from "react";
import http from "../services/httpService";
import config from "../../config.json";
import InputMask from "react-input-mask";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import $ from "jquery";

class Login extends Component {
  componentDidMount() {
    const token = localStorage.getItem("token");
    // console.log(token);
    if (token !== null) window.location = "/";
    this.loadJS();
  }

  loadJS() {
    $(document).ready(function () {
      var base_color = "#d31d52";
      var active_color = "#1ca5c0";

      var child = 1;
      var length = $("section").length - 1;

      $("section").not("section:nth-of-type(1)").hide();
      $("section")
        .not("section:nth-of-type(1)")
        .css("transform", "translateX(100px)");

      var svgWidth = length * 200 + 24;
      $("#svg_wrap").html(
        '<svg version="1.1" id="svg_form_time" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 ' +
          svgWidth +
          ' 24" xml:space="preserve"></svg>'
      );

      function makeSVG(tag, attrs) {
        var el = document.createElementNS("http://www.w3.org/2000/svg", tag);
        for (var k in attrs) el.setAttribute(k, attrs[k]);
        return el;
      }

      for (var i = 0; i < length; i++) {
        var positionX = 12 + i * 200;
        var rect = makeSVG("rect", {
          x: positionX,
          y: 9,
          width: 200,
          height: 6,
        });
        document.getElementById("svg_form_time").appendChild(rect);
        // <g><rect x="12" y="9" width="200" height="6"></rect></g>'
        var circle = makeSVG("circle", {
          cx: positionX,
          cy: 12,
          r: 12,
          width: positionX,
          height: 6,
        });
        document.getElementById("svg_form_time").appendChild(circle);
      }

      var circle = makeSVG("circle", {
        cx: positionX + 200,
        cy: 12,
        r: 12,
        width: positionX,
        height: 6,
      });
      document.getElementById("svg_form_time").appendChild(circle);

      $("#svg_form_time rect").css("fill", base_color);
      $("#svg_form_time circle").css("fill", base_color);
      $("circle:nth-of-type(1)").css("fill", active_color);

      $(".button").click(async function () {
        var result = document.getElementById("phoneNumber").value;
        var withoutSpace = result.replaceAll(" ", "");
        var phoneNumber = withoutSpace.replaceAll("*", "");

        if (child > length) {
          $(this).addClass("disabled");
          $("#submit").removeClass("disabled");
          // the second step event
          var result = document.getElementById("submitedCode").value;
          const withoutSpace = result.replaceAll(" ", "");
          const submitedCode = withoutSpace.replaceAll("*", "");
          if (submitedCode.length === 4) {
            const verifySms = await http.get(
              config.apiVerifySMSCode +
                "?phone=" +
                phoneNumber +
                "&smscode=" +
                submitedCode
            );
            if (verifySms.status === 200) {
              if (verifySms.data === "1") {
                localStorage.setItem("token", phoneNumber);
                window.location.href = "/";
              } else {
                toast.error(
                  "کد تأیید صحیح نمی باشد، لطفاً چند دقیقه دیگر مجدداً تلاش کنید"
                );
              }
            } else {
              toast.error(
                "کد تأیید صحیح نمی باشد، لطفاً چند دقیقه دیگر مجدداً تلاش کنید"
              );
            }
          } else {
            toast.error(
              "کد تأیید صحیح نمی باشد، لطفاً چند دقیقه دیگر مجدداً تلاش کنید"
            );
            child--;
            return;
          }
        }
        if (child <= length) {
          child++;
          // the first step event
          // send sms
          if (phoneNumber.length === 11) {
            $("#svg_form_time rect").css("fill", active_color);
            $("#svg_form_time circle").css("fill", active_color);
            await http.get(config.apiLoginRegister + "?phone=" + phoneNumber);
          } else {
            toast.error("شماره همراه وارد شده صحیح نمی باشد");
            child--;
            return;
          }
        }

        // go to next step
        var circle_child = child + 1;
        $("#svg_form_time rect:nth-of-type(n + " + child + ")").css(
          "fill",
          base_color
        );
        $("#svg_form_time circle:nth-of-type(n + " + circle_child + ")").css(
          "fill",
          base_color
        );
        var currentSection = $("section:nth-of-type(" + child + ")");
        currentSection.fadeIn();
        currentSection.css("transform", "translateX(0)");
        currentSection.nextAll("section").css("transform", "translateX(100px)");
        $("section").not(currentSection).hide();
      });
    });
  }

  render() {
    return (
      <React.Fragment>
        <ToastContainer rtl />
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
                <h1>ثبت نام و ورود</h1>
                <ul>
                  <li>
                    <Link to="/" className="nav-link">
                      خانه
                    </Link>
                  </li>
                  <li>ثبت نام و ورود</li>
                </ul>
              </div>
            </div>
          </div>

          <div
            style={{
              paddingTop: "50px",
              paddingBottom: "20px",
              backgroundColor: "#0e1317",
            }}
          >
            <div id="svg_wrap"></div>
          </div>
          <div className="my-account-area pt-50 pb-100">
            <div className="container">
              <div className="row">
                <div className="col-lg-6 mx-auto">
                  <div className="my-account-form">
                    <div className="section-title">
                      <h2>از اینجا وارد شوید</h2>
                      <p>شما در حال ورود به سیستم هستید.</p>
                    </div>
                    <section>
                      <div className="row">
                        <div className="col-lg-12">
                          <div className="form-group">
                            <label
                              htmlFor="exampleFormControlInput1"
                              className="form-label"
                            >
                              شماره موبایل خود را وارد نمایید *
                            </label>
                            <InputMask
                              type="text"
                              id="phoneNumber"
                              name="phoneNumber"
                              style={{
                                textAlign: "center",
                                direction: "ltr",
                              }}
                              className="form-control"
                              mask="0\999 999 9999"
                              maskChar={"*"}
                              alwaysShowMask={true}
                              autofocus
                            />
                          </div>
                        </div>
                      </div>
                    </section>
                    <section>
                      <div className="row">
                        <div className="col-lg-12">
                          <div className="form-group">
                            <label
                              htmlFor="exampleFormControlInput1"
                              className="form-label"
                            >
                              کد تأیید خود را وارد نمایید *
                            </label>
                            <InputMask
                              type="text"
                              id="submitedCode"
                              name="submitedCode"
                              style={{
                                textAlign: "center",
                                direction: "ltr",
                              }}
                              className="form-control"
                              mask="9 9 9 9"
                              maskChar={"*"}
                              alwaysShowMask={true}
                              autofocus
                            />
                          </div>
                        </div>
                      </div>
                    </section>
                    <button
                      type="button"
                      className="button default-btn"
                      id="next"
                    >
                      مرحله بعد &larr;
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Login;

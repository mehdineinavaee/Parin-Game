import React, { Component } from "react";
import http from "../services/httpService";
import config from "../../config.json";
import { Link } from "react-router-dom";
import Input from "../common/input";
import Select from "../common/select";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class About extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    reservation: [],
    reservationFilter: [],
    isLoadingReservation: false,
    account: { mobile: "", description: "", player: "" },
    sans: "",
    errors: {},
    priceReservation: "",
    token: "",
    showPhone: "",
  };

  componentDidMount() {
    this.getReservation();
    const token = localStorage.getItem("token");
    this.setState({ token });

    this.setState({ showPhone: token });
    console.log(this.state.showPhone);
  }

  async getReservation() {
    const reservation = await http.get(config.apiReservation);
    if (reservation.status === 200) {
      this.setState({ reservation: reservation.data });
      this.state.isLoadingReservation = true;
      // console.log("apiReservation", this.state.reservation);
    } else {
      toast.error("خطا در ارتباط با بانک اطلاعاتی");
    }
  }

  async postSetReservation() {
    const { mobile, description, player } = this.state.account;
    const setReservation = await http.get(
      config.apiSetReservation +
        "?reservationid=" +
        this.state.sans +
        "&phone=" +
        mobile +
        "&description=" +
        description +
        "playernumber=" +
        player
    );
    if (setReservation.status === 200) {
      window.open(
        "https://paringame.com/API/Payment.aspx" +
          "?reservationid=" +
          this.state.reservationFilter[0].id +
          "&amount=" +
          this.state.reservationFilter[0].price
      );
    } else {
      toast.error("خطا در ارتباط با بانک اطلاعاتی");
    }
  }

  validate = () => {
    const errors = {};

    if (this.state.sans === "") errors.sans = "سانس را انتخاب کنید";

    const { account } = this.state;
    // if (account.mobile.trim() === "") errors.mobile = "موبایل را وارد کنید";

    if (
      (account.mobile.trim().length > 11 ||
        account.mobile.trim().length < 11) &&
      account.mobile.trim() !== ""
    )
      errors.mobile = "موبایل باید یازده رقمی باشد";
    if (account.player.trim() === "")
      errors.player = "تعداد بازیکن را وارد کنید";

    return Object.keys(errors).length === 0 ? null : errors;
  };

  onChangeSans(event) {
    // console.log(event.currentTarget.value);
    const errors = { ...this.state.errors };
    if (event.currentTarget.value === "DEFAULT") {
      errors.sans = "سانس را انتخاب کنید";
      this.setState({ errors: errors || {} });
      const priceReservation = "";
      this.setState({ priceReservation });
      if (errors) return;
    } else {
      errors.sans = "";
      this.setState({ errors: errors || {} });
      this.setState({ sans: event.currentTarget.value });
      // console.log("apiReservation", this.state.reservation);
      const reservationFilter = this.state.reservation.filter(
        (p) => p.id === this.state.reservation[event.currentTarget.value].id
      );
      this.setState({ reservationFilter });
      // console.log("reservationFilter", this.state.reservationFilter);

      const priceReservation =
        this.separateNum(
          "مبلغ رزرو " + this.state.reservation[event.currentTarget.value].price
        ) + " تومان می باشد";

      this.setState({ priceReservation });
    }
  }

  handleSubmit = (e) => {
    // console.log("reservationFilter", this.state.reservationFilter);
    e.preventDefault();

    if (this.state.token) {
      const errors = this.validate();
      this.setState({ errors: errors || {} });
      if (errors) return;

      // call the server
      // console.log("Submitted");

      this.setState({ mobile: e.target[0].value }); // console.log("mobile: ", mobile);
      this.setState({ description: e.target[2].value }); // console.log("description: ", description);
      this.setState({ player: e.target[3].value }); // console.log("player: ", player);

      // console.log("sans: ", this.state.sans);

      this.postSetReservation();
    } else {
      toast.error("جهت رزرو وارد شوید");
    }
  };

  validateProperty = ({ name, value }) => {
    if (name === "mobile") {
      if (value.trim() === "") return "موبایل را وارد کنید";
      if (value.trim().length > 11 || value.trim().length < 11)
        return "موبایل باید یازده رقمی باشد";
    }
    if (name === "player") {
      if (value.trim() === "") return "تعداد بازیکن را وارد کنید";
      // ...
    }
  };

  handleChange = ({ currentTarget: input }) => {
    if (input.name === "mobile") {
      this.setState({ showPhone: input.value });
    }

    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const account = { ...this.state.account };
    account[input.name] = input.value;
    this.setState({ account, errors });
  };

  // Separate 3 digits from right
  separateNum(value) {
    var nStr = value + "";
    nStr = nStr.replace(/,/g, "");
    var x = nStr.split(".");
    var x1 = x[0];
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
      x1 = x1.replace(rgx, "$1,$2");
    }
    return x1;
  }

  render() {
    const {
      reservation,
      isLoadingReservation,
      account,
      errors,
      priceReservation,
      token,
      showPhone,
    } = this.state;
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
                <h1>درباره ما</h1>
                <ul>
                  <li>
                    <Link to="/" className="nav-link">
                      خانه
                    </Link>
                  </li>
                  <li>درباره ما</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="about-area about-page pt-100 pb-100 theme-dark portfolio-page-area">
            <div className="container">
              <div className="row align-items-center">
                <div className="col" data-duration="800">
                  <div className="single-about-content">
                    <div className="section-title left-title">
                      <span className="top-title">درباره ما</span>
                      <h2>از یک سفر استثنایی طعم در کافه ما لذت ببرید</h2>
                      <p style={{ textAlign: "justify" }}>
                        لورم ایپسوم به سادگی ساختار چاپ و متن را در بر می گیرد.
                        لورم ایپسوم به مدت 40 سال استاندارد صنعت بوده است.
                      </p>
                    </div>
                    <ul>
                      <li>
                        <i className="bx bx-left-arrow-circle"></i>
                        <p style={{ textAlign: "justify" }}>
                          لورم ایپسوم به سادگی ساختار چاپ و متن را در بر می
                          گیرد.
                        </p>
                      </li>
                      <li>
                        <i className="bx bx-left-arrow-circle"></i>
                        <p style={{ textAlign: "justify" }}>
                          لورم ایپسوم به سادگی ساختار چاپ و متن را در بر می
                          گیرد.
                        </p>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="about-shape-1">
              <img
                src="assets/images/about/about-page-shape-1.png"
                alt="images"
              />
            </div>
            <div className="about-shape-2">
              <img
                src="assets/images/about/about-page-shape-2.png"
                alt="images"
              />
            </div>
            <div className="about-shape-3">
              <img
                src="assets/images/about/about-page-shape-3.png"
                alt="images"
              />
            </div>
            <div className="about-shape-4">
              <img
                src="assets/images/about/about-page-shape-4.png"
                alt="images"
              />
            </div>
          </div>

          <div
            className="visit-today-area pt-100 pb-100 jarallax"
            data-jarallax='{"speed": 0.3}'
          >
            <div className="container">
              <div className="section-title">
                <span className="top-title">امروز از ما دیدن کنید</span>
                <h2>رزرو کنید</h2>
              </div>
              <form
                className="reserve-from reserve-from-two"
                onSubmit={this.handleSubmit}
              >
                <div className="row">
                  <div className="col-lg-6 col-sm-6 col-md-6">
                    <div className="form-group">
                      <Input
                        id="mobile"
                        name="mobile"
                        value={showPhone}
                        onChange={this.handleChange}
                        placeholder="موبایل"
                        error={errors.mobile}
                      />
                    </div>
                  </div>
                  <div className="col-lg-6 col-sm-6 col-md-6">
                    <div className="form-group">
                      <Select
                        onChange={this.onChangeSans.bind(this)}
                        isLoading={isLoadingReservation}
                        dataOption={reservation}
                        error={errors.sans}
                        priceReservation={priceReservation}
                      />
                    </div>
                  </div>
                  <div className="col-lg-6 col-sm-6 col-md-6">
                    <div className="form-group">
                      <Input
                        id="player"
                        name="player"
                        value={account.player}
                        onChange={this.handleChange}
                        placeholder="تعداد بازیکن"
                        error={errors.player}
                      />
                    </div>
                  </div>
                  <div className="col-lg-6 col-sm-6 col-md-6">
                    <div className="form-group">
                      <Input
                        id="description"
                        name="description"
                        value={account.description}
                        onChange={this.handleChange}
                        placeholder="توضیحات"
                      />
                    </div>
                  </div>
                  <div className="col-lg-12 col-sm-6 col-md-12">
                    <button type="submit" className="default-btn">
                      رزرو کنید
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default About;

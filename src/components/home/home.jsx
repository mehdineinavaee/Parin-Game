import React, { Component } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import Joi from "joi-browser";
import http from "../services/httpService";
import config from "../../config.json";
import moment from "jalali-moment";
import Input from "../common/input";
import Select from "../common/select";

class Home extends Component {
  state = {
    sliders: [],
    cafeCategories: [],
    cafeSubCategories: [],
    blogs: [],
    comments: [],
    reservation: [],
    team: [],
    reservationFilter: [],
    isLoadingSliders: false,
    isLoadingBlogs: false,
    isLoadingComments: false,
    isLoadingReservation: false,
    isLoadingTeam: false,
    account: { mobile: "", description: "", player: "" },
    sans: "",
    errors: {},
    priceReservation: "",
    token: "",
    showPhone: "",
  };

  componentDidMount() {
    this.getSlider();
    this.getBlog();
    this.getProductComment();
    this.getReservation();
    this.getTeam();
    const token = localStorage.getItem("token");
    this.setState({ token });

    this.setState({ showPhone: token });
    // console.log(this.state.showPhone);
  }

  async getSlider() {
    const sliders = await http.get(config.apiSlider);
    if (sliders.status === 200) {
      this.setState({ sliders: sliders.data });
      this.state.isLoadingSliders = true;
      // console.log("apiSlider", this.state.sliders);
    } else {
      toast.error("خطا در ارتباط با بانک اطلاعاتی");
    }
  }

  async getBlog() {
    const blogs = await http.get(config.apiBlog);
    if (blogs.status === 200) {
      this.setState({ blogs: blogs.data });
      this.state.isLoadingBlogs = true;
      // console.log("apiBlog", this.state.blogs);
    } else {
      toast.error("خطا در ارتباط با بانک اطلاعاتی");
    }
  }

  async getProductComment() {
    const comments = await http.get(config.apiProductComment);
    if (comments.status === 200) {
      this.setState({ comments: comments.data });
      this.state.isLoadingComments = true;
      // console.log("apiProductComment", this.state.comments);
    } else {
      toast.error("خطا در ارتباط با بانک اطلاعاتی");
    }
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

  async getTeam() {
    const team = await http.get(config.apiTeam);
    if (team.status === 200) {
      this.setState({ team: team.data });
      this.state.isLoadingTeam = true;
      // console.log("apiTeam", this.state.team);
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

  handleUsername = (username, phone) => {
    if (username === null || username === "") {
      const phoneHide = phone.replace(phone.substring(4, 7), "***");
      return phoneHide;
    } else {
      return username;
    }
  };

  // schema = {
  //   mobile: Joi.string().required().label("Mobile"),
  //   player: Joi.string().required().label("Player"),
  // };

  validate = () => {
    // const options = { abortEarly: false };
    // const { error } = Joi.validate(this.state.account, this.schema, options);
    // if (!error) return null;

    // const errors = {};
    // for (let item of error.details) errors[item.path[0]] = item.message;
    // return errors;

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
    // const obj = { [name]: value };
    // const schema = { [name]: this.schema[name] };
    // const { error } = Joi.validate(obj.schema);
    // return error ? error.details[0].message : null;

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
      sliders,
      blogs,
      comments,
      reservation,
      team,
      isLoadingSliders,
      isLoadingBlogs,
      isLoadingComments,
      isLoadingReservation,
      isLoadingTeam,
      account,
      errors,
      priceReservation,
      token,
      showPhone,
    } = this.state;
    return (
      <React.Fragment>
        <ToastContainer rtl />
        <div className="banner-area">
          <div className="container-fluid">
            <div className="row align-items-center">
              <div className="col-lg-6">
                <div className="single-banner-content">
                  <span data-duration="800">به کافه پارین گیم خوش آمدید</span>
                  <h1 data-duration="1800">
                    کافه پارین گیم مشتاق حضور شما در مجموعه می باشد
                  </h1>
                  <p data-duration="2000" style={{ textAlign: "justify" }}>
                    لورم ایپسوم به سادگی ساختار چاپ و متن را در بر می گیرد. لورم
                    ایپسوم به مدت 40 سال استاندارد صنعت بوده است.لورم ایپسوم به
                    سادگی ساختار چاپ و متن را در بر می گیرد. لورم ایپسوم به مدت
                    40 سال استاندارد صنعت بوده است.
                  </p>
                </div>
              </div>
              <div className="col-lg-6" data-duration="2000">
                <div className="single-banner-image">
                  <img
                    src="assets/images/banner/banner-img-2.png"
                    alt="images"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="banner-shape-1">
            <img src="assets/images/banner/banner-shape-1.png" alt="images" />
          </div>
          <div className="banner-shape-2">
            <img src="assets/images/banner/banner-shape-2.png" alt="images" />
          </div>
          <div className="banner-shape-3">
            <img src="assets/images/banner/banner-shape-3.png" alt="images" />
          </div>
          <div className="banner-shape-4">
            <img src="assets/images/banner/banner-shape-4.png" alt="images" />
          </div>
          <div className="banner-shape-5">
            <img src="assets/images/banner/banner-shape-5.png" alt="images" />
          </div>
        </div>

        <div className="services-area services-pages-area pt-100 pb-70">
          <div className="container">
            <div className="section-title">
              <span className="top-title">خدمات ما</span>
              <h2>از منوی کافه ما دیدن کنید</h2>
            </div>
            <div className="row justify-content-center">
              <div className="col-lg-4 col-sm-6 col-md-6">
                <div className="single-discover-card services-card-page">
                  <Link to="/fekri">
                    <h3>بازی فکری</h3>
                  </Link>
                  <Link to="/fekri" className="discover-more">
                    <h3>بیشتر</h3>
                  </Link>
                </div>
              </div>
              <div className="col-lg-4 col-sm-6 col-md-6">
                <div className="single-discover-card services-card-page">
                  <Link to="/event">
                    <h3>بازی رویداد</h3>
                  </Link>
                  <Link to="/event" className="discover-more">
                    <h3>بیشتر</h3>
                  </Link>
                </div>
              </div>
              <div className="col-lg-4 col-sm-6 col-md-6">
                <div className="single-discover-card services-card-page">
                  <Link to="/vije">
                    <h3>بازی ویژه</h3>
                  </Link>
                  <Link to="/vije" className="discover-more">
                    <h3>بیشتر</h3>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="about-area pt-100 pb-100">
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
                        لورم ایپسوم به سادگی ساختار چاپ و متن را در بر می گیرد.
                      </p>
                    </li>
                    <li>
                      <i className="bx bx-left-arrow-circle"></i>
                      <p style={{ textAlign: "justify" }}>
                        لورم ایپسوم به سادگی ساختار چاپ و متن را در بر می گیرد.
                      </p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="about-shape-1">
            <img src="assets/images/about/about-shape-1.png" alt="images" />
          </div>
          <div className="about-shape-2">
            <img src="assets/images/about/about-shape-2.png" alt="images" />
          </div>
          <div className="about-shape-3">
            <img src="assets/images/about/about-shape-3.png" alt="images" />
          </div>
          <div className="about-shape-4">
            <img src="assets/images/about/about-shape-4.png" alt="images" />
          </div>
        </div>

        <div className="testimonials-area">
          <div className="container">
            <div className="row">
              <div
                className="col-lg-6 col-md-6"
                style={{ paddingLeft: "60px" }}
              >
                <div>
                  <div className="section-title left-title">
                    <span className="top-title" style={{ paddingTop: "50px" }}>
                      بازخورد ما
                    </span>
                    <h2>بازخورد مشتریان ما</h2>
                  </div>
                  <div style={{ height: "470px", overflow: "auto" }}>
                    {isLoadingComments == true
                      ? comments &&
                        comments.slice(-3).map((item, i) => (
                          <React.Fragment key={i}>
                            <div
                              className="testimonials-card"
                              style={{ marginBottom: "10px" }}
                            >
                              <div
                                className="testimonials-text"
                                style={{ paddingRight: "0" }}
                              >
                                <h3
                                  style={{
                                    direction: "ltr",
                                    textAlign: "right",
                                  }}
                                >
                                  {this.handleUsername(
                                    item.userfullname,
                                    item.userphone
                                  )}
                                </h3>
                                <div className="testimonials-shape-1">
                                  <img
                                    src="assets/images/testimonials/testimonials-shape.png"
                                    alt="images"
                                  />
                                </div>
                              </div>
                              <p style={{ textAlign: "justify" }}>
                                {item.comment1}
                              </p>
                            </div>
                          </React.Fragment>
                        ))
                      : null}
                  </div>
                </div>
              </div>
              <div className="col-lg-6 col-md-6">
                <div className="testimonials-img">
                  <img
                    src="assets/images/testimonials/testimonials-img-1.jpg"
                    alt="images"
                  />
                  <div className="testimonials-video">
                    <a
                      href="https://www.youtube.com/watch?v=-z-wtyXjFIg"
                      className="popup-youtube"
                    >
                      <img src="assets/images/video-play.svg" alt="images" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className="portfolio-area pt-100 pb-100 jarallax"
          data-jarallax='{"speed": 0.3}'
        >
          <div className="container">
            <div className="section-title">
              <h2>کافه پارین گیم در خدمت شما</h2>
            </div>
            <div className="portfolio-slider owl-carousel owl-theme">
              {isLoadingSliders === true
                ? sliders &&
                  sliders.map((item, i) => (
                    <React.Fragment key={i}>
                      <div className="single-portfolio-item">
                        <div className="portfolio-img">
                          <a href="#">
                            <img
                              src={item.url}
                              alt="images"
                              style={{ width: "638px", height: "422px" }}
                            />
                          </a>
                        </div>
                        <div className="portfolio-card">
                          <div className="portfolio-icon">
                            <a data-fancybox="gallery" href={item.url}>
                              <i className="bx bx-plus"></i>
                            </a>
                          </div>
                          <span>{item.title}</span>
                          <a href="#">
                            <h3>{item.description}</h3>
                          </a>
                        </div>
                      </div>
                    </React.Fragment>
                  ))
                : null}
            </div>
          </div>
          <div className="portfolio-shape">
            <img
              src="assets/images/portfolio/portfolio-shape-1.png"
              alt="images"
            />
          </div>
        </div>

        <div className="visit-us-today-area pt-100" id="bookingTable">
          <div className="container">
            <div className="row">
              <div className="col-lg-6">
                <div className="visit-images">
                  <div className="visit-main-img" data-duration="2000">
                    <img
                      src="assets/images/reserve-today/reserve-img-1.png"
                      alt="images"
                    />
                  </div>
                  <div className="visit-shape-1">
                    <img
                      src="assets/images/reserve-today/reserve-shape-1.png"
                      alt="images"
                    />
                  </div>
                  <div className="visit-shape-2">
                    <img
                      src="assets/images/reserve-today/reserve-shape-3.png"
                      alt="images"
                    />
                  </div>
                </div>
              </div>
              <div className="col-lg-6" data-duration="1500">
                <div className="reserve-from">
                  <div className="section-title left-title">
                    <span className="top-title">امروز از ما دیدن کنید</span>
                    <h2>رزرو کنید</h2>
                  </div>
                  <form onSubmit={this.handleSubmit}>
                    <div className="row">
                      <Input
                        id="mobile"
                        name="mobile"
                        value={showPhone}
                        onChange={this.handleChange}
                        placeholder="موبایل"
                        error={errors.mobile}
                      />
                      <div className="col-lg-12 col-sm-6 col-md-6">
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
                      <Input
                        id="player"
                        name="player"
                        value={account.player}
                        onChange={this.handleChange}
                        placeholder="تعداد بازیکن"
                        error={errors.player}
                      />
                      <Input
                        id="description"
                        name="description"
                        value={account.description}
                        onChange={this.handleChange}
                        placeholder="توضیحات"
                      />
                      <div className="col-lg-12 col-sm-6 col-md-6">
                        <button type="submit" className="default-btn">
                          رزرو کنید
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="visit-shape-3">
            <img
              src="assets/images/reserve-today/reserve-shape-2.png"
              alt="images"
            />
          </div>
          <div className="visit-shape-4">
            <img
              src="assets/images/reserve-today/reserve-shape-4.png"
              alt="images"
            />
          </div>
          <div className="visit-shape-5">
            <img
              src="assets/images/reserve-today/reserve-shape-5.png"
              alt="images"
            />
          </div>
        </div>

        <div className="restaurant-area pt-100 pb-100">
          <div className="container">
            <div className="section-title left-title">
              <span className="top-title">تیم گیم</span>
              <h2>با حرفه ای های ما آشنا شوید</h2>
            </div>
            <div className="restaurant-slider owl-carousel owl-theme">
              {isLoadingTeam === true
                ? team.map((item, i) => (
                    <React.Fragment key={i}>
                      <div className="single-restaurant-card">
                        <div className="restaurant-img">
                          <img
                            src={item.url}
                            alt="images"
                            style={{ width: "419px", height: "318px" }}
                          />
                        </div>
                        <div className="restaurant-content">
                          <h3>{item.title}</h3>
                          <p>{item.description}</p>
                        </div>
                      </div>
                    </React.Fragment>
                  ))
                : null}
            </div>
          </div>
          <div className="restaurant-shape-1">
            <img
              src="assets/images/restaurant/restaurant-img-shape-1.png"
              alt="images"
            />
          </div>
          <div className="restaurant-shape-2">
            <img
              src="assets/images/restaurant/restaurant-img-shape-2.png"
              alt="images"
            />
          </div>
        </div>

        <div className="blog-area pt-100 pb-70">
          <div className="container">
            <div className="section-title">
              <span className="top-title">وبلاگ ما</span>
              <h2>آخرین وبلاگ و اخبار</h2>
            </div>
            <div className="row justify-content-center">
              {isLoadingBlogs == true
                ? blogs &&
                  blogs.slice(-3).map((item, i) => (
                    <React.Fragment key={i}>
                      <div className="col-lg-4 col-sm-6 col-md-6">
                        <div className="single-blog-card">
                          <div className="blog-img">
                            <Link to={`/blog-details/${item.id}`}>
                              <img
                                src={item.image}
                                alt="images"
                                style={{
                                  width: "416px",
                                  height: "275.717px",
                                }}
                              />
                            </Link>
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
                          <div className="single-blog-content">
                            <h3>{item.title}</h3>
                            <Link to="/blog-details">
                              <p style={{ textAlign: "justify" }}>
                                {item.description.length > 100
                                  ? item.description
                                      .substring(0, 100)
                                      .concat(" ...")
                                  : item.description.substring(0, 100)}
                              </p>
                            </Link>
                            <Link
                              to={`/blog-details/${item.id}`}
                              className="discover-more"
                            >
                              ادامه مطلب
                            </Link>
                          </div>
                        </div>
                      </div>
                    </React.Fragment>
                  ))
                : null}
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Home;

import React, { Component } from "react";
import { Link } from "react-router-dom";
import http from "../services/httpService";
import config from "../../config.json";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class PreCafe extends Component {
  state = {
    cafeCategories: [],
    cafeSubCategories: [],
    products: [],
    filter: [],
    isLoadingCafeCategorise: false,
    isLoadingCafeSubCategorise: false,
    isLoadingProducts: false,
  };

  componentDidMount() {
    this.getCafeCategories();
    this.getCafeSubCategories();
    this.getProducts();
  }

  async getCafeCategories() {
    const cafeCategories = await http.get(config.apiCafeCategory);
    if (cafeCategories.status === 200) {
      this.setState({ cafeCategories: cafeCategories.data });
      this.state.isLoadingCafeCategorise = true;
      // console.log("apiCafeCategory", this.state.cafeCategories);
    } else {
      toast.error("خطا در ارتباط با بانک اطلاعاتی");
    }
  }

  async getCafeSubCategories() {
    const cafeSubCategories = await http.get(config.apiCafeSubCategory);
    if (cafeSubCategories.status === 200) {
      this.setState({ cafeSubCategories: cafeSubCategories.data });
      this.state.isLoadingCafeSubCategorise = true;
      // console.log("apiCafeSubCategory", this.state.cafeSubCategories);
    } else {
      toast.error("خطا در ارتباط با بانک اطلاعاتی");
    }
  }

  async getProducts() {
    const products = await http.get(config.apiProduct);
    if (products.status === 200) {
      this.setState({ products: products.data });
      this.setState({ filter: products.data });
      this.state.isLoadingProducts = true;
      // console.log("apiProduct", this.state.products);
    } else {
      toast.error("خطا در ارتباط با بانک اطلاعاتی");
    }
  }

  filterCategory = (id) => {
    const filter = this.state.products.filter((p) => p.categoryid == id);
    this.setState({ filter });
  };

  filterSubCategory = (id) => {
    const filter = this.state.products.filter((p) => p.subcategoryid == id);
    this.setState({ filter });
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
      cafeCategories,
      cafeSubCategories,
      filter,
      isLoadingCafeCategorise,
      isLoadingCafeSubCategorise,
      isLoadingProducts,
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
                <h1>کافه</h1>
                <ul>
                  <li>
                    <Link to="/" className="nav-link">
                      خانه
                    </Link>
                  </li>
                  <li>کافه</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="portfolio-page-area pt-100 pb-100">
            <div className="container">
              <div className="section-title">
                <h2>کافه پارین گیم در خدمت شما</h2>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <ul style={{ listStyleType: "none" }}>
                    <li style={{ marginLeft: "10px" }}>
                      <div
                        className="reserve-from"
                        style={{
                          padding: "0",
                          position: "unset",
                          background: "unset",
                        }}
                      >
                        <div className="row">
                          <div className="col-lg-12 col-sm-6 col-md-6">
                            <div className="form-group">
                              <select
                                onChange={(e) =>
                                  this.filterCategory(e.target.value)
                                }
                                defaultValue={"DEFAULT"}
                                className="form-select"
                                aria-label="Default select example"
                                style={{
                                  padding: "20px 10px 20px 40px",
                                  border: "revert",
                                  borderRadius: "10px",
                                }}
                              >
                                <option value="DEFAULT">
                                  فیلتر بر اساس گروه
                                </option>
                                {isLoadingCafeCategorise === true
                                  ? cafeCategories &&
                                    cafeCategories.map((item) => (
                                      <option key={item.id} value={item.id}>
                                        {item.title}
                                      </option>
                                    ))
                                  : null}
                              </select>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li style={{ marginLeft: "10px" }}>
                      <div
                        className="reserve-from"
                        style={{
                          padding: "0",
                          position: "unset",
                          background: "unset",
                        }}
                      >
                        <div className="row">
                          <div className="col-lg-12 col-sm-6 col-md-6">
                            <div className="form-group">
                              <select
                                onChange={(e) =>
                                  this.filterSubCategory(e.target.value)
                                }
                                defaultValue={"DEFAULT"}
                                className="form-select"
                                aria-label="Default select example"
                                style={{
                                  padding: "20px 10px 20px 40px",
                                  border: "revert",
                                  borderRadius: "10px",
                                }}
                              >
                                <option value="DEFAULT">
                                  فیلتر بر اساس زیر گروه
                                </option>
                                {isLoadingCafeSubCategorise === true
                                  ? cafeSubCategories &&
                                    cafeSubCategories.map((item) => (
                                      <option key={item.id} value={item.id}>
                                        {item.title}
                                      </option>
                                    ))
                                  : null}
                              </select>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                  <div className="portfolio-page-area pt-50 pb-100">
                    <div className="container">
                      <div className="row">
                        {isLoadingProducts === true
                          ? filter &&
                            filter.map((item, index) => (
                              <div
                                style={{ marginBottom: "20px" }}
                                key={index}
                                className="col-lg-3 col-sm-6 col-md-6"
                              >
                                <div
                                  className="portfolio-two-card"
                                  style={{ marginBottom: "15px" }}
                                >
                                  <img
                                    src={item.image}
                                    alt="images"
                                    style={{ width: "306px", height: "306px" }}
                                  />
                                  <div className="portfolio-two-content">
                                    <Link
                                      to={`/cafe-details/${item.id}`}
                                      className="nav-link"
                                    >
                                      <h3>{item.title}</h3>
                                    </Link>
                                  </div>
                                </div>
                                <Link
                                  to={`/cafe-details/${item.id}`}
                                  className="nav-link"
                                >
                                  <h3>{item.title}</h3>
                                </Link>
                                <p className="Vazir">
                                  {this.separateNum(item.price)} تومان
                                </p>
                              </div>
                            ))
                          : null}
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

export default PreCafe;

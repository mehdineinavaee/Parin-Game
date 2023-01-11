import React, { Component } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import http from "../services/httpService";
import config from "../../config.json";

class Cafe extends Component {
  state = {
    cafeCategories: [],
    cafeSubCategories: [],
    products: [],
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
      this.state.isLoadingProducts = true;
      // console.log("products", products);
      // console.log("apiProduct", this.state.products);
    } else {
      toast.error("خطا در ارتباط با بانک اطلاعاتی");
    }
  }

  // categories
  setCategoryId = (index) => {
    index++;
    let setID = "headingCategory";
    setID += index;
    return setID;
  };

  setCategoryCollapseId = (index) => {
    index++;
    let setID = "#collapseCategory";
    setID += index;
    return setID;
  };

  setCategoryCallCollapseId = (index) => {
    index++;
    let setID = "collapseCategory";
    setID += index;
    return setID;
  };

  // sub categories
  setSubCategoryId = (index) => {
    index++;
    let setID = "headingSubCategory";
    setID += index;
    return setID;
  };

  setSubCategoryCollapseId = (index) => {
    index++;
    let setID = "#collapseSubCategory";
    setID += index;
    return setID;
  };

  setSubCategoryCallCollapseId = (index) => {
    index++;
    let setID = "collapseSubCategory";
    setID += index;
    return setID;
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
      products,
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
          <div
            className="faqs-area"
            style={{ paddingTop: "50px", paddingBottom: "50px" }}
          >
            <div className="container">
              <div className="row align-items-center">
                <div className="single-faq-item">
                  <div className="accordion" id="accordionCategory">
                    {isLoadingCafeCategorise === true
                      ? cafeCategories &&
                        cafeCategories.map((itemCategory, i) => (
                          <React.Fragment key={i}>
                            <div className="accordion-item">
                              <h2
                                className="accordion-header"
                                id={this.setCategoryId(i)}
                              >
                                <button
                                  className="accordion-button"
                                  type="button"
                                  data-bs-toggle="collapse"
                                  data-bs-target={this.setCategoryCollapseId(i)}
                                  aria-expanded="true"
                                  aria-controls={this.setCategoryCallCollapseId(
                                    i
                                  )}
                                >
                                  {itemCategory.title}
                                </button>
                              </h2>
                              <div
                                id={this.setCategoryCallCollapseId(i)}
                                className="accordion-collapse collapse show"
                                aria-labelledby={this.setCategoryId(i)}
                                data-bs-parent="#accordionCategory"
                              >
                                <div className="accordion-body">
                                  <p style={{ textAlign: "justify" }}>
                                    <div
                                      className="accordion"
                                      id="accordionSubCategory"
                                    >
                                      {isLoadingCafeSubCategorise === true
                                        ? cafeSubCategories &&
                                          cafeSubCategories.map(
                                            (itemSubCategory, j) =>
                                              itemCategory.id ===
                                              itemSubCategory.categoryid ? (
                                                <React.Fragment key={j}>
                                                  <div className="accordion-item">
                                                    <h2
                                                      className="accordion-header"
                                                      id={this.setSubCategoryId(
                                                        j
                                                      )}
                                                    >
                                                      <button
                                                        className="accordion-button"
                                                        type="button"
                                                        data-bs-toggle="collapse"
                                                        data-bs-target={this.setSubCategoryCollapseId(
                                                          j
                                                        )}
                                                        aria-expanded="true"
                                                        aria-controls={this.setSubCategoryCallCollapseId(
                                                          j
                                                        )}
                                                      >
                                                        {itemSubCategory.title}
                                                      </button>
                                                    </h2>
                                                    <div
                                                      id={this.setSubCategoryCallCollapseId(
                                                        j
                                                      )}
                                                      className="accordion-collapse collapse show"
                                                      aria-labelledby={this.setSubCategoryId(
                                                        j
                                                      )}
                                                      data-bs-parent="#accordionSubCategory"
                                                    >
                                                      <div className="accordion-body">
                                                        <p
                                                          style={{
                                                            textAlign:
                                                              "justify",
                                                          }}
                                                        >
                                                          <div className="portfolio-page-area">
                                                            <div className="container">
                                                              <div className="row">
                                                                {isLoadingProducts ===
                                                                true
                                                                  ? products &&
                                                                    products.map(
                                                                      (
                                                                        itemProduct,
                                                                        k
                                                                      ) =>
                                                                        itemSubCategory.id ===
                                                                        itemProduct.subcategoryid ? (
                                                                          <React.Fragment
                                                                            key={
                                                                              k
                                                                            }
                                                                          >
                                                                            <div
                                                                              style={{
                                                                                marginBottom:
                                                                                  "20px",
                                                                              }}
                                                                              className="col-lg-3 col-sm-6 col-md-6"
                                                                            >
                                                                              <div
                                                                                className="portfolio-two-card"
                                                                                style={{
                                                                                  marginBottom:
                                                                                    "15px",
                                                                                }}
                                                                              >
                                                                                <img
                                                                                  src={
                                                                                    itemProduct.image
                                                                                  }
                                                                                  alt="images"
                                                                                  style={{
                                                                                    width:
                                                                                      "306px",
                                                                                    height:
                                                                                      "306px",
                                                                                  }}
                                                                                />
                                                                                <div className="portfolio-two-content">
                                                                                  <Link
                                                                                    to={`/cafe-details/${itemProduct.id}`}
                                                                                    className="nav-link"
                                                                                  >
                                                                                    <h3>
                                                                                      {
                                                                                        itemProduct.title
                                                                                      }
                                                                                    </h3>
                                                                                  </Link>
                                                                                </div>
                                                                              </div>
                                                                              <Link
                                                                                to={`/cafe-details/${itemProduct.id}`}
                                                                                className="nav-link"
                                                                              >
                                                                                <h3>
                                                                                  {
                                                                                    itemProduct.title
                                                                                  }
                                                                                </h3>
                                                                              </Link>
                                                                              <p className="Vazir">
                                                                                {this.separateNum(
                                                                                  itemProduct.price
                                                                                )}{" "}
                                                                                تومان
                                                                              </p>
                                                                            </div>
                                                                          </React.Fragment>
                                                                        ) : null
                                                                    )
                                                                  : null}
                                                              </div>
                                                            </div>
                                                          </div>
                                                        </p>
                                                      </div>
                                                    </div>
                                                  </div>
                                                </React.Fragment>
                                              ) : null
                                          )
                                        : null}
                                    </div>
                                  </p>
                                </div>
                              </div>
                            </div>
                          </React.Fragment>
                        ))
                      : null}
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

export default Cafe;

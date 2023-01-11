import React, { Component } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import http from "../services/httpService";
import config from "../../config.json";

class Vije extends Component {
  state = {
    vije: [],
    categories: [],
    isLoadingVije: false,
  };

  componentDidMount() {
    this.getVije();
  }

  async getVije() {
    const vije = await http.get(config.apiVije);
    if (vije.status === 200) {
      const filterVije = vije.data.filter((p) => p.categoryid == 2);
      // Sort by sub category
      filterVije.sort(function (a, b) {
        if (a.subcategoryid < b.subcategoryid) {
          return -1;
        }
        if (a.subcategoryid > b.subcategoryid) {
          return 1;
        }
        // sub category must be equal
        return 0;
      });
      // console.log("Sort: ", filterVije);
      this.setState({ vije: filterVije });
      this.state.isLoadingVije = true;
      // console.log("apiVije", this.state.vije);
      this.removeDuplicatedCategories(filterVije);
    } else {
      toast.error("خطا در ارتباط با بانک اطلاعاتی");
    }
  }

  removeDuplicatedCategories = (arr) => {
    // console.log("Original Categories", arr);

    arr = arr.filter(
      (value, index, self) =>
        index === self.findIndex((t) => t.subcategoryid === value.subcategoryid)
    );

    // console.log("Removed", arr);
    this.setState({ categories: arr });
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

  render() {
    const { vije, isLoadingVije, categories } = this.state;

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
                <h1>بازی ویژه</h1>
                <ul>
                  <li>
                    <Link to="/" className="nav-link">
                      خانه
                    </Link>
                  </li>
                  <li>بازی ویژه</li>
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
                  <div className="accordion" id="accordionExample">
                    {isLoadingVije === true
                      ? categories &&
                        categories.map((itemCategory, index) => (
                          <div className="accordion-item" key={index}>
                            <h2
                              className="accordion-header"
                              id={this.setSubCategoryId(index)}
                            >
                              <button
                                className="accordion-button"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target={this.setSubCategoryCollapseId(
                                  index
                                )}
                                aria-expanded="true"
                                aria-controls={this.setSubCategoryCallCollapseId(
                                  index
                                )}
                              >
                                {itemCategory.subcategorytitle}
                              </button>
                            </h2>
                            <div
                              id={this.setSubCategoryCallCollapseId(index)}
                              className="accordion-collapse collapse show"
                              aria-labelledby={this.setSubCategoryId(index)}
                              data-bs-parent="#accordionExample"
                            >
                              <div className="accordion-body">
                                <p style={{ textAlign: "justify" }}>
                                  <div className="portfolio-page-area">
                                    <div className="container">
                                      <div className="row">
                                        {vije &&
                                          vije.map((itemVije, indexVije) =>
                                            itemCategory.subcategoryid ===
                                            itemVije.subcategoryid ? (
                                              <div
                                                style={{
                                                  marginBottom: "20px",
                                                }}
                                                key={indexVije}
                                                className="col-lg-3 col-sm-6 col-md-6"
                                              >
                                                <div
                                                  className="portfolio-two-card"
                                                  style={{
                                                    marginBottom: "15px",
                                                  }}
                                                >
                                                  <img
                                                    src={itemVije.image}
                                                    alt="images"
                                                    style={{
                                                      width: "306px",
                                                      height: "306px",
                                                    }}
                                                  />
                                                  <div className="portfolio-two-content">
                                                    <Link
                                                      to={`/vije-details/${itemVije.id}`}
                                                      className="nav-link"
                                                    >
                                                      <h3>{itemVije.title}</h3>
                                                    </Link>
                                                  </div>
                                                </div>
                                                <Link
                                                  to={`/vije-details/${itemVije.id}`}
                                                  className="nav-link"
                                                >
                                                  <h3>{itemVije.title}</h3>
                                                </Link>
                                              </div>
                                            ) : null
                                          )}
                                      </div>
                                    </div>
                                  </div>
                                </p>
                              </div>
                            </div>
                          </div>
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

export default Vije;

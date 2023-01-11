import React, { Component } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import http from "../services/httpService";
import config from "../../config.json";

class Fekri extends Component {
  state = {
    games: [],
    categories: [],
    isLoadingGames: false,
  };

  componentDidMount() {
    this.getGames();
  }

  async getGames() {
    const games = await http.get(config.apiGame);
    if (games.status === 200) {
      const filterGames = games.data.filter((p) => p.categoryid == 1);
      // Sort by sub category
      filterGames.sort(function (a, b) {
        if (a.subcategoryid < b.subcategoryid) {
          return -1;
        }
        if (a.subcategoryid > b.subcategoryid) {
          return 1;
        }
        // sub category must be equal
        return 0;
      });
      // console.log("Sort: ", filterGames);
      this.setState({ games: filterGames });
      this.state.isLoadingGames = true;
      // console.log("apiGame", this.state.games);
      this.removeDuplicatedCategories(filterGames);
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
    const { games, isLoadingGames, categories } = this.state;

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
                <h1>بازی فکری</h1>
                <ul>
                  <li>
                    <Link to="/" className="nav-link">
                      خانه
                    </Link>
                  </li>
                  <li>بازی فکری</li>
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
                    {isLoadingGames === true
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
                                        {games &&
                                          games.map((itemGame, indexFekri) =>
                                            itemCategory.subcategoryid ===
                                            itemGame.subcategoryid ? (
                                              <div
                                                style={{
                                                  marginBottom: "20px",
                                                }}
                                                key={indexFekri}
                                                className="col-lg-3 col-sm-6 col-md-6"
                                              >
                                                <div
                                                  className="portfolio-two-card"
                                                  style={{
                                                    marginBottom: "15px",
                                                  }}
                                                >
                                                  <img
                                                    src={itemGame.image}
                                                    alt="images"
                                                    style={{
                                                      width: "306px",
                                                      height: "306px",
                                                    }}
                                                  />
                                                  <div className="portfolio-two-content">
                                                    <Link
                                                      to={`/fekri-details/${itemGame.id}`}
                                                      className="nav-link"
                                                    >
                                                      <h3>{itemGame.title}</h3>
                                                    </Link>
                                                  </div>
                                                </div>
                                                <Link
                                                  to={`/fekri-details/${itemGame.id}`}
                                                  className="nav-link"
                                                >
                                                  <h3>{itemGame.title}</h3>
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

export default Fekri;

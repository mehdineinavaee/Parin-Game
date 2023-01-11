import React, { Component } from "react";
import http from "../services/httpService";
import config from "../../config.json";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import moment from "jalali-moment";

class Blog extends Component {
  state = {
    blogs: [],
    isLoading: false,
  };

  componentDidMount() {
    this.getBlog();
  }

  async getBlog() {
    const blogs = await http.get(config.apiBlog);
    if (blogs.status === 200) {
      this.setState({ blogs: blogs.data });
      this.state.isLoading = true;
      // console.log("apiBlog", this.state.blogs);
    } else {
      toast.error("خطا در ارتباط با بانک اطلاعاتی");
    }
  }

  // handleAdd = async () => {
  //   const obj = { title: "a", body: "b" };
  //   const { data: post } = await http.post(config.apiEndpoint, obj);

  //   const blogs = [post, ...this.state.blogs];
  //   this.setState({ blogs });
  // };

  // handleUpdate = async (post) => {
  //   post.title = "UPDATED";
  //   await http.put(config.apiEndpoint + "/" + post.id, post);

  //   const blogs = [...this.state.blogs];
  //   const index = blogs.indexOf(post);
  //   blogs[index] = { ...post };
  //   this.setState({ blogs });
  // };

  // handleDelete = async (post) => {
  //   const originalblogs = this.state.blogs;

  //   const blogs = this.state.blogs.filter((p) => p.id !== post.id);
  //   this.setState({ blogs });

  //   try {
  //     await http.delete(config.apiEndpoint + "/" + post.id);
  //   } catch (ex) {
  //     if (ex.response && ex.response.status === 404)
  //       toast.error("این پست اخیراً حذف شده است");

  //     this.setState({ blogs: originalblogs });
  //   }
  // };

  render() {
    const { blogs, isLoading } = this.state;
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
                <h1>وبلاگ</h1>
                <ul>
                  <li>
                    <Link to="/" className="nav-link">
                      خانه
                    </Link>
                  </li>
                  <li>وبلاگ</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="blog-page-area pt-100 pb-100 theme-dark portfolio-page-area">
            <div className="container">
              <div className="row">
                <div className="col">
                  <div className="single-blog-page-content">
                    <div className="row">
                      {isLoading == true
                        ? blogs &&
                          blogs.map((item, i) => (
                            <div key={i} className="col-lg-4 col-sm-6 col-md-6">
                              <div className="single-blog-card blog-card-page">
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
                          ))
                        : null}
                    </div>
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

export default Blog;

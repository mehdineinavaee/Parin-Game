import React from "react";
import { Route, Routes } from "react-router-dom";
import { Helmet } from "react-helmet";

// Pages
import { Page404 } from "./components/page404/page404";
import Preloader from "./components/layout/preloader";
import Navbar from "./components/layout/navbar";
import GoTop from "./components/layout/goTop";
import CopyRight from "./components/layout/copyRight";
import Footer from "./components/layout/footer";
import Home from "./components/home/home";
import Testimonials from "./components/testimonials/testimonials";
import Faq from "./components/faq/faq";
import Cafe from "./components/cafe/cafe";
import CafeDetails from "./components/cafeDetails/cafeDetails";
import MyProfile from "./components/auth/myProfile";
import Login from "./components/auth/login";
import Blog from "./components/blog/blog";
import BlogDetails from "./components/blogDetails/blogDetails";
import About from "./components/about/about";
import Contact from "./components/contact/contact";
import Fekri from "./components/fekri/fekri";
import FekriDetails from "./components/fekriDetails/fekriDetails";
import Event from "./components/event/event";
import EventDetails from "./components/eventDetails/eventDetails";
import Vije from "./components/vije/vije";
import VijeDetails from "./components/vijeDetails/vijeDetails";
import Logout from "./components/common/logout";

function App() {
  return (
    <React.Fragment>
      <Preloader />
      <Navbar />
      <Routes>
        <Route path="/fekri" element={<Fekri />} />
        <Route path="/fekri-details/:id" element={<FekriDetails />} />
        <Route path="/event" element={<Event />} />
        <Route path="/event-details/:id" element={<EventDetails />} />
        <Route path="/vije" element={<Vije />} />
        <Route path="/vije-details/:id" element={<VijeDetails />} />
        <Route path="/testimonials" element={<Testimonials />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/cafe" element={<Cafe />} />
        <Route path="/cafe-details/:id" element={<CafeDetails />} />
        <Route path="/my-profile" element={<MyProfile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog-details/:id" element={<BlogDetails />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/" element={<Home />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
      <Footer />
      <CopyRight />
      <GoTop />
      <Helmet>
        {/* <script src="assets/js/jquery.min.js" defer></script> */}
        <script src="assets/js/meanmenu.min.js" defer></script>
        {/* <script src="assets/js/bootstrap.bundle.min.js" defer></script> */}
        <script src="assets/js/scrollCue.min.js" defer></script>
        {/* <script src="assets/js/bootstrap-datepicker.min.js" defer></script> */}
        <script src="assets/js/appear.min.js" defer></script>
        <script src="assets/js/odometer.min.js" defer></script>
        <script src="assets/js/magnific-popup.min.js" defer></script>
        <script src="assets/js/fancybox.min.js" defer></script>
        <script src="assets/js/owl.carousel.min.js" defer></script>
        <script src="assets/js/parallax.min.js" defer></script>
        <script src="assets/js/ajaxchimp.min.js" defer></script>
        <script src="assets/js/form-validator.min.js" defer></script>
        {/* <script src="assets/js/subscribe-custom.js" defer></script> */}
        {/* <script src="assets/js/contact-form-script.js" defer></script> */}
        <script src="assets/js/main.js" defer></script>
      </Helmet>
    </React.Fragment>
  );
}

export default App;

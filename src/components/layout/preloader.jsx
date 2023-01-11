import React, { Component } from "react";

class Preloader extends Component {
  componentDidMount() {
    this.handleDeactivatePreloader();
  }

  state = {
    load: false,
  };

  handleDeactivatePreloader() {
    setTimeout(() => {
      this.setState({ load: true });
    }, 2000);
  }

  render() {
    const { load } = this.state;
    return (
      <React.Fragment>
        <div
          className={
            load === false ? "preloader" : "preloader preloader-deactivate"
          }
        >
          <div className="loader">
            <div className="loader-outter"></div>
            <div className="loader-inner"></div>
            <span>پارین گیم</span>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Preloader;

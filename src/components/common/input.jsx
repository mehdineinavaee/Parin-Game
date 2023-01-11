import React from "react";

const Input = ({ id, name, value, error, onChange, placeholder }) => {
  return (
    <React.Fragment>
      <div className="col-lg-12 col-sm-6 col-md-6">
        <div className="form-group">
          <input
            type="text"
            id={id}
            name={name}
            value={value == null ? "" : value}
            onChange={onChange}
            className="form-control"
            placeholder={placeholder}
          />
          {error && <div className="alert alert-danger">{error}</div>}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Input;

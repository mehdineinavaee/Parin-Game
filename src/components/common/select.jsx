import React from "react";

const Select = ({
  onChange,
  isLoading,
  dataOption,
  error,
  priceReservation,
}) => {
  return (
    <React.Fragment>
      <select
        onChange={onChange}
        defaultValue={"DEFAULT"}
        className="form-select"
      >
        <option value="DEFAULT">سانس</option>
        {isLoading === true
          ? dataOption &&
            dataOption.map((item, index) => (
              <option key={index} value={index}>
                {item.admindescription}
              </option>
            ))
          : null}
      </select>
      {error && <div className="alert alert-danger Vazir">{error}</div>}
      {priceReservation && (
        <div className="alert alert-primary Vazir">{priceReservation}</div>
      )}
    </React.Fragment>
  );
};

export default Select;

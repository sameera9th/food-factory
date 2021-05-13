import React from "react";
import PropTypes from "prop-types";

const InputField = ({ value, placeholder, type, onChange }) => (
    <input
    type={type}
    value={value}
    className="input-item"
    placeholder={placeholder}
    onChange={onChange}
  />
);

InputField.propTypes = {
    type: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    placeholder: PropTypes.string,
    text: PropTypes.string,
};

InputField.defaultProps = {
  text: "+",
  value: "",
  type: "text",
  placeholder: ""
};

export default InputField;

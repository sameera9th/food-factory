import React from "react";
import PropTypes from "prop-types";

const Button = (props) => {
  const { text, onclick, classname } = props;

  return (
    <button className={classname} onClick={onclick}>
      {text}
    </button>
  );
};

Button.propTypes = {
  onclick: PropTypes.func,
  text: PropTypes.string,
};

Button.defaultProps = {
  text: "+",
};

export default Button;

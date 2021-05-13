import React from "react";
import PropTypes from "prop-types";

const ListItem = (props) => {
  const {
    id,
    handleDragStart,
    handleDragOver,
    handleDragEnter,
    handleDragLeave,
    handleDrop,
    handleDragEnd,
    sortedList,
  } = props;

  return (
    <span
      id={id}
      className="item"
      draggable="true"
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onDragEnd={handleDragEnd}
    >
      {sortedList}
    </span>
  );
};

ListItem.propTypes = {
  handleDragStart: PropTypes.func,
  handleDragOver: PropTypes.func,
  handleDragEnter: PropTypes.func,
  handleDragLeave: PropTypes.func,
  handleDrop: PropTypes.func,
  handleDragEnd: PropTypes.func,
  handleChange: PropTypes.func,
  sortedList: PropTypes.string,
};

ListItem.defaultProps = {
  sortedList: "",
};

export default ListItem;

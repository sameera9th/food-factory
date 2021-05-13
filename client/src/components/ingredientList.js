import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

// configs
import { MESSAGES, TITLES } from "../configs";

// components
import ListItem from "./listItem";
import Button from "./button";
import InputField from "./textInput";

// actions
import {
  getIngredients,
  handleIngredientDrop,
  addNewIngredient,
} from "../redux/actions/food";

const IngredientList = () => {
  const dispatch = useDispatch();
  const { ingredients, fetching, error } = useSelector((state) => state.food);

  const [newIngredient, setNewIngredient] = useState({
    show: false,
    value: "",
  });

  useEffect(() => {
    dispatch(getIngredients());
    // eslint-disable-next-line
  }, []);

  let sourceElement = null;

  const handleDragStart = (event) => {
    event.target.style.opacity = 0.5;
    sourceElement = event.target;
    event.dataTransfer.effectAllowed = "move";
  };

  // do not trigger default event of item while passing (e.g. a link)
  const handleDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };

  // add class .over while hovering other items
  const handleDragEnter = (event) => {
    event.target.classList.add("over");
  };

  // remove class .over when not hovering over an item anymore
  const handleDragLeave = (event) => {
    event.target.classList.remove("over");
  };

  const handleDrop = (event) => {
    // prevent redirect in some browsers
    event.stopPropagation();

    // only do something if the dropped on item is different to the dragged item
    if (sourceElement !== event.target) {
      // remove dragged item from list
      const list = ingredients.filter(
        (item, i) => i.toString() !== sourceElement.id
      );

      // this is the removed item
      const removed = ingredients.filter(
        (item, i) => i.toString() === sourceElement.id
      )[0];

      // insert removed item after this number.
      let insertAt = Number(event.target.id);

      let tempList = [];

      // if dropped at last item, don't increase target id by +1. max-index is arr.length
      if (insertAt >= list.length) {
        tempList = list.slice(0).concat(removed);
        dispatch(handleIngredientDrop(tempList));
        event.target.classList.remove("over");
      } else if (insertAt < list.length) {
        // original list without removed item until the index it was removed at
        tempList = list.slice(0, insertAt).concat(removed);

        // add the remaining items to the list
        const newList = tempList.concat(list.slice(insertAt));

        // set state to display on page
        dispatch(handleIngredientDrop(newList));
        event.target.classList.remove("over");
      }
    } else {
      event.target.classList.remove("over");
    }
  };

  const handleDragEnd = (event) => {
    event.target.style.opacity = 1;
  };

  const addNewIngredients = () => {
    dispatch(addNewIngredient(newIngredient.value));
  };

  /* create list of items */
  const listItems = () => {
    return ingredients.map((item, i) => (
      <div key={i} className="dnd-list">
        <ListItem
          key={i}
          id={i}
          handleDragStart={handleDragStart}
          handleDragOver={handleDragOver}
          handleDragEnter={handleDragEnter}
          handleDragLeave={handleDragLeave}
          handleDrop={handleDrop}
          handleDragEnd={handleDragEnd}
          sortedList={item.name}
        />
      </div>
    ));
  };

  return (
    <div className="container">
      <h1 style={{ color: "white", textAlign: "center" }}>
        {TITLES.MAIN_TITLE}
      </h1>
      {fetching && <p>{MESSAGES.INGREDIENT_LOADING}</p>}
      {listItems()}
      {newIngredient.show && (
        <div>
          <InputField
            type="text"
            placeholder="Enter text here"
            value={newIngredient.value}
            onChange={(e) =>
              setNewIngredient({ ...newIngredient, value: e.target.value })
            }
          />
          <Button
            text="Add"
            classname="addIngredientButton"
            onclick={addNewIngredients}
          />
        </div>
      )}
      {error && <div className="bar error animated fadeOut">{error}</div>}
      <Button
        classname="addButton"
        onclick={() =>
          setNewIngredient({
            ...newIngredient,
            show: !newIngredient.show,
            value: "",
          })
        }
      />
    </div>
  );
};

export default IngredientList;

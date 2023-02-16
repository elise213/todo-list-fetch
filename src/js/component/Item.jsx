import React, { useState } from "react";

const Item = (props) => {
  // useState to show or hide the delete button
  const [show, setShow] = useState(false);

  return (
    <div  onMouseEnter={() => {
        console.log("mouse over!")
        setShow(true)}
    }
    onMouseLeave={() => {
        console.log("mouse out!")
        setShow(false)}
    }>
      <li
        key={props.i}
        className="toDoItem"
        // hide or show delete button
      >
        <div className="content">
          <p>{props.todo.label}</p>
          
          {show && <button
            className={show ? "d-block" : "d-none"}
            onClick={() => props.deleteTodo(props.i)}
          >
            X
          </button> }
        </div>
      </li>
    </div>
  );
};

export default Item;

import React, { useState } from "react";

const Item = (props) => {
  // useState to show or hide the delete button
  const [show, setShow] = useState(false);

  return (

    // hide or show delete button
    <div  onMouseEnter={() => {
        // console.log("mouse over!")
        setShow(true)}
    }
    onMouseLeave={() => {
        // console.log("mouse out!")
        setShow(false)}
    }>
      {/* line-item containing the to-do */}
      <li
        key={props.index}
        className="toDoItem"
      >
        <div className="content">
          <p>{props.todo.label}</p>
          
          {/* the delete button */}
          {show && <button
            className={show ? "d-block" : "d-none"}
            onClick={() => props.deleteTodo(props.index)}
          >
            X
          </button> }
        </div>
      </li>
    </div>
  );
};

export default Item;

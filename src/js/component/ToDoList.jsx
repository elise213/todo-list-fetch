import React, { useState } from "react";
import Item from "./Item.jsx"

// useState to initialize the to-do list

const ToDoList = () => {
  const [toDoList, setTodos] = useState([
    { id: 1, name: "clean", completed: false },
    { id: 2, name: "dance", completed: false },
    { id: 3, name: "work", completed: false },
  ]);
  
  // function for the delete button onClick using filter
  function deleteTask(i) {
    setTodos((currentValue) =>
      currentValue.filter((item, index) => index !== i)
    );
  }

  // function to add item to the to-do list
  function addItem(event) {
    event.preventDefault();
    let task = {
      id: Math.floor(Date.now() / 1000),
      name: event.target.toDo.value,
      completed: false,
    };
    setTodos([...toDoList, task]);
    event.target.toDo.value = "";
  }

  // what the component returns
  return (
    <div>
      <h1>To-do</h1>

      <div className="toDoWrapper">
        {/* input form for new to-do items */}
        <div className="input">
          <form onSubmit={addItem}>
            <input
              type="text"
              name="toDo"
              placeholder={
                toDoList[0]
                  ? "What else needs to be done?"
                  : "No tasks. Add a task."
              }
            />
          </form>
        </div>

        {/* list of to-do items */}
        <ul>
          {toDoList.map((todo, i) => {
            return <Item i={i} todo={todo} deleteTask={deleteTask}/>;
          })}

          <div className="counter">
            <p>{`${toDoList.length}` + " items left"}</p>
          </div>
        </ul>
      </div>
    </div>
  );
};

export default ToDoList;

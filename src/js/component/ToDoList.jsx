import React, { useState } from "react";
import Item from "./Item.jsx";

// useState to initialize the to-do list

const ToDoList = () => {
  const [toDoList, setTodos] = useState([
    { id: 1, name: "clean", completed: false },
    { id: 2, name: "dance", completed: false },
    { id: 3, name: "work", completed: false },
  ]);

  // function for the delete button onClick using filter
  function deleteTask(i) {
let filtered = toDoList.filter((todo, index) => {
  return index !== i
})
    fetch("http://assets.breatheco.de/apis/fake/todos/user/mara", {
      method: "POST",
      body: JSON.stringify(toDoList),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setTodos([...filtered])
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function deleteAll(i) {
    fetch("http://assets.breatheco.de/apis/fake/todos/user/mara", {
      method: "DELETE",
      body: JSON.stringify(toDoList),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setTodos([])
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // function to add an item to the to-do list
  function addItem(event) {
    event.preventDefault();
    let task = {
      id: Math.floor(Date.now() / 1000),
      name: event.target.toDo.value,
      completed: false,
    };

    fetch("http://assets.breatheco.de/apis/fake/todos/user/mara", {
      method: "PUT",
      body: JSON.stringify(toDoList),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setTodos([...toDoList, task]);
        event.target.toDo.value = "";
      })
      .catch((error) => {
        console.log(error);
      });
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
            return <Item i={i} todo={todo} deleteTask={deleteTask} />;

          })}

          <div className="counter">
            <p>{`${toDoList.length}` + " items left"}</p>
            <button type="button" onClick={() => deleteAll()}> Delete All</button>
          </div>
        </ul>
      </div>
    </div>
  );
};

export default ToDoList;

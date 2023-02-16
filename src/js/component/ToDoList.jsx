import React, { useState, useEffect } from "react";
import Item from "./Item.jsx";

// useState to initialize the to-do list

const ToDoList = () => {
  const [todos, setTodos] = useState([
    // { id: 1, name: "clean", completed: false },
    // { id: 2, name: "walk the dog", completed: false },
    // { id: 3, name: "work", completed: false },
  ]);

  useEffect(() => {
    fetch("https://assets.breatheco.de/apis/fake/todos/user/mara")
      .then((response) => response.json())
      .then((data) => setTodos([...data]));
  }, []);

  // function for the delete button onClick using filter
  function deleteTodo(i) {
    let filtered = todos.filter((todo, index) => {
      return index !== i;
    });
    fetch("https://assets.breatheco.de/apis/fake/todos/user/mara", {
      method: "PUT",
      body: JSON.stringify(filtered),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setTodos([...filtered]);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function deleteAll(i) {
    fetch("https://assets.breatheco.de/apis/fake/todos/user/mara", {
      method: "DELETE",
      body: JSON.stringify(todos),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setTodos([]);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // function to add an item to the to-do list
  function addItem(event) {
    event.preventDefault();
    let task = {
      label: event.target.toDo.value,
      done: false,
    };
    todos.push(task);
    console.log(todos);

    fetch("https://assets.breatheco.de/apis/fake/todos/user/mara", {
      method: "PUT",
      body: JSON.stringify(todos),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setTodos([...todos]);
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
                todos[0]
                  ? "What else needs to be done?"
                  : "No tasks. Add a task."
              }
            />
          </form>
        </div>

        {/* list of to-do items */}
        <ul>
          {todos.map((todo, i) => {
            return <Item key={i} todo={todo} deleteTodo={deleteTodo} />;
          })}

          <div className="counter">
            <p>{`${todos.length}` + " items left"}</p>
            <button type="button" onClick={() => deleteAll()}>
              {" "}
              Delete All
            </button>
          </div>
        </ul>
      </div>
    </div>
  );
};

export default ToDoList;

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
    fetch("https://assets.breatheco.de/apis/fake/todos/user/mara2")
      .then((response) => response.json())
      .then((data) => setTodos([...data]));
  }, []);

  // function for the delete button onClick using filter
  function deleteTodo(i) {
    let filtered = todos.filter((todo, index) => {
      return index !== i;
    });
    fetch("https://assets.breatheco.de/apis/fake/todos/user/mara2", {
      method: "PUT",
      body: JSON.stringify(filtered),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setTodos(filtered);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // function for the delete-all button onClick
  function deleteAll(i) {
    fetch("https://assets.breatheco.de/apis/fake/todos/user/mara2", {
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
    setTodos([...todos, task]);
    // todos.push(task);.... this doesn't update the backend.
    console.log(todos);
    // ...maybe change this to useState

    
  }

  useEffect(() => {
    console.log("todos has been updated");
    fetch("https://assets.breatheco.de/apis/fake/todos/user/mara2", {
      method: "PUT",
      body: JSON.stringify(todos),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        // setTodos([...data]);
        // this was todos, but needed to be data. 
        console.log(data)
      })
      .catch((error) => {
        console.log(error);
      });
  }, [todos])

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
                  : "Nothing to do! Add a task."
              }
            />
          </form>
        </div>

        {/* list of to-do items */}
        <ul>
          {todos.map((todo, i) => {
            return <Item index={i} todo={todo} deleteTodo={deleteTodo} />;
          })}

          {/* how many todos you have left */}
          <div className="counter">
            <p>{`${todos.length}` + " items left"}</p>

            {/* button to delete all todos */}
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

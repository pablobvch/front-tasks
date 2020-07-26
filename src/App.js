import React, { useState, useEffect, Fragment } from "react";

import ListItem from "./components/ListItem";
import Form from "./components/Form";
import fetchAll from "./utils/fetchAll";

//Initial tasks
const getTasks = async () => await fetchAll();
const tasks = getTasks();

function TodoApp() {
  const [todos, setTodos] = useState(tasks);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    let count = 0;
    if (todos) {
      todos.map((todo) => (!todo.done ? count++ : null));
    }
    document.title = `${count} task${count > 1 ? "s" : ""} todo`;
  });

  //
  const _handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue === "") return alert("Task name is required");

    const newArr = todos.slice();
    newArr.splice(0, 0, { name: inputValue, done: false });
    setTodos(newArr);
    setInputValue("");
  };

  //
  const _handleBntClick = ({ type, index }) => {
    const newArr = todos.slice();
    if (type === "remove") newArr.splice(index, 1);
    else if (type === "completed") newArr[index].done = true;

    return setTodos(newArr);
  };

  const renderUlIfneeded = (todos) => {
    if (todos) {
      todos.map((todo, index) => (
        <ListItem
          key={index}
          todo={todo}
          remove={() => _handleBntClick({ type: "remove", index })}
          completed={() => _handleBntClick({ type: "completed", index })}
        />
      ));
    } else {
      return false;
    }
  };

  //
  return (
    <Fragment>
      <Form
        onSubmit={_handleSubmit}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <ul>{renderUlIfneeded(todos)}</ul>
    </Fragment>
  );
}

export default TodoApp;

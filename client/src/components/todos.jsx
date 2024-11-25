/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import { CredentialsContext } from "../App";
import { MdDeleteForever } from "react-icons/md";

export default function Todos() {
  const [todos, setTodos] = useState([{ checked: false, text: "homework" }]);
  const [newTask, setNewTask] = useState("");
  const [credentials] = useContext(CredentialsContext);

  const update = (newtodos) => {
    fetch("http://localhost:5000/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${credentials.username}:${credentials.password}`,
      },
      body: JSON.stringify(newtodos),
    }).then(() => {});
  };

  useEffect(() => {
    fetch("http://localhost:5000/todos", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${credentials.username}:${credentials.password}`,
      },
    })
      .then((response) => response.json())
      .then((todos) => setTodos(todos.todos));
  }, []);

  const addNewTask = (e) => {
    e.preventDefault();
    if (!newTask) return;
    const newtodo = { checked: false, text: newTask };
    const newtodos = [...todos, newtodo];
    setTodos(newtodos);
    setNewTask("");
    update(newtodos);
  };
  const toggleTodo = (index) => {
    const newTodoList = [...todos];
    newTodoList[index].checked = !newTodoList[index].checked;
    setTodos(newTodoList);
    update(newTodoList);
  };

  const deleteTodo = (index) => {
    console.log(index);
    const deletedtodos = todos.filter((todo, i) => i !== index);
    setTodos(deletedtodos);
    update(deletedtodos);
  };
  return (
    <div className="todoComponent">
      <form onSubmit={addNewTask}>
        <input
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          type="text"
        />
        <button type="submit">add</button>
      </form>
      {todos.map((todo, index) => (
        <div key={index} className="todos">
          <input
            type="checkbox"
            checked={todo.checked}
            onChange={() => {
              toggleTodo(index);
            }}
          />
          <label className="todo">{todo.text}</label>
          <button onClick={() => deleteTodo(index)} className="delButton">
            <MdDeleteForever className="delIcon" />
          </button>
        </div>
      ))}
    </div>
  );
}

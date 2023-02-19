import React from "react";
import {TodoItem} from "../types/user";

interface Props {
  todos: TodoItem[];
  completeTodo: (todo: TodoItem) => void;
  deleteTodo: (todoId: number) => void;
}

function TodoList(props: Props) {
  const {todos, completeTodo, deleteTodo}=props;
  if (!todos || !todos.length) {
    return <p>You have no todos</p>
  }
  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <li key={todo.id} className="todo-list-item">
          <label className="checkboxes-container">
            <input type="checkbox" checked={todo.completed} onChange={() => completeTodo(todo)} />
            <span className="checkmark"></span>
            <span>{todo.description}</span>
          </label>
          <button className="delete-button" onClick={() => deleteTodo(todo.id)}>
            <span className="delete-button__icon">x</span>
          </button>
        </li>
      ))}
    </ul>
  );
}

export default TodoList;

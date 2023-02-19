import React, {useEffect, useState} from "react";
import {getTodos, handleComplete, handleDelete, handleAddTodo} from "../utils/api";
import Layout from "../components/Layout";
import TodoForm from "../components/TodoForm";
import TodoList from "../components/TodoList";
import {getCompletedTodos, getUncompletedTodos, useTodoList} from "../context";
import {TodoItem} from "../types/user";
import TodoFilter, {TodoFilterType} from "../components/TodoFilter";

function TodoDashboard() {
  const {state, dispatch}=useTodoList();
  const [filter, setFilter]=useState<TodoFilterType>('all');
  const [loading, setLoading]=useState<boolean>(false);

  let todos: TodoItem[];

  switch (filter) {
    case 'all':
      todos = state.todos
      break;
    case 'completed':
      todos = getCompletedTodos(state.todos);
      break;
    case 'uncompleted':
      todos = getUncompletedTodos(state.todos);
      break;
    default:
      todos = [];
  }

  const handleAddTodoItem=async (description: string) => {
    const todo=await handleAddTodo(description);
    if (!todo) {
      return;
    }
    dispatch({type: 'ADD_TODO', payload: todo});
  };

  const handleToggleTodo=async (todo: TodoItem) => {
    await handleComplete(todo.id, todo.completed);
    dispatch({type: 'TOGGLE_TODO', payload: todo.id});
  };

  const handleDeleteTodo=async (id: number) => {
    await handleDelete(id);
    dispatch({type: 'DELETE_TODO', payload: id});
  };

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const todosResponse=await getTodos()
      setLoading(false);
      if (!todosResponse) {
        return;
      }
      dispatch({type: 'LOAD', payload: todosResponse});
    }

    loadData().then();
  }, []);


  if (loading) {
    return <p>Loading...</p>
  }
  return (
    <Layout>
      <TodoForm addTodo={handleAddTodoItem} />
      <TodoList todos={todos} completeTodo={handleToggleTodo} deleteTodo={handleDeleteTodo} />
      <TodoFilter activeFilter={filter} onFilterChange={(value)=>setFilter(value)} />
    </Layout>
  );
}

export default TodoDashboard;

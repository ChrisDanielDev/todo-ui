import React, { createContext, useContext, useReducer } from 'react';
import {TodoItem} from "./types/user";

interface TodoState {
  todos: TodoItem[];
}

type TodoAction =
  | { type: 'ADD_TODO'; payload: TodoItem }
  | { type: 'TOGGLE_TODO'; payload: number }
  | { type: 'DELETE_TODO'; payload: number }
  | { type: 'LOAD'; payload: TodoItem[] };

interface TodoContextValue {
  state: TodoState;
  dispatch: React.Dispatch<TodoAction>;
}

const TodoContext = createContext<TodoContextValue | undefined>(undefined);

const todoReducer = (state: TodoState, action: TodoAction): TodoState => {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        todos: [...state.todos, action.payload],
      };
    case 'TOGGLE_TODO':
      return {
        todos: state.todos.map(todo =>
          todo.id === action.payload ? { ...todo, completed: !todo.completed } : todo
        ),
      };
    case 'DELETE_TODO':
      return {
        todos: state.todos.filter(todo => todo.id !== action.payload),
      };
    case 'LOAD':
      // handle load case
      return { ...state, todos: action.payload };
    default:
      return state;
  }
};

// selectors
export const getCompletedTodos = (todos: TodoItem[]): TodoItem[] => {
  return todos.filter(todo => todo.completed);
};

export const getUncompletedTodos = (todos: TodoItem[]): TodoItem[] => {
  return todos.filter(todo => !todo.completed);
};

export const useTodoList = () => {
  const contextValue = useContext(TodoContext);

  if (!contextValue) {
    throw new Error('useTodoList must be used within a TodoProvider');
  }

  return contextValue;
};

interface Props {
  children: React.ReactNode;
}

export const TodoProvider: React.FunctionComponent<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(todoReducer, { todos: [] });

  const contextValue: TodoContextValue = {
    state,
    dispatch,
  };

  return <TodoContext.Provider value={contextValue}>{children}</TodoContext.Provider>;
};

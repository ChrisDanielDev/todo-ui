import React, {useState, FormEvent} from 'react';

interface Props {
  addTodo: (text: string) => void;
}

function TodoForm({addTodo}: Props) {
  const [inputValue, setInputValue]=useState('');

  const handleSubmit=(e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputValue) return;
    addTodo(inputValue);
    setInputValue('');
  };

  return (
    <>
      <h1>Todo List</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="input"
          placeholder="Add a todo"
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
        />
      </form>
    </>
  );
}

export default TodoForm;

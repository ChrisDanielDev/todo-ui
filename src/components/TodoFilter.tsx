import React from "react";

export type TodoFilterType = 'all' | 'completed' | 'uncompleted';

interface Props {
  activeFilter: TodoFilterType;
  onFilterChange: (filter: TodoFilterType) => void;
}

const TodoFilter: React.FunctionComponent<Props> = ({ activeFilter, onFilterChange }) => {
  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange(event.target.value as TodoFilterType);
  };

  return (
    <div className="todo-filter">
      <span className="filter-label">Show:</span>
      <span
        className={`todo-filter__link ${
          activeFilter === "all" ? "todo-filter__link--active" : ""
        }`}
        onClick={() => onFilterChange("all")}
      >
        All
      </span>
      <span
        className={`todo-filter__link ${
          activeFilter === "completed" ? "todo-filter__link--active" : ""
        }`}
        onClick={() => onFilterChange("completed")}
      >
        Completed
      </span>
      <span
        className={`todo-filter__link ${
          activeFilter === "uncompleted" ? "todo-filter__link--active" : ""
        }`}
        onClick={() => onFilterChange("uncompleted")}
      >
        Incompleted
      </span>
    </div>
  );
};

export default TodoFilter;

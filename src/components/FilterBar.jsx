import { useContext } from "react";
import { TodoContext } from "./../context/TodoContext";

export default function FilterBar() {
  const { filter, setFilter } = useContext(TodoContext);
  return (
    <div className="filters">
      <button
        className={filter === "all" ? "active-filter" : ""}
        onClick={() => setFilter("all")}
      >
        Всі
      </button>
      <button
        className={filter === "active" ? "active-filter" : ""}
        onClick={() => setFilter("active")}
      >
        Активні
      </button>
      <button
        className={filter === "completed" ? "active-filter" : ""}
        onClick={() => setFilter("completed")}
      >
        Виконані
      </button>
    </div>
  );
}

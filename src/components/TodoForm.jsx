import { useContext } from "react";
import { TodoContext } from "./../context/TodoContext";

export default function TodoForm() {
  const {
    inputText,
    setInputText,
    deadlineDate,
    setDeadlineDate,
    addNewList,
    category,
    setCategory,
  } = useContext(TodoContext);
  return (
    <div>
      <div className="input-container">
        <input
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          type="text"
          placeholder="Що плануємо зробити?"
        />
        <input
          type={deadlineDate ? "date" : "text"}
          placeholder="Дата (дд.мм.рррр)"
          value={deadlineDate}
          onChange={(e) => setDeadlineDate(e.target.value)}
          onFocus={(e) => (e.target.type = "date")}
          onBlur={(e) => {
            if (!deadlineDate) e.target.type = "text";
          }}
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">Категорія</option>
          <option value="Дім">🏠 Дім</option>
          <option value="Робота">💼 Робота</option>
          <option value="Навчання">📚 Навчання</option>
        </select>
        <button onClick={addNewList}>Додати</button>
      </div>
    </div>
  );
}

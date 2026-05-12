import { useContext } from "react";
import { TodoContext } from "./../context/TodoContext";

const formatEuropeanDate = (dateString) => {
  if (!dateString) return "";
  const [year, month, day] = dateString.split("-");
  return `${day}.${month}.${year}`;
};

export default function TodoList() {
  const {
    filteredList,
    filter,
    editId,
    editText,
    saveEdit,
    setEditText,
    toggleComplete,
    edit,
    setItemToDelete,
    editCategoryId,
    setEditCategoryId,
    saveEditCategory,
  } = useContext(TodoContext);

  return (
    <ul>
      {filteredList.length === 0 ? (
        // Якщо порожньо:
        <p className="empty-msg">
          {filter === "completed"
            ? "Немає жодної виконаної справи 🤷‍♀️"
            : "Список порожній ✨"}
        </p>
      ) : (
        // Якщо є справи — виводимо їх як зазвичай:
        filteredList.map((list) => {
          return (
            <li key={list.id}>
              {list.id === editId ? (
                // РЕЖИМ РЕДАГУВАННЯ
                <div className="edit-mode">
                  <input
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                  />
                  <button className="btn-save" onClick={saveEdit}>
                    Зберегти
                  </button>
                </div>
              ) : (
                // ЗВИЧАЙНИЙ РЕЖИМ
                <>
                  <div className="task-info">
                    <span
                      className={list.isDone ? "done task-text" : "task-text"}
                    >
                      {list.text}
                    </span>
                    {editCategoryId === list.id ? (
                      <select
                        value={list.category}
                        onChange={(e) =>
                          saveEditCategory(list.id, e.target.value)
                        }
                      >
                        <option value="Дім">🏠 Дім</option>
                        <option value="Робота">💼 Робота</option>
                        <option value="Навчання">📚 Навчання</option>
                      </select>
                    ) : (
                      <span onClick={() => setEditCategoryId(list.id)}>
                        {list.category ? (
                          <span className="category-badge">
                            {list.category}
                          </span>
                        ) : (
                          <span className="selectCategory">
                            Вибрати категорію
                          </span>
                        )}
                      </span>
                    )}

                    {list.deadline && (
                      <span
                        className={`task-deadline ${
                          !list.isDone &&
                          new Date().toISOString().split("T")[0] > list.deadline
                            ? "overdue"
                            : ""
                        }`}
                      >
                        до {formatEuropeanDate(list.deadline)}
                      </span>
                    )}
                  </div>

                  <div className="action-buttons">
                    <button
                      className="btn-check"
                      onClick={() => toggleComplete(list.id)}
                    >
                      {list.isDone ? "🔁" : "✔"}
                    </button>
                    <button className="btn-edit" onClick={() => edit(list)}>
                      ✏️ Ред.
                    </button>
                    <button
                      className="btn-delete"
                      onClick={() => setItemToDelete(list.id)}
                    >
                      Видалити
                    </button>
                  </div>
                </>
              )}
            </li>
          );
        })
      )}
    </ul>
  );
}

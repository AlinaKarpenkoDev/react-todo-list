import { useContext } from "react";
import { TodoContext } from "./../context/TodoContext";

export default function Modal() {
  const { confirmDelete, setItemToDelete } = useContext(TodoContext);
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Ти точно хочеш видалити цю справу? 🗑️</h3>
        <div className="modal-actions">
          <button className="btn-confirm" onClick={confirmDelete}>
            Так, видалити
          </button>
          <button className="btn-cancel" onClick={() => setItemToDelete(null)}>
            Ні, залишити
          </button>
        </div>
      </div>
    </div>
  );
}

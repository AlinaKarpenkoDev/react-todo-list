import { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import Modal from "./components/Modal";
import FilterBar from "./components/FilterBar";
import ProgressBar from "./components/ProgressBar";
import RegisterForm from "./components/RegisterForm";
import { ThemeContext } from "./context/ThemeContext";
import { TodoContext } from "./context/TodoContext";
import useLocalStorage from "./context/useLocalStorage";
import "./App.css";

function App() {
  const { isDarkMode, setIsDarkMode } = useContext(ThemeContext);
  const { itemToDelete, searchQuery, setSearchQuery } = useContext(TodoContext);

  const [currentUser, setCurrentUser] = useLocalStorage("user", null);

  document.title = "Todo List";

  return (
    <div className={`App ${isDarkMode === false ? "light-theme" : ""}`}>
      {currentUser && (
        <div className="container">
          {/* --- ПРОФЕСІЙНИЙ HEADER --- */}
          <div className="header">
            {/* Ліва частина: Пошук */}
            <div className="header-left">
              <input
                type="text"
                placeholder="Пошук.."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
            </div>

            {/* Права частина: Керування (Тема + Вихід) */}
            <div className="header-right">
              <button
                className="theme-toggle-btn"
                onClick={() => setIsDarkMode(!isDarkMode)}
              >
                {isDarkMode === false ? "☀️" : "🌙"}
              </button>
              <span className="user-greeting">{currentUser}</span>
              <button
                className="logout-btn"
                onClick={() => setCurrentUser(null)}
              >
                Вийти
              </button>
            </div>
          </div>
          {/* --- КІНЕЦЬ HEADER --- */}
        </div>
      )}
      <Routes>
        <Route
          path="/login"
          element={
            // Якщо користувач ВЖЕ є, примусово кидаємо його на /tasks. Якщо ні — показуємо форму.
            currentUser ? (
              <Navigate to="/tasks" replace />
            ) : (
              <>
                <button
                  className="theme-toggle-btn"
                  onClick={() => setIsDarkMode(!isDarkMode)}
                >
                  {isDarkMode === false ? "☀️" : "🌙"}
                </button>
                <RegisterForm setCurrentUser={setCurrentUser} />
              </>
            )
          }
        />

        <Route
          path="/tasks"
          element={
            // ОХОРОНЕЦЬ: Якщо користувача НЕМАЄ, кидаємо на /login. Якщо є — показуємо додаток.
            currentUser ? (
              <>
                <div className="animate-fade-in">
                  <h1>Список справ</h1>
                  <TodoForm />
                  <ProgressBar />
                  <TodoList />
                  <FilterBar />
                </div>
                {itemToDelete && <Modal />}
              </>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="*"
          element={<Navigate to={currentUser ? "/tasks" : "/login"} replace />}
        />
      </Routes>
    </div>
  );
}

export default App;

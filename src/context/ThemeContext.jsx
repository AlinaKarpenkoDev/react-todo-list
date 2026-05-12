import { createContext, useState, useEffect } from "react";

// 1. Створюємо саму порожню "хмару"
export const ThemeContext = createContext();

// 2. Створюємо "Провайдер" — компонент, який обгорне наш додаток і роздаватиме дані
export default function ThemeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark-mode");
      document.body.classList.remove("light-mode");
    } else {
      document.body.classList.add("light-mode");
      document.body.classList.remove("dark-mode");
    }
  }, [isDarkMode]);

  return (
    // У value ми покладемо те, що хочемо віддати іншим файлам
    <ThemeContext.Provider
      value={{
        isDarkMode,
        setIsDarkMode,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

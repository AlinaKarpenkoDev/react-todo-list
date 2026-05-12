import { useEffect, useState } from "react";

export default function useLocalStorage(key, initialValue) {
  // 1. Зчитуємо дані з localStorage (якщо вони там є) при першому запуску
  const [value, setValue] = useState(() => {
    const savedTodos = localStorage.getItem(key);
    if (savedTodos) {
      return JSON.parse(savedTodos);
    } else {
      return initialValue;
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]); // квадратні дужки вказують, за чим саме слідкувати
  return [value, setValue];
}

import { createContext, useState, useMemo } from "react";
import useLocalStorage from "./useLocalStorage";

// 1. Створюємо саму порожню "хмару"
export const TodoContext = createContext();

// 2. Створюємо "Провайдер" — компонент, який обгорне наш додаток і роздаватиме дані
export default function TodoProvider({ children }) {
  const [inputText, setInputText] = useState("");
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");
  const [deadlineDate, setDeadlineDate] = useState("");
  const [filter, setFilter] = useState("all");
  const [itemToDelete, setItemToDelete] = useState(null);
  const [editCategoryId, setEditCategoryId] = useState(null);

  const [category, setCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const [newList, setNewList] = useLocalStorage("todos", []);

  const addNewList = () => {
    if (inputText.trim()) {
      setNewList([
        ...newList,
        {
          id: Date.now(),
          text: inputText,
          isDone: false,
          deadline: deadlineDate,
          category: category,
        },
      ]);
      setInputText("");
      setDeadlineDate("");
      setCategory("");
    }
  };

  const deleteItem = (listId) => {
    const filterDelete = newList.filter((item) => item.id !== listId);
    setNewList(filterDelete);
  };

  const confirmDelete = () => {
    deleteItem(itemToDelete);
    setItemToDelete(null);
  };

  const toggleComplete = (listId) => {
    const filterComplete = newList.map((item) => {
      if (item.id === listId) {
        return { ...item, isDone: !item.isDone };
      } else {
        return item;
      }
    });
    setNewList(filterComplete);
  };

  const edit = (list) => {
    setEditId(list.id);
    setEditText(list.text);
  };

  const saveEdit = () => {
    const updateText = newList.map((list) => {
      if (list.id === editId) {
        return { ...list, text: editText };
      } else {
        return list;
      }
    });
    setNewList(updateText);
    setEditId(null);
  };
  const saveEditCategory = (idList, newCategoryValue) => {
    const updateText = newList.map((list) => {
      if (list.id === idList) {
        return { ...list, category: newCategoryValue };
      } else {
        return list;
      }
    });
    setNewList(updateText);
    setEditCategoryId(null);
  };

  let filteredList = useMemo(() => {
    let list = [...newList];
    if (filter === "active") {
      list = list.filter((item) => {
        return item.isDone === false;
      });
    } else if (filter === "completed") {
      list = list.filter((item) => {
        return item.isDone === true;
      });
    }
    list = list.filter((item) => {
      return item.text.toLowerCase().includes(searchQuery.toLowerCase());
    });

    list.sort((a, b) => Number(a.isDone) - Number(b.isDone));
    return list;
  }, [filter, newList, searchQuery]);

  const activeTasksCount = useMemo(() => {
    return newList.filter((item) => item.isDone === false);
  }, [newList]);

  const clearCompleted = () => {
    const uptadeCompleted = newList.filter((item) => {
      return item.isDone === false;
    });
    setNewList(uptadeCompleted);
  };

  const completionPercentage = useMemo(() => {
    const completedList = newList.filter((item) => item.isDone === true);
    if (newList.length === 0) {
      return 0;
    } else {
      return Math.round((completedList.length / newList.length) * 100);
    }
  }, [newList]);

  return (
    // У value ми покладемо те, що хочемо віддати іншим файлам
    <TodoContext.Provider
      value={{
        addNewList,
        deleteItem,
        confirmDelete,
        toggleComplete,
        edit,
        saveEdit,
        clearCompleted,
        inputText,
        setInputText, // Додали!
        deadlineDate,
        setDeadlineDate, // Додали!
        filter,
        setFilter,
        editId,
        editText,
        setEditText, // Додали!
        itemToDelete,
        setItemToDelete,
        newList,
        activeTasksCount,
        filteredList,
        completionPercentage,
        category,
        setCategory,
        editCategoryId,
        setEditCategoryId,
        saveEditCategory,
        searchQuery,
        setSearchQuery,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
}

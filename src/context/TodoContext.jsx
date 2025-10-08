import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
} from "react";

const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  });

  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const inputRef = useRef(null);
  const editRef = useRef(null);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const toggleTodo = (id) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const startEdit = (id) => setEditingId(id);
  const cancelEdit = () => setEditingId(null);

  const saveEdit = (id) => {
    const text = editRef.current?.value.trim();
    if (text) {
      setTodos((prev) =>
        prev.map((todo) => (todo.id === id ? { ...todo, text } : todo))
      );
    }
    setEditingId(null);
  };

  const addTodo = (e) => {
    if (e) e.preventDefault();
    const text = inputRef.current?.value.trim();
    if (text) {
      setTodos((prev) => [...prev, { id: Date.now(), text, completed: false }]);
      inputRef.current.value = "";
      setIsAdding(false);
    }
  };

  return (
    <TodoContext.Provider
      value={{
        todos,
        isAdding,
        setIsAdding,
        editingId,
        setEditingId,
        inputRef,
        editRef,
        toggleTodo,
        deleteTodo,
        startEdit,
        saveEdit,
        cancelEdit,
        addTodo,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useTodos = () => useContext(TodoContext);

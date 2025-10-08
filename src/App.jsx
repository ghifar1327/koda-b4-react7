import React from "react";
import { TodoApp } from "./pages/TodoList";
import { TodoProvider } from "./context/TodoContext";

export const App = () => {
  return (
    <TodoProvider>
      <TodoApp />
    </TodoProvider>
  );
};

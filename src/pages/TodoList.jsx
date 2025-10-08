import React, { useEffect } from "react";
import { useTodos } from "../context/TodoContext";

export function TodoApp() {
  const {
    todos,
    isAdding,
    setIsAdding,
    editingId,
    inputRef,
    editRef,
    toggleTodo,
    deleteTodo,
    startEdit,
    saveEdit,
    cancelEdit,
    addTodo,
  } = useTodos();

  useEffect(() => {
    if (isAdding && inputRef.current) inputRef.current.focus();
  }, [isAdding , inputRef]);

  // Fokus otomatis ke input edit
  useEffect(() => {
    if (editingId && editRef.current) {
      editRef.current.focus();
      editRef.current.select();
    }
  }, [editingId , editRef]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-50 to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md ">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-t-2xl shadow-lg p-6 flex items-center justify-between">
          <button className="text-white hover:bg-white/20 p-2 rounded-lg transition">
            <img src="/hamburger.svg" alt="" className="w-10" />
          </button>
          <h1 className="text-white text-2xl font-semibold">Todo List App</h1>
          <div className="w-10"></div>
        </div>

        {/* Todo List */}
        <div className="bg-white rounded-b-2xl shadow-lg p-8 pb-24 relative">
          <div className="space-y-4">
            {todos.map((todo) => (
              <div
                key={todo.id}
                className="flex items-center gap-4 text-xl group hover:bg-gray-50 p-2 rounded-lg transition"
              >
                {/* Check button */}
                <button
                  onClick={() => toggleTodo(todo.id)}
                  className="flex-shrink-0"
                >
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition ${
                      todo.completed
                        ? "bg-purple-500 border-purple-500"
                        : "border-gray-300 hover:border-purple-400"
                    }`}
                  >
                    {todo.completed && (
                      <svg
                        className="w-4 h-4 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    )}
                  </div>
                </button>

                {/* Input edit */}
                {editingId === todo.id ? (
                  <form action="">
                    <input
                      ref={editRef}
                      type="text"
                      defaultValue={todo.text}
                      className="flex-1 text-gray-700 text-xl outline-none bg-transparent border-b-2 border-purple-400"
                      onKeyPress={(e) => {
                        if (e.key === "Enter") saveEdit(todo.id);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Escape") cancelEdit();
                      }}
                      onBlur={() => {
                        setTimeout(() => saveEdit(todo.id), 200);
                      }}
                    />
                  </form>
                ) : (
                  <span
                    className={`flex-1 text-gray-700 transition ${
                      todo.completed ? "line-through text-gray-400" : ""
                    }`}
                  >
                    {todo.text}
                  </span>
                )}

                {/* Button rename */}
                {!todo.completed && editingId !== todo.id && (
                  <button
                    title="Rename"
                    onClick={() => startEdit(todo.id)}
                    className="opacity-0 group-hover:opacity-100 transition"
                  >
                    <img src="/pencil.svg" alt="" className="w-4" />
                  </button>
                )}

                {/* Button delete */}
                {editingId !== todo.id && (
                  <button
                    title="Delete"
                    onClick={() => deleteTodo(todo.id)}
                    className={`text-gray-400 hover:text-red-500 transition p-1 ${
                      todo.completed
                        ? "opacity-100"
                        : "opacity-0 group-hover:opacity-100"
                    }`}
                  >
                    <img src="/trush.svg" alt="" className="w-5" />
                  </button>
                )}
              </div>
            ))}

            {/* Add New Todo Input */}
            {isAdding && (
              <div className="flex items-center gap-4 p-2">
                <div className="w-6 h-6 rounded-full border-2 border-gray-300 flex-shrink-0"></div>
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Add new task..."
                  className="flex-1 text-gray-700 text-xl outline-none bg-transparent"
                  onKeyPress={(e) => {
                    if (e.key === "Enter") addTodo(e);
                  }}
                  onBlur={() => {
                    setTimeout(() => {
                      if (!inputRef.current?.value.trim()) {
                        setIsAdding(false);
                      }
                    }, 3000);
                  }}
                />
              </div>
            )}
          </div>

          {/* New Task Button */}
          <div className="absolute -bottom-7 left-1/2 transform -translate-x-1/2">
            <button
              onClick={() => setIsAdding(true)}
              className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white px-7 py-3 rounded-full shadow-lg hover:shadow-xl transition flex items-center gap-2 font-medium"
            >
              <div className="text-2xl pb-1">+</div>
              <span>New task</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

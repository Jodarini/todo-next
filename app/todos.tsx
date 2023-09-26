"use client";
import { ChangeEvent, FormEvent, useState } from "react";

interface Todo {
  title: string;
  id: number;
  isEditable: boolean;
}

let todoId = 0;
export const Todos = () => {
  const [newTodo, setNewTodo] = useState<string>();
  const [todos, setTodos] = useState<Todo[] | undefined>([
    { title: "todo 1", id: todoId++, isEditable: false },
    { title: "todo 2", id: todoId++, isEditable: false },
  ]);

  function handleAddTodo(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setTodos([{ title: "", id: todoId++, isEditable: true }, ...todos]);
  }

  function changeTodoTitle(e: FormEvent<HTMLFormElement>, id: number) {
    e.preventDefault();

    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, title: newTodo, isEditable: false };
      }
      return todo;
    });
    setTodos(newTodos);
  }

  function handleTodoInput(e: ChangeEvent<HTMLInputElement>) {
    setNewTodo(e.target.value.toString());
  }

  return (
    <div>
      <button onClick={(e) => handleAddTodo(e)}>+</button>
      {newTodo}
      <ul>
        {todos.map((todo) =>
          todo && todo.isEditable ? (
            <form key={todo.id} onSubmit={(e) => changeTodoTitle(e, todo.id)}>
              <input
                type="text"
                autoFocus
                onChange={(e) => handleTodoInput(e)}
                className="text-black"
              />
            </form>
          ) : (
            <li key={todo.id}>{todo.title}</li>
          ),
        )}
      </ul>
    </div>
  );
};

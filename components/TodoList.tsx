import { createContext, useContext, useState } from "react";
import TodoItem from "./TodoItem";
import { ServerTodoItem, TodoContext } from "@/types";

export default function TodoList({ data }: { data: ServerTodoItem[] }) {
  const { fetchUpdatedTodoList } = useContext(TodoContext);
  return (
    <div className="w-full">
      {data.map((item, index) => (
        <TodoItem
          key={item.IDX}
          title={item.TITLE}
          idx={item.IDX}
          className={index % 2 === 0 ? "bg-gray-300" : "bg-gray-100"}
        />
      ))}
    </div>
  );
}

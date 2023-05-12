import Image from "next/image";
import TodoList from "@/components/TodoList";
import {
  ServerResponse,
  ServerTodoItem,
  TodoContext,
  TodoContextValue,
} from "@/types";
import { useState } from "react";

export default function Home({ data }: { data: ServerTodoItem[] }) {
  const [todoList, setTodoList] = useState<ServerTodoItem[]>(data);
  const [currentTodo, setCurrentTodo] = useState("");

  const addTodo = async () => {
    try {
      const newTodo = {
        name: process.env.NEXT_PUBLIC_USER,
        title: currentTodo,
      };
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}?name=${process.env.NEXT_PUBLIC_USER}&title=${currentTodo}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newTodo),
        }
      );
      if (res.ok) {
        await fetchUpdatedTodoList();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchUpdatedTodoList = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}?name=${process.env.NEXT_PUBLIC_USER}`
      );
      const responseData: ServerResponse = await res.json();

      if (responseData.result) {
        setTodoList([...responseData.data]);
      } else {
        throw new Error(responseData.error);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const todoContextValue: TodoContextValue = {
    fetchUpdatedTodoList,
  };
  return (
    <div className="w-screen h-screen">
      <div className="w-full h-1/6 bg-red-500 flex flex-col items-center">
        <h1 className="text-2xl text-white mt-3">My Todo List</h1>
        <div className="flex w-10/12 mt-2 items-center gap-2">
          <input
            type="text"
            placeholder="Title..."
            className="h-8 flex-1 p-2"
            value={currentTodo}
            onChange={(e) => setCurrentTodo(e.target.value)}
          />
          <button
            className="h-9 rounded-md bg-slate-300 w-32"
            onClick={addTodo}
          >
            Add
          </button>
        </div>
      </div>
      <div>
        <TodoContext.Provider value={todoContextValue}>
          <TodoList data={todoList} />
        </TodoContext.Provider>
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}?name=${process.env.NEXT_PUBLIC_USER}`
    );
    const responseData: ServerResponse = await res.json();

    if (responseData.result) {
      return {
        props: {
          data: responseData.data,
        },
      };
    } else {
      throw new Error(responseData.error);
    }
  } catch (error) {
    // Handle error appropriately (e.g., show error message, redirect, etc.)
    console.error(error);
    return {
      props: {
        data: [],
      },
    };
  }
}

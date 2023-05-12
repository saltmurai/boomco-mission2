import { TodoContext } from "@/types";
import React, { useContext, useState } from "react";
import { GrCheckmark } from "react-icons/gr";
import { RxCross2 } from "react-icons/rx";

export default function TodoItem({
  title,
  className,
  idx,
}: {
  title: string;
  idx: number;
  className?: string;
}) {
  const { fetchUpdatedTodoList } = useContext(TodoContext);
  const [isDone, setIsDone] = useState(false);
  const deleteTodo = async (event: React.MouseEvent<SVGElement>) => {
    event.stopPropagation();
    const data = {
      name: process.env.NEXT_PUBLIC_USER,
      idx: idx,
    };
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        await fetchUpdatedTodoList();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      className={`w-full h-12 flex items-center ${className} ${
        isDone && "line-through bg-gray-400 text-white"
      } hover:bg-gray-400`}
      onClick={() => setIsDone(!isDone)}
    >
      {isDone ? (
        <GrCheckmark size={30} className="w-10" />
      ) : (
        <div className="w-10"></div>
      )}
      <span className="ml-10 text-xl flex-1">{title}</span>
      <RxCross2 size={30} className="w-10" onClick={deleteTodo} />
    </div>
  );
}

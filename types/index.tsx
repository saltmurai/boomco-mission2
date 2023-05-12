import { createContext } from "react";

export type ServerTodoItem = {
  IDX: number;
  TITLE: string;
};

export type ServerResponse =
  | {
      result: true;
      data: ServerTodoItem[];
    }
  | {
      result: false;
      error: string;
    };

export type TodoContextValue = {
  fetchUpdatedTodoList: () => Promise<void>;
};

export const TodoContext = createContext<TodoContextValue>({
  fetchUpdatedTodoList: async () => {},
});

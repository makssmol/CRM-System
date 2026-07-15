import type React from "react";
import { TodoItem } from "../TodoItem";
import type { Todo } from "../../types/TodoTypes";
import { memo } from "react";

export const TodoList: React.FC<{
  updateTodo: () => void;
  tasks: Todo[];
}> = memo((props) => {
  const { updateTodo, tasks } = props;
  return (
    <>
      {tasks.map((data) => (
        <TodoItem
          key={data.id}
          taskIndex={data.id}
          title={data.title}
          isComplete={data.isDone}
          updateTodo={updateTodo}
        />
      ))}
    </>
  );
});

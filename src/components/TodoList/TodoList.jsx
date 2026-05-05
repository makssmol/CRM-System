import { TodoItem } from "../TodoItem";

export function TodoList({
  loadTasks,
  setError,
  isFetching,
  task,
  selectedTask,
}) {
  console.log("render");
  return (
    <>
      {isFetching && <p>Tasks are loading</p>}
      {!isFetching &&
        task.map((data) => (
          <TodoItem
            key={data.id}
            taskIndex={data.id}
            title={data.title}
            isComplete={data.isDone}
            loadTasks={loadTasks}
            setError={setError}
            selectedTask={selectedTask}
          />
        ))}
    </>
  );
}

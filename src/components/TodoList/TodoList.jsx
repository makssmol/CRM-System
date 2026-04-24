import { TodoItem } from "../TodoItem";

export function TodoList({
  loadTasks,
  setError,
  isFetching,
  task,
  editingId,
  setEditingId,
  selectedTask,
}) {
  return (
    <>
      {isFetching && <p>Tasks are loading</p>}
      {!isFetching &&
        task.map((data) => (
          <TodoItem
            key={data.id}
            taskIndex={data.id}
            title={data.title}
            isEditing={editingId === data.id}
            isComplete={data.isDone}
            loadTasks={loadTasks}
            setError={setError}
            setEditingId={setEditingId}
            selectedTask={selectedTask}
          />
        ))}
    </>
  );
}

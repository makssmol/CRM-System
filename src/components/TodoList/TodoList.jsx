import { TodoItem } from "../TodoItem";

export function TodoList({
  isFetching,
  task,
  onDelete,
  onEdit,
  onEditConfirm,
  editingId,
  onCheck
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
            onDelete={onDelete}
            onEdit={onEdit}
            onEditConfirm={onEditConfirm}
            isEditing={editingId === data.id}
            onCheck={onCheck}
            isComplete={data.isDone}
          />
        ))}
    </>
  );
}

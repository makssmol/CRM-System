import { Button, Icon, Container} from "../../ui";


export function TodoItemButtons({isEditing, isValid, onEditConfirm, taskIndex, onDelete}) {
  return (
    <>
      {isEditing ? (
        <Container variant="task-buttons">
          <Button
            variant="confirm-action"
            type="submit"
            isValid={isValid}
          >
            <Icon name="confirm" />
          </Button>
          <Button variant="cancel-action" onConfirm={onEditConfirm}>
            <Icon name="cancel" />
          </Button>
        </Container>
      ) : (
        <Container variant="task-buttons">
          <Button
            variant="redact"
            onConfirm={onEditConfirm}
            taskIndex={taskIndex}
          >
            <Icon name="edit" />
          </Button>
          <Button
            variant="delete"
            onConfirm={onDelete}
            taskIndex={taskIndex}
          >
            <Icon name="delete" />
          </Button>
        </Container>
      )}
    </>
  );
}

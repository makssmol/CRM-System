import { Button, Container } from "../../ui";

export function Tabs({ info, selectedTask, setSelectedTask }) {
  return (
    <Container variant="tabs">
      {Object.entries(info).map(([status, values], index) => (
        <Button
          key={index}
          variant="tab-button"
          selected={selectedTask === status}
          onConfirm={() => setSelectedTask(status)}
        >
          {status.trim()}({values})
        </Button>
      ))}
    </Container>
  );
}

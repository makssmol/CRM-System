import { useState } from "react";
import {
  TodoListContainer,
  TaskButton,
  TaskInput,
  Tasks,
} from "../../components";
import { TASK_TABS, DUMMY_DATA } from "../../constants/Constants";

export function Todo() {
  const [selectedTask, setSelectedTask] = useState();

  function handleSelect(status) {
    setSelectedTask(status);
  }

  return (
    <TodoListContainer variant="todo">
      <TodoListContainer variant="header">
        <TaskInput />
        <TaskButton>Add</TaskButton>
      </TodoListContainer>
      <TodoListContainer variant="content">
        <TodoListContainer variant="tabs">
          {TASK_TABS.map((tab) => (
            <TaskButton
              key={tab.id}
              variant="tab-button"
              selected={selectedTask === tab.label}
              onClick={() => handleSelect(tab.label)}
            >
              {tab.label}
            </TaskButton>
          ))}
        </TodoListContainer>
        {DUMMY_DATA.map((data) => (
          <Tasks key={data.id} title={data.title} />
        ))}
      </TodoListContainer>
    </TodoListContainer>
  );
}

import styles from "./AddTodo.module.css";
import { createNewTask } from "../../api/todoApi";
import { useState, useEffect } from "react";
import { Button, Input, Form } from "antd";

export const AddTodo: React.FC<{
  updateTodo: () => void;
}> = (props) => {
  const { updateTodo } = props;
  const [taskText, setTaskText] = useState<string>("");
  const [error, setError] = useState<string | null>();

  function handleTaskInput(title: string): void {
    setTaskText(title);
  }

  async function handleAddTask(title: string): Promise<void> {
    if (!title) {
      return;
    }
    try {
      await createNewTask(title);
      await updateTodo();
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError("Не удалось добавить задачу");
      }
    }
  }

  useEffect(() => {
    if (error) {
      alert(error);
    }
  }, [error]);

  return (
    <Form onFinish={() => handleAddTask(taskText)}>
      <div className={styles.header}>
        <Form.Item
          rules={[
            { required: true, message: "Это поле не может быть пустым!" },
            { max: 64, message: "Максимальная длина текста 64 символа!" },
            { min: 2, message: "Минимальная длина текста 2 символа!" },
          ]}
          style={{ width: "100%", height: "20px" }}
        >
          <Input
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              handleTaskInput(event.target.value)
            }
            placeholder="Задача на выполнение..."
            variant="underlined"
            className={styles.input}
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" size="large" htmlType="submit">
            Добавить
          </Button>
        </Form.Item>
      </div>
    </Form>
  );
};

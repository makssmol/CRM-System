import styles from "./AddTodo.module.css";
import { createNewTask } from "../../api/todoApi";
import { useState, useEffect } from "react";
import { Button, Input, Form } from "antd";
import { minTaskChars, maxTaskChars } from "../../constants/constants";

export const AddTodo: React.FC<{
  updateTodo: () => void;
}> = (props) => {
  const { updateTodo } = props;
  const [error, setError] = useState<string | null>();

  async function handleAddTask(value: { taskText: string }): Promise<void> {
    if (!value) {
      return;
    }
    try {
      await createNewTask(value.taskText);
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
    <Form onFinish={handleAddTask} name="taskname">
      <div className={styles.header}>
        <Form.Item
          name="taskText"
          validateFirst={true}
          normalize={(value) => value.trimStart()}
          rules={[
            {
              whitespace: true,
              message: "Текст задачи не может быть пустым!",
            },
            { required: true, message: "Заполните поле!" },
            {
              max: maxTaskChars,
              message: "Максимальная длина текста 64 символа!",
            },
            {
              min: minTaskChars,
              validator(_, value) {
                if (value.trim().length <= 1) {
                  return Promise.reject("Минимальная длина текста 2 символа!");
                }
                return Promise.resolve();
              },
            },
          ]}
          style={{ width: "100%", height: "40px" }}
        >
          <Input
            placeholder="Задача на выполнение..."
            variant="underlined"
            className={styles.input}
          />
        </Form.Item>

        <Button type="primary" size="large" htmlType="submit">
          Добавить
        </Button>
      </div>
    </Form>
  );
};

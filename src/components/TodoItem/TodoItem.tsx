import styles from "./TodoItem.module.css";
import React, { useState, useEffect } from "react";
import { deleteTask, changeTask } from "../../api/todoApi";
import type { CheckboxProps, FormProps } from "antd";
import { Checkbox, Button, Input, Form, Typography } from "antd";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { minTaskChars, maxTaskChars } from "../../constants/constants";

const checkboxStyles: CheckboxProps["styles"] = {
  icon: {
    borderRadius: 12,
  },
};

const styleObject: FormProps["styles"] = {
  helpItem: {
    fontSize: "11px",
  },
};

const styleFormItems = {
  height: "10px",
};

const btnStyle = {
  padding: "1.1rem 1.4rem",
};

const iconStyle = {
  fontSize: "20px",
  color: "white",
};

export const TodoItem: React.FC<{
  taskIndex: number;
  title: string;
  isComplete: boolean;
  updateTodo: () => void;
}> = (props) => {
  const { taskIndex, title, isComplete, updateTodo } = props;
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>();

  async function handleEditTask(
    id: number,
    value: { taskText: string },
    isDone: boolean
  ): Promise<void> {
    setIsEditing(true);

    if (!value) {
      return;
    }

    try {
      await changeTask(id, value.taskText, isDone);
      await updateTodo();
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError("Не удалось отредактировать задачу");
      }
    }
    setIsEditing(!isEditing);
  }

  async function handleCompleteTask(
    id: number,
    title: string,
    isDone: boolean
  ): Promise<void> {
    try {
      await changeTask(id, title, isDone);
      await updateTodo();
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError("Не удалось поменять статус задачи");
      }
    }
  }

  async function handleDeleteTask(id: number): Promise<void> {
    try {
      await deleteTask(id);
      await updateTodo();
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError("Не удалось удалить задачу");
      }
    }
  }

  function handleEditConfirmation(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    setIsEditing(true);
  }

  useEffect(() => {
    if (error) {
      alert(error);
    }
  }, [error]);

  return (
    <Form
      onFinish={(value: { taskText: string }) =>
        handleEditTask(taskIndex, value, isComplete)
      }
      styles={styleObject}
    >
      <div className={styles.task}>
        <div className={styles.task_main}>
          <Form.Item style={{ height: "7px" }}>
            <Checkbox
              checked={isComplete}
              onChange={() => handleCompleteTask(taskIndex, title, !isComplete)}
              styles={checkboxStyles}
              className="truncate"
            >
              <Typography.Text
                className={isComplete ? "completedTask" : ""}
                ellipsis
              >
                {!isEditing && title}
              </Typography.Text>
            </Checkbox>
          </Form.Item>

          {isEditing && (
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
                  validator(_, value){
                    if(value.trim().length <= 1){
                      return Promise.reject("Минимальная длина текста 2 символа!")
                    }
                    return Promise.resolve();
                  }
                },
              ]}
              style={{ width: "100%", height: "10px" }}
              initialValue={title}
              preserve={false}
            >
              <Input type="text" />
            </Form.Item>
          )}
        </div>
        {isEditing ? (
          <div className={styles.task_buttons}>
            <Form.Item style={styleFormItems}>
              <Button
                style={btnStyle}
                type="primary"
                htmlType="submit"
                icon={<CheckCircleOutlined style={iconStyle} />}
              />
            </Form.Item>

            <Form.Item style={styleFormItems}>
              <Button
                style={btnStyle}
                color="geekblue"
                icon={
                  <CloseCircleOutlined
                    style={{ fontSize: "20px", color: "black" }}
                  />
                }
                onClick={() => setIsEditing(false)}
              />
            </Form.Item>
          </div>
        ) : (
          <div className={styles.task_buttons}>
            <Form.Item style={styleFormItems}>
              <Button
                onClick={handleEditConfirmation}
                style={btnStyle}
                type="primary"
                icon={<EditOutlined style={iconStyle} />}
              />
            </Form.Item>

            <Form.Item style={styleFormItems}>
              <Button
                onClick={() => handleDeleteTask(taskIndex)}
                style={btnStyle}
                type="primary"
                icon={<DeleteOutlined style={iconStyle} />}
                danger
              />
            </Form.Item>
          </div>
        )}
      </div>
    </Form>
  );
};

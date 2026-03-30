import { TodoListContainer } from "../TodoListContainer";

export function TaskError({title, message}){
    return <TodoListContainer variant="error">
        <h2>{title}</h2>
        <p>{message}</p>
    </TodoListContainer>
}
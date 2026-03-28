import "./taskInput.css"

export function TaskInput({
    inputVariant = "create-task",
}){
    return <input type="text" className={inputVariant} placeholder="Task To Be Done..."/>
}


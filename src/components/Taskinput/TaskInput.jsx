import "./taskInput.css"

export function TaskInput({
    inputVariant,
    title,
    onUserInput,
})
{
    let disabled = false
    if(inputVariant === 'tasks-input'){
        disabled = true
    }
    
    return <input onChange = {(event) => onUserInput(event.target.value)} disabled={disabled} defaultValue={title} type="text" className={inputVariant} placeholder="Task To Be Done..."/>
}


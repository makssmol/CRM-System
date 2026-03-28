import "./taskCheckbox.css"

export function TaskCheckbox({variant = 'finished'}){
    return <input className={variant} type="checkbox" />
}
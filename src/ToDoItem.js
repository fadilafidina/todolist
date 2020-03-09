import React from 'react';
export function ToDoItem(props) {

    return (<div className="todo-item">
        <input type="checkbox" checked={props.completed} onChange={() => props.onChange(props.id)}></input> <label>{props.text}</label> <br />
    </div>)
}

import React from 'react';
export function ToDoItem(props) {

    const completedStyle = {
        fontStyle: "italic",
        color: "#cdcdcd",
        textDecoration: "line-through"
    }

    return (<div className="todo-item">
        <input type="checkbox" checked={props.completed} onChange={() => props.onChange(props.id)}></input> 
        <label style={props.completed ? completedStyle : null} >{props.text}</label> <br />
    </div>)
}

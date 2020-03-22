import React, { Component } from 'react';
import todoData from './TodoData';
import { ToDoItem } from "./ToDoItem";


export class Body extends Component {
    constructor() {
        super();
        this.state = {
            todoData: todoData,
            isLoading: true,
        };
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({
                isLoading: false
            })
        }, 1500);
    };

    handleChange(idToMatch) {
        this.setState(prevState => {
            //make new array first
            const updatedTodos = prevState.todoData.map(t => {
                if(t.id === idToMatch) {
                    t.completed = !t.completed;
                }
                return t;
            });

            // then loop through everything and flip the sign that was completed.
            // updatedTodos.forEach(element => {
            //     if (element.id === idToMatch) {
            //         element.completed = !element.completed;
            //     }
            // });

            // set the new state to the new todos with the updated state
            return {
                todoData: updatedTodos,
            }
        })
        console.log("Changed", idToMatch);
    }

    render() {
        const todoComponents = this.state.todoData.map(
            todo => <ToDoItem id={todo.id} text={todo.text} completed={todo.completed} onChange={this.handleChange} />);

        return (<div className="content">
            <h2 className="heading">These are my to do</h2>
            {this.state.isLoading ? <h2> Loading </h2> : <h2> ok </h2>}

            {todoComponents}
        </div>);
    }
}

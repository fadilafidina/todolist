import React, { Component } from 'react';
import todoData from './TodoData';
import { ToDoItem } from "./ToDoItem";


export class Body extends Component {
    constructor() {
        super();
        this.state = {
            todoData: todoData,
            isLoading: true,
            unreadMessages: [
                // "Your mum", "Hello"
            ],
            character: {},
            requestLoading: false,
            firstName: "",
        };
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        this.setState({
            requestLoading: true
        });
        fetch("https://swapi.co/api/people/1/")
        .then(response => response.json())
        .then(data => this.setState({
            character: data,
            requestLoading: false,
        }));
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

            // set the new state to the new todos with the updated state
            return {
                todoData: updatedTodos,
            }
        })
        console.log("Changed", idToMatch);
    }

    handleChange(event) {
        this.setState({
            firstName: event.target.value
        });
        console.log(this.state.firstName);
    };

    render() {
        const todoComponents = this.state.todoData.map(
            todo => <ToDoItem id={todo.id} text={todo.text} completed={todo.completed} onChange={this.handleChange} />);

        const textForName = this.state.requestLoading 
        ? "Loading"
        : `Name is ${this.state.character.name}`;

        return (<div className="content">
            <h2 className="heading">These are my to do</h2>

            <p>{textForName}</p>
        
            {this.state.isLoading ? <h2> Loading </h2> : <h2> ok </h2>}
            {this.state.unreadMessages.length > 0
            ? <h2>You have {this.state.unreadMessages.length} unread messages</h2>
            : "nothing!!!"}

            <form>
                <input type="text" placeholder="First Name" onChange={this.handleChange}></input>
            </form>

            {todoComponents}
        </div>);
    }
}

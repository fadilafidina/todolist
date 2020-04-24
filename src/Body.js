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
            lastName: "",
            isFriendly: false,
            information: "",
            gender: "",
            favColor: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.setState({
            requestLoading: true
        });
        fetch("https://swapi.dev/api/people/1/")
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
                if (t.id === idToMatch) {
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

    handleInput(event) {
        const { name, value, type, checked } = event.target;

        console.log(`name: ${name}, value: ${value}, type:${type}, checked: ${checked} `);


        type === 'checkbox' ? this.setState({[name]: checked}) : this.setState({[name]: value})

        // type === 'checkbox' ? this.setState({[name]: checked }) : this.setState({[name]: value});
        
        console.log(`${this.state.firstName} ${this.state.lastName} ${this.state.isFriendly} `);
    };

    handleSubmit(event){
        console.log(event);
        
        console.log('Handling the submission.');
    };

    render() {
        const todoComponents = this.state.todoData.map(
            todo => <ToDoItem id={todo.id} text={todo.text} completed={todo.completed} onChange={this.handleChange} />);
        

        // Displaying data from API request
        const textForName = this.state.requestLoading
            ? "Loading"
            : `Name is ${this.state.character.name}`;


        // Return the html stuff
        return (<div className="content">
            <h2 className="heading">These are my to do</h2>

            <p>{textForName}</p>

            {/* // Loading practice */}
            {this.state.isLoading ? <h2> Loading </h2> : <h2> ok </h2>}

            {/* Displaing text based on state */}
            {this.state.unreadMessages.length > 0
                ? <h2>You have {this.state.unreadMessages.length} unread messages</h2>
                : "nothing!!!"}


            {/* Form practice */}
            <form onSubmit={this.handleSubmit}>
                <input 
                type="text" 
                value={this.state.firstName} 
                name="firstName" 
                placeholder="First Name" 
                onChange={this.handleInput}></input>
            
                <br/>
                
                <input 
                type="text" 
                value={this.state.lastName} 
                name="lastName" 
                placeholder="Last Name" 
                onChange={this.handleInput}>
                </input>
            
                <br/>

                <textarea 
                    name="information"
                    onChange={this.handleInput}
                />

                <br/>

                <label>
                    <input 
                        type="checkbox"
                        name="isFriendly"
                        checked={this.state.isFriendly}
                        onChange={this.handleInput}
                    /> Is friendly?
                </label>
                <br/>

                <label>
                    <input 
                        type="radio"
                        name="gender"
                        value="male"
                        checked={this.state.gender === 'male'}
                        onChange={this.handleInput}
                    /> Male
                </label>
                <br/>

                <label>
                    <input 
                        type="radio"
                        name="gender"
                        value="female"
                        checked={this.state.gender === 'female'}
                        onChange={this.handleInput}
                    /> Female
                </label>
                <br/>

                <label>Favourite colour</label>

                <select
                    name="favColor"
                    onChange={this.handleChange}
                >
                    <option value="blue">Blue</option>
                    <option value="yellow">Yellow</option>
                    <option value="pink">Pink</option>
                    <option value="black">Black</option>
                </select>

                {/* If you put a button in a form then it is taken as a submit button */}
                <button>Submit</button>
                
            </form>

            {/* Print out the typed information */}
            <h2>
                {this.state.firstName} 
                <br/>
                {this.state.lastName} 
                <br/>
                {this.state.information} 
                <br/>
                {`You are ${this.state.isFriendly} for friendly`}
                <br/>

                {`You are this gender: ${this.state.gender} `}
                <br/>

                {`Yor fav colour: ${this.state.favColor} `}
            </h2>
            
            {/* Displaying the todo Components */}
            {todoComponents}
        </div>);
    }
}

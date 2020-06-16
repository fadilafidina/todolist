import React, { Component } from 'react';

export class Header extends Component {
    // eslint-disable-next-line no-useless-constructor
    constructor() {
        super();
    }
    
    render() {
        return (<header className="header">
            <h1>Welcome to my to do list</h1>
        </header>);
    }
}

import React, { Component } from 'react';
import { Body } from './Body';
import { Footer } from './Footer';
import { Header } from './Header';

export class App extends Component {
    

    render() {
        return (
            <div>
                <Header />
                <Body />
                <Footer />
            </div>
        )
    }
}
export default App;

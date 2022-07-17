import React from "react";
import './App.css';
import { Cooking } from "./Cooking";

export class App extends React.Component {
    render() {
        return (
            <div>
                <h1>Tu vas manger : </h1>
                <span>{ Cooking.getCookingForWeeks() }</span>
            </div>
        );
    }
}

export default App;

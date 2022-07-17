import React from "react";
import { Cooking } from "./Cooking";
import { Button } from 'rsuite';

export class App extends React.Component {
    state = {
        cooking: Cooking.getCookingForWeeks()
    }
    getCooking() {
        this.setState({
            cooking: Cooking.getCookingForWeeks()
        });
    }

    render() {
        return (
            <div>
                <h1>Repas du jour :</h1>
                <span>{ this.state.cooking }</span>
                <Button appearance="primary" onClick={ () => this.getCooking() }>Nouvelle recette</Button>
            </div>
        );
    }
}

export default App;

import React from "react";
import { Cooking } from "./Cooking";
import { Button, Drawer } from 'rsuite';

export class App extends React.Component {
    state = {
        cooking: Cooking.getCookingForWeeks(),
        drawerOpen: false
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
                <span onClick={ () => this.setState({ drawerOpen: true }) }>{ this.state.cooking.title }</span>
                <Button appearance="primary" onClick={ () => this.getCooking() }>Nouvelle recette</Button>

                <Drawer open={ this.state.drawerOpen } onClose={ () => this.setState({ drawerOpen: false }) }>
                    <Drawer.Header>
                        <Drawer.Title>Drawer Title</Drawer.Title>
                        <Drawer.Actions>
                            <Button onClick={ () => this.setState({ drawerOpen: false }) }>Cancel</Button>
                            <Button onClick={ () => this.setState({ drawerOpen: false }) } appearance="primary">
                                Confirm
                            </Button>
                        </Drawer.Actions>
                    </Drawer.Header>
                    <Drawer.Body>
                        { this.state.cooking.description }
                    </Drawer.Body>
                </Drawer>
            </div>
        );
    }
}

export default App;

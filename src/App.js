import React from "react";
import { Cooking } from "./Cooking";
import { Button, Drawer } from 'rsuite';
import { Table } from 'rsuite';

export class App extends React.Component {
    state = {
        cooking: Cooking.getCookingForOneMeal(),
        weeklyCooking: Cooking.getCookingForWeek(),
        drawerOpen: false,
    };

    componentDidMount() {
        this.getWeekMenu();
    }

    getCooking() {
        this.setState({
            cooking: Cooking.getCookingForOneMeal()
        });
    }

    getWeekMenu() {
        this.setState({
            weeklyCooking: Cooking.getCookingForWeek()
        })
    }

    render() {
        return (
            <div>
                <h1>Repas du jour :</h1>
                <span>{ this.state.cooking.title }</span>
                <br/>
                <Button appearance="primary" onClick={ () => this.getCooking() }>Nouvelle recette</Button>

                <Table
                    data={ this.state.weeklyCooking }
                    bordered
                    cellBordered
                    autoHeight
                    affixHeader
                    affixHorizontalScrollbar
                    onClick={ () => this.setState({ drawerOpen: true }) }
                >

                    <Table.Column width={ 600 } fixed resizable>
                        <Table.HeaderCell>Jour</Table.HeaderCell>
                        <Table.Cell dataKey="description"/>
                    </Table.Column>
                    <Table.Column width={ 500 } fixed resizable>
                        <Table.HeaderCell>Plat</Table.HeaderCell>
                        <Table.Cell dataKey="title"/>
                    </Table.Column>
                </Table>


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

import React from "react";
import { Meal } from "./Meal";
import { Button, Drawer } from 'rsuite';
import { Table } from 'rsuite';

export class App extends React.Component {
    state = {
        dailyCooking: '',
        weeklyCooking: [],
        drawerOpen: false,
        cookingDetails: ''
    };

    componentDidMount() {
        this.getCooking();
        this.getWeekMenu();
    }

    getCooking() {
        this.setState({
            dailyCooking: Meal.getMealForOneDay()
        });
    }

    getWeekMenu() {
        this.setState({
            weeklyCooking: Meal.getMealForWeek()
        })
    }

    render() {
        return (
            <div>
                <h1>Repas du jour :</h1>
                <span>{ this.state.dailyCooking.title }</span>
                <br/>
                <Button appearance="primary" onClick={ () => this.getCooking() }>Nouvelle recette</Button>

                <Table
                    data={ this.state.weeklyCooking }
                    bordered
                    cellBordered
                    autoHeight
                    affixHeader
                    affixHorizontalScrollbar
                    onRowClick={ (rowData) => {
                        this.setState({
                            drawerOpen: true,
                            cookingDetails: rowData
                        })
                    } }
                >

                    <Table.Column width={ 300 } fixed resizable>
                        <Table.HeaderCell>Jour</Table.HeaderCell>
                        <Table.Cell dataKey="day"/>
                    </Table.Column>
                    <Table.Column width={ 600 } fixed resizable>
                        <Table.HeaderCell>Plat</Table.HeaderCell>
                        <Table.Cell dataKey="title"/>
                    </Table.Column>
                </Table>


                <Drawer open={ this.state.drawerOpen } onClose={ () => this.setState({ drawerOpen: false }) }>
                    <Drawer.Header>
                        <Drawer.Title>{ this.state.cookingDetails.title }</Drawer.Title>
                        <Drawer.Actions>
                            <Button onClick={ () => this.setState({ drawerOpen: false }) }>Cancel</Button>
                            <Button onClick={ () => this.setState({ drawerOpen: false }) } appearance="primary">
                                Confirm
                            </Button>
                        </Drawer.Actions>
                    </Drawer.Header>
                    <Drawer.Body>
                        { this.state.cookingDetails.description }
                    </Drawer.Body>
                </Drawer>
            </div>
        );
    }
}

export default App;

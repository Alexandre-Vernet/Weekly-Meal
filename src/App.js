import React from "react";
import { Meal } from "./Meal";
import { Button, Drawer, Table } from 'rsuite';
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";

export class App extends React.Component {
    state = {
        dailyMeal: '',
        weeklyMeal: [],
        drawerOpen: false,
        cookingDetails: ''
    };

    async componentDidMount() {
        await this.getWeekMenu();
    }

    async getWeekMenu() {
        const meal = [];

        // Get meal from firestore
        const querySnapshot = await getDocs(collection(db, "meal"));
        querySnapshot.forEach((doc) => {
            meal.push(doc.data());
        });

        // Filter meal (remove duplicate, sort randomly)
        const filteredMeal = Meal.getMealForWeek(meal);

        this.setState({
            weeklyMeal: filteredMeal
        });
    }

    render() {
        return (
            <div>
                <h1>Repas de la semaine</h1>
                <Button appearance="primary" onClick={ () => this.getWeekMenu() }>Nouveau menu</Button>

                <Table
                    data={ this.state.weeklyMeal }
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

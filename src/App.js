import React from "react";
import { Meal } from "./Meal";
import { Button, Drawer, Table } from 'rsuite';
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "./firebase";

export class App extends React.Component {
    state = {
        dailyMeal: '',
        weeklyMeal: [],
        drawerOpen: false,
        mealDetails: ''
    };

    async componentDidMount() {
        await this.getWeekMenu();
    }

    async getWeekMenu() {
        const meal = [];

        // Get meal from firestore
        const querySnapshot = await getDocs(collection(db, "meal"));
        querySnapshot.forEach((doc) => {
            // Push meal and id
            meal.push({
                ...doc.data(),
                id: doc.id
            });
        });

        // Filter meal (remove duplicate, sort randomly)
        const filteredMeal = Meal.getMealForWeek(meal);

        this.setState({
            weeklyMeal: filteredMeal
        });
    }

    updateMeal(meal) {

    }

    async deleteMeal(meal) {
        await deleteDoc(doc(db, "meal", meal.id));
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
                >

                    <Table.Column width={ 300 } fixed resizable>
                        <Table.HeaderCell>Jour</Table.HeaderCell>
                        <Table.Cell dataKey="day"/>
                    </Table.Column>
                    <Table.Column width={ 600 } fixed resizable>
                        <Table.HeaderCell>Plat</Table.HeaderCell>
                        <Table.Cell dataKey="title"/>
                    </Table.Column>

                    <Table.Column width={ 300 } fixed="right">
                        <Table.HeaderCell>Action</Table.HeaderCell>

                        <Table.Cell>
                            { meal => {
                                return (
                                    <div>
                                        {/*Edit meal*/ }
                                        <Button color="orange" onClick={ () =>
                                            this.setState({
                                                drawerOpen: true,
                                                mealDetails: meal
                                            })
                                        } appearance="primary">Edit</Button>

                                        {/*Delete meal*/ }
                                        <Button color="red" appearance="primary"
                                                onClick={ () => this.deleteMeal(meal) }> Remove </Button>
                                    </div>
                                );
                            } }
                        </Table.Cell>
                    </Table.Column>

                </Table>


                <Drawer open={ this.state.drawerOpen } onClose={ () => this.setState({ drawerOpen: false }) }>
                    <Drawer.Header>
                        <Drawer.Title>{ this.state.mealDetails.title }</Drawer.Title>
                        <Drawer.Actions>
                            <Button onClick={ () => this.setState({ drawerOpen: false }) }>Cancel</Button>
                            <Button onClick={ () => this.setState({ drawerOpen: false }) } appearance="primary">
                                Confirm
                            </Button>
                        </Drawer.Actions>
                    </Drawer.Header>
                    <Drawer.Body>
                        { this.state.mealDetails.description }
                    </Drawer.Body>
                </Drawer>
            </div>
        );
    }
}

export default App;

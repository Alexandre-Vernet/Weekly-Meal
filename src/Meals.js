import React from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";
import { Button, Drawer, Table } from "rsuite";

export class Meals extends React.Component {

    state = {
        weeklyMeal: [{
            id: '',
            title: '',
            description: ''
        }],
        drawerOpen: false,
        editMeal: {
            id: '',
            title: '',
            description: ''
        }
    };

    async componentDidMount() {
        await this.getWeekMenu();
    }

    async getWeekMenu() {
        const meals = [];

        // Get meals from firestore
        const querySnapshot = await getDocs(collection(db, "meals"));
        querySnapshot.forEach((doc) => {
            // Push meals and id
            meals.push({
                ...doc.data(),
                id: doc.id
            });
        });

        // Filter meals (remove duplicate, sort randomly)
        const filteredMeal = this.getMealForWeek(meals);

        this.setState({
            weeklyMeal: filteredMeal
        });
    }

    getMealForWeek(meals) {
        const weekDays = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];

        // Get meals for 7 days without duplicates and add week days for each element
        return meals.sort(() => Math.random() - 0.5).slice(0, 7).map((meals, index) => {
            return {
                ...meals,
                description: meals.description,
                title: meals.title,
                day: weekDays[index]
            };
        });
    }

    render() {
        return (
            <div>
                <h1>Repas de la semaine</h1>
                <Button appearance="primary" onClick={ () => this.getWeekMenu() }>Actualiser le menu</Button>

                <Table
                    data={ this.state.weeklyMeal }
                    bordered
                    cellBordered
                    autoHeight
                    affixHeader
                    affixHorizontalScrollbar
                >

                    <Table.Column width={ 100 }>
                        <Table.HeaderCell>Jour</Table.HeaderCell>
                        <Table.Cell dataKey="day"/>
                    </Table.Column>
                    <Table.Column width={ 500 }>
                        <Table.HeaderCell>Plat</Table.HeaderCell>
                        <Table.Cell dataKey="title"/>
                    </Table.Column>

                    <Table.Column width={ 300 }>
                        <Table.HeaderCell>Action</Table.HeaderCell>

                        {/*Action*/ }
                        <Table.Cell>
                            { meal => {
                                return (
                                    <div>
                                        {/*Edit meal*/ }
                                        <Button color="green" onClick={ () =>
                                            this.setState({
                                                drawerOpen: true,
                                                editMeal: meal
                                            })
                                        } appearance="primary">Détails</Button>
                                    </div>
                                );
                            } }
                        </Table.Cell>
                    </Table.Column>
                </Table>


                <Drawer open={ this.state.drawerOpen } onClose={ () => this.setState({ drawerOpen: false }) }>
                    <Drawer.Header>
                        <Drawer.Title>{ this.state.editMeal.title }</Drawer.Title>
                    </Drawer.Header>
                    <Drawer.Body>
                        { this.state.editMeal.description }
                    </Drawer.Body>
                </Drawer>
            </div>
        );
    }
}

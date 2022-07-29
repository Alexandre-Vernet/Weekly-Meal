import React from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";
import { Button, Drawer, Table } from "rsuite";

export class Meal extends React.Component {

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
        const filteredMeal = this.getMealForWeek(meal);

        this.setState({
            weeklyMeal: filteredMeal
        });
    }

    getMealForWeek(meal) {
        const weekDays = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];

        // Get meal for 7 days without duplicates and add week days for each element
        return meal.sort(() => Math.random() - 0.5).slice(0, 7).map((meal, index) => {
            return {
                ...meal,
                description: meal.description,
                title: meal.title,
                day: weekDays[index]
            };
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

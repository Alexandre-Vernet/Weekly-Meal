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
        },
        screenWidth: this.getWidthScreen()
    };

    async componentDidMount() {
        await this.getWeekMenu();
    }

    getWidthScreen() {
        return window.innerWidth;
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
                <Button appearance="primary" onClick={ () => this.getWeekMenu() }>Actualiser</Button>

                <Table
                    data={ this.state.weeklyMeal }
                    wordWrap="break-word"
                    bordered
                    cellBordered
                    autoHeight
                    affixHeader
                    affixHorizontalScrollbar
                    onRowClick={ (meal) => {
                        this.setState({
                            drawerOpen: true,
                            editMeal: meal
                        })
                    } }
                >

                    <Table.Column width={ 150 }>
                        <Table.HeaderCell>Jour</Table.HeaderCell>
                        <Table.Cell dataKey="day"/>
                    </Table.Column>
                    <Table.Column width={ 400 }>
                        <Table.HeaderCell>Plat</Table.HeaderCell>
                        <Table.Cell dataKey="title"/>
                    </Table.Column>
                </Table>


                <Drawer open={ this.state.drawerOpen } placement={ this.state.screenWidth > 600 ? 'right' : 'bottom' }
                        onClose={ () => this.setState({ drawerOpen: false }) }>
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

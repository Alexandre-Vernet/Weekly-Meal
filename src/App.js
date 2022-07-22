import React from "react";
import { Meal } from "./Meal";
import { Button, Drawer, Form, Input, Notification, Table } from 'rsuite';
import { collection, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "./firebase";

export class App extends React.Component {
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
        const filteredMeal = Meal.getMealForWeek(meal);

        this.setState({
            weeklyMeal: filteredMeal
        });
    }

    async updateMeal() {
        const editMeal = this.state.editMeal;

        // Update meal in firestore
        const mealRef = doc(db, "meal", editMeal.id);
        await updateDoc(mealRef, {
            title: editMeal.title,
            description: editMeal.description
        });

        // Update meal in state
        this.state.weeklyMeal.forEach((meal) => {
            if (meal.id === editMeal.id) {
                meal.title = editMeal.title;
                meal.description = editMeal.description;
            }
        });

        // Close drawer
        this.setState({ drawerOpen: false });

    }

    async deleteMeal(meal) {
        await deleteDoc(doc(db, "meal", meal.id));
    }

    displayNotification() {
        return (
            <Notification>
                <h1>coucou</h1>
            </Notification>
        )
    }

    render() {
        return (
            <div>
                <h1 onClick={ () => this.displayNotification() }>Repas de la semaine</h1>
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
                                        <Button color="orange" onClick={ () =>
                                            this.setState({
                                                drawerOpen: true,
                                                editMeal: meal
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
                        <Drawer.Title>{ this.state.editMeal.title }</Drawer.Title>
                        <Drawer.Actions>
                            <Button onClick={ () => {
                                this.updateMeal();
                            } } appearance="primary">
                                Confirm
                            </Button>
                        </Drawer.Actions>
                    </Drawer.Header>
                    <Drawer.Body>
                        { this.state.editMeal.description }
                        <h4>Modifier le plat</h4>
                        <Form>
                            <Form.Group>
                                <Form.ControlLabel>Plat</Form.ControlLabel>
                                <Input
                                    value={ this.state.editMeal.title }
                                    onChange={ (title) => this.setState({
                                        editMeal: {
                                            ...this.state.editMeal,
                                            title
                                        }
                                    })
                                    }/>
                            </Form.Group>

                            <Form.Group>
                                <Form.ControlLabel>Description</Form.ControlLabel>
                                <Input as="textarea" rows={ 5 }
                                       value={ this.state.editMeal.description }
                                       onChange={ (description) => this.setState({
                                           editMeal: {
                                               ...this.state.editMeal,
                                               description
                                           }
                                       })
                                       }/>
                            </Form.Group>
                        </Form>
                    </Drawer.Body>
                </Drawer>
            </div>
        );
    }
}

export default App;

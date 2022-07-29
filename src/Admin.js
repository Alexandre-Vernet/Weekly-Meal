import React from "react";
import { Button, Drawer, Form, Input, Table } from "rsuite";
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "./firebase";

export class Admin extends React.Component {
    state = {
        meals: [{
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
    }

    async componentDidMount() {
        await this.getWeekMenu();
    }

    async addMeal() {
        const newMeal = this.state.editMeal;

        addDoc(collection(db, "meals"), {
            title: newMeal.title,
            description: newMeal.description
        }).then((docRef) => {

            // Update meal in state
            this.state.meals.push({
                id: docRef.id,
                title: newMeal.title,
                description: newMeal.description,
            });

            // Clear state editMeal
            this.setState({
                editMeal: {
                    id: '',
                    title: '',
                    description: ''
                }
            });

            // Close drawer
            this.setState({ drawerOpen: false });
        })
    }

    async updateMeal() {
        const editMeal = this.state.editMeal;

        // Update meal in firestore
        const mealRef = doc(db, "meals", editMeal.id);
        await updateDoc(mealRef, {
            title: editMeal.title,
            description: editMeal.description
        });

        // Update meal in state
        this.state.meals.forEach((meal) => {
            if (meal.id === editMeal.id) {
                meal.title = editMeal.title;
                meal.description = editMeal.description;
            }
        });

        // Clear state editMeal
        this.setState({
            editMeal: {
                id: '',
                title: '',
                description: ''
            }
        });

        // Close drawer
        this.setState({ drawerOpen: false });
    }

    async deleteMeal(meal) {
        deleteDoc(doc(db, "meals", meal.id)).then(() => {
            // Remove meal from state
            this.state.meals.splice(this.state.meals.indexOf(meal), 1);
        });
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

        this.setState({
            meals: meals
        });
    }

    render() {
        return (
            <div>
                <Button appearance="primary" color="green" onClick={ () => this.setState({
                    drawerOpen: true
                }) }>Ajouter un repas</Button>


                <Table
                    data={ this.state.meals }
                    bordered
                    cellBordered
                    autoHeight
                    affixHeader
                    affixHorizontalScrollbar
                >
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
                                        <Button color="orange" onClick={ () =>
                                            this.setState({
                                                drawerOpen: true,
                                                editMeal: meal
                                            })
                                        } appearance="primary">Modifier</Button>

                                        {/*Delete meal*/ }
                                        <Button color="red" appearance="primary"
                                                onClick={ () => this.deleteMeal(meal) }> Supprimer </Button>
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
                            <Button onClick={ () => this.state.editMeal.id ? this.updateMeal() : this.addMeal() }
                                    appearance="primary">
                                Valider
                            </Button>
                        </Drawer.Actions>
                    </Drawer.Header>
                    <Drawer.Body>
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
        )
    }
}

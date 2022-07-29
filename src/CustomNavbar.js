import React from "react";
import { Nav, Navbar } from 'rsuite';
import { Link } from "react-router-dom";

export class CustomNavbar extends React.Component {

    render() {
        return (
            <Navbar>
                <Nav>
                    <Nav.Item>
                        <Link to="/">
                            <h4>Accueil</h4>
                        </Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Link to="/admin">
                            <h4>Admin</h4>
                        </Link>
                    </Nav.Item>
                </Nav>
            </Navbar>
        )
    }
}

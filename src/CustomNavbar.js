import React from "react";
import { Navbar, Nav } from 'rsuite';
import { Link } from "react-router-dom";

export class CustomNavbar extends React.Component {

    render() {
        return (
            <div>
                <Navbar>
                    <Nav>
                        <Link to="/">
                            Accueil
                        </Link>
                        <Link to="/admin">
                            Admin
                        </Link>
                    </Nav>
                </Navbar>
            </div>
        )
    }
}

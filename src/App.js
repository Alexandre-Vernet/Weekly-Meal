import React from "react";
import { Meals } from "./Meals";
import { HashRouter, Route, Routes } from "react-router-dom";
import { Admin } from "./Admin";
import { CustomNavbar } from "./CustomNavbar";

export class App extends React.Component {
    render() {
        return (
            <HashRouter>
                <CustomNavbar/>
                <Routes>
                    <Route path="/" element={ <Meals/> }/>
                    <Route path="/admin" element={ <Admin/> }/>
                </Routes>
            </HashRouter>
        )
    }
}

export default App;

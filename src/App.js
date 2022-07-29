import React from "react";
import { Meals } from "./Meals";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Admin } from "./Admin";
import { CustomNavbar } from "./CustomNavbar";

export class App extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <CustomNavbar/>
                <Routes>
                    <Route path="/" element={ <Meals/> }/>
                    <Route path="/admin" element={ <Admin/> }/>
                </Routes>
            </BrowserRouter>
        )
    }
}

export default App;

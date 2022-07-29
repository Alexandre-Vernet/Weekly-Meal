import React from "react";
import { Meal } from "./Meal";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Admin } from "./Admin";
import { CustomNavbar } from "./CustomNavbar";

export class App extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <CustomNavbar/>
                <Routes>
                    <Route path="/" element={ <Meal/> }/>
                    <Route path="/admin" element={ <Admin/> }/>
                </Routes>
            </BrowserRouter>
        )
    }
}

export default App;

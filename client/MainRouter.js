import React from "react";
import { Switch, Route } from "react-router-dom";
import PrivateRoute from "./auth/PrivateRoute";
import Signin from "./auth/Signin";
import Home from "./core/Home";
import Menu from "./core/Menu";

const MainRouter = () =>
    <div>
        <Menu />
        <Switch>
            <Route exact path="/" component={ Home } />
            <Route path="/signin" component={ Signin } />
        </Switch>
    </div>

export default MainRouter;
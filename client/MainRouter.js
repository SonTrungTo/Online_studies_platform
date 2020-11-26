import React from "react";
import { Switch, Route } from "react-router-dom";
import PrivateRoute from "./auth/PrivateRoute";
import Signin from "./auth/Signin";
import Signup from "./user/Signup";
import Home from "./core/Home";
import Menu from "./core/Menu";

const MainRouter = () =>
    <div>
        <Menu />
        <Switch>
            <Route exact path="/" component={ Home } />
            <Route path="/signin" component={ Signin } />
            <Route path="/signup" component={ Signup } />
        </Switch>
    </div>

export default MainRouter;
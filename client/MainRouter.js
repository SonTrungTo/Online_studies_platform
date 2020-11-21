import React from "react";
import { Switch, Route } from "react-router-dom";
import PrivateRoute from "./auth/PrivateRoute";
import Signin from "./auth/Signin";
import Home from "./core/Home";

const MainRouter = () =>
    <div>
        <Switch>
            <Route exact path="/" component={ Home } />
            <Route path="/signin" component={ Signin } />
        </Switch>
    </div>

export default MainRouter;
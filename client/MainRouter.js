import React from "react";
import { Switch, Route } from "react-router-dom";
import PrivateRoute from "./auth/PrivateRoute";
import Signin from "./auth/Signin";

const MainRouter = () =>
    <div>
        <Switch>
            <Route path="/signin" component={ Signin } />
        </Switch>
    </div>

export default MainRouter;
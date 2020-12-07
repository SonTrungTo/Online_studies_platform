import React from "react";
import { Switch, Route } from "react-router-dom";
import PrivateRoute from "./auth/PrivateRoute";
import Signin from "./auth/Signin";
import Signup from "./user/Signup";
import Users from "./user/Users";
import Profile from "./user/Profile";
import EditProfile from "./user/EditProfile";
import Home from "./core/Home";
import Menu from "./core/Menu";
import NewCourse from "./course/NewCourse";
import MyCourses from "./course/MyCourses";

const MainRouter = () =>
    <div>
        <Menu />
        <Switch>
            <Route exact path="/" component={ Home } />
            <Route path="/signin" component={ Signin } />
            <Route path="/signup" component={ Signup } />
            <PrivateRoute path="/users" component={ Users } />
            <PrivateRoute path="/user/edit/:userId" component={ EditProfile } />
            <PrivateRoute path="/user/:userId" component={ Profile } />
            <PrivateRoute path="/teach/courses" component={ MyCourses } />
            <PrivateRoute path="/teach/course/new" component={ NewCourse } />
        </Switch>
    </div>

export default MainRouter;
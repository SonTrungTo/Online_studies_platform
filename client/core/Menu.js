import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import SchoolIcon from "@material-ui/icons/School";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import auth from "../auth/auth-helper";
import { Link, withRouter } from "react-router-dom";

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1
    }
}));

const Menu = withRouter(({history}) => {
    const classes = useStyles();

    const isActive = (history, path) => {
        if (history.location.pathname === path) {
            return {color: '#e042ff'};
        } else {
            return {color: '#ffffff'};
        }
    };

    return (
        <div className={ classes.root }>
            <AppBar position="static">
                <Toolbar>
                    <Link>
                        <IconButton>
                            <SchoolIcon />
                        </IconButton>
                    </Link>
                </Toolbar>
            </AppBar>
        </div>
    );
});

export default Menu;
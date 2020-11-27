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
    },
    homeButton: {
        marginRight: theme.spacing(2)
    },
    title: {
        flexGrow: 1
    }
}));

const Menu = withRouter(({history}) => {
    const classes = useStyles();

    const isActive = (history, path) => {
        if (history.location.pathname === path) {
            return {color: '#ffffff'};
        } else {
            return {color: '#000000'};
        }
    };

    return (
        <div className={ classes.root }>
            <AppBar position="static">
                <Toolbar>
                    <Link to="/">
                        <IconButton style={ isActive(history, "/") }
                        className={ classes.homeButton }
                        edge="start" aria-label="Home" color="inherit">
                            <SchoolIcon />
                        </IconButton>
                    </Link>
                    <Typography variant="h6" className={ classes.title }>
                        SONSERA
                    </Typography>
                    <Link to="/users">
                        <Button style={ isActive(history, "/users") }>
                            Users
                        </Button>
                    </Link>
                    { !auth.isAuthenticated() && (
                        <span>
                            <Link to="/signin">
                                <Button style={ isActive(history, "/signin") }>
                                    Sign In
                                </Button>
                            </Link>
                            <Link to="/signup">
                                <Button style={ isActive(history, "/signup") }>
                                    Sign Up
                                </Button>
                            </Link>
                        </span>
                    ) }
                    { auth.isAuthenticated() && (
                        <span>
                            <Link to={ "/user/" +
                        auth.isAuthenticated().user._id }>
                                <Button style={ isActive(history, 
                        `/user/${auth.isAuthenticated().user._id}`) }>
                                    Profile
                                </Button>
                            </Link>
                            <Button onClick={ () => auth.clearJWT(() => {
                                history.push("/");
                            }) }
                            color="default">
                                Sign Out
                            </Button>
                        </span>
                    ) }
                </Toolbar>
            </AppBar>
        </div>
    );
});

export default Menu;
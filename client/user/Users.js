import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { list } from "../user/api-user";
import auth from "../auth/auth-helper";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ArrowForward from "@material-ui/icons/ArrowForward";
import { makeStyles, fade } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import { values } from "lodash";

const useStyles = makeStyles(theme => ({
    root: {
        boxShadow: '0px 3px 4px 2px rgba(231, 90, 90, 1)'
    },
    title: {
        padding: `${theme.spacing(3)}px ${theme.spacing(2.5)}px
        ${theme.spacing(2)}px`,
        color: theme.palette.primary.dark
    },
    avatar: {
        width: 60,
        height: 60,
        margin: 10
    },
    search: {
        display: 'flex',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.primary.light, 0.15),
        "&:hover": {
            backgroundColor: fade(theme.palette.primary.light, 0.25)
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto'
        }
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%'
    }
}));

export default function Users() {
    const classes = useStyles();
    const [users, setUsers] = useState([]);
    const [newUser, setNewUser] = useState('');
    const jwt = auth.isAuthenticated();
    const usersToShow = newUser.length === 0 ? users :
    users.filter(user => user.name.toLowerCase().includes(newUser.toLowerCase()));

    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;

        list({t: jwt.token}, signal).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setUsers(data);
            }
        });

        return () => {
            abortController.abort();
        }
    }, []);

    const handleChangeUser = event => {
        setNewUser(event.target.value);
    };

    return (
        <Paper elevation={ 4 } className={ classes.root }>
            
            <Typography variant="h6" className = { classes.title }>
                All Users
            </Typography>
            <span className={ classes.search }>
                <span className={ classes.searchIcon }>
                    <SearchIcon />
                </span>
                <InputBase placeholder="Search..." 
                value={ newUser } onChange={ handleChangeUser } />
            </span>
            <List dense>
                { usersToShow.map(user => {
                    const photoUrl
                    = `/api/users/photo/${user._id}${new Date().getTime()}`;
                    return (
                    <Link to={"/user/" + user._id} key={ user._id }>
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar
                                src={ photoUrl } className={ classes.avatar } />
                            </ListItemAvatar>
                            <ListItemText primary={ user.name } />
                            <ListItemSecondaryAction>
                                <IconButton>
                                    <ArrowForward />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    </Link>
                    );
                }
                ) }
            </List>
        </Paper>
    );
};
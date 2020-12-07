import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import Edit from "@material-ui/icons/Edit";
import DeleteProfile from "./DeleteProfile";
import { read } from "./api-user";
import Divider from "@material-ui/core/Divider";
import auth from "../auth/auth-helper";
import { Link } from "react-router-dom";
import { Icon, Typography } from "@material-ui/core";
import ErrorIcon from "@material-ui/icons/Error";

const useStyles = makeStyles(theme => ({
    error: {
        marginRight: theme.spacing(2)
    },
    bigAvatar: {
        width: 60,
        height: 60,
        margin: 10
    },
    title: {
        padding: `${theme.spacing(3)}px ${theme.spacing(2.5)}px
        ${theme.spacing(2)}px`,
        color: theme.palette.primary.dark
    }
}));

export default function Profile(props) {
    const classes = useStyles();
    const [values, setValues] = useState({
        profileUser: {},
        error: ''
    });
    const jwt = auth.isAuthenticated();
    const photoUrl
    = values.profileUser._id ?
    `/api/users/photo/${values.profileUser._id}?${new Date().getTime()}` : 
    `/api/users/defaultPhoto`;

    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;

        read({
            userId: props.match.params.userId
        }, signal).then(data => {
            if (data.error) {
                console.log(data.error);
                setValues({...values, error: data.error});
            } else {
                setValues({profileUser: data, error: ''});
            }
        });
    }, [props.match.params.userId]);

    return (
        <Paper elevation={ 4 }>
            <Typography variant="h6" className={ classes.title }>
                Profile
            </Typography>
            <List>
                <ListItem>
                    <ListItemAvatar>
                        <Avatar
                        src={ photoUrl } className={ classes.bigAvatar } />
                    </ListItemAvatar>
                    <ListItemText primary={ values.profileUser.name }
                    secondary={ values.profileUser.email } />
                    { jwt.user && 
                    jwt.user._id === values.profileUser._id && (
                    <ListItemSecondaryAction>
                        <Link to={ "/user/edit/" + jwt.user._id }>
                            <IconButton color="secondary"
                            aria-label="Edit">
                                <Edit />
                            </IconButton>
                        </Link>
                        <DeleteProfile userId={ jwt.user._id } history={ props.history } />
                    </ListItemSecondaryAction>
                    ) }
                </ListItem>
                { values.error &&
                <ListItem>
                    <ListItemText primary={
                        <Typography component="p" color="error">
                            <Icon color="error" className={ classes.error }>
                                <ErrorIcon />
                            </Icon>
                        </Typography>
                    } />
                </ListItem> }
                <ListItem>
                    <ListItemText primary={ values.profileUser.about } />
                </ListItem>
                <Divider />
                <ListItem>
                    <ListItemText primary={ 
                        "Joined: " + new Date(values.profileUser.created).toDateString()
                    } />
                </ListItem>
            </List>
        </Paper>
    );
}
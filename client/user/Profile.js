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
import Delete from "@material-ui/icons/Delete";
import { read } from "./api-user";
import Divider from "@material-ui/core/Divider";
import auth from "../auth/auth-helper";
import { Link } from "react-router-dom";

const useStyles = makeStyles(theme => ({

}));

export default function Profile(props) {
    const classes = useStyles();
    const [values, setValues] = useState({
        profileUser: {},
        error: ''
    });
    const jwt = auth.isAuthenticated();
    const photoUrl
    = `/api/users/photo/${values.profileUser._id}?${new Date().getTime()}`;

    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;

        read({
            userId: props.match.params.userId
        }, {t: jwt.token}, signal).then(data => {
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
            <List>
                <ListItem>
                    <ListItemAvatar>
                        <Avatar
                        src={ photoUrl } />
                    </ListItemAvatar>
                    <ListItemText primary={ values.profileUser.name }
                    secondary={ values.profileUser.email } />
                    { jwt.user && (
                    <ListItemSecondaryAction>
                        
                    </ListItemSecondaryAction>
                    ) }
                </ListItem>
            </List>
        </Paper>
    );
}
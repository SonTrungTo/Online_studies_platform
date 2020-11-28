import React, { useState, useEffect } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import CloudUpload from "@material-ui/icons/CloudUpload";
import Icon from "@material-ui/core/Icon";
import ErrorIcon from "@material-ui/icons/Error";
import { Redirect } from "react-router-dom";
import { read, update } from "./api-user";
import auth from "../auth/auth-helper";

const useStyles = makeStyles(theme => ({
    card: {
        maxWidth: 600,
        margin: 'auto',
        marginTop: theme.spacing(5)
    },
    title: {
        padding: `${theme.spacing(3)}px ${theme.spacing(2.5)}px
        ${theme.spacing(2)}px`,
        color: theme.palette.primary.dark,
        textAlign: 'center'
    },
    textField: {
        textAlign: 'center'
    }
}));

export default function EditProfile(props) {
    const classes = useStyles();
    const [values, setValues] = useState({
        profileUser: {},
        error: '',
        redirectToProfile: false
    });
    const jwt = auth.isAuthenticated();
    useEffect(() => {
        const abortController = new AbortController();
        const signal;
    }, []);

    return (
        <Card className={ classes.card }>
            <CardContent>
                <Typography variant="h6" className={ classes.title }>
                    Edit Profile
                </Typography>
                <div className={ classes.textField }>
                    <TextField label="Name" id="name" />
                </div>
            </CardContent>
        </Card>
    );
}

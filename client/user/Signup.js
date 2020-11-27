import React, { useState } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Icon from "@material-ui/core/Icon";
import Error from "@material-ui/icons/Error";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core/styles";
import { create } from "./api-user";
import { Link } from "react-router-dom";

const useStyles = makeStyles(theme => ({
    card: {
        maxWidth: 600,
        margin: 'auto',
        marginTop: theme.spacing(5)
    },
    title: {
        textAlign: 'center',
        padding: `${theme.spacing(3)}px ${theme.spacing(2.5)}px
        ${theme.spacing(2)}px`,
        color: theme.palette.primary.dark
    },
    textField: {
        textAlign: 'center'
    },
    submit: {
        margin: 'auto',
        backgroundColor: theme.palette.secondary.dark,
        "&:hover": {
            backgroundColor: theme.palette.openTitle
        },
        marginTop: theme.spacing(3),
        color: theme.palette.primary.contrastText
    },
    error: {
        marginRight: theme.spacing(2)
    },
    signInButton: {
        backgroundColor: theme.palette.secondary.dark,
        "&:hover": {
            backgroundColor: theme.palette.openTitle
        },
        color: theme.palette.primary.contrastText
    }
}));

export default function Signup() {
    const classes = useStyles();
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        retypePassword: '',
        open: false,
        error: ''
    });

    const handleChange = name => event => {
        setValues({...values, [name]: event.target.value});
    };

    const clickSubmit = () => {
        const user = {
            name: values.name || undefined,
            email: values.email || undefined,
            password: values.password || undefined,
            retypePassword: values.retypePassword || undefined
        };

        create(user).then(data => {
            if (data.error) {
                console.log(data.error);
                setValues({...values, error: data.error});
            } else {
                setValues({...values, error: '', open: true});
            }
        });
    };

    return (
        <div>
            <Card className={ classes.card }>
                <CardContent>
                    <Typography variant="h6" className={ classes.title }>
                        Sign Up
                    </Typography>
                    <div className={ classes.textField }>
                        <TextField label="Name" margin="normal" id="name"
                        value={ values.name } onChange={ handleChange("name") } />
                        <br />
                        <TextField label="Email" margin="normal" id="email"
                        value={ values.email }
                        onChange={ handleChange("email") } />
                        <br />
                        <TextField label="Password" margin="normal"
                        id="password" value={ values.password }
                        onChange={ handleChange("password") }
                        type="password" />
                        <br />
                        <TextField label="Confirm password" margin="normal"
                        id="retypePassword" value={ values.retypePassword }
                        onChange={ handleChange("retypePassword") }
                        type="password" />
                        <br />
                    </div>
                    { values.error && (
                        <Typography component="p" color="error">
                            <Icon color="error" className={ classes.error }>
                                <Error />
                            </Icon>
                            { values.error }
                        </Typography>
                    ) }
                    <CardActions>
                        <Button variant="contained" onClick={ clickSubmit }
                        className={ classes.submit }>
                            Submit
                        </Button>
                    </CardActions>
                </CardContent>
            </Card>
            <Dialog open={ values.open } disableBackdropClick={ true }>
                <DialogContent>
                    <DialogTitle>
                        Account created!
                    </DialogTitle>
                    <DialogContentText>
                        New account has been created!
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Link to="/signin">
                        <Button className={ classes.signInButton }
                        variant="contained">
                            Sign In
                        </Button>
                    </Link>
                </DialogActions>
            </Dialog>
        </div>
    );
}
import React, { useState } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Icon from "@material-ui/core/Icon";
import Error from "@material-ui/icons/Error";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { signin } from "./api-auth";
import auth from "./auth-helper";
import { Redirect } from "react-router-dom";

const useStyles = makeStyles(theme => ({
    card: {
        maxWidth: 600,
        margin: 'auto',
        marginTop: theme.spacing(5)
    },
    title: {
        padding: `${theme.spacing(3)}px ${theme.spacing(1.5)}px \
            ${theme.spacing(2)}px`,
        textAlign: 'center',
        color: theme.palette.primary.dark
    },
    textField: {
        textAlign: 'center'
    },
    error: {
        marginRight: theme.spacing(2)
    },
    submit: {
        margin: 'auto',
        backgroundColor: theme.palette.secondary.dark,
        marginTop: theme.spacing(3),
        '&:hover': {
            backgroundColor: theme.palette.openTitle
        }
    }
}));

export default function Signin(props) {
    const classes = useStyles();
    const [values, setValues] = useState({
        email: '',
        password: '',
        error: '',
        redirectToReferrer: false
    });

    const handleChange = name => event => {
        setValues({...values, [name]: event.target.value});
    };

    const clickSubmit = () => {
        const user = {
            email: values.email || undefined,
            password: values.password || undefined
        };

        signin(user).then(data => {
            if (data.error) {
                setValues({...values, error: data.error});
            } else {
                auth.authenticate(data, () => {
                    setValues({...values, error: '', redirectToReferrer: true});
                });
            }
        });
    };

    const { from } = props.location.state || { from: { pathname: '/' } };
    const { redirectToReferrer } = values;
    if (redirectToReferrer) {
        return <Redirect to={ from } />
    }

    return (
        <Card className={ classes.card }>
            <CardContent>
                <Typography variant="h6" className={ classes.title }>
                    Sign In
                </Typography>
                <div className={ classes.textField }>
                    <TextField margin="normal" value={ values.email }
                    onChange={ handleChange("email") }
                    name="Email" label="Email" id="email" />
                    <br />
                    <TextField margin="normal" value={ values.password }
                    onChange={ handleChange("password") } type="password"
                    name="Password" label="Password" id="password" />
                    <br />
                </div>
                { values.error &&
                <Typography color="error" component="p">
                    <Icon color="error" className={ classes.error }>
                        <Error />
                    </Icon>
                    { values.error }
                </Typography> }
                <CardActions>
                    <Button onClick={ clickSubmit } className={ classes.submit }
                    variant="contained" color="primary">
                        Submit
                    </Button>
                </CardActions>
            </CardContent>
        </Card>
    );
};
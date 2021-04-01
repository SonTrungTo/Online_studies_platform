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
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";

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
    },
    error: {
        marginRight: theme.spacing(2)
    },
    photo: {
        width: 200,
        height: 200
    },
    fileInput: {
        display: 'none'
    },
    uploadButton: {
        backgroundColor: theme.palette.secondary.dark,
        "&:hover": {
            backgroundColor: theme.palette.openTitle
        },
        color: theme.palette.primary.contrastText
    },
    cloudUpload: {
        marginLeft: theme.spacing(1),
        paddingBottom: theme.spacing(0.5)
    },
    filename: {
        marginTop: theme.spacing(1)
    },
    submitButton: {
        backgroundColor: theme.palette.secondary.dark,
        "&:hover": {
            backgroundColor: theme.palette.openTitle
        },
        color: theme.palette.primary.contrastText,
        margin: 'auto',
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1)
    },
    subHeading: {
        marginTop: theme.spacing(2),
        color: theme.palette.primary.main
    }
}));

export default function EditProfile() {
    const classes = useStyles();
    const [profileUser, setProfileUser] = useState({});
    const [errorMessage, setErrorMessage] = useState('');
    const [redirectToProfile, setRedirectToProfile] = useState(false);
    const jwt = auth.isAuthenticated();
    const photoUrl
        = `/api/users/photo/${jwt.user._id}?${new Date().getTime()}`;
    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;

        read({
            userId: jwt.user._id
        }, signal).then(data => {
            if (data.error) {
                setErrorMessage(data.error);
            } else {
                setProfileUser(data);
            }
        });

        return () => {
            abortController.abort();
        };

    }, []);

    const handleChange = name => event => {
        const value = name === "photo" ? 
            event.target.files[0] : event.target.value;
        setProfileUser({...profileUser, [name]: value});
    };

    const handleChecked = (event, checked) => {
        setProfileUser({...profileUser, 'educator': checked});
    };

    const clickSubmit = () => {
        const form = new FormData();
        profileUser.name && form.append('name', profileUser.name);
        profileUser.email && form.append('email', profileUser.email);
        profileUser.password
        && form.append('password', profileUser.password);
        profileUser.retypePassword
        && form.append('retypePassword', profileUser.retypePassword);
        profileUser.about && form.append('about', profileUser.about);
        profileUser.photo && form.append('photo', profileUser.photo);
        form.append('educator', profileUser.educator);

        update({
            userId: jwt.user._id
        }, { t: jwt.token }, form).then(data => {
            if (data.error) {
                setErrorMessage(data.error);
            } else {
                auth.updateUser(data, () => {
                    setRedirectToProfile(true);
                });
            }
        });
    };

    if (redirectToProfile) {
        return <Redirect to={"/user/" + jwt.user._id} />
    }

    return (
        <Card className={ classes.card }>
            <CardContent>
                <Typography variant="h6" className={ classes.title }>
                    Edit Profile
                </Typography>
                <div className={ classes.textField }>
                    <div>
                        <img className={ classes.photo }
                        src={ photoUrl } />
                    </div>
                    <input type="file" accept="image/*"
                    className={ classes.fileInput }
                    onChange={ handleChange("photo") }
                    id="input-for-photo" />
                    <label htmlFor="input-for-photo">
                        <Button variant="contained"
                        className={ classes.uploadButton }
                        component="span">
                            Upload <CloudUpload className={ classes.cloudUpload }/>
                        </Button>
                    </label>
                    <div className={ classes.filename }>
                        { profileUser.photo ? profileUser.photo.name : "" }
                    </div>
                    <br />
                    <TextField label="Name" id="name"
                    value={ profileUser.name }
                    onChange={ handleChange("name") } margin="normal" />
                    <br />
                    <TextField label="Email" id="email"
                    value={ profileUser.email }
                    onChange={ handleChange("email") } margin="normal" />
                    <br />
                    <TextField label="About" id="about"
                    value={ profileUser.about }
                    onChange={ handleChange("about") } margin="normal"
                    multiline rows={ 2 } />
                    <br />
                    <TextField label="Password" id="password"
                    value={ profileUser.password } type="password"
                    onChange={ handleChange("password") } margin="normal" />
                    <br />
                    <TextField label="Confirm password" id="retypePassword"
                    value={ profileUser.retypePassword } type="password"
                    onChange={ handleChange("retypePassword") } />
                    <br />
                    <Typography variant="subtitle1" className={ classes.subHeading }>
                        I am an Educator
                    </Typography>
                    <FormControlLabel control={
                        <Switch className={{
                            checked: classes.checked,
                            bar: classes.bar
                        }}
                        checked={ Boolean(profileUser.educator) }
                        onChange={ handleChecked }
                        />
                    }
                    label={ profileUser.educator ? "Yes" : "No" } />
                    <br />
                </div>
                { errorMessage &&
                <Typography component="p" color="error">
                    <Icon color="error" className={ classes.error }>
                        <ErrorIcon />
                    </Icon>
                    { errorMessage }
                </Typography> }
            </CardContent>
            <CardActions>
                <Button className={ classes.submitButton }
                variant="contained" onClick={ clickSubmit }>
                    Submit
                </Button>
            </CardActions>
        </Card>
    );
}

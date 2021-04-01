import React, { useState } from "react";
import { create } from "./api-course";
import auth from "../auth/auth-helper";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import Icon from "@material-ui/core/Icon";
import Error from "@material-ui/icons/Error";
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { Redirect, Link } from "react-router-dom";

const useStyles = makeStyles(theme => ({
    card: {
        maxWidth: 600,
        margin: 'auto',
        marginTop: theme.spacing(5)
    },
    title: {
        padding: `${theme.spacing(3)}px ${theme.spacing(2.5)}px
        ${theme.spacing(2)}px`,
        color: theme.palette.openTitle,
        textAlign: 'center'
    },
    textField: {
        textAlign: 'center'
    },
    error: {
        marginRight: theme.spacing(2)
    },
    submit: {
        backgroundColor: theme.palette.secondary.dark,
        "&:hover": {
            backgroundColor: theme.palette.openTitle
        },
        color: theme.palette.primary.contrastText
    },
    fileInput: {
        display: 'none'
    },
    uploadIcon: {
        marginLeft: theme.spacing(1),
        paddingBottom: theme.spacing(0.5)
    },
    uploadButton: {
        backgroundColor: theme.palette.secondary.dark,
        "&:hover": {
            backgroundColor: theme.palette.openTitle
        },
        color: theme.palette.primary.contrastText
    },
    fileName: {
        marginTop: theme.spacing(1)
    },
    listOfButtons: {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: theme.spacing(5)
    }
}));

export default function NewCourse() {
    const classes = useStyles();
    const jwt = auth.isAuthenticated();
    const [values, setValues] = useState({
        name: '',
        description: '',
        image: '',
        category: '',
        redirect: false,
        error: ''      
    });

    const handleChange = name => event => {
        const value = name === "image" ?
        event.target.files[0] : event.target.value;
        setValues({ ...values, [name]: value });
    };
    const clickSubmit = () => {
        const form = new FormData();
        values.name && form.append('name', values.name);
        values.description && form.append('description', values.description);
        values.image && form.append('image', values.image);
        values.category && form.append('category', values.category);

        create({
            userId: jwt.user._id
        }, { t: jwt.token }, form).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setValues({ ...values, error: '', redirect: true });
            }
        });
    };

    const { redirect } = values;
    if ( redirect ) {
        return <Redirect to="/teach/courses" />;
    }

    return (
        <Card className={ classes.card }>
            <CardContent>
                <Typography variant="h6" className={ classes.title }>
                    New Course
                </Typography>
                <div className={ classes.textField }>
                    <input accept="image/*" type="file"
                    className={ classes.fileInput }
                    onChange={ handleChange('image') }
                    id='input-image-tag' />
                    <label htmlFor='input-image-tag'>
                        <Button variant="contained" component="span"
                        className={ classes.uploadButton }>
                            Upload <CloudUploadIcon
                            className={ classes.uploadIcon } />
                        </Button>
                    </label>
                    <div className={ classes.fileName }>
                        { values.image ? values.image.name : "" }
                    </div>
                    <br />
                    <TextField label='Name' margin='normal'
                    value={ values.name } onChange={ handleChange('name') }
                    id="name" />
                    <br />
                    <TextField label='Description' margin='normal'
                    value={ values.description }
                    onChange={ handleChange('description') }
                    id="description"
                    multiline
                    rows="2" />
                    <br />
                    <TextField label='Category' margin='normal'
                    value={ values.category }
                    onChange={ handleChange('category') }
                    id="category" />
                    <br />
                </div>
                { values.error &&
                <Typography component="p" color="error">
                    <Icon color="error" className={ classes.error }>
                        <Error />
                    </Icon>
                    { values.error }
                </Typography> }
                <CardActions className={ classes.listOfButtons }>
                    <Link to="/teach/courses">
                        <Button variant="contained"
                        color="primary">
                            Cancel
                        </Button>
                    </Link>
                    <Button variant="contained" className={ classes.submit }
                    onClick={ clickSubmit }>
                        Submit
                    </Button>
                </CardActions>
            </CardContent>
        </Card>
    );
}
import React, { useEffect, useState } from "react";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import { Redirect, Link } from "react-router-dom";
import { listByInstructor } from "./api-course";
import Button from "@material-ui/core/Button";
import AddBox from "@material-ui/icons/AddBox";
import Divider from "@material-ui/core/Divider";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import auth from "../auth/auth-helper";

const useStyles = makeStyles(theme => ({
    title: {
        padding: `${theme.spacing(3)}px ${theme.spacing(2.5)}px
        ${theme.spacing(2)}px`,
        color: theme.palette.openTitle
    },
    courseName: {
        color: theme.palette.primary.dark
    },
    addCourse: {
        backgroundColor: theme.palette.secondary.dark,
        "&:hover": {
            backgroundColor: theme.palette.openTitle
        },
        color: theme.palette.primary.contrastText
    },
    courseAvatar: {
        width: 80,
        height: 80,
        margin: 10
    },
    addBoxIcon: {
        marginRight: theme.spacing(1)
    },
    link: {
        textDecoration: 'none'
    },
    addButton: {
        float: 'right'
    }
}));

export default function MyCourses() {
    const classes = useStyles();
    const [courses, setCourses] = useState([]);
    const [redirectToSignin, setRedirectToSignin] = useState(false);
    const jwt = auth.isAuthenticated();

    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;

        listByInstructor({
            userId: jwt.user._id
        }, { t: jwt.token }, signal).then(data => {
            if (data.error) {
                setRedirectToSignin(true);
            } else {
                setCourses(data);
            }
        });

        return function cleanUp() {
            abortController.abort();
        };
    }, []);

    if (redirectToSignin) {
        return <Redirect to="/signin" />;
    }

    return (
        <Paper elevation={ 4 }>
            <List>
                <Typography variant="h6" className={ classes.title }>
                    My Courses
                <span className={ classes.addButton }>
                    <Link to="/teach/course/new">
                            <Button variant="contained"
                            className={ classes.addCourse }>
                                <AddBox
                                className={ classes.addBoxIcon } /> NEW COURSE
                            </Button>
                    </Link>
                </span>
                </Typography>
                { courses.map( course => {
                    const imageUrl = `/api/courses/photo/${course._id}?${new Date().getTime()}`;
                    return (
                        <Link to={ "/teach/course/" + course._id }
                        key={ course._id } className={ classes.link }>
                            <ListItem button>
                                <ListItemAvatar>
                                    { course.image &&
                                    <img
                                    src={ imageUrl }
                                    className={ classes.courseAvatar } /> }
                                </ListItemAvatar>
                                <ListItemText primary={ course.name }
                                secondary={ course.description }
                                className={ classes.courseName } />
                            </ListItem>
                            <Divider />
                        </Link>
                    );
                }
                ) }
            </List>
        </Paper>
    );
}
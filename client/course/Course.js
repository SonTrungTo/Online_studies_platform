import React, { useState, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import { makeStyles } from "@material-ui/core/styles";
import { read } from "./api-course";
import Icon from "@material-ui/core/Icon";
import Error from "@material-ui/icons/Error";
import CardActionArea from "@material-ui/core/CardActionArea";
import IconButton from "@material-ui/core/IconButton";
import Delete from "@material-ui/icons/Delete";
import Edit from "@material-ui/icons/Edit";
import { Link } from "react-router-dom";
import Chip from "@material-ui/core/Chip";
import Divider from "@material-ui/core/Divider";
import auth from "../auth/auth-helper";

const useStyles = makeStyles(theme => ({
    error: {
        marginRight: theme.spacing(2)
    },
    link: {
        textDecoration: 'none'
    },
    courseName: {
        color: theme.palette.primary.dark,
        fontWeight: 'bold'
    },
    courseInstructor: {
        color: theme.palette.secondary.dark
    },
    flex: {
        display: 'flex',
        marginBottom: 20
    },
    courseImg: {
        height: '25%',
        width: '25%',
        marginLeft: theme.spacing(2)
    },
    description: {
        marginLeft: theme.spacing(5),
        marginTop: theme.spacing(2)
    },
    subHeader: {
        margin: 10,
        color: theme.palette.secondary.contrastText
    },
    chip: {
        marginTop: theme.spacing(1)
    }
}));

export default function Course( props ) {
    const classes = useStyles();
    const [course, setCourse] = useState({
        instructor: {}
    });
    const [error, setError] = useState('');
    const imageUrl = `/api/courses/photo/${ props.match.params.courseId }?${ new Date().getTime() }`;

    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;

        read({
            courseId: props.match.params.courseId
        }, signal).then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setCourse(data);
            }
        });

        return () => {
            abortController.abort();
        };

    }, [ props.match.params.courseId ]);

    return (
        <Card>
            <CardHeader
            title={
                <div className={ classes.courseName }>
                    { course.name }
                </div>
            }
            subheader={ 
                <div className={ classes.subHeader }>
                    by <Link to={ "/user/" + course.instructor._id }
                    className={ classes.link }>
                        <span className={ classes.courseInstructor }>
                        { course.instructor.name }
                        </span>
                    </Link>
                    <br />
                    <Chip size="small"
                    label={ course.category }
                    color="primary"
                    clickable
                    className={ classes.chip } />
                </div>
            }
            action={
                <React.Fragment>
                    { auth.isAuthenticated().user &&
                    auth.isAuthenticated().user._id === course.instructor._id &&
                    <span>
                        <Link>
                        
                        </Link>
                    </span>
                    }
                </React.Fragment>
            } />
            <div className={ classes.flex }>
                <img src={ imageUrl }
                className={ classes.courseImg } />
                <div className={ classes.description }>
                    <Typography variant="body1">
                        { course.description }
                    </Typography>
                    { error &&
                    <Typography component="p" color="error">
                        <Icon color="error" className={ classes.error }>
                            <Error />
                        </Icon>
                        { error }
                    </Typography>
                    }
                </div>
            </div>
            <Divider />
        </Card>
    );
};
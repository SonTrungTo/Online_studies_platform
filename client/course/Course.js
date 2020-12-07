import React, { useState, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import { makeStyles } from "@material-ui/core/styles";
import { read } from "./api-course";
import Icon from "@material-ui/core/Icon";
import Error from "@material-ui/icons/Error";
import CardActionArea from "@material-ui/core/CardActionArea";
import IconButton from "@material-ui/core/IconButton";
import Delete from "@material-ui/icons/Delete";
import Edit from "@material-ui/icons/Edit";
import { Link } from "react-router-dom";

const useStyles = makeStyles(theme => ({
    error: {
        marginRight: theme.spacing(2)
    },
    link: {
        textDecoration: 'none'
    },
    courseName: {
        color: theme.palette.primary.dark,
        fontWeight: 'fontWeightBold'
    },
    courseInstructor: {
        color: theme.palette.primary.light
    }
}));

export default function Course( props ) {
    const classes = useStyles();
    const [course, setCourse] = useState({});
    const [error, setError] = useState('');
    const imageUrl = `/api/courses/${ props.match.params.courseId }?${ new Date().getTime() }`;

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
                <div>
                    <Link to={ "/user/" + course.instructor._id }
                    className={ classes.link }>
                        By <span className={ classes.courseInstructor }>
                        { course.instructor.name }
                        </span>
                    </Link>
                </div>
            } />
            <CardMedia image={ imageUrl }
            title={ course.name } />
        </Card>
    );
};
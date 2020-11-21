import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import moocImg from "../assets/images/mooc.png";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    card: {
        maxWidth: '50%',
        margin: 'auto',
        marginTop: theme.spacing(5)
    },
    root: {
        flexGrow: 1,
        margin: 30
    },
    title: {
        padding: `${theme.spacing(3)}px ${theme.spacing(2.5)}px
            ${theme.spacing(2)}px`,
        color: theme.palette.openTitle
    },
    media: {
        minHeight: 450
    },
    introText: {
        textAlign: 'center'
    }
}));

export default function Home() {
    const classes = useStyles();

    return (
        <div className={ classes.root }>
            <Card className={ classes.card }>
                <Typography variant="h6" className={ classes.title }>
                    HOME PAGE
                </Typography>
                <CardMedia image={ moocImg }
                component="img" className={ classes.media } />
                <CardContent>
                    <Typography component="p" className={ classes.introText }>
                        A webpage for general science courses,
                        having mainly courses in Software development,
                        Computer Science, Economics and Mathematics.
                    </Typography>
                </CardContent>
            </Card>
        </div>
    );
};
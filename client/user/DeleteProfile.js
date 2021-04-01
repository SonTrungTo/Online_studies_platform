import React, { useState } from "react";
import { remove } from "./api-user";
import IconButton from "@material-ui/core/IconButton";
import Delete from "@material-ui/icons/Delete";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import auth from "../auth/auth-helper";
import Icon from "@material-ui/core/Icon";
import ErrorIcon from "@material-ui/icons/Error";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";

const useStyles = makeStyles(theme => ({
    error: {
        marginRight: theme.spacing(2)
    }
}));

DeleteProfile.propTypes = {
    userId: PropTypes.string.isRequired,
    history: PropTypes.object.isRequired
};

export default function DeleteProfile(props) {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [openSecondary, setOpenSecondary] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const jwt = auth.isAuthenticated();

    const clickOpen = _event => {
        setOpen(true);
    };

    const clickClose = _event => {
        setOpen(false);
    };

    const clickOpenSecondary = _event => {
        setOpenSecondary(false);
        props.history.push("/");
    };

    const clickDelete = id => _event => {
        remove({
            userId: id
        }, {t: jwt.token}).then(data => {
            if (data.error) {
                setErrorMessage(data.error);
            } else {
                auth.clearJWT(() => {
                    setOpen(false);
                    setOpenSecondary(true);
                });
            }
        });
    };

    return (
        <span>
            <IconButton color="primary" onClick={ clickOpen }>
                <Delete />
            </IconButton>
            <Dialog open={ open } disableBackdropClick>
                <DialogTitle>
                    Are you sure you want to delete your profile?
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Your profile will be deleted.
                        { errorMessage &&
                        <Typography component="p" color="error">
                            <Icon color="error" className={ classes.error }>
                                <ErrorIcon />
                            </Icon>
                            { errorMessage }
                        </Typography> }
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button color="primary" onClick={ clickClose }
                    variant="contained">
                        Cancel
                    </Button>
                    <Button color="secondary" onClick={ clickDelete(props.userId) }
                    variant="contained">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog open={ openSecondary } disableBackdropClick>
                <DialogTitle>
                    Profile deleted!
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        You will be redirected to the main page.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button color="primary" onClick={ clickOpenSecondary }
                    variant="contained">
                        OK
                    </Button>
                </DialogActions>
            </Dialog>
        </span>
    );
}
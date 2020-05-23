import React from 'react';

import { createStyles, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import logo from '../../assets/img/logo.png'

const useStyles = makeStyles((theme) =>
    createStyles({
        root: {
            flexGrow: 1,
            backgroundColor: '#F3F2F2'
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        logo: {
            width: 60
        },
        title: {
            fontWeight: "bold",
            color: '#6a149b'
        }
    }),
);
export default function CoronaAppBar() {

    const classes = useStyles();
    return (
        <div className={classes.root}>
            <AppBar position="static" color="transparent">
                <Toolbar variant="dense">
                    <IconButton edge="start" className={classes.menuButton}>
                        <img src={logo} className={classes.logo} />
                    </IconButton>
                    <Typography variant="h5" className={classes.title}>
                        Covid-19 Stats Tracker
                    </Typography>
                </Toolbar>
            </AppBar>
        </div>
    );
}
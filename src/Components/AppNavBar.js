import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }));

function AppNavBar() {
    const classes = useStyles();
    return (
        <div>
            <AppBar position="static" style={{backgroundColor:'green',opacity:'0.6', top:'0',position:'absolute'}}>
                <Toolbar>
                    <Typography variant="h5" component='h2' className={classes.title} style={{float:'left'}}>
                        Covid 19 Tracker
                    </Typography>
                    
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default AppNavBar;
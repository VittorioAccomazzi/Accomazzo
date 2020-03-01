import React from 'react';
import SearchParam from '../containers/SearchParam'
import DocList from '../containers/DocList'
import Container from '@material-ui/core/Container';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    },
    paper :{
        padding: "2vw",
        marginTop: "2vh",
        marginBottom: "2vh"
    }
  }));

export default function  App () {
  const classes = useStyles();
  return (
    <div className={classes.root}>
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6">
          Accomazzo Documents
        </Typography>
      </Toolbar>
    </AppBar>
    <Container maxWidth="xl">
        <Paper className={classes.paper}>
            <SearchParam/>
        </Paper>
        <Paper className={classes.paper}>
            <DocList/>
        </Paper>
   </Container>
  </div>
  );
 }

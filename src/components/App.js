import React from 'react';
import SearchParam from '../containers/SearchParam'
import DocList from '../containers/DocList'
import Container from '@material-ui/core/Container';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AppHelp from './AppHelp';
import ReactGA from 'react-ga';

const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    },
    paper :{
        padding: "2vw",
        marginTop: "2vh",
        marginBottom: "2vh"
    },
    title: {
      flexGrow: 1,
    }
  }));



export default function  App () {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    ReactGA.event({
      category : 'User',
      action : 'Open Database Help'
    });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const classes = useStyles();

  return (
    <div className={classes.root}>
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          Accomazzo Documents
        </Typography>
        <Button color="inherit" size='small' onClick={handleClickOpen}>Help</Button>
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
   <AppHelp open={open} handleClose={handleClose}/>
  </div>
  );
 }

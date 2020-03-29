import React from 'react';
import Container from '@material-ui/core/Container';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import DataView from './components/DataView'
import Button from '@material-ui/core/Button';
import AppHelp from './AppHelp'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  view :{
    padding: "2vw",
    marginTop: "2vh",
    marginBottom: "2vh",
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(3),
    top : theme.spacing(8),
    left : theme.spacing(3)
  },
  title: {
    flexGrow: 1,
  }
}));

function App() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          Accomazzo Tree
        </Typography>
        <Button color="inherit" size='small' onClick={handleClickOpen}>Help</Button>
      </Toolbar>
    </AppBar>
    <Container maxWidth="xl" >
      <DataView paperClass={classes.view} />
   </Container>
   <AppHelp open={open} handleClose={handleClose}/>
    </div>
  );
}

export default App;

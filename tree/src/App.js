import React from 'react';
import Container from '@material-ui/core/Container';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import DataView from './components/DataView'
import Button from '@material-ui/core/Button';
import AppHelp from './AppHelp';
import AppHistory from './AppHistory';
import AppSearch from './AppSearch';
import Hidden from '@material-ui/core/Hidden';
import { useEffect } from 'react';
import ReactGA from 'react-ga';
import './App.css'

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
  const [help, setHelp] = React.useState(false);
  const [history, setHistory] = React.useState(false);
  const [position, setPosition] = React.useState(null);
  const showHistoryLink = false;

  useEffect(()=>{
    ReactGA.initialize('UA-168075958-1');
    ReactGA.pageview(window.location.pathname + window.location.search);
  },[])

  const openHelp = () => {
    ReactGA.event({
      category : 'User',
      action : 'Open Tree Help'
    });
    setHelp(true);
  };

  const closeHelp = () => {
    setHelp(false);
  };

  const openHistory = () => {
    ReactGA.event({
      category : 'User',
      action : 'Open History'
    });
    setHistory(true);
  }

  const closeHistory = () =>{
    setHistory(false);
  }

  return (
    <div className={classes.root}>
    <AppBar position="static">
      <Toolbar>
        <Hidden xsDown >
          <Typography variant="h6" className={classes.title} noWrap>
            Accomazzo Tree
          </Typography>
        </Hidden>
        <AppSearch setPosition={setPosition}/>
        { showHistoryLink &&
          <>
            <Hidden smDown>
                <Button color="inherit" size='small' onClick={openHistory}>Family History</Button>
            </Hidden>
            <Hidden mdUp>
                <Button color="inherit" size='small' onClick={openHistory}>History</Button>
            </Hidden>
          </>
        }
        <Button color="inherit" size='small' onClick={openHelp}>Help</Button>
      </Toolbar>
    </AppBar>
    <Container maxWidth="xl" >
      <DataView paperClass={classes.view} position={position}/>
   </Container>
   <AppHelp open={help} handleClose={closeHelp}/>
   <AppHistory open={history} handleClose={closeHistory}/>
    </div>
  );
}

export default App;

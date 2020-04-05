import React from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'
import CloseIcon from '@material-ui/icons/Close'
let graph = require('./components/SvgInfo.json');

const useStyles = makeStyles(theme => ({
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputInput: {
      color:'inherit',
      padding: theme.spacing(0, 0, 0, 0),
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      fontSize: 'small',
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '256px',
      },
    },
    listBox : {
      fontSize : 'small',
      lineHeight : "normal"
    },
    icon : {
      fill : 'white'
    }
  }));

  export default function  AppSearch ({setPosition}) {
    const classes = useStyles();

    const onSelection = (value)=>{
      if( value ) setPosition(value.pos);
    }
    const onTextChange = (value)=>{
      if( value ){
        let el = graph.list.find((e)=> e.name.toLowerCase() === value.toLowerCase());
        if( el && setPosition ) setPosition(el.pos);
      }
    }

    // sort the list such as name are listed first alphabetically and then
    // numbers
    const sortList = (aObj,bObj)=>{
      let a = aObj.name;
      let b = bObj.name;
      let aN = isNaN(a);
      let bN = isNaN(b);
      if( aN && bN ) return a>b ? 1 : -1; // both strings
      if( aN && !bN ) return -1;
      if( !aN && bN ) return 1;
      if( !aN && !bN ) return parseInt(a) > parseInt(b) ? 1 :-1;
    }

    return (
        <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <Autocomplete
                id="autocomplete-box"
                options={graph.list.sort(sortList)}
                getOptionLabel={(x)=>x.name}
                groupBy={(i)=>isNaN(i.name)? "Names": "Indexis"}
                autoSelect={true}
                blurOnSelect={true}
                onChange={(e, v) => onSelection(v)}   
                closeIcon={
                  <CloseIcon fontSize="small" className={classes.icon} />
                }
                popupIcon={
                  (<ArrowDropDownIcon className={classes.icon} />)
                }
                classes={{
                  option : classes.listBox
                }}
                renderInput={(params)=>
                  <TextField 
                    {...params} 
                    onChange={e => onTextChange(e.target.value)} 
                    placeholder="Type name or index .."
                    InputProps={{...params.InputProps, className : classes.inputInput, disableUnderline: true}}
                  />
                }
            />
          </div>
    )}
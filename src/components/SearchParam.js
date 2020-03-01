import React from 'react'
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {
            // To do
    },
  }));


export default function SearchParam ({search}){
    const classes = useStyles();
    const [state,setState] = React.useState({
        name : '',
        includeParents : false,
        includeWiteness : false,
        fromYear : '',
        toYear   : '',
        nameError : '',
        fromYearError : '',
        toYearError : ''
    })

    const change = e => {
        setState({...state, [e.target.id] : e.target.value })
    };

    const changeCheckBox= e => {
        setState({...state, [e.target.id]: e.target.checked });
      };

    const validate = () => {
        let isError = false;
        const errors = {
            nameError: "",
            fromYearError: "",
            toYearError: ""
          };

        if ( state.name === '' || state.name.trim() === ''){
            isError = true;
            errors.nameError = "Invalid name";
        }

        if( state.fromYear !== '' && parseInt(state.fromYear).toString() !== state.fromYear ){
            isError = true;
            errors.fromYearError = "Invalid year";   
        }

        if( state.toYear !== '' && parseInt(state.toYear).toString() !== state.toYear ){
            isError = true;
            errors.toYearError = "Invalid year";   
        }

        if( isError === false && state.fromYear !== '' && state.fromYear !== '' ){
            if( parseInt(state.fromYear) > parseInt(state.toYear) ){
                isError = true;
                errors.fromYearError = "Invalid years range";
                errors.toYearError = "Invalid years range";
            }
        }
        setState({ ...state, ...errors });
        return isError;
    };

    const submit = e => {
            e.preventDefault();
            let isError = validate()
            if( !isError ){
                search(state.name, state.fromYear, state.toYear, state.includeParents, state.includeWiteness);
            }
        }

    return (
        <form>
        <Grid container>
            <Grid container spacing={2} justify="space-between">
                <Grid item xs={12} sm={8}>
                    <TextField 
                        id="name" 
                        label="name"  
                        required={true}
                        onChange={e => change(e)} 
                        error = {state.nameError!==''}
                        helperText={state.nameError}
                        fullWidth={true}
                        />
                </Grid>
                <Grid item xs={6} sm={2}>
                    <TextField
                        id="fromYear"
                        label="from year"
                        defaultValue=""
                        inputProps={{
                            maxLength: 4,
                        }}
                        onChange={e => change(e)}
                        error = {state.fromYearError!==''}            
                        helperText={state.fromYearError}
                        fullWidth={true}
                    />
                </Grid>
                <Grid item xs={6} sm={2}>
                    <TextField
                        id="toYear"
                        label="to year"
                        defaultValue=""
                        inputProps={{
                            maxLength: 4,
                        }}
                        onChange={e =>change(e)}
                        error = {state.toYearError!==''}
                        helperText={state.toYearError}
                        fullWidth={true}
                    />
                </Grid>
            </Grid>
            <Grid container spacing={2} justify="space-between">
                <Grid item xs={12} sm={5}>
                    <FormControlLabel
                    control={
                        <Checkbox
                            id="includeParents"
                            checked={state.includeParents}
                            onChange={e => changeCheckBox(e)}
                            color="primary"
                        />
                        }
                        label="search also as parent"
                    />
                </Grid>
                <Grid item xs={12} sm={5}>
                    <FormControlLabel
                    control={
                        <Checkbox
                            id="includeWiteness"
                            checked={state.includeWiteness}
                            onChange={e => changeCheckBox(e)}
                            color="primary"
                        />
                        }
                        label="search also as witness or godfather or godmother"
                    />
                </Grid>
                <Grid item xs={12} sm={2}>
                    <Button 
                        variant="contained" 
                        color="primary"
                        onClick={e => submit(e)}>
                        Search
                    </Button>
                </Grid>
            </Grid>
        </Grid>
        </form>
    )
}


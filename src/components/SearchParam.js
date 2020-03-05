import React from 'react'
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    button : {
        marginTop: theme.spacing(1)
      },
      formlabel : {
        marginTop: theme.spacing(1)
      }
  }));


export default function SearchParam ({search}){
    const classes = useStyles();
    const [state,setState] = React.useState({
        params : {
            name : '',
            includeParents : false,
            includeWiteness : false,
            fromYear : '',
            toYear   : ''
        },
        errors : {
            nameError : '',
            fromYearError : '',
            toYearError : ''
        }
    })

    const change = e => {
        setState({
            params : { ...state.params, [e.target.id] : e.target.value},
            errors : state.errors
        })
    };

    const changeCheckBox= e => {
        setState({
            params : { ...state.params, [e.target.id]: e.target.checked},
            errors : state.errors
        })
      };

    const validate = () => {
        let isError = false;
        const errors = {
            nameError: "",
            fromYearError: "",
            toYearError: ""
          };

        if ( state.params.name === '' || state.params.name.trim() === ''){
            isError = true;
            errors.nameError = "Invalid name";
        }

        if( state.params.fromYear !== '' && parseInt(state.params.fromYear).toString() !== state.params.fromYear ){
            isError = true;
            errors.fromYearError = "Invalid year";   
        }

        if( state.params.toYear !== '' && parseInt(state.params.toYear).toString() !== state.params.toYear ){
            isError = true;
            errors.toYearError = "Invalid year";   
        }

        if( isError === false && state.params.fromYear !== '' && state.params.fromYear !== '' ){
            if( parseInt(state.params.fromYear) > parseInt(state.params.toYear) ){
                isError = true;
                errors.fromYearError = "Invalid years range";
                errors.toYearError = "Invalid years range";
            }
        }
        setState({
            params : state.params,
            errors : errors
        });
        return isError;
    };

    const submit = e => {
            e.preventDefault();
            let isError = validate()
            if( !isError ){
                search(state.params);
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
                        error = {state.errors.nameError!==''}
                        helperText={state.errors.nameError}
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
                        error = {state.errors.fromYearError!==''}            
                        helperText={state.errors.fromYearError}
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
                        error = {state.errors.toYearError!==''}
                        helperText={state.errors.toYearError}
                        fullWidth={true}
                    />
                </Grid>
            </Grid>
            <Grid container spacing={2} justify="space-between">
                <Grid item xs={12} sm={5}>
                    <FormControlLabel
                    className={classes.formlabel}    
                    control={
                        <Checkbox                    
                            id="includeParents"
                            checked={state.params.includeParents}
                            onChange={e => changeCheckBox(e)}
                            color="primary"
                        />
                        }
                        label="search also as parent"
                    />
                </Grid>
                <Grid item xs={12} sm={5}>
                    <FormControlLabel
                     className={classes.formlabel}
                    control={
                        <Checkbox
                            id="includeWiteness"
                            checked={state.params.includeWiteness}
                            onChange={e => changeCheckBox(e)}
                            color="primary"
                        />
                        }
                        label="search also as witness or godfather or godmother"
                    />
                </Grid>
                <Grid item xs={12} sm={2}>
                    <Button 
                        className={classes.button}
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


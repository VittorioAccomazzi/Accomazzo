import React from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import TreeSizer from './TreeSizer';


const useStyles = makeStyles(theme => ({

}));

export default function DataView ({paperClass}) {
    const classes = useStyles();
    return (
        <Paper className={paperClass} >
            <TreeSizer />
        </Paper>
    )
}
import React from 'react';
import Paper from '@material-ui/core/Paper';
import TreeSizer from './TreeSizer';


export default function DataView ({paperClass, position}) {
    return (
        <Paper className={paperClass} >
            <TreeSizer position = {position}/>
        </Paper>
    )
}
import React from "react";
import TextField from '@material-ui/core/TextField';
import { Grid } from "@material-ui/core";
import DocStyle from './DocStyle'

const DocField = ({name, label, smlWith, xsWidth }) => {
    const classes = DocStyle();
    return (
    <Grid item sm={parseInt(smlWith)} xs={parseInt(xsWidth)}>
        <TextField
        className={classes.docField}
        id="outlined-read-only-input"
        label={label}
        defaultValue={name}
        InputProps={{
            readOnly: true,
        }}
        variant="outlined"
        fullWidth
        />
    </Grid>
    )}

export default DocField
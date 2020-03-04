import React from "react";
import TextField from '@material-ui/core/TextField';
import { Grid } from "@material-ui/core";

const DocField = ({name, label, smlWith, xsWidth }) => (
    <Grid item sm={parseInt(smlWith)} xs={parseInt(xsWidth)}>
        <TextField
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
    )

export default DocField
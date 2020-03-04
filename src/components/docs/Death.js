import React from "react";
import TextField from '@material-ui/core/TextField';
import { Grid } from "@material-ui/core";
import Doc from './Doc'


const Death =  ({year, name, father, mother, spouse, witness1, witness2, url}) => {

    return (
        <Doc year={year} name={name} url={url} icon="/death.png">
            <Grid container>
                <Grid item sm={6} xs={12}>
                <TextField
                id="outlined-read-only-input"
                label="Father"
                defaultValue={father}
                InputProps={{
                    readOnly: true,
                }}
                variant="outlined"
                fullWidth
                />
                </Grid>
                <Grid item sm={6} xs={12}>
                <TextField
                id="outlined-read-only-input"
                label="Mother"
                defaultValue={mother}
                InputProps={{
                    readOnly: true,
                }}
                variant="outlined"
                fullWidth
                />
                </Grid>
                <Grid item sm={4} xs={12}>
                <TextField
                id="outlined-read-only-input"
                label="Godfather"
                defaultValue={spouse}
                InputProps={{
                    readOnly: true,
                }}
                variant="outlined"
                fullWidth
                />
                </Grid>
                <Grid item sm={4} xs={6}>
                <TextField
                id="outlined-read-only-input"
                label="First Witness"
                defaultValue={witness1}
                InputProps={{
                    readOnly: true,
                }}
                variant="outlined"
                fullWidth
                />
                </Grid>
                <Grid item sm={4} xs={6}>
                <TextField
                id="outlined-read-only-input"
                label="Second Witness"
                defaultValue={witness2}
                InputProps={{
                    readOnly: true,
                }}
                variant="outlined"
                fullWidth
                />
                </Grid>
            </Grid>
        </Doc>
    );
  }

  export default Death

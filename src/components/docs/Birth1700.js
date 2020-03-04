import React from "react";
import TextField from '@material-ui/core/TextField';
import { Grid } from "@material-ui/core";
import Doc from './Doc'


const Birth1700 =  ({year, name, url, godfather, godmother, family}) => {


    return (
        <Doc year={year} name={name} url={url} icon="/birth.png">
            <Grid container>
                <Grid item sm={6} xs={12}>
                <TextField
                id="outlined-read-only-input"
                label="Child of"
                defaultValue={family}
                InputProps={{
                    readOnly: true,
                }}
                variant="outlined"
                fullWidth
                />
                </Grid>
                <Grid item sm={3} xs={6}>
                <TextField
                id="outlined-read-only-input"
                label="Godfather"
                defaultValue={godfather}
                InputProps={{
                    readOnly: true,
                }}
                variant="outlined"
                fullWidth
                />
                </Grid>
                <Grid item sm={3} xs={6}>
                <TextField
                id="outlined-read-only-input"
                label="Godmother"
                defaultValue={godmother}
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

  export default Birth1700

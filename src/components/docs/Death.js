import React from "react";
import { Grid } from "@material-ui/core";
import Doc from './Doc'
import DocField from './DocField'


const Death =  ({year, name, father, mother, spouse, witness1, witness2, url}) => {

    return (
        <Doc year={year} name={name} url={url} icon="/death.png">
            <Grid container>
                <DocField smlWith="6" xsWidth="12" label="Father" name={father}/>
                <DocField smlWith="6" xsWidth="12" label="Mother" name={mother}/>
                <DocField smlWith="4" xsWidth="12" label="Spouse" name={spouse}/>
                <DocField smlWith="4" xsWidth="6"  label="First Witness" name={witness1}/>
                <DocField smlWith="4" xsWidth="6"  label="Second Witness" name={witness2}/>
            </Grid>
        </Doc>
    );
  }

  export default Death

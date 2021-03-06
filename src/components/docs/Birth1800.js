import React from "react";
import { Grid } from "@material-ui/core";
import Doc from './Doc'
import DocField from './DocField'


const Birth1800 =  ({year, name, father, mother, godfather, godmother, url, id }) => {

    return (
        <Doc year={year} name={name} url={url} id={id} icon="/birth.png">
            <Grid container>
                <DocField smlWith="3" xsWidth="6" label="Father" name={father} />
                <DocField smlWith="3" xsWidth="6" label="Mother" name={mother} />
                <DocField smlWith="3" xsWidth="6" label="Godfather" name={godfather} />
                <DocField smlWith="3" xsWidth="6" label="Godmother" name={godmother} />
            </Grid>
        </Doc>
    );
  }

  export default Birth1800

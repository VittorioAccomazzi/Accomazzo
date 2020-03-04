import React from "react";
import { Grid } from "@material-ui/core";
import Doc from './Doc'
import DocField from './DocField'


const Marrige =  ({year, groom, bride, groomfather, groommother, bridefather, bridemother, witness1, witness2, url}) => {

    return (
        <Doc year={year} name={groom+" and "+bride} url={url} icon="/marrige.png">
            <Grid container>
                <DocField smlWith="3" xsWidth="6" label="Groom Father" name={groomfather} />
                <DocField smlWith="3" xsWidth="6" label="Groom Mother" name={groommother} />
                <DocField smlWith="3" xsWidth="6" label="Bride Father" name={bridefather} />
                <DocField smlWith="3" xsWidth="6" label="Bride Mother" name={bridemother} />
                <DocField smlWith="6" xsWidth="6" label="First Witness"  name={witness1} />
                <DocField smlWith="6" xsWidth="6" label="Second Witness" name={witness2} />
            </Grid>
        </Doc>
    );
  }

  export default Marrige

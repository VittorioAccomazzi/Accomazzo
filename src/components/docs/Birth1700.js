import React from "react";
import { Grid } from "@material-ui/core";
import Doc from './Doc'
import DocField from './DocField'


const Birth1700 =  ({year, name, url, godfather, godmother, family}) => {


    return (
        <Doc year={year} name={name} url={url} icon="/birth.png">
            <Grid container>
                <DocField smlWith="6" xsWidth="12" label="Child of" name = {family} />
                <DocField smlWith="3" xsWidth="6"  label="Godfather" name = {godfather} />
                <DocField smlWith="3" xsWidth="6"  label="GodMother" name = {godmother} />
            </Grid>
        </Doc>
    );
  }

  export default Birth1700

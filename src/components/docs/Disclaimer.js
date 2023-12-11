import React from "react";
import Typography from "@material-ui/core/Typography";
import { disclaimerEn, disclaimerIt, regEx } from "../../docEngine/docDisclaimer";

const Disclaimer = ({url})=>{
    let display = url.match(regEx);
    return (
        <Typography
        className={"MuiTypography--heading"}
        variant="caption"
        gutterBottom
        align="right"
        color="textSecondary"
    >
        {
            display ? <>{disclaimerEn} <br/> {disclaimerIt} </> : <></>
        }
    </Typography>
    )
}

export default Disclaimer;
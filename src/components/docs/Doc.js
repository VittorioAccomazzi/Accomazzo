import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader"
import TextField from '@material-ui/core/TextField';
import Typography from "@material-ui/core/Typography";
import { Grid } from "@material-ui/core";
import IconButton from '@material-ui/core/IconButton';
import clsx from 'clsx';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import DocStyle from './DocStyle'


const Doc =  ({year, name, icon, url, children}) => {
    const classes = DocStyle();
    const [expanded, setExpanded] = React.useState(false);
  
    const handleExpandClick = () => {
      setExpanded(!expanded);
    };

    return (<Card className={classes.card}>
            <CardContent className={classes.content}>
            <CardHeader
                avatar={
                <Avatar aria-label="Birth Cartificate" variant="square" className={classes.avatar} src={process.env.PUBLIC_URL+icon} /> 
                }
                title= {
                <Typography
                className={"MuiTypography--heading"}
                variant={"h6"}
                gutterBottom
                >
                { year+" "+name}
                </Typography>
                }
            />
            {children}
            </CardContent>
            <IconButton
                className={clsx(classes.expand, {
                [classes.expandOpen]: expanded,
                })}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
            >
                <ExpandMoreIcon />
            </IconButton>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
                <CardMedia
                className={classes.media}
                image={url}
                title="Original Document"
            />
            </CardContent>
            </Collapse>
        </Card>
    );
  }

  export default Doc

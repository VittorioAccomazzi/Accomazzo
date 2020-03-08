import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader"
import Typography from "@material-ui/core/Typography";
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import clsx from 'clsx';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import DocStyle from './DocStyle'
import FormLabel from '@material-ui/core/FormLabel';


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
                <Avatar aria-label="Cartificate" variant="square" className={classes.avatar} src={process.env.PUBLIC_URL+icon} /> 
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
            <CardActions >
                <FormLabel component="legend" onClick={handleExpandClick}>
                    {expanded ? "Hide Document" : "View Document"}
                </FormLabel>
                <IconButton
                    className={clsx(classes.expand, {
                    [classes.expandOpen]: expanded,
                    })}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more" >
                    <ExpandMoreIcon />
                </IconButton>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
                <center><a href={url} target="_blank"><img src={url} width="80%" alt="certificate"/></a></center>
            </CardContent>
            </Collapse>
        </Card>
    );
  }

  export default Doc

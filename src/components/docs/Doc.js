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
import Link from '@material-ui/core/Link';
import { Grid } from "@material-ui/core";
import copy from 'copy-to-clipboard';

const Doc =  ({year, name, icon, url, id, children}) => {
    const siteUrl='http://accomazzo.org/';
    const timer = React.useRef(null);
    const classes = DocStyle();
    const [state, setState] = React.useState({
        expanded : false,
        copied : false
    });
  
    const handleExpandClick = () => {
      setState({
            expanded:!state.expanded,
            copied : state.copied
        });
    };

    const handleCopyClick = (e) =>{
        setState({
            expanded:state.expanded,
            copied : true
        });
        let url = siteUrl+"?show="+id;
        if( e.shiftKey )  url = id;
        copy(url);
        timer.current = setTimeout( ()=>{
            setState({
                expanded:state.expanded,
                copied : false
            });
            timer.current = null;   
        }, 1000);
    }

    React.useEffect(()=> {
        return () => {
          if (timer.current) {
            clearTimeout(timer.current);
          }
        };
      }, []);

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
            <Grid
                    container
                    direction="row"
                    justify="flex-start"
                    alignItems="center"
                    >
                    <FormLabel component="legend" onClick={handleExpandClick}>
                        {state.expanded ? "Hide Document" : "View Document"}
                    </FormLabel>
                    <IconButton
                        className={clsx(classes.expand, {
                        [classes.expandOpen]: state.expanded,
                        })}
                        onClick={handleExpandClick}
                        aria-expanded={state.expanded}
                        aria-label="show more" >
                        <ExpandMoreIcon />
                    </IconButton>
                    </Grid>
                    <Link underline='hover' color="textSecondary" className={classes.copyLink} onClick={handleCopyClick}>
                        <Typography
                            className={"MuiTypography--heading"}
                            variant="caption"
                            gutterBottom
                            align="right"
                            color="textSecondary"
                            noWrap
                        >
                        { state.copied ? 'Copied !' : 'Copy Link' }
                        </Typography>
                    </Link>
                    <Link underline='hover' color="textSecondary"
                        href= { "mailto:vittorio.accomazzi+accomazzo@gmail.com?subject=Report on "+name+" "+year+"("+id+")&body=Please describe the error you have encountered.%0D%0A%0D%0AThe document URL is : "+url} target="_blank">
                        <Typography
                            className={"MuiTypography--heading"}
                            variant="caption"
                            gutterBottom
                            align="right"
                            color="textSecondary"
                            noWrap
                        >
                        Report Error
                        </Typography>
                    </Link>
            </CardActions>
            <Collapse in={state.expanded} timeout="auto" unmountOnExit>
            <CardContent>
                <center><a href={url} target="_blank"><img src={url} width="80%" alt="certificate"/></a></center>
            </CardContent>
            </Collapse>
        </Card>
    );
  }

  export default Doc

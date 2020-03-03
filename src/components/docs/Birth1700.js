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


const Birth1700 =  (props) => {
    const classes = DocStyle();
    const [expanded, setExpanded] = React.useState(false);
  
    const handleExpandClick = () => {
      setExpanded(!expanded);
    };

    return (<Card className={classes.card}>
            <CardContent className={classes.content}>
            <CardHeader
                avatar={
                <Avatar aria-label="Birth Cartificate" variant="square" className={classes.avatar} src={process.env.PUBLIC_URL+'/birth.png'} /> 
                }
                title= {
                <Typography
                className={"MuiTypography--heading"}
                variant={"h6"}
                gutterBottom
                >
                { props.year+" "+props.name}
                </Typography>
                }
            />
            <Grid container>
                <Grid item sm={6} xs={12}>
                <TextField
                id="outlined-read-only-input"
                label="child of"
                defaultValue={props.family}
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
                defaultValue={props.godfather}
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
                defaultValue={props.godmother}
                InputProps={{
                    readOnly: true,
                }}
                variant="outlined"
                fullWidth
                />
                </Grid>
            </Grid>
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
                image={props.url}
                title="Original Document"
            />
            </CardContent>
            </Collapse>
        </Card>
    );
  }

  export default Birth1700

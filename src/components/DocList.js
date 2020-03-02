import React from "react";
import ReactDOM from "react-dom";
import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader"
import TextField from '@material-ui/core/TextField';
import Typography from "@material-ui/core/Typography";
import { makeStyles } from '@material-ui/core/styles';
import  {docTypes} from '../docEngine/docTypes'
import { Grid } from "@material-ui/core";
import IconButton from '@material-ui/core/IconButton';
import clsx from 'clsx';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';

const useStyles = makeStyles(theme => ({
    card: {
      maxWidth: "90%",
      margin: "auto",
      transition: "0.3s",
      boxShadow: "0 0 8px 0px rgba(0,0,0,0.3)",
      "&:hover": {
        boxShadow: "0 0 16px 0px rgba(0,0,0,0.5)"
      }
    },
    media: {
      paddingTop: "56.25%"
    },
    content: {
      textAlign: "left",
      padding: theme.spacing.unit
    },
    heading: {
      fontWeight: "bold"
    },
    subheading: {
      lineHeight: 1.8
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    avatar: {
      width: theme.spacing(3),
      height: theme.spacing(4)
    }
  }));


const DocList = ({docs}) => {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
    const handleExpandClick = () => {
      setExpanded(!expanded);
    };

    const renderDoc = (doc) =>{
        let element;
        switch ( doc.Type ){
            case docTypes.Birth_1800 :
                {
    
                }
                break;
            case docTypes.Birth_1700 :
                    element = ( 
                    <Card className={classes.card}>
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
                        { doc.Year+" "+doc.Name}
                      </Typography>
                      }
                    />
                    <Grid container>
                      <Grid item sm={6} xs={12}>
                        <TextField
                        id="outlined-read-only-input"
                        label="child of"
                        defaultValue={doc.Family}
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
                        defaultValue={doc.Godfather}
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
                        defaultValue={doc.Godmother}
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
                      image={doc.Url}
                      title="Paella dish"
                    />
                    </CardContent>
                  </Collapse>
                </Card>);
                break;
            case docTypes.Death :
                {
    
                }
                break;
            case docTypes.Marriage :
                {
    
                }
                break;    
        }
        return element;
    }

    return (
    <div>
        { 
            docs.map( (doc)=> renderDoc(doc))
        }
    </div>
    )
}

export default DocList
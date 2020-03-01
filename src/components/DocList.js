import React from "react";
import ReactDOM from "react-dom";
import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from '@material-ui/core/styles';
import  {docTypes} from '../docEngine/docTypes'

const useStyles = makeStyles(theme => ({
    card: {
      maxWidth: 300,
      margin: "auto",
      transition: "0.3s",
      boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
      "&:hover": {
        boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)"
      }
    },
    media: {
      paddingTop: "56.25%"
    },
    content: {
      textAlign: "left",
      padding: theme.spacing.unit * 3
    },
    divider: {
      margin: `${theme.spacing.unit * 3}px 0`
    },
    heading: {
      fontWeight: "bold"
    },
    subheading: {
      lineHeight: 1.8
    },
    avatar: {
      display: "inline-block",
      border: "2px solid white",
      "&:not(:first-of-type)": {
        marginLeft: theme.spacing.unit
      }
    }
  }));


const DocList = ({docs}) => {
    const classes = useStyles();
    const renderDoc = (doc) =>{
        let element;
        switch ( doc.Type ){
            case docTypes.Birth_1800 :
                {
    
                }
                break;
            case docTypes.Birth_1700 :
                    element = ( <Card classname={classes.card}>
                    <CardContent className={classes.content}>
                    <Typography
                        className={"MuiTypography--heading"}
                        variant={"h6"}
                        gutterBottom
                    >
                        {doc.Year+" "+doc.Name}
                    </Typography>
                    <Typography
                        className={"MuiTypography--subheading"}
                        variant={"caption"}
                    >
                        {doc.Family}
                    </Typography>
                    </CardContent>
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
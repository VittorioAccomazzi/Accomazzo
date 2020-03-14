
import { makeStyles } from '@material-ui/core/styles';

const DocStyle = makeStyles(theme => ({
    card: {
      maxWidth: "90%",
      margin: "auto",
      transition: "0.3s",
      boxShadow: "0 0 8px 0px rgba(0,0,0,0.3)",
      "&:hover": {
        boxShadow: "0 0 16px 0px rgba(0,0,0,0.5)"
      }
    },
    docField : {
      marginTop: theme.spacing(1)
    },
    content: {
      textAlign: "left",
      padding: theme.spacing(1)
    },
    heading: {
      fontWeight: "bold"
    },
    subheading: {
      lineHeight: 1.8
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: '0',
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

  export default DocStyle

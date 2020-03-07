import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Pagination from '@material-ui/lab/Pagination';
import PaginationItem from '@material-ui/lab/PaginationItem';
import Grid from "@material-ui/core/Grid"

const useStyles = makeStyles(theme => ({
    grid: {
        maxWidth: "100%",
        marginBottom: theme.spacing(2)
      }
  }));

  const DocListHeader = ({page, pages, setPage, docNum}) => {
    const classes = useStyles();

    if( pages.length > 0 )
    {
      return (
              
                <Grid container alignItems="center" justify="space-around" className={classes.grid}>
                  <Typography>Number of Documents: {docNum}</Typography>
                  <Typography>List Document of Year : {pages[page-1]}</Typography>
                  <Pagination count={pages.length} page={page} onChange={setPage} renderItem={(item)=><PaginationItem {...{...item, ...{page:pages[item.page-1]}}}/>}
                      showFirstButton showLastButton />
                </Grid>      )
    } else {
      return (<div/>)
     }
  }

  export default DocListHeader
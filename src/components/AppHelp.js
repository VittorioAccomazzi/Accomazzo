import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


const gitInfo = require('../tools/gitInfo.json');

export default function  AppHelp ({handleClose, open}) {
    return (
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            maxWidth='lg'
          >
            <DialogTitle id="alert-dialog-title">{"Accomazzo Documents"}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Welcome to the Accomazzo Documents Repository. The Repository is composed of more then 2,000 documents gathered 
                from <a href="https://www.google.com/maps/@44.9904498,8.2749082,3a,75y,51.47h,98.88t/data=!3m6!1e1!3m4!1sG8XUjhgyk2B9y02kbOn7iw!2e0!7i13312!8i6656"> San Desiderio Church</a> in
                Italy and also from the Calliano municipality.<br/>
                The repository contains Birth certificates, Marriage certificates and few death certificates. There are documents in italian (about 50%), latin (about 40%) and french (about 10%).
                Therefore, when searching for a particular  individual make sure to try different spelling.
                The documents span from 1713 to early 1900s.
              </DialogContentText>
              <DialogContentText id="alert-dialog-description">
                To search the archive type the <b>name</b>, in the name field in the page and then press <b>search</b> to perform the search.
                You can restrict the search using the <b>from year</b> and <b>to year</b> fields. If you don't set any of these field you'll be able to browse all
                the documents in the archive. <br/>
                if you set the name you can also extend the search to the names of the parents in the documents (check box <b>search also as parents</b>) 
                or witness (check box <b>search also as witness or godfather or godmother</b>)
              </DialogContentText>
              <DialogContentText id="alert-dialog-description">
                <center><img src="Search.gif" alt="how to search"/></center>
              </DialogContentText>
              <DialogContentText id="alert-dialog-description">
                The documents have been manually typed in, and automatically corrected. <a href="Names.csv">Here</a> you can download the list of the names which appears in the documents,
                and <a href="Corrections.csv">here</a> you can download the correction done. If you find an error please use the link <b>Report Error</b> in the record of the document to let us know.
              </DialogContentText>
              <DialogContentText id="alert-dialog-description">
                <small>{ (gitInfo.long == null)  && (`Application Developer Version`)}
                       { (gitInfo.long != null)  && (<a href={"https://github.com/VittorioAccomazzi/Accomazzo/"+gitInfo.long} target="_blank"> Application Version {gitInfo.version}</a> 
                       )} </small>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary" autoFocus>
                close
              </Button>
            </DialogActions>
          </Dialog>
      );
}



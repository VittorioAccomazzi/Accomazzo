import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import ReactGA from 'react-ga';


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
                Welcome to the Accomazzo Documents Repository. The Repository is composed of more then 3,000 documents from :
                <ul>
                  <li><a href='Church.html' target='_blank'>Diocese and Parishes of Calliano (AT) and San Desiderio (AT)</a></li>
                  <li><a href="Ancestry.html" target='_blank'>Ancestry.com</a> </li>
                  <li><a href="Other.html" target='_blank'>Municipality of Calliano and other sources</a></li>
                </ul>
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
                The documents have been manually typed in, and automatically corrected. <ReactGA.OutboundLink eventLabel="Name Download" to="Names.csv">Here</ReactGA.OutboundLink> you can download the list of the names which appears in the documents,
                and <ReactGA.OutboundLink eventLabel="Correction Download" to="Corrections.csv">here</ReactGA.OutboundLink> you can download the correction done. If you find an error please use the link <b>Report Error</b> in the record of the document to let us know.
              </DialogContentText>
              <DialogContentText id="alert-dialog-description">
                <small>{ (gitInfo.long == null)  && (`Application Developer Version`)}
                       { (gitInfo.long != null)  && (<ReactGA.OutboundLink eventLabel="Github Link" to={"https://github.com/VittorioAccomazzi/Accomazzo/tree/"+gitInfo.long} target="_blank"> Application Version {gitInfo.version}</ReactGA.OutboundLink> 
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



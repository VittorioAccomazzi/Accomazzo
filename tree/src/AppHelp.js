import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


export default function  AppHelp ({handleClose, open}) {
    return (
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            maxWidth='lg'
          >
            <DialogTitle id="alert-dialog-title">{"Accomazzo Tree"}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Welcome to the Accomazzo Genealogy Tree. The tree shows the relationships among about 150 individuals identified in the <a href="https://accomazzo-app.s3.amazonaws.com/index.html">Accomazzo Document Repository</a>.
                <li>You can <b>zoom</b> in and out the tree using the mouse wheel, the magnify glass button on your right, or in a tablet with the pinch. </li>
                <li>You can <b>pan</b> the tree using the left mouse button, the cross button on you right or with a single finger on a tablet.</li>
                <li>You can <b>view the documents</b> of a specific individual if you click on the name, or  if you select the arrow button on your right and then click on the name, or with a single touch on a tablet.</li>
              </DialogContentText>
              <DialogContentText id="alert-dialog-description">
                <center><img src="viewtree.gif" alt="how to navigate the tree"/></center>
              </DialogContentText>
              <DialogContentText id="alert-dialog-description">
                You can use the <b>Search Box</b> <img src="SearchBox.png" alt="search box"/> at the top to locate quickly one individual typing his name or index (the nunber reported close to his name).
              </DialogContentText>
              <DialogContentText id="alert-dialog-description">
                If you find any error or any inaccuracies, please <a href="mailto:vittorio.accomazzi+accomazzo@gmail.com?subject=Error in Accomazzo Tree&body=Please describe the error you have encountered" target="_blank">let us know</a>
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



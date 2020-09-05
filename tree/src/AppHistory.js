import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Hidden } from '@material-ui/core';
var ReactGA = require('react-ga');


export default function  AppHistory ({handleClose, open}) {
    return (
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            maxWidth='lg'
          >
            <DialogTitle id="alert-dialog-title">{"Accomazzo Family History"}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                <table>
                    <tr>
                        <td>
                            <Hidden only={['xs']}>
                                <img src="Book.png" height="200" alt="Accomazzo Family History Book"/>
                            </Hidden>
                        </td>
                        <td>
                            Learn the history of the people in this tree :
                            <li>Download the <ReactGA.OutboundLink eventLabel="Book Download" to="https://accomazzo-book.s3.amazonaws.com/Accomazzo.online.pdf" target="_blank">Accomazzo Family History book</ReactGA.OutboundLink>.</li>
                            <li>Order a printed copy of the <ReactGA.OutboundLink eventLabel="Book Order" to="https://www.lulu.com/en/ca/shop/tonino-accomazzo-and-pierluigi-accomazzo-and-anna-bignoli-and-luis-angel-accomazzo/accomazzo/paperback/product-mzj8zg.html" target="_blank">Accomazzo Family History book</ReactGA.OutboundLink>.</li>
                        </td>
                    </tr>
                </table>
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



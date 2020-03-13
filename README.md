# Accomazzo
This web site is the front end for the Accomazzo document search web app.
Uses React-redux and it is designed to be hosted on AWS S3

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Important Notice

Application relies on a set of json file which contains the list of the documents.
These json file are generated processing the csv file in the `Data` folder with the 
application in the `src/docPreProcessing` folder. This processing is triggered by 
the command

### `npm run processing` 

if you don't run this command, the application **will not** compile
Notice that the command will print out several information, for instance record which do not
contains any Accomazzo record.

## The Web Site

The web site is live at https://accomazzo-app.s3.amazonaws.com/index.html.
The images of the document are stored in a separate S3 bucket. The access needs to be whitelisted.
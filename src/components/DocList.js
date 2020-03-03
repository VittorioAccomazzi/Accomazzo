import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import {docTypes} from '../docEngine/docTypes'
import Birth1700 from './docs/Birth1700'


const useStyles = makeStyles(theme => ({
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
                    element = ( 
                      <Birth1700 name={doc.Name} year={doc.Year} key={doc.key} family={doc.Family} godfather={doc.Godfather} godmother={doc.Godmother} url={doc.Url}/>
                    );
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
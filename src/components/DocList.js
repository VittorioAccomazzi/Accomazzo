import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import {docTypes} from '../docEngine/docTypes'
import Birth1700 from './docs/Birth1700'
import Birth1800 from './docs/Birth1800'
import Death from './docs/Death'
import Marriage from './docs/Marrige'

const useStyles = makeStyles(theme => ({
  }));


const DocList = ({docs}) => {
    const classes = useStyles();
    const renderDoc = (doc) =>{
        let element;
        switch ( doc.Type ){
            case docTypes.Birth_1800 :
                element = ( 
                    <Birth1800 name={doc.Name} year={doc.Year} key={doc.key} father={doc.Father} mother={doc.Mother} godfather={doc.Godfather} godmother={doc.Godmother} url={doc.Url}/>
                  );
              break;
            case docTypes.Birth_1700 :
                    element = ( 
                      <Birth1700 name={doc.Name} year={doc.Year} key={doc.key} family={doc.Family} godfather={doc.Godfather} godmother={doc.Godmother} url={doc.Url}/>
                    );
                break;
            case docTypes.Death :
                {
                    element = ( 
                        <Death name={doc.Name} year={doc.Year} key={doc.key} father={doc.Father} mother={doc.Mother} spouse={doc.Spouse} witness1={doc.Witness1} witness2={doc.Witness2} url={doc.Url}/>
                      );
                }
                break;
            case docTypes.Marriage :
                {
                    element = ( 
                        <Marriage groom={doc.Groom} bride={doc.Bride} year={doc.Year} key={doc.key} 
                            groomfather={doc.GroomFather} groommother={doc.GroomMother} 
                            bridefather={doc.BrideFather} bridemother={doc.BrideMother} 
                            witness1={doc.Witness1} witness2={doc.Witness2} url={doc.Url}/>
                      );
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
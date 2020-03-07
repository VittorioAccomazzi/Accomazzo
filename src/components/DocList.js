import React from "react";
import {docTypes} from '../docEngine/docTypes'
import DocListHeader from './DocListHeader'
import Birth1700 from './docs/Birth1700'
import Birth1800 from './docs/Birth1800'
import Death from './docs/Death'
import Marriage from './docs/Marrige'


const DocList = ({docs}) => {

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
                    element = ( 
                        <Death name={doc.Name} year={doc.Year} key={doc.key} father={doc.Father} mother={doc.Mother} spouse={doc.Spouse} witness1={doc.Witness1} witness2={doc.Witness2} url={doc.Url}/>
                      );
                break;
            case docTypes.Marriage :
                    element = ( 
                        <Marriage groom={doc.Groom} bride={doc.Bride} year={doc.Year} key={doc.key} 
                            groomfather={doc.GroomFather} groommother={doc.GroomMother} 
                            bridefather={doc.BrideFather} bridemother={doc.BrideMother} 
                            witness1={doc.Witness1} witness2={doc.Witness2} url={doc.Url}/>
                      );
                break;    
            default :
                console.error("Unexpected document type !"+doc.Type)
            break;
        }
        return element;
    }

    const [state, setState] = React.useState({
        page : 1,
        pages : []
    });
    
    const setPage = (event, value) => {
      setState( {
          page : value,
          pages : state.pages
      })
    }

    React.useMemo(()=>{
        let years = [...new Set(docs.map((d)=>d.Year))]; // unique years
        if( state.page< years.length) state.page =1;
        setState({
            page  : state.page,
            pages : years
        })
    },[docs])

    return (
    <div>
        <DocListHeader page={state.page} pages={state.pages} setPage={setPage} docNum={docs.length} />
        { 
            docs.map( (doc)=> { if( doc.Year === state.pages[state.page-1] ) return renderDoc(doc) } )
        }
    </div>
    )
}

export default DocList
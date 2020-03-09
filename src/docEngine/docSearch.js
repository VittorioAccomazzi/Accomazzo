import  {docTypes} from './docTypes'
const docDefs = require('./docDefs') 

let birth1700 = require("./json/"+docDefs.Birth1700.json);
let birth1800 = require("./json/"+docDefs.Birth1800.json);
let deathDocs = require("./json/"+docDefs.Death.json);

export function documentSearch ( params ){

    let result = [];

    let b1700 = search( birth1700, docTypes.Birth_1700, params, ["Name"], ["Family"], ["Godfather", "Godmother"] );
    let b1800 = search( birth1800, docTypes.Birth_1800, params, ["Name"], ["Father", "Mother"], ["Godfather", "Godmother"] );
    let death = search( deathDocs, docTypes.Death, params, ["Name"],["Father", "Mother", "Spouse"], ["Witness1","Witness2"])

    result = result.concat(b1700);
    result = result.concat(b1800);
    result = result.concat(death)

    result.sort((a,b)=>(a.Year-b.Year))

    return result;
}


/**************************************************/
/**                                              **/
/**                     Search                   **/
/**                                              **/
/**************************************************/

function search( docs, type, params, nameFields, parentFields, witnessFields ){
    let list = []
    let fields = nameFields.slice(); // clone

    if( params.includeParents ) fields = fields.concat(parentFields);
    if( params.includeWiteness) fields = fields.concat(witnessFields);

    let fromYear = ( params.fromYear === "" ? 0  : parseInt(params.fromYear));
    let toYear   = ( params.toYear === "" ? 9999 : parseInt(params.toYear));

    docs.forEach((doc,i)=>{
        if( doc.Year >= fromYear && doc.Year <= toYear ){
            let insert = searchField( doc, params.name, fields )
            if( insert ){
                list.push({
                    ...doc,
                    key  : type+"_"+i,
                    Type : type,
                    Url : docDefs.DocsBaseUrl+doc.Url
                })
            }
        }
    })

    return list;
}

function searchField ( doc, name, fields ){
    let found = false;
    name = name.toUpperCase();
    fields.forEach((f)=>{
        let val = doc[f];
        if( val.toUpperCase().indexOf(name) >= 0  ) found = true;
    })
    return found;
}
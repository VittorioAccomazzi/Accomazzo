import  {docTypes} from './docTypes'
const docDefs = require('./docDefs') 

let birth1700 = require("./json/"+docDefs.Birth1700.json);
let birth1800 = require("./json/"+docDefs.Birth1800.json);
let deathDocs = require("./json/"+docDefs.Death.json);
let marriages = require("./json/"+docDefs.Marriage.json);
let types = {
    [docTypes.Birth_1700] : birth1700, 
    [docTypes.Birth_1800] : birth1800, 
    [docTypes.Death]      : deathDocs, 
    [docTypes.Marriage]   : marriages
 };

 export function documentInit(){
     Object.entries(types).forEach(([key, value])=>{
        value.forEach((doc,i)=>{
            doc.key=key+"-"+i;
            doc.Type=key;
            doc.Url=docDefs.DocsBaseUrl+doc.Url;
        })
     })
 }

export function documentSearch ( params ){

    let result = [];

    let b1700 = search( birth1700, docTypes.Birth_1700, params, ["Name"], ["Family"], ["Godfather", "Godmother"] );
    let b1800 = search( birth1800, docTypes.Birth_1800, params, ["Name"], ["Father", "Mother"], ["Godfather", "Godmother"] );
    let death = search( deathDocs, docTypes.Death, params, ["Name"],["Father", "Mother", "Spouse"], ["Witness1","Witness2"])
    let marrg = search( marriages, docTypes.Marriage, params, ["Groom","Bride"],["GroomFather", "GroomMother", "BrideFather", "BrideMother"], [])

    result = result.concat(b1700);
    result = result.concat(b1800);
    result = result.concat(death);
    result = result.concat(marrg);

    result.sort((a,b)=>(a.Year-b.Year))

    return result;
}

export function documentByID( keyList ){
    let docs  = []
    if( keyList != null ){
        let keys = keyList.split(",")
        keys.forEach( (key)=>{
            let [type,num] = key.split("-")
            if( type && num ){
                docs.push(types[type][parseInt(num)]);
            }
        })
    }
    docs.sort((a,b)=>(a.Year-b.Year))
    return docs;
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
            let insert = true;
            if( params.name !== "" ) insert = searchField( doc, params.name, fields )
            if( insert ){
                list.push(doc)
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
import  {docTypes} from './docTypes'

let birth1700 = require("./json/Birth1700.json");

export function documentSearch ( params ){

    let result = [];

    let b1700 = search( birth1700, docTypes.Birth_1700, params, ["Name"], ["Family"], [], ["Godfather", "Godmother"] );

    result = result.concat(b1700);

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
                    Type : type
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
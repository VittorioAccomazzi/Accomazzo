const Utilities = require('./Utilities')
const docDefs = require('../docEngine/docDefs') 

let birth1700 = require("../docEngine/json/"+docDefs.Birth1700.json);
let birth1800 = require("../docEngine/json/"+docDefs.Birth1800.json);
let deathDocs = require("../docEngine/json/"+docDefs.Death.json);
let marriages = require("../docEngine/json/"+docDefs.Marriage.json);

let safeWords =[
    "SECUNDA",
    "MARITO",
    "MOGLIE",
    "FIGLIO",
    "FIGLIA",
    "FIGLIE",
    "FRATELLI",
    "GERMANICO",
    "TRANQUILLA",
    "ANGELI",
    "LUCA"
];

( async () => {

    // generate the list of names with occurrences for each one
    
    let b1700 = Utilities.Extract( birth1700, ["Name", "Family","Godfather", "Godmother"] ,docDefs.IgnoreKey);
    let b1800 = Utilities.Extract( birth1800, ["Name", "Father", "Mother","Godfather", "Godmother"],docDefs.IgnoreKey );
    let death = Utilities.Extract( deathDocs, ["Name","Father", "Mother", "Spouse","Witness1","Witness2"],docDefs.IgnoreKey)
    let marrg = Utilities.Extract( marriages, ["Groom","Bride", "GroomFather", "GroomMother", "BrideFather", "BrideMother"],docDefs.IgnoreKey)

    let names = merge(b1700, merge(b1800,merge(death,marrg)))

    // now fix the spelling
    let fixList =  Utilities.Fixes(names, safeWords);

    fixList = Utilities.Capitalize(fixList,["src","dst"])
    
    let [,b1700fix] = Utilities.Replace( birth1700, ["Name", "Family","Godfather", "Godmother"],fixList);
    let [,b1800fix] = Utilities.Replace( birth1800, ["Name", "Father", "Mother","Godfather", "Godmother"],fixList );
    let [,deathfix] = Utilities.Replace( deathDocs, ["Name","Father", "Mother", "Spouse","Witness1","Witness2"],fixList)
    let [,marrgfix] = Utilities.Replace( marriages, ["Groom","Bride", "GroomFather", "GroomMother", "BrideFather", "BrideMother"],fixList)

    // check that the number of substitution is what was expected
    if( fixList.length != b1700fix+b1800fix+deathfix+marrgfix ){
        // coding error. needs to be investigated
        throw new Error (`identified ${fixList.length} substitution, but performed ${b1700fix+b1800fix+deathfix+marrgfix}`)
    }

    // sort the names alphabetically
    names = names.sort((a,b)=> ( a.name > b.name ? 1 : -1 )) 

    // capitalize the names
    names = Utilities.Capitalize(names,["name"]);
    Utilities.SaveCsv(names, ["name","num"], docDefs.PublicFolder+docDefs.NameInfo); // save the list
    Utilities.SaveCsv(fixList, ["src","dst"], docDefs.PublicFolder+docDefs.NameFixes)

    Utilities.SaveJson(names.map(name=> name.name), docDefs.JsonFolder+docDefs.NameAutocmpl); // save only the names, not frequency.
    Utilities.SaveJson(birth1700, docDefs.JsonFolder+docDefs.Birth1700.json);
    Utilities.SaveJson(birth1800, docDefs.JsonFolder+docDefs.Birth1800.json); 
    Utilities.SaveJson(deathDocs, docDefs.JsonFolder+docDefs.Death.json); 
    Utilities.SaveJson(marriages, docDefs.JsonFolder+docDefs.Marriage.json);
})();




function merge( src, dst ){
    src.forEach((e)=>{
        let index = dst.findIndex((i)=> i.name == e.name)
        if( index ===-1){
            dst.push(e)
        } else {
            dst[index].num += e.num
        }
    })
    return dst;
}


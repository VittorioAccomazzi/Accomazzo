const Utilities = require('./Utilities')
const docDefs = require('../docEngine/docDefs') 

let birth1700 = require("../docEngine/json/"+docDefs.Birth1700.json);
let birth1800 = require("../docEngine/json/"+docDefs.Birth1800.json);
let deathDocs = require("../docEngine/json/"+docDefs.Death.json);
let marriages = require("../docEngine/json/"+docDefs.Marriage.json);


( async () => {

    // generate the list of names with occurrences for each one
    
    let b1700 = extract( birth1700, ["Name", "Family","Godfather", "Godmother"] );
    let b1800 = extract( birth1800, ["Name", "Father", "Mother","Godfather", "Godmother"] );
    let death = extract( deathDocs, ["Name","Father", "Mother", "Spouse","Witness1","Witness2"])
    let marrg = extract( marriages, ["Groom","Bride", "GroomFather", "GroomMother", "BrideFather", "BrideMother"])

    let names = merge(b1700, merge(b1800,merge(death,marrg)))

    names = capitalize(names);

    // sort by frequency
    names = names.sort((a,b)=> ( a.num > b.num ? 1 : -1 ))
    Utilities.SaveCsv(names, ["name","num"], docDefs.JsonFolder+docDefs.NameInfo);


    let dstPath = docDefs.JsonFolder+docDefs.NameAutocmpl;
    Utilities.SaveJson(names.map(name=> name.name), dstPath); // save only the names, not frequency.

})();


function extract( list, fields ){
    let names = [];
    list.forEach((item)=>{
        fields.forEach((f)=>{
            let val = item[f];
            if( val && val !== "" ){
                 let words = val.split(" ");
                 words.forEach((w)=>{
                    w = w.toUpperCase().trim().
                            replace(/\./g,"").
                            replace(/\(/g,"").
                            replace(/\)/g,"").
                            replace(/\"/g,"").
                            replace(/\?/g,"").
                            replace(/[0-9]/g,"")
                     if( w.length > 3 ){
                         if( w.indexOf(docDefs.AccoKey) ===-1 ){
                            let index = names.findIndex((v)=> v.name == w)
                            if( index === -1 ) {
                                names.push({ name: w, num:1})
                            } else  {
                                names[index].num++
                            }
                         }
                     }
                 })
            }
        })
    })
    return names;
}

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

function capitalize( names ){
    for(let i=0; i<names.length; i++ ){
        let name = names[i].name
        names[i].name = name.charAt(0).toUpperCase()+name.slice(1).toLowerCase();
    }
    return names;
}
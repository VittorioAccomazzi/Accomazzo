const Utilities = require('./Utilities');
const fs = require('fs');
const docDefs = require('../docEngine/docDefs');
const {disclaimerEn, disclaimerIt, regEx, ancestryRegEx} = require('../docEngine/docDisclaimer');

let birth1700 = require("../docEngine/json/"+docDefs.Birth1700.json);
let birth1800 = require("../docEngine/json/"+docDefs.Birth1800.json);
let deathDocs = require("../docEngine/json/"+docDefs.Death.json);
let marriages = require("../docEngine/json/"+docDefs.Marriage.json);

let cDocs = [] ; // documents of the church
let aDocs = [] ; // documents of ancestry.com
let oDocs = [] ; // other documents

// compile the list of documents
birth1700.forEach(( element, index ) => process(element,'birth.png' ,`https://accomazzo.org/?show=Birth_1700-${index}`));
birth1800.forEach(( element, index ) => process(element,'birth.png' ,`https://accomazzo.org/?show=Birth_1800-${index}`));
deathDocs.forEach(( element, index ) => process(element,'death.png' ,`https://accomazzo.org/?show=Death-${index}`));
marriages.forEach(( element, index ) => process(element,'marrige.png',`https://accomazzo.org/?show=Marriage-${index}`));

//  sort each one
cDocs.sort((a,b)=>a.Year-b.Year);
aDocs.sort((a,b)=>a.Year-b.Year);
oDocs.sort((a,b)=>a.Year-b.Year);

writeReport( cDocs, 
    `Church Documents - Documenti della Diocesi`,
    `This page lists all the document of the Church published in the Accomazzo.org web site. There are a total of <b>${cDocs.length}</b> documents. <br/>\
    Questa pagina lista  tutti i documenti della Diocesi publicati in Accomazzo.org. Sono un totale di <b>${cDocs.length}</b> documenti  `,
    `${disclaimerEn}<br/>${disclaimerIt}`,
    'Church.html'
    );

writeReport( aDocs, 
    `Ancetry.com Documents`,
    `This page list all the Ancestry.com documents references in the Accomazzo.org web site. There are a total of <b>${aDocs.length}</b> documents. `,
    null,
    'Ancestry.html'
    );

    writeReport( oDocs, 
        `Municipality Documents`,
        `This page lists all the documents retrieved from municipalities and cemeteries, referenced on Accomazzo.org. There are a total of <b>${oDocs.length}</b> documents. `,
        null,
        'Other.html'
        );


function writeReport( docs, title, introduction, disclaimer, outputFile ) {
    let template = fs.readFileSync(`src/docEngine/${docDefs.ReportTemplate}`,'utf8');
    let { doc, rowTemplate } = extractRowTemplate( template );
    doc = doc.replaceAll("{DocumentListTitle}",title);
    doc = doc.replaceAll("{Introduction}",introduction);
    doc = doc.replaceAll("{Disclaimer}", disclaimer ?? "" );
    docs.forEach(el=>{
        doc = doc.replace("NEXT_LINE",rowTemplate);
        doc = doc.replace("{year}",el.Year);
        doc = doc.replace("{type}",el.Type)
        doc = doc.replace("{url}",el.Link);
        doc = doc.replace("{document}",el.Desciption);
    })
    doc = doc.replaceAll('NEXT_LINE','');
    fs.writeFileSync(docDefs.PublicFolder+'/'+outputFile, doc);
}

function extractRowTemplate( template ){
    const sKey = '_S';
    const eKey = '_E';
    let sIndx = template.indexOf(sKey);
    let eIndx = template.indexOf(eKey);
    let rowTemplate = template.substring(sIndx+sKey.length,eIndx);
    let doc = template.substring(0,sIndx)+template.substring(eIndx+eKey.length,template.length);
    return {doc, rowTemplate};
}


function process( element, type,link ){
    const el = {
        Year : element.Year,
        Type : type,
        Link : link,
        Desciption : element.Name || element.Groom +' and ' + element.Bride
    }
    if( element.Url.match(regEx)) {
        cDocs.push(el);
    } else if ( element.Url.match(ancestryRegEx)) {
        aDocs.push(el);
    } else oDocs.push(el)
}
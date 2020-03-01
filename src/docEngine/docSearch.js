import  {docTypes} from './docTypes'

export default function documentSearch ( name, fromYear, toYear, includeParents, includeWitness ){
    let result = [];

    result.push({
        "Type" : docTypes.Birth_1700,
        "Year" : 1768,
        "Url"  : "https://upload.wikimedia.org/wikipedia/en/f/fa/Birth_Certificate_Ana_de_Caboga.jpg",
        "Name" : "Jean "+name,
        "Family" : "Gian Battista e Giuseppina",
        "Godfather" : "Giovanni Accomazzo, fratello",
        "Godmother" : "Francesca Gambertolio"
    })

    result.push({
        "Type" : docTypes.Birth_1700,
        "Year" : 1788,
        "Url"  : "http://www.emersonkent.com/images/madero_birth_certificate.jpg",
        "Name" : name +" Maria",
        "Family" : "Giuseppe e Giuseppina",
        "Godfather" : "Paolo Accomazzo, fratello",
        "Godmother" : "Angela Gambertolio"
    })


    result.push({
        "Type" : docTypes.Birth_1800,
        "Year" : 1868,
        "Url"  : "http://www.genealogyintime.com/Images/South%20Africa%201919%20marriage%20certificate.JPG",
        "Name" : name +" Giuseppe Antonio Francesco",
        "Father" : "Giovanni  Accomazzo",
        "Mother" : "Trombetta Teresa",
        "Godfather" : "Paolo Accomazzo, fratello",
        "Godmother" : "Angela Gambertolio"
    })

    result.push({
        "Type" : docTypes.Death,
        "Year" : 1842,
        "Url"  : "https://www.familytreemagazine.com/wp-content/uploads/2017/08/FTSeptember20055Cimages5Cp20-001.jpg",
        "Name" : name,
        "Spouse" : "Cogniuge di "+name,
        "Father" : "Giovanni  Accomazzo",
        "Mother" : "Trombetta Teresa",
        "Witness1" : "Paolo Accomazzo, fratello",
        "Witness2" : "Accomazzi Giacomo"
    })

    result.push({
        "Type" : docTypes.Marriage,
        "Year" : 1822,
        "Url"  : "https://thumbs.worthpoint.com/zoom/images4/1/0317/21/1850-antique-marriage-certificate_1_118c019f0c2498643ba47e74622bb36f.jpg",
        "Groom" : name,
        "Bride"  : "Giovanna Luigia",
        "GroomFather" : "Luigi Accomazzo",
        "GroomMother" : "Giovanna Maranzana",
        "BrideFather" : "Giu sppe Accomazzo",
        "BrideMother" : "Maria Delle Volpe",
        "Witness1" : "Paolo Accomazzo, fratello",
        "Witness2" : "Accomazzi Giacomo"
    })
  
    return result;

}
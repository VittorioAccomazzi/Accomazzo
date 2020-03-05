import  {docTypes} from './docTypes'

let lengh = 2;

export default function documentSearch ( params ){
    let result = [];

    result.push({
        "Type" : docTypes.Birth_1700,
        "key"  : docTypes.Birth_1700+"1",
        "Year" : 1768,
        "Url"  : "https://upload.wikimedia.org/wikipedia/en/f/fa/Birth_Certificate_Ana_de_Caboga.jpg",
        "Name" : "Jean "+params.name,
        "Family" : "Gian Battista e Giuseppina",
        "Godfather" : "Giovanni Accomazzo, fratello",
        "Godmother" : "Francesca Gambertolio"
    })

    result.push({
        "Type" : docTypes.Birth_1700,
        "key"  : docTypes.Birth_1700+"2",
        "Year" : 1788,
        "Url"  : "http://www.emersonkent.com/images/madero_birth_certificate.jpg",
        "Name" : params.name +" Maria",
        "Family" : "Giuseppe e Giuseppina",
        "Godfather" : "Paolo Accomazzo, fratello",
        "Godmother" : "Angela Gambertolio"
    })


    result.push({
        "Type" : docTypes.Birth_1800,
        "key"  : docTypes.Birth_1800+"1",
        "Year" : 1868,
        "Url"  : "http://www.genealogyintime.com/Images/South%20Africa%201919%20marriage%20certificate.JPG",
        "Name" : params.name +" Giuseppe Antonio Francesco",
        "Father" : "Giovanni  Accomazzo",
        "Mother" : "Trombetta Teresa",
        "Godfather" : "Paolo Accomazzo, fratello",
        "Godmother" : "Angela Gambertolio"
    })

    result.push({
        "Type" : docTypes.Death,
        "key"  : docTypes.Death+"1",
        "Year" : 1842,
        "Url"  : "https://www.familytreemagazine.com/wp-content/uploads/2017/08/FTSeptember20055Cimages5Cp20-001.jpg",
        "Name" : params.name,
        "Spouse" : "Cogniuge di "+params.name,
        "Father" : "Giovanni  Accomazzo",
        "Mother" : "Trombetta Teresa",
        "Witness1" : "Paolo Accomazzo, fratello",
        "Witness2" : "Accomazzi Giacomo"
    })

    result.push({
        "Type" : docTypes.Marriage,
        "key"  : docTypes.Marriage+"1",       
        "Year" : 1822,
        "Url"  : "https://i.etsystatic.com/16396551/r/il/e61127/1498002983/il_794xN.1498002983_ectx.jpg",
        "Groom" : params.name,
        "Bride"  : "Giovanna Luigia",
        "GroomFather" : "Luigi Accomazzo",
        "GroomMother" : "Giovanna Maranzana",
        "BrideFather" : "Giusppe Accomazzo",
        "BrideMother" : "Maria Delle Volpe",
        "Witness1" : "Paolo Accomazzo, fratello",
        "Witness2" : "Accomazzi Giacomo"
    })
  
    let final = [];

    for( let i=0; i<lengh; i++ ){
        result.forEach((v)=>{
            let tmp ={}
            Object.assign(tmp,v);
            v.key+=i;
            final.push(tmp);
        })
    }

    lengh += 5;
    return final;
}
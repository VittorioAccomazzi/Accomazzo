const Utilities = require('./Utilities')
const readline = require('readline');
const docDefs = require('../docEngine/docDefs') 
const fs = require('fs');
const fsPromise = require('fs').promises;
const srcCsv="Data/latin - birth.csv"
const srcImg= null; // do not copy the image
const dstFld= null; // do not check the image path



// process the record of the 1700s. 
// if srcImg and dstFld are defined it will also copy the images in the desition folder for s3.
// Otherwise it will just create the json file from  the csv in Data/


( async  () => {
    // check that input file exists
    if( !fs.existsSync(srcCsv ) ){
        console.error("Error : file "+srcCsv+" not found !");
        process.exit(-1);
    }

    try
    {
        // Create folder for json
        await fsPromise.mkdir(docDefs.JsonFolder)
    } catch {
        // ignore, since it will therow if the folder exist.
    }

    if( dstFld ){
        // Create destination folder
        await fsPromise.mkdir(dstFld+docDefs.Birth1700.folder, {recursive:true});
    }

    // iterate on input file, this was written manully.
    const rl = readline.createInterface({
        input:  fs.createReadStream(srcCsv),
        output: null
    });

    let docs = [];
    let processAll = false;
    const CalianoDocuments = "Documenti Calliano"
    

    rl.on('line', async (line)=>{

        // after we entounter the title of the Caliano document process them all.
        if( !processAll ) processAll = line.indexOf(CalianoDocuments)>=0;

        
        if( line ){
            if( line.toUpperCase().indexOf(docDefs.AccoKey)> 0 || processAll){
                try
                {
                    let items = Utilities.SlitCsv(line);
                    let imgPath = items[0]+".jpg"
                    if( items.length > 5 ){
                        let doc ={
                            Url  : docDefs.Birth1700.folder+imgPath,
                            Year : parseInt (items[1] ),
                            Name : items[2],
                            Family : items[3],
                            Godfather : items[5],
                            Godmother : items[6]
                        }
                        if( doc.Year <1000 || doc.Year > 1950 || isNaN(doc.Year) || doc.Year===null ){
                            console.warn(`[Warning] the year for line [${line}] seems wrong, not included`)
                            return
                        }
                        if( dstFld ){
                            let validImage =  await Utilities.ValidateImage(imgPath, dstFld, docDefs.Birth1700.folder, srcImg);
                            if( !validImage ) console.error(`[ERROR] image ${imgPath} not found !`)
                        }
                        docs.push(doc)
                    } else {
                        console.log(`[WARNING] : Line Malformed [${line}]`)
                    }
                } catch ( ex ){
                    console.warn(`Exception : ${ex.Message}\n for line [${line}]`)
                }
            } else {
                //console.log("Line rejected : "+line)
            }
        }

    }) 

    // save result.
    rl.on('close', ()=>{
        // Save Resulting json.
        let dstPath = docDefs.JsonFolder+docDefs.Birth1700.json;
        Utilities.SaveJson(docs, dstPath);
    })
})()



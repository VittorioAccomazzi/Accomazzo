const Utilities = require('./Utilities')
const readline = require('readline');
const docDefs = require('../docEngine/docDefs') 
const fs = require('fs');
const fsPromise = require('fs').promises;
const srcCsv="Data/Death - Data.csv"
const srcImg= null; // do not copy the image
const dstFld= null; // do not check the image path

// process the record of Death. 
// if srcImg and dstFld are defined it will also copy the images in the desition folder. That  folder 
// should them be uploaded on S3. Otherwise it will just create the json file from  the csv in Data/


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
        await fsPromise.mkdir(dstFld+docDefs.Death.folder, {recursive:true});
    }

    // iterate on input file, this was written manully.
    const rl = readline.createInterface({
        input:  fs.createReadStream(srcCsv),
        output: null
    });

    let docs = [];

    rl.on('line', async (line)=>{
        if( line ){
            try
            {
                let items = Utilities.SlitCsv(line);
                if( items.length > 12 ){
                    let imgPath = items[0].trim()
                    let year = imgPath.substr(0,4);
                    imgPath += ".jpg"
                    let doc ={
                        Url  : docDefs.Death.folder+imgPath,
                        Year : parseInt(year),
                        Name : items[1],
                        Spouse : items[5],
                        Father : items[6],
                        Mother : items[8],
                        Witness1 : items[10],
                        Witness2 : items[13]
                    }

                    // sanity check. This will get a rid of lines which are comments.
                    if( doc.Year <1000 || doc.Year > 1950 || isNaN(doc.Year) || doc.Name === "" ){
                        console.warn(`[Warning] the year for line [${line}] seems wrong. Not included`)
                        return;
                    }

                    // copy images if necessary                    
                    if( dstFld ){
                        let validImage =  await Utilities.ValidateImage(imgPath, dstFld, docDefs.Death.folder, srcImg);
                        if( !validImage ) console.error(`[ERROR] image ${imgPath} not found !`)
                    }

                    // add to the list.
                    docs.push(doc)
                } else {
                    console.log(`[WARNING] : Line Malformed [${line}]`)
                }
            } catch ( ex ){
                console.warn(`Exception : ${ex.Message}\n for line [${line}]`)
            }
       }

    }) 

    // save result.
    rl.on('close', ()=>{
        // Save Resulting json.
        let dstPath = docDefs.JsonFolder+docDefs.Death.json;
        Utilities.SaveJson(docs, dstPath);
    })
})()



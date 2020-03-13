 
 const fs = require('fs');
 const fsPromise = require('fs').promises;

 /*********************************************************/
 /**                                                     **/
 /**                 Utility functions                   **/
 /**                                                     **/
 /*********************************************************/

 exports.ValidateImage = async function ( imgPath, dstFld, dstImg, srcImg ) {
    let dstPath= dstFld+ dstImg+ imgPath;
    let found = false;
    if( ! fs.existsSync( dstPath )){
        // check if we need to copy
        if( srcImg ){
            let srcPath = srcImg+imgPath;
            try{
                if(fs.existsSync(srcPath) ){
                // then copy
                await fsPromise.copyFile(srcPath, dstPath);
                found = true;
                } 
            } catch(ex) {
                console.err(`Unable to find file ${srcPath} with error ${ex.Message}`);
            }
        }
    } else {
        found=true;
    }
    return found;
}

exports.SaveJson = function( json, filePath ){
    try
    {
        fs.writeFileSync(filePath, JSON.stringify(json));
        console.log(`**** Processing completed. Created ${filePath}`)
    } catch( ex ){
        console.error(`Error : unable to save file ${filePath} because of ${ex.message}` );
    }   
}

exports.SaveCsv= function( list, fields, filePath ){
    var logger = fs.createWriteStream(filePath, {
        flags: 'w' 
      })
    // write headers
    fields.forEach((f,i)=>{
        logger.write(f)
        if(i !== fields.length-1){
            logger.write(",")
        } else {
            logger.write("\n")
        }
    })

    // write data
    list.forEach((el)=>{
        fields.forEach((f,i)=>{
            logger.write(el[f].toString())
            if(i !== fields.length-1){
                logger.write(",")
            } else {
                logger.write("\n")
            }
        })
    })

    logger.end();
}

// there are several blog in using regEx
// since I don't understand them and I find 
// difficult to debug I write it the simple way.
// for us it is done offline anyway.
exports.SlitCsv = function ( line ){
    let out= [];
    let cur="";
    let quote=false;
    let p='';

    for( let i=0; i<line.length; i++ ){
        let c = line[i];
        switch( c ){
            case ',' :
                if( !quote ){
                    out.push(cur);
                    cur="";
                } else {
                    cur += c;
                }
                break;
            case '"':
                if( !quote && p==='"'){
                    cur += c; // if the previus one is a quote, we quote  a quote.
                } 
                quote = !quote;
                break;
            default :
                cur += c;
                break;
        }
        p=c;
    }
    out.push(cur);

    return out;
}

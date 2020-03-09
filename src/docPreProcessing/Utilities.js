 
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

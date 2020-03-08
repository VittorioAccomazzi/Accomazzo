 
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
                } else {
                    console.warn("Unable to find file "+srcPath);
                }
            } catch(ex) {
                console.warn("Unable to find file "+srcPath+" ("+ex.Message+")");
            }
        }
    } else {
        found=true;
    }
    return found;
}


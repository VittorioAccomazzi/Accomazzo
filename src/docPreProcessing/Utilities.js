 
 const fs = require('fs');
 const fsPromise = require('fs').promises;
 const levenshtein = require('levenshtein-edit-distance')

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

// Fixes looks at the names with low occurence (less or equal FixesMaxThr)
// and see if their Levenshtein is close (less then FoxesLevThr) to a name
// with hi occurrence (above FixesMaxThr). In such case it is considered a
// a typo and added to the list for replacement
exports.FixesMaxThr = 1;
exports.FixesMinThr = 3;
exports.FoxesLevThr = 1;
exports.Fixes = function( names, safeWords = [] ){
    // sort name increasing order
    names = names.sort((a,b)=> ( a.num > b.num ? 1 : -1 )) 
    let fixList = [];

    //  find the possible fixes
    for( let t=0; t< names.length; t++ ){
        if( names[t].num <= exports.FixesMaxThr ){
            for( let j=names.length-1; j>=0; j-- ){
                if( names[j].num >= exports.FixesMinThr && safeWords.indexOf(names[t].name)==-1){
                    if( levenshtein(names[t].name, names[j].name )<= exports.FoxesLevThr ){
                        // make the correction
                        fixList.push({
                            src : names[t].name,
                            dst : names[j].name
                        })
                        break;
                    }
                }
            }
        }
    }

    // remove the fix from the list
    fixList.forEach((f)=>{
        let index = names.findIndex((e)=> e.name == f.src);
        names.splice(index,1)
        index = names.findIndex((e)=> e.name == f.dst);
        names[index].num++
    })

    return fixList;
}

function splitInWords( line ){
    let out = []
    let clean = line.toUpperCase().trim().
                replace(/\./g," ").
                replace(/\(/g," ").
                replace(/\)/g," ").
                replace(/\"/g," ").
                replace(/\?/g," ").
                replace(/[0-9]/g," ").
                replace(/\,/g," ")
    let words = clean.split(" ");
    words.forEach((w)=>{
        w = w.trim();
        if( w.length > 3 ){
            out.push(w);
        }
    })
    return out;
}

// Extract the words from a list of records.
exports.Extract = function ( list, fields, accoKey ){
    let names = [];
    list.forEach((item)=>{
        fields.forEach((f)=>{
            let val = item[f];
            if( val && val !== "" ){
                 let words = splitInWords(val);
                 words.forEach((w)=>{
                    if( w.indexOf(accoKey) ===-1 ){
                        let index = names.findIndex((v)=> v.name == w)
                        if( index === -1 ) {
                            names.push({ name: w, num:1})
                        } else  {
                            names[index].num++
                        }
                    }
                 })
            }
        })
    })
    return names;
}

exports.Replace = function ( list, fields, fixList ){
    let numSub =0;
    list.forEach((el)=>{
        fields.forEach((f)=>{
            let words = splitInWords(el[f]);
            fixList.forEach((x)=>{
                words.forEach((w)=>{
                    if( x.src.toUpperCase() === w){
                        // need to do a substitution
                        let idx = el[f].toUpperCase().indexOf(w);
                        if( idx >=0 ){
                            // need to be replaced.
                            let src = el[f].substring(idx, idx+x.src.length); // string with proper capitalization
                            el[f] = el[f].replace(src, x.dst);
                            numSub++;
                        } else {
                            // coding error. It shall be investigated
                            throw new Error (`word ${w} expcted in line ${el[f]} but not found !`)
                        }
                    }
                })
            })
        })
    })
    return [list, numSub];
}

exports.Capitalize = function ( list, fields ){
    list.forEach((l)=>{
        fields.forEach((f)=>{
            let val = l[f];
            l[f] = val.charAt(0).toUpperCase()+val.slice(1).toLowerCase();
        })
    })
    return list;
}
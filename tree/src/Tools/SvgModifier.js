const fs = require('fs');
const readline = require('readline');

( async ()=>{

    let srcFile = 'src/components/AccomazzoFamilyTree.tmp';
    let tlpFile = 'src/components/AccomazzoFamilyTree.tpl.js'
    let dstFile = 'src/components/AccomazzoFamilyTree.js';
    let parsing= false;
    let svg=""


    if( !fs.existsSync(srcFile ) ){
        console.error("Error : file "+srcFile+" not found !");
        exit;
    }

    const rl = readline.createInterface({
        input:  fs.createReadStream(srcFile),
        output: null
    });


    rl.on('line', async (line)=>{
        tline = line.trim();

        if( !parsing ) parsing = tline.startsWith("<svg")

        if( parsing ){
            let l=extract('xlinkHref="', '"', tline);
            if ( l ){
                line = ''; // remove the link
            }
            svg += line+"\n";
        } 

        if( parsing ) parsing = !(tline.startsWith("</svg>"))
       
    })

    rl.on('close', ()=>{
        let template = fs.readFileSync( tlpFile, 'utf8');
        let file = template.replace('<svg/>', svg);
        fs.writeFileSync(dstFile, file);
    })

})();


function extract( key, end, line ){
    let val = null;
    if( line.startsWith(key)){
        // extract the numbers following
        let eIndex = line.indexOf(end, key.length);
        if( eIndex >=0 ){
            val = line.substring(key.length, eIndex);
        }
    }
    return val;
}
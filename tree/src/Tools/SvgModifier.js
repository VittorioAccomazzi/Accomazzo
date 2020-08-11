const fs = require('fs');
const readline = require('readline');

( async ()=>{

    let srcFile = 'src/components/AccomazzoFamilyTree.tmp';
    let tlpFile = 'src/components/AccomazzoFamilyTree.tpl.js'
    let dstFile = 'src/components/AccomazzoFamilyTree.js';
    let parsing= false;
    let linkTag= false;
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
            if( !linkTag ) linkTag = startLink(line) || closeLink(line);
            if( !linkTag ) svg += line+"\n";
            if( linkTag ) linkTag = !closeTag(line);
        } 

        if( parsing ) parsing = !(tline.startsWith("</svg>"))
       
    })

    rl.on('close', ()=>{
        let template = fs.readFileSync( tlpFile, 'utf8');
        let file = template.replace('<svg/>', svg);
        fs.writeFileSync(dstFile, file);
    })

})();

function startLink( line ){
    return normalize(line).startsWith("<a");
}
function closeTag( line ){
    return normalize(line).indexOf(">") >=0;
}
function closeLink( line ){
    return normalize(line).startsWith("</a");
}
function normalize( line ){
   return line
        .replace(/\s/g, "") // remove all the spaces
        .toLowerCase(); 
}

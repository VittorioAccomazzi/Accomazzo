const fs = require('fs');
const readline = require('readline');

( async ()=>{

    let srcSite = 'https://accomazzo-app.s3.amazonaws.com/index.html';
    let dstSite = 'https://accomazzo.org/';
    let srcFile = 'src/components/AccomazzoFamilyTree.tmp';
    let dstFile = 'src/components/SvgInfo.json';
    let svgInfo = {
        list : []
    };

    if( !fs.existsSync(srcFile ) ){
        console.error("Error : file "+srcFile+" not found !");
        process.exit(-1);
    }

    const rl = readline.createInterface({
        input:  fs.createReadStream(srcFile),
        output: null
    });

    let lastLink = null;
    let lastPos  = null;
    let lastName = null;
    let lastDate = null;

    rl.on('line', async (line)=>{
        line = line.trim();

        let w = extract('width={', '}', line);
        if( w ) svgInfo.width = parseInt(w);

        let h = extract('height={', '}', line);
        if( h ) svgInfo.height=parseInt(h);

        let l=extract('xlinkHref="', '"', line);
        if ( l ){
            lastLink = l.replace(srcSite, dstSite);
            lastPos = null;
        } 

        let p=extract('<text fill="#000" transform="translate(', ')', line) ||  // extrat line for names.
              extract('<g transform="translate(',')', line);                    // extract line for circle.
        if( p ){
            lastPos = p.split(" ");
            lastName= null;
        } 

        let n=extract('{"','"', line);
        if( n ){ 
            if(n.startsWith('(')) lastDate =n
            else {
                lastName = n.replace(/^and /,"")
                            .replace(/^e /,"")
                            .replace(/ e$/,"")
                            .replace(/ and$/,"")
            }
        }

        let textClosed = extract('</tex','>', line);

        if( lastPos && textClosed ){
            svgInfo.list.push({
                name : lastName + ( lastDate ? " "+lastDate : "" ), 
                link : lastLink,
                pos : {
                    x : parseInt(lastPos[0]),
                    y : parseInt(lastPos[1])
                }
            })
            lastName = null;
            lastDate = null;
            lastLink = null;
            lastPos  = null;
        }
    })

    rl.on('close', ()=>{
        fs.writeFileSync(dstFile, JSON.stringify(svgInfo,null, ' '));
        console.log(`**** Processing completed. Created ${dstFile} width ${svgInfo.list.length} entries`)
    })

})();


function extract( key, end, line ){
    let val = null;
    let pos = line.indexOf(key);
    if( pos >=0 ){
        // extract the numbers following
        let eIndex = line.indexOf(end, pos+key.length);
        if( eIndex >=0 ){
            val = line.substring(pos+key.length, eIndex);
        }
    }
    return val;
}
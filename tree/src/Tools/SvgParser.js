const fs = require('fs');
const readline = require('readline');

( async ()=>{

    let srcFile = 'src/components/AccomazzoFamilyTree.tmp';
    let dstFile = 'src/components/SvgInfo.json';
    let svgInfo = {
        list : []
    };

    if( !fs.existsSync(srcFile ) ){
        console.error("Error : file "+srcFile+" not found !");
        exit;
    }

    const rl = readline.createInterface({
        input:  fs.createReadStream(srcFile),
        output: null
    });

    let lastLink = null;
    let lastPos  = null;
    let lastName = null;

    rl.on('line', async (line)=>{
        line = line.trim();

        let w = extract('width={', '}', line);
        if( w ) svgInfo.width = parseInt(w);

        let h = extract('height={', '}', line);
        if( h ) svgInfo.height=parseInt(h);

        let l=extract('xlinkHref="', '"', line);
        if ( l ){
            lastLink = l;
            lastPos = null;
        } 

        let p=extract('<text fill="#000" transform="translate(', ')', line);
        if( p ){
            lastPos = p.split(" ");
            lastName= null;
        } 

        let n=extract('{"','"', line);
        if( n ) lastName = n;

        if( lastLink && lastPos && lastName ){
            svgInfo.list.push({
                name : lastName,
                link : lastLink,
                pos : {
                    x : parseInt(lastPos[0]),
                    y : parseInt(lastPos[1])
                }
            })
            lastLink = null;
        }

    })

    rl.on('close', ()=>{
        fs.writeFileSync(dstFile, JSON.stringify(svgInfo,null, ' '));
        console.log(`**** Processing completed. Created ${dstFile} width ${svgInfo.list.length} entries`)
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
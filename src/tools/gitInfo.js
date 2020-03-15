const {exec} = require ('child-process-promise');
const Utilities = require ('../docPreProcessing/Utilities');


( async () =>{

    let gitInfo = {
        version : "developer"
    }

    try
    {
        let short = await exec('git rev-parse --short HEAD')
        let long  = await exec('git rev-parse HEAD')
        let stat  = await exec('git status')

        let status = stat.stdout;
        let isRel  = status.indexOf("nothing to commit, working tree clean") > 0;
        if( isRel ){
            gitInfo.version = short.stdout;
            gitInfo.long= long.stdout; 
        }
        Utilities.SaveJson(gitInfo, 'src/tools/gitInfo.json')
    } catch ( ex ){
        console.error( "Unable to get git info :"+ex.Message)
    }

})();

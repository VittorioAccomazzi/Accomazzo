const {exec} = require ('child-process-promise');
const Utilities = require ('../docPreProcessing/Utilities');


( async () =>{

    let gitInfo = {
        version : "developer"
    }

    try
    {
        let res = await exec('git rev-parse --short HEAD')
        let sts = await exec('git status')

        let status = sts.stdout;
        let isRel  = status.indexOf("nothing to commit, working tree clean") > 0;
        if( isRel ){
            gitInfo.version = res.stdout;
        }
        Utilities.SaveJson(gitInfo, 'src/tools/gitInfo.json')
    } catch ( ex ){
        console.error( "Unable to get git info :"+ex.Message)
    }

})();

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
        let isDev  = status.indexOf("Changes not staged") > 0 || status.indexOf("Changes to be committed") > 0;
        if( !isDev ){
            gitInfo.version = res.stdout;
        }
        Utilities.SaveJson(gitInfo, 'src/tools/gitInfo.json')
    } catch ( ex ){
        console.error( "Unable to get git info :"+ex.Message)
    }

})();

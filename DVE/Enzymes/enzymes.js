/**
 * Created by bgllj on 2016/7/12.
 */



// layerObjcet={
//     position:{
//         x:0,
//         y:2,
//         h:10,
//         w:10
//     }
//
//
// }

if (typeof window.__adobe_cep__ !== "undefined")
{
    var evalScript =  function(script, callback)
    {
        if(callback === null || callback === undefined)
        {
            callback = function(result){};
        }
        window.__adobe_cep__.evalScript(script, callback);
    };

    window.evalScript = evalScript;
}


var Enzymes = function ()
{
    if (typeof window.__adobe_cep__ == "undefined")
    {
        return "浏览器测试模式"
    }


    //初始化 extendScript 中的 Enzymes 库：
    var extendPath = cs.getSystemPath(SystemPath.EXTENSION)
    var Muclease_lib = extendPath + "/JSX/Muclease_lib.jsx"
    var Kinase_lib = extendPath + "/JSX/Kinase_lib.jsx"
    evalScript(`initEnzymes('${Muclease_lib}','${Kinase_lib}')`)


    return this;
}

/**
 * 创建新图层，可指定图层名，
 * @param layerName
 * @returns {Promise}
 */
Enzymes.prototype.creatLayer = async function (layerName)
{
    return new Promise(function (resolve, reject)
    {
        console.log(12312435)
        evalScript(`EnzJSX.creatLayer()`, (r)=> {resolve(r)})
    })
}

//------------------------------------------------------------------------
export default Enzymes;
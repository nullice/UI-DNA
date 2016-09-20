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
    var evalScript = window.__adobe_cep__.evalScript;
}



var Enzymes = function ()
{
    if (typeof window.__adobe_cep__ == "undefined")
    {
        return  "浏览器测试模式"
    }


    //初始化 extendScript 中的 Enzymes 库：
    var extendPath = cs.getSystemPath(SystemPath.EXTENSION)
    var Muclease_lib = extendPath + "/JSX/Muclease_lib.jsx"
    var Kinase_lib = extendPath + "/JSX/Kinase_lib.jsx"

    evalScript(`initEnzymes(${Muclease_lib},${Kinase_lib})`)


    return this;
}


Enzymes.prototype.creatLayer = async function ()
{
    return new Promise(function (resolve, reject)
    {
        setTimeout(()=>
        {
            console.log("sleep 2s");
            resolve()
        }, 2000)
    })
}

//------------------------------------------------------------------------
export default Enzymes;
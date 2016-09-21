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
    /**
     * 执行 extendScript 脚本，可指定回调函数。
     * @param script
     * @param callback
     */
    var evalScript = function (script, callback)
    {
        if (callback === null || callback === undefined)
        {
            callback = function (result) {};
        }
        window.__adobe_cep__.evalScript(script, callback);
    };

    window.evalScript = evalScript;

    /**
     * 测试用执行 extendScript 脚本，返回值输出控制台
     * @param script
     * @private
     */
    var _jsx = function (script)
    {
        evalScript(script, (e)=> {console.log(e)})
    };
    window._jsx = _jsx;


}

/**
 * Enzymes 类，封装 PhotoShop 相关操作。
 * @returns {*}
 * @constructor
 */
var Enzymes = function ()
{
    //避免在浏览器中测试时，终止运行。
    if (typeof window.__adobe_cep__ == "undefined")
    {
        return "浏览器测试模式"
    }


    //初始化 extendScript 中的 Enzymes 库：
    var extendPath = cs.getSystemPath(SystemPath.EXTENSION) //扩展所在路径
    evalScript(`initEnzymes('${extendPath}')`)


    return this;
}

/**
 * 创建新图层，可指定图层名，
 * @param layerName
 * @returns {Promise}
 */
Enzymes.prototype.createLayer = async function (layerName)
{
    return new Promise(function (resolve, reject)
    {
        // console.log(`EnzJSX.creatLayer(${'"' + layerName + '"' || ""})`)
        evalScript(`EnzJSX.creatLayer(${'"' + layerName + '"' || ""})`,
            (r)=> {resolve(r)})
    })
}


/**
 *
 * @param getType
 */
Enzymes.prototype.getAllLayerArray = async function (getType)
{
    return new Promise(function (resolve, reject)
    {
        if (getType == "id" || getType == 0)
        {
            evalScript(`EnzJSX.getAllLayersID()`,
                (r)=> {resolve(r)})
        } else if (getType == "id" || getType == 0)
        {

        } else
        {// [{name ,id ,itemIndex}]

            evalScript(`EnzJSX.getAllLayersList()`,
                (r)=> {resolve(r)})
        }
    })

}


/**
 * 获取图层名称，根据图层 ID
 * @param layerID
 * @returns {Promise}
 */
Enzymes.prototype.getLayerName_byID = async function (layerID)
{
    return new Promise(function (resolve, reject)
    {
        evalScript(`ki.layer.getLayerName_byID(${layerID})`,
            (r)=> {resolve(r)})
    })
}


//------------------------------------------------------------------------
export default Enzymes;
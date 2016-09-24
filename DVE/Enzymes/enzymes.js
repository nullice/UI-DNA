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
            (r)=> {resolve(Number(r))})
    })
}

/**
 * 删除图层，根据图层 ID。可用数组作为参数删除多个图层
 * @param id 图层 ID 或图层 ID 数组
 * @returns {Promise}
 */
Enzymes.prototype.deleteLayer = async function (id)
{
    return new Promise(function (resolve, reject)
    {
        evalScript(`EnzJSX.deletLayer(${JSON.stringify(id)})`,
            (r)=> {resolve(Number(r))})
    })
}


/**
 * 获取全部图层的名称、ID、itemIndex 信息的数组。根据给定的参数，可返回 4 种类型的数组：
 * 0.图层 [id]；
 * 1.图层 [itemIndex]；
 * 2.图层 [name]；
 * 3.图层 [{name,id,itemIndex}]
 * @param getType 0 或 "id" 返回 [id] 数组。1 或 "itemIndex" 返回 [itemIndex] 数组。2 或 "name" 返回 [name] 数组；其他或没有参数，返回  [{name,id,itemIndex}]
 */
Enzymes.prototype.getAllLayerArray = async function (getType)
{
    return new Promise(function (resolve, reject)
    {
        if (getType == "id" || getType == 0)
        {
            evalScript(`EnzJSX.getAllLayersID()`,
                (r)=> {resolve(JSON.parse(r))})

        } else if (getType == "itemIndex" || getType == 1)
        {
            evalScript(`EnzJSX.getAllLayersItemIndex()`,
                (r)=> {resolve(JSON.parse(r))})

        } else if (getType == "name" || getType == 2)
        {
            evalScript(`EnzJSX.getAllLayersName()`,
                (r)=> {resolve(JSON.parse(r))})

        } else
        {// [{name ,id ,itemIndex}]

            evalScript(`EnzJSX.getAllLayersList()`,
                (r)=> {resolve(JSON.parse(r))})
        }
    })

}

Enzymes.prototype.getSelectLayerArray = async function (getType)
{

    return new Promise(function (resolve, reject)
    {
        if (getType == "id" || getType == 0)
        {
            evalScript(`EnzJSX.getSelectLayerID()`,
                (r)=> {resolve(JSON.parse(r))})

        } else if (getType == "itemIndex" || getType == 1)
        {
            evalScript(`EnzJSX.getSelectLayerItemIndex()`,
                (r)=> {resolve(JSON.parse(r))})

        } else if (getType == "name" || getType == 2)
        {
            evalScript(`EnzJSX.getSelectLayerName()`,
                (r)=> {resolve(JSON.parse(r))})

        } else
        {// [{name ,id ,itemIndex}]

            evalScript(`EnzJSX.getSelectLayerArray()`,
                (r)=> {resolve(JSON.parse(r))})
        }
    })


}


/**
 * 检查图层的存在性。
 * @param layerHandle 检查凭据，可以是图层名称、ID、itemIndex
 * @param handleType 凭据类型，0||"id"、1||"itemIndex"、2||"name";
 * @param scanAll
 * @returns {Promise}
 */
Enzymes.prototype.checkLayerExist = async function (layerHandle, handleType, scanAll)
{
    return new Promise(function (resolve, reject)
        {
            if (scanAll === undefined)
            {
                scanAll = false;
            }

            evalScript(`EnzJSX.checkLayerExist("${layerHandle}", "${handleType}", ${scanAll})`,
                (r)=>
                {
                    var result = JSON.parse(r)
                    if (result != undefined)
                    {
                        var len = result.length;
                    } else
                    {
                        var len = 0;
                    }

                    var re = {
                        exist: result != undefined,
                        length: len,
                        layerList: result
                    }

                    resolve(re)

                })
        }
    )
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
        evalScript(
            `ki.layer.getLayerName_byID(${layerID})`
            ,
            (r)=> {resolve(r)})
    })
}


/**
 * 选中图层，根据图层 ID
 * @param layerID
 * @returns {Promise}
 */
Enzymes.prototype.selectLayer_byID = async function (layerID)
{
    return new Promise(function (resolve, reject)
    {
        evalScript(
            `ki.layer.selectLayer_byID(${layerID})`
            ,
            (r)=> {resolve(r)})
    })
}


/**
 * 保存当前各图层选中状态，把返回值用作 Enzymes.selectLoad() 的参数，能再现当前各图层选中状态
 * @param layerID
 * @returns {Promise}
 */
Enzymes.prototype.selectSave = async function (layerID)
{
    return new Promise(function (resolve, reject)
    {
        evalScript(
            `EnzJSX.selectSave()`
            ,
            (r)=> {resolve(JSON.parse(r))})
    })
}


/**
 * 再现各图层选中状态。参数为 id 数组，即使用  Enzymes.selectSave() 的返回值。
 * @param layerIDs
 * @returns {Promise}
 */
Enzymes.prototype.selectLoad = async function (layerIDs)
{
    return new Promise(function (resolve, reject)
    {
        evalScript(
            `EnzJSX.selectLoad([${layerIDs}])`
            ,
            (r)=> {resolve(r)})
    })
}


Enzymes.prototype.writeJSON = async function (rootName, itemName, json)
{
    return new Promise(function (resolve, reject)
    {
        evalScript(
            `EnzJSX.writeJSON("${rootName}", "${itemName}","${json}")`
            ,
            (r)=> {resolve(r)})
    })
}


Enzymes.prototype.readJSON = async function (rootName, itemName)
{
    return new Promise(function (resolve, reject)
    {
        console.log(`EnzJSX.readJSON("${rootName}", "${itemName}")`)
        evalScript(
            `EnzJSX.readJSON("${rootName}", "${itemName}")`
            ,
            (r)=> {resolve(r)})
    })
}


// Enzymes.prototype.readJSONDOM = async function (rootName, itemName)
// {
//     return new Promise(function (resolve, reject)
//     {
//         evalScript(
//             `EnzJSX.readJSONDOM("${rootName}", "${itemName}")`
//             ,
//             (r)=> {resolve(r)})
//     })
// }





//------------------------------------------------------------------------
export default Enzymes;
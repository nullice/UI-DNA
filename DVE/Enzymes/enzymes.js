/**
 * Created by bgllj on 2016/7/12.
 */


// Enzymes 酶
//--------------------------
// By nullice ui@nullice.com
// nullice.com
// license: LGPL


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
        evalScript(script, (e) => {console.log(e)})
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


Enzymes.prototype.colorHexToPsCMYK = async function (hex)
{
    return new Promise(function (resolve, reject)
    {
        var _jsxCode = `EnzJSX.colorHexToPsCMYK("${hex}")`;
        evalScript(_jsxCode,
            (r) => {resolve(JSON.parse(jsxBackCheck(r, _jsxCode)))})
    })
}


/**
 * 保存当前文档
 * @returns {Promise}
 */
Enzymes.prototype.saveActiveDocument = async function ()
{
    return new Promise(function (resolve, reject)
    {
        var _jsxCode = `Kinase.document.save_byActive()`;
        evalScript(_jsxCode,
            (r) => {resolve(Number(jsxBackCheck(r, _jsxCode)))})
    })
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
        var _jsxCode = `EnzJSX.creatLayer(${'"' + layerName + '"' || ""})`;
        evalScript(_jsxCode,
            (r) => {resolve(Number(jsxBackCheck(r, _jsxCode)))})
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

        var _jsxCode = `EnzJSX.deletLayer(${JSON.stringify(id)})`
        evalScript(_jsxCode,
            (r) => {resolve(Number(jsxBackCheck(r, _jsxCode)))})
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
            var _jsxCode = `EnzJSX.getAllLayersID()`
            evalScript(_jsxCode,
                (r) => {resolve(JSON.parse(jsxBackCheck(r, _jsxCode)))})

        } else if (getType == "itemIndex" || getType == 1)
        {
            var _jsxCode = `EnzJSX.getAllLayersItemIndex()`
            evalScript(_jsxCode,
                (r) => {resolve(JSON.parse(jsxBackCheck(r, _jsxCode)))})

        } else if (getType == "name" || getType == 2)
        {
            var _jsxCode = `EnzJSX.getAllLayersName()`
            evalScript(_jsxCode,
                (r) => {resolve(JSON.parse(jsxBackCheck(r, _jsxCode)))})

        } else
        {// [{name ,id ,itemIndex}]
            var _jsxCode = `EnzJSX.getAllLayersList()`
            evalScript(_jsxCode,
                (r) => {resolve(JSON.parse(jsxBackCheck(r, _jsxCode)))})
        }
    })

}

Enzymes.prototype.getSelectLayerArray = async function (getType)
{

    return new Promise(function (resolve, reject)
    {

        if (getType == "id" || getType == 0)
        {
            var _jsxCode = `EnzJSX.getSelectLayerID()`
            evalScript(_jsxCode,
                (r) => {resolve(JSON.parse(jsxBackCheck(r, _jsxCode)))})

        } else if (getType == "itemIndex" || getType == 1)
        {
            var _jsxCode = `EnzJSX.getSelectLayerItemIndex()`
            evalScript(_jsxCode,
                (r) => {resolve(JSON.parse(jsxBackCheck(r, _jsxCode)))})

        } else if (getType == "name" || getType == 2)
        {
            var _jsxCode = `EnzJSX.getSelectLayerName()`;
            evalScript(_jsxCode,
                (r) => {resolve(JSON.parse(jsxBackCheck(r, _jsxCode)))})

        } else
        {// [{name ,id ,itemIndex, type}]
            var _jsxCode = `EnzJSX.getSelectLayerArray()`
            evalScript(_jsxCode,
                (r) =>
                {
                    resolve(JSON.parse(jsxBackCheck(r, _jsxCode)))
                })
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

            var _jsxCode = `EnzJSX.checkLayerExist("${layerHandle}", "${handleType}", ${scanAll})`
            evalScript(_jsxCode,
                (r) =>
                {
                    var result = JSON.parse(jsxBackCheck(r, _jsxCode))
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
        var _jsxCode = `ki.layer.getLayerName_byID(${layerID})`
        evalScript(
            _jsxCode
            ,
            (r) => {resolve(jsxBackCheck(r, _jsxCode))})
    })
}


/**
 * 获取图层 ItemIndex ，根据图层 ID
 * @param layerID
 * @returns {Promise}
 */
Enzymes.prototype.getItemIndexBylayerID = async function (layerID)
{
    return new Promise(function (resolve, reject)
    {
        var _jsxCode = `Kinase.layer.getItemIndexBylayerID(${layerID})`
        evalScript(
            _jsxCode
            ,
            (r) => {resolve(jsxBackCheck(r, _jsxCode))})
    })
}


/**
 * 根据图层 ID 获取图层类型
 *
 * bitmap: 像素图层 layerKind:1
 * text: 文本图层 layerKind:3
 * shape: 形状 layerKind:4
 * smartObject: 智能对象 layerKind:5
 * layerSet: 图层组（包括画板）layerKind:7
 *
 *  var layerType = {
 *  typeName: "none",/图层类型名称 （Kinase 内部名称）/
 *  layerKind: null, /*Photoshop 内部属性值/
*   isLayerSet: Kinase.layer.isLayerSet(targetReference, target),/是否是图层组/
*   isArtBoard: Kinase.layer.isArtBoard(targetReference, target)/是否是画板/
* }
 *
 *
 *
 * @param layerID
 * @returns {Promise}
 */
Enzymes.prototype.getLayerType_byID = async function (layerID)
{
    return new Promise(function (resolve, reject)
    {
        var _jsxCode = `EnzJSX.getLayerType_byID(${layerID})`
        evalScript(
            _jsxCode
            ,

            (r) => {resolve(JSON.parse(jsxBackCheck(r, _jsxCode)))})
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
        var _jsxCode = `ki.layer.selectLayer_byID(${layerID})`
        evalScript(
            _jsxCode
            ,
            (r) => {resolve(jsxBackCheck(r, _jsxCode))})
    })
}

/**
 * 获取图层位置、尺寸信息。{x,y,w,h}
 * @param layerID
 * @returns {Promise}
 */
Enzymes.prototype.getLayerInfo_position_byId = async function (layerID)
{
    return new Promise(function (resolve, reject)
    {
        var _jsxCode = `EnzJSX.getLayerInfo_position_byId(${layerID})`
        evalScript(
            _jsxCode
            ,
            (r) => {resolve(JSON.parse(jsxBackCheck(r, _jsxCode)))})
    })

}


/**
 * 设置图层位置、尺寸信息。
 * @param boundsInfo {x:新的 X 坐标, y：新的 Y 坐标, w：新的宽度, h：新的高度，centerState：锚点位置（默认左上角，8为中心）}
 * @param doSelect 设置前是否先选中指定图层。当确定当前图层就是指定图层时可设为 false 加快速度。
 * @returns {Promise}
 */
Enzymes.prototype.setLayerInfo_position_byId = async function (boundsInfo, layerID, doSelect)
{
    return new Promise(function (resolve, reject)
        {
            var doSelect = doSelect || false;
            var obJson = JSON.stringify(boundsInfo)
            evalScript(
                `EnzJSX.setLayerInfo_position_byId(${obJson} ,${layerID},${doSelect} )`,
                (r) => {resolve(r)})
        }
    )
}

/**
 * 获取图层文本信息。
 * @param layerID
 * @returns {Promise}
 */
Enzymes.prototype.getLayerInfo_text_byId = async function (layerID)
{
    return new Promise(function (resolve, reject)
    {
        var _jsxCode = `EnzJSX.getLayerInfo_text_byId(${layerID})`
        evalScript(
            _jsxCode
            ,
            (r) => {resolve(JSON.parse(jsxBackCheck(r, _jsxCode)))})
    })

}

/**
 * 设置文本图层信息
 * @param textInfo
 * @param layerID
 * @param doSelect
 * @returns {Promise}
 */
Enzymes.prototype.setLayerInfo_text_byId = async function (textInfo, layerID, doSelect)
{
    return new Promise(function (resolve, reject)
        {
            var doSelect = doSelect || false;
            var obJson = JSON.stringify(textInfo);
            var _jsxCode = `EnzJSX.setLayerInfo_text_byId(${obJson}, ${layerID}, ${doSelect})`
            evalScript(
                _jsxCode,
                (r) => {resolve(jsxBackCheck(r, _jsxCode))})
        }
    )
}

/**
 * 获取图层形状信息。
 * @param layerID
 * @returns {Promise}
 */
Enzymes.prototype.getLayerInfo_shape_byId = async function (layerID)
{
    return new Promise(function (resolve, reject)
    {
        var _jsxCode = `EnzJSX.getLayerInfo_shape_byId(${layerID})`
        evalScript(
            _jsxCode
            ,
            (r) => {resolve(JSON.parse(jsxBackCheck(r, _jsxCode)))})
    })

}


/**
 * 设置图层形状信息。会导致选中指定图层。
 * @param shapeInfo
 * @param layerID
 * @returns {Promise}
 */
Enzymes.prototype.setLayerInfo_shape_byId = async function (shape, layerID)
{
    return new Promise(function (resolve, reject)
        {
            var obJson = JSON.stringify(shape);
            var _jsxCode = `EnzJSX.setLayerInfo_shape_byId(${obJson} ,${layerID} )`
            evalScript(
                _jsxCode,
                (r) => {resolve(jsxBackCheck(r, _jsxCode))})
        }
    )
}


/**
 * 获取图层智能对象信息。
 * smartInfo = {
    linked: null, /!*是否为链接对象*!/
    link: null, /!*链接地址*!/
    fileReference: null, /!*链接文件名*!/
    }

 * @param layerID
 * @returns {Promise}
 */
Enzymes.prototype.getLayerInfo_smartObject_byId = async function (layerID)
{
    return new Promise(function (resolve, reject)
    {
        var _jsxCode = `EnzJSX.getLayerInfo_smartObject_byId(${layerID})`
        evalScript(
            _jsxCode
            ,
            (r) => {resolve(JSON.parse(jsxBackCheck(r, _jsxCode)))})
    })
}

/**
 * 设置图层智能对象
 * @param smartObject
 * @param layerID
 * @returns {Promise}
 */
Enzymes.prototype.setLayerInfo_smartObject_byId = async function (smartObject, layerID, doSelect)
{

//     * smartInfo = {
//     linked: null, /!*是否为链接对象*!/
//     link: null, /!*链接地址*!/
//     fileReference: null, /!*链接文件名*!/
// }

    return new Promise(function (resolve, reject)
        {
            var obJson = JSON.stringify(smartObject);
            var _jsxCode = `EnzJSX.setLayerInfo_smartObject_byId(${obJson} ,${layerID}  ,${doSelect})`
            evalScript(
                _jsxCode,
                (r) => {resolve(jsxBackCheck(r, _jsxCode))})
        }
    )
}


Enzymes.prototype.getLayerInfo_quickEffect_byId = async function (layerID)
{
    return new Promise(function (resolve, reject)
    {
        var _jsxCode = `EnzJSX.getLayerInfo_quickEffect_byId(${layerID})`
        evalScript(
            _jsxCode
            ,
            (r) => {resolve(JSON.parse(jsxBackCheck(r, _jsxCode)))})
    })
}


Enzymes.prototype.setLayerInfo_quickEffect_byId = async function (quickEffect, layerID)
{

    return new Promise(function (resolve, reject)
        {
            var obJson = JSON.stringify(quickEffect);
            var _jsxCode = `EnzJSX.setLayerInfo_quickEffect_byId(${obJson} ,${layerID} )`
            evalScript(
                _jsxCode,
                (r) => {resolve(jsxBackCheck(r, _jsxCode))})
        }
    )
}


Enzymes.prototype.getLayerInfo_more_byId = async function (layerID)
{
    return new Promise(function (resolve, reject)
    {
        var _jsxCode = `EnzJSX.getLayerInfo_more_byId(${layerID})`
        evalScript(
            _jsxCode
            ,
            (r) => {resolve(JSON.parse(jsxBackCheck(r, _jsxCode)))})
    })
}


Enzymes.prototype.setLayerInfo_more_byId = async function (moreInfo, layerID)
{

    return new Promise(function (resolve, reject)
        {
            var obJson = JSON.stringify(moreInfo);
            var _jsxCode = `EnzJSX.setLayerInfo_more_byId(${obJson} ,${layerID} )`
            evalScript(
                _jsxCode,
                (r) => {resolve(jsxBackCheck(r, _jsxCode))})
        }
    )
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
        var _jsxCode = `EnzJSX.selectSave()`
        evalScript(
            _jsxCode
            ,
            (r) => {resolve(JSON.parse(jsxBackCheck(r, _jsxCode)))})
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
        var _jsxCode = `EnzJSX.selectLoad([${layerIDs}])`
        evalScript(
            _jsxCode
            ,
            (r) => {resolve(jsxBackCheck(r, _jsxCode))})
    })
}


/**
 * 把文本数据写入 Photoshop 文档中的图层。指定 rootName 为图层组名称，itemName 为图层名称。
 * @param rootName 图层组名称
 * @param itemName 存储数据的图层名称
 * @param json
 * @returns {Promise}
 */
Enzymes.prototype.writeJSON = async function (rootName, itemName, json)
{

    return new Promise(function (resolve, reject)
    {
        json = Enzymes.prototype._escape(json);
        // console.log( `EnzJSX.writeJSON("${rootName}", "${itemName}",'${json}')`)

        var _jsxCode = `EnzJSX.writeJSON("${rootName}", "${itemName}",'${json}')`
        evalScript(
            _jsxCode
            ,
            (r) => {resolve(jsxBackCheck(r, _jsxCode))})
    })
}

/**
 * 从 Photoshop 文档中的图层中读取数据。
 * @param rootName 图层组名称
 * @param itemName 存储数据的图层名称
 * @returns {Promise}
 */
Enzymes.prototype.readJSON = async function (rootName, itemName)
{
    return new Promise(function (resolve, reject)
    {

        var _jsxCode = `EnzJSX.readJSON("${rootName}", "${itemName}")`
        evalScript(
            _jsxCode
            ,
            (r) => {resolve(Enzymes.prototype._unEscape(jsxBackCheck(r, _jsxCode)))})
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


/**
 * 获取 TypeID，
 * @param inValue 传入值，可以是 charID 或  "stringID"
 * @param inType 指定传入值是 "charID" 还是 "stringID"。如空则会根据传入值长度，把 4 字长度的传入值当做 "charID"。
 * @returns {Promise}
 */
Enzymes.prototype.getTypeID = function (inValue, inType)
{
    return new Promise(function (resolve, reject)
    {
        if (inType == undefined)
        {
            if (inValue.length == 4)
            {
                inType = "charID"
            } else
            {
                inType = "stringID"
            }
        }

        if (inType == "charID")
        {
            var _jsxCode = `charIDToTypeID("${inValue}")`
            evalScript(
                _jsxCode
                , (r) => {resolve(jsxBackCheck(r, _jsxCode))})
        } else
        {
            var _jsxCode = `stringIDToTypeID("${inValue}")`
            evalScript(
                _jsxCode
                , (r) => {resolve(jsxBackCheck(r, _jsxCode))})
        }


    })


}

/**
 * 获取当前文档 ID
 * @returns {Promise}
 */

Enzymes.prototype.getActiveDocumentId = async function ()
{
    return new Promise(function (resolve, reject)
    {

        var _jsxCode = `activeDocument.id`
        evalScript(
            _jsxCode
            ,
            (r) =>
            {

                if (+(0 + r) == +r)
                {
                    resolve(jsxBackCheck(r, _jsxCode))
                }
                else
                {
                    resolve(null)
                }
            }
        )
    })
}

/**
 * 解析增强子表达式
 * @param enhancer 增强子表达式
 * @param thisId 当前操作图层 id
 * @returns {Promise}
 */
Enzymes.prototype.evalEnhancer = async function (enhancer, thisId)
{
    return new Promise(function (resolve, reject)
    {
        var _jsxCode = `EnzJSX.evalEnhancer(${enhancer},${thisId})`
        evalScript(
            _jsxCode
            ,
            (r) =>
            {
                resolve(jsxBackCheck(r, _jsxCode));
            }
        )
    })
}


/**
 * 表达 DNA 数据，渲染文档
 * @param mRNA_Layers
 * @param vars
 * @returns {Promise}
 * @constructor
 */
Enzymes.prototype.DNAExpress = function (mRNA_Layers)
{
    return new Promise(function (resolve, reject)
    {

        var obJson = JSON.stringify(mRNA_Layers);
        var _jsxCode = `EnzJSX.DNAExpress(${obJson})`

        console.log(_jsxCode)
        evalScript(
            _jsxCode
            ,
            (r) => {resolve(jsxBackCheck(r, _jsxCode));}
        )
    })
}


/**
 * 把字符串的中的引号转义处理，换行符转换为 \n
 * @param str
 * @returns {*}
 * @private
 */
Enzymes.prototype._escape = function (str)
{
    try
    {
        str = str.replace(/\\/g, "\\\\")
        str = str.replace(/\'/g, "$(q1)$")
        str = str.replace(/\"/g, "$(q2)$")
        str = str.replace(/\r\n|\n/g, "\\n")
    } catch (e)
    {

        console.error("Enzymes._escape str:", str, e)
    }
    return str;
}

Enzymes.prototype._unEscape = function (str)
{
    try
    {
        str = str.replace(/\$\(q1\)\$/g, "\'")
        str = str.replace(/\$\(q2\)\$/g, "\"")
        str = str.replace(/\\\\/g, "\\")
    } catch (e)
    {

        console.error("Enzymes._unEscape str:", str, e)
    }

    return str;
}


//------------------------------------------------------------------------


function jsxBackCheck(returnValue, jsxCode)
{
    if (returnValue.slice(0, 17) == "EvalScript error.")
    {
        console.error(returnValue);
        console.error(jsxCode)
        return ""
    }
    else
    {
        return returnValue
    }

}

export default Enzymes;

// $.evalFile(File($.fileName).path + "/Muclease_lib.jsx");
// $.evalFile(File($.fileName).path + "/Kinase_lib.jsx");

var mu, ki;

var extendPath = ""

/**
 * 处理文本翻译
 * @param str
 * @returns {*}
 */
function lang(str, postfix)
{

    return str;
}


function initEnzymes(in_extendPath)
{
    extendPath = in_extendPath;
    $.evalFile(extendPath + "/JSX/json3.js");
    $.evalFile(extendPath + "/JSX/Muclease_lib.jsx");
    $.evalFile(extendPath + "/JSX/Kinase_lib.jsx");


    $.global.Kinase = Kinase;
    $.global.Muclease = Muclease;
    // Muclease = Muclease;
    mu = new Muclease();
    ki =  Kinase;

}

var EnzJSX = {};

EnzJSX.try = function (func)
{
    try
    {
        func();
        return 0;
    }
    catch (e)
    {
        return e;
    }
}


/**
 * 删除图层
 * @param layerName
 */
EnzJSX.deletLayer = function (id)
{

    if ((id instanceof Array) == false)
    {
        id = [id];
    }

    app.activeDocument.suspendHistory(lang("#删除图层"), "_func()");

    function _func()
    {
        var selectSave = EnzJSX.selectSave(true)
        EnzJSX.selectLoad(id)
        ki.layer.deleteLayer_ByActive();
        selectSave = EnzJSX.ArrayRemove(selectSave, id);
        // alert(typeof  selectSave)
        EnzJSX.selectLoad(selectSave)
    }


}


/**
 * 根据名称获取图层 ID，不存在返回 -1
 * @param layerName
 */
EnzJSX.getLayerId_byName = function (layerName)
{
    _jsx("ki.layer.getAllLayersItemIndex();")


}


/**
 * 返回包含全部图层 {名称、ID、itemIndex} 的数组
 * @returns {Array}
 */
EnzJSX.getAllLayersList = function (retrunRaw)
{
    var layersList = ki.layer.getAllLayerList();
    // var itemIndexs = ki.layer.getAllLayersItemIndex();
    //
    // for (var i = 0; i < itemIndexs.length; i++)
    // {
    //     layersList.push(
    //         {
    //             name: ki.layer.getLayerName_byItemIndex(itemIndexs[i]),
    //             id: ki.layer.getLayerIdByItemIndex(itemIndexs[i]),
    //             itemIndex: itemIndexs[i]
    //         }
    //     )
    // }

    if (retrunRaw == true)
    {
        return layersList;
    }
    else
    {
        return JSON.stringify(layersList);
    }

}


/**
 * 创建图层
 * @param layerName
 * @returns {*}
 */
EnzJSX.creatLayer = function (layerName)
{
    app.activeDocument.suspendHistory(lang("#新建图层"), "_func()");
    function _func()
    {
        ki.layer.creatNewLayer_ByActive();

        if (layerName !== undefined)
        {
            ki.layer.setLayerName_byActive(layerName)
        }

    }

    return ki.layer.getLayerIdByActive()
}


/**
 * 返回包含全部图层名称 的数组
 * @returns {Array}
 */
EnzJSX.getAllLayersName = function (retrunRaw)
{
    var names = [];
    var itemIndexs = ki.layer.getAllLayersItemIndex();

    for (var i = 0; i < itemIndexs.length; i++)
    {
        names.push(ki.layer.getLayerName_byItemIndex(itemIndexs[i]));
    }

    if (retrunRaw == true)
    {
        return names;
    }

    return JSON.stringify(names);
}


/**
 * 返回包含全部图层 ID 的数组
 * @returns {Array}
 */
EnzJSX.getAllLayersID = function (retrunRaw)
{
    var ids = [];
    var itemIndexs = ki.layer.getAllLayersItemIndex();

    for (var i = 0; i < itemIndexs.length; i++)
    {
        ids.push(ki.layer.getLayerIdByItemIndex(itemIndexs[i]));
    }

    if (retrunRaw == true)
    {
        return ids;
    }

    return JSON.stringify(ids);
}
/**
 * 返回包含全部图层 itemIndex 的数组
 * @returns {Array}
 */
EnzJSX.getAllLayersItemIndex = function (retrunRaw)
{
    var itemIndexs = ki.layer.getAllLayersItemIndex();

    if (retrunRaw == true)
    {
        itemIndexs;
    } else
    {
        return JSON.stringify(itemIndexs);

    }


}


EnzJSX.checkLayerExist = function (layerHandle, handleType, scanAll, returnRaw, giveLayerList, equalFunc)
{

    //指定检查范围 LayerList ；不指定检查所有图层。
    if (giveLayerList != undefined)
    {
        var layerList = giveLayerList;
    } else
    {
        var layerList = EnzJSX.getAllLayersList(true);
    }

    //指定比较函数；不指定使用默认比较函数。
    if (equalFunc != undefined)
    {
        var _equal = equalFunc;
    }
    else
    {
        function _equal(value1, value2)
        {
            return (value1 == value2)
        }
    }


    if (handleType == 0)
    {
        handleType = "id"
    } else if (handleType == 1)
    {
        handleType = "itemIndex";
    } else if (handleType == 2)
    {
        handleType = "name";
    }

    var allResult = [];

    for (var i = 0; i < layerList.length; i++)
    {

        if (_equal(layerList[i][handleType], layerHandle))
        {

            if (scanAll == true)
            {
                allResult.push(layerList[i]);
            } else
            {
                if (returnRaw)
                {
                    return [layerList[i]];
                } else
                {
                    return JSON.stringify([layerList[i]]);
                }

            }
        }
    }

    if (scanAll == true)
    {
        if (allResult.length == 0)
        {
            return null;

        } else
        {
            if (returnRaw)
            {
                return allResult;
            } else
            {
                return JSON.stringify(allResult);
            }

        }

    } else
    {
        return null;
    }
}


EnzJSX.selectSave = function (retrunRaw)
{
    var layerIDs = ki.layer.selectSave()

    if (retrunRaw)
    {
        return layerIDs;
    } else
    {
        return JSON.stringify(layerIDs)
    }


}

EnzJSX.selectLoad = function (layerIDs)
{
    ki.layer.selectLoad(layerIDs)
}


EnzJSX.getSelectLayerItemIndex = function ()
{
    var itemIndexs = ki.layer.getTargetLayersItemIndex()
    return JSON.stringify(itemIndexs);
}

EnzJSX.getSelectLayerID = function ()
{
    var ids = ki.layer.getTargetLayersID()
    return JSON.stringify(ids);
}

EnzJSX.getSelectLayerName = function ()
{
    var names = [];
    var itemIndexs = ki.layer.getTargetLayersItemIndex();

    for (var i = 0; i < itemIndexs.length; i++)
    {
        names.push(ki.layer.getLayerName_byItemIndex(itemIndexs[i]));
    }

    return JSON.stringify(names);
}


EnzJSX.getSelectLayerArray = function (debarDataLayer)
{

    var layersList = [];
    var itemIndexs = ki.layer.getTargetLayersItemIndex();


    for (var i = 0; i < itemIndexs.length; i++)
    {
        var layer = {
            name: ki.layer.getLayerName_byItemIndex(itemIndexs[i]),
            id: ki.layer.getLayerIdByItemIndex(itemIndexs[i]),
            itemIndex: itemIndexs[i]
        }

        if (layer.name === "__UI-DNA__" || layer.name === "_DNA_DATA_" || layer.name === "_ui-dna.nullice.com_")
        {
            continue;
        }

        layersList.push(layer);
    }

    return JSON.stringify(layersList);
}

EnzJSX.ArrayRemove = function (array, removeArray)
{
    for (var i = 0; i < array.length; i++)
    {
        for (var z = 0; z < removeArray.length; z++)
        {
            if (array[i] == removeArray[z])
            {
                array.splice(i, 1)
                i--;
                break;
            }
        }
    }


    return array;
}


EnzJSX.writeJSON = function (rootName, itemName, json)
{
    app.activeDocument.suspendHistory(lang("#更新数据"), "_func()");
    // alert ("writeJSON")
    // _func()
    function _func()
    {
        var select0 = EnzJSX.selectSave(true);
        var rootId = 0;
        var isOpen = false;
        //图层组-------------------------------------------------------
        var re = EnzJSX.checkLayerExist(rootName, "name", false, true);
        if (re == undefined)
        {


            ki.layer.selectLayer_byItemIndex(Kinase.upperIndex());

            ki.layer.creatNewLayerSet_ByActive(rootName)
            ki.layer.setAppearance_byActive({
                fillOpacity: 50, /*填充不透明度 0-255*/
                opacity: 50, /*不透明 0-255*/
                visible: false, /*可视*/
            })
            rootId = ki.layer.getLayerIdByActive();
            isOpen = true;

            var result = ki.document.hasArtBoard(true)
            if (result.hasArtBoard)
            {
                ki.layer.moveActiveLayerOrder(ki.layer.getItemIndexBylayerID(result.aArtBoardId) - 1)
                ki.layer.selectLayer_byItemIndex(ki.layer.getItemIndexBylayerID(result.aArtBoardId) - 1);

            }
            // ki.layer.getItemIndexBylayerID(result.aArtBoardId)


        } else
        {
            rootId = re[0].id;
        }


        //图层-------------------------------------------------------
        var re = EnzJSX.checkLayerExist("_ui-dna.nullice.com_", "name", false, true);
        if (re == undefined)
        {


            ki.layer.creatNewTextLayer_ByActive("_ui-dna.nullice.com_", 100, 100, "UI-DNA 数据保存图层，请勿修改、删除")
            // ki.layer.moveActiveLayerOrder(ki.layer.getItemIndexBylayerID(rootId))
            ki.layer.setAppearance_byActive({
                fillOpacity: 100, /*填充不透明度 0-255*/
                opacity: 100, /*不透明 0-255*/
                visible: false, /*可视*/
            })
            ki.layer.selectLayer_byItemIndex(ki.layer.getItemIndexBylayerID(rootId))
        }
        //图层-------------------------------------------------------

        var re = EnzJSX.checkLayerExist(itemName, "name", false, true);


        var hasSameNameElse = false;
        if (re != undefined)
        {
            hasSameNameElse = ( ki.layer.getLayerIdByItemIndex(
                ki.layer.getParentLayerItemIndex_byItemIndex(ki.layer.getItemIndexBylayerID(re[0].id))
            ) != rootId)
        }

        if (re == undefined || hasSameNameElse)
        {
            ki.layer.selectLayer_byItemIndex(ki.layer.getItemIndexBylayerID(rootId) - 1)
            ki.layer.creatNewTextLayer_ByActive(itemName, 50, 100, json)
            ki.layer.setAppearance_byActive({
                fillOpacity: 50, /*填充不透明度 0-255*/
                opacity: 50, /*不透明 0-255*/
                visible: false, /*可视*/
            })

            isOpen = true;
            if (isOpen)
            {
                ki.layer.selectLayer_byItemIndex(ki.layer.getItemIndexBylayerID(rootId))
                ki.layer.setAppearance_byActive({
                    fillOpacity: 50, /*填充不透明度 0-255*/
                    opacity: 50, /*不透明 0-255*/
                    visible: false, /*可视*/
                })
                ki.layer.selectLayer_byItemIndex(ki.layer.getItemIndexBylayerID(rootId))

                ki.layer.closeLayerSet_byActive()
                ki.layer.moveActiveLayerOrder(Kinase.upperIndex())


            }
            EnzJSX.selectLoad(select0);
        } else
        {
            // alert (re[0].id)
            ki.layer.setLayerText_Quick(json, Kinase.REF_LayerID, re[0].id)
        }


    }


}

//速度慢
// EnzJSX.readJSONAD = function (rootName, itemName)
// {
//     var re = EnzJSX.checkLayerExist(itemName, "name", false, true);
//     // alert(JSON.stringify(re))
//     // alert("readJSON")
//     if (re != undefined)
//     {
//         // alert(JSON.stringify(re))
//         // alert(re[0].id + "\n" + Kinase.REF_LayerID)
//         var textInfo = ki.layer.getLayerTextInfo(Kinase.REF_LayerID, re[0].id)
//          // alert(JSON.stringify(textInfo))
//     } else
//     {
//         return null;
//     }
//     return textInfo.text;
// }


/**
 *
 * @param rootName
 * @param itemName
 * @returns {*}
 */
EnzJSX.readJSON = function (rootName, itemName)//EnzJSX.readJSONDOM
{
    var re = EnzJSX.checkLayerExist(rootName, "name", false, true);
    if (re == undefined)
    {
        return null;
    }

    var rootLayerList = ki.layer.getChildLayerList_byItemIndex(re[0].itemIndex)


    var re = EnzJSX.checkLayerExist(itemName, "name", false, true, rootLayerList);


    if (re != undefined)
    {
        var layer = ki.layer.getLayerDOMObject_byItemIndex(re[0].itemIndex)
    } else
    {
        return null;
    }

    return layer.textItem.contents;
}


/**
 * 获取图层位置、尺寸信息，position。根据图层 ID
 * @param id
 */
EnzJSX.getLayerInfo_position_byId = function (id)
{
    return JSON.stringify(ki.layer.getLayerBounds(Kinase.REF_LayerID, id))
}


EnzJSX.setLayerInfo_position_byId = function (boundsInfo, id, doSelect)
{
    if (doSelect)
    {
        ki.layer.selectLayer_byID(id)
    }
    return ki.layer.setLayerBounds(boundsInfo, Kinase.REF_LayerID, id, true)
}


EnzJSX.getLayerInfo_text_byId = function (id)
{
    return JSON.stringify(ki.layer.getLayerTextInfo(Kinase.REF_LayerID, id))
}


/**设置图层文本信息
 *   textInfo{
     text: null, /!*文本内容，\r 表示换行*!/
     bounds: {x: null, y: null, w: null, h: null}, /!*文本框边界(在图层边界内的位置)*!/
     boundingBox: {x: null, y: null, w: null, h: null}, /!*文本框最小边界(在图层边界内的位置)*!/
     color: {r: null, g: null, b: null}, /!*字体颜色*!/
     size: null, /!*字体尺寸*!/
     fontPostScriptName: null, /!*字体*!/
     bold: null, /!*仿粗体*!/
     italic: null, /!*仿斜体*!/
     antiAlias: null, /!*消除锯齿方式*!/
     underline: null, /!*下划线类型 underlineOnLeftInVertical:下划线,underlineOff:无，*!/
     justification: null, /!*段落对齐方式*!/
     leading: null, /!*行距*!/
     tracking: null, /!*字符间距*!/
     baselineShift: null, /!*基线偏移*!/
     horizontalScale: null, /!*水平缩放*!/
     verticalScale: null, /!*垂直缩放*!/
     }
 * @param textInfo
 * @param id
 * @param doSelect
 */
EnzJSX.setLayerInfo_text_byId = function (textInfo, id, doSelect)
{
    if (doSelect)
    {
        ki.layer.selectLayer_byID(id)
    }
    return ki.layer.setLayerTextInfo(textInfo, Kinase.REF_LayerID, id)
}


/**
 * 获取图层形状信息
 * {
        strokeColor: {r: null, g: null, b: null}, /!*描边颜色*!/
        strokeColorEnabled: null, /!*启用描边*!/
        fillColor: {r: null, g: null, b: null}, /!*填充颜色*!/
        fillColorEnabled: null, /!*启用填充*!/
        lineWidth: null, /!*边线宽度*!/
        dashSet: null, /!*虚线设置*!/
        lineAlignment: null, /!*描边选项-对齐*!/
        lineCapType: null, /!*描边选项-端点*!/
        lineJoinType: null, /!*描边选项-角点*!/
        shapeSize: {x, y, h, w}, /!*形状尺寸*!/
        radian: {/!*圆角*!/
            topRight: null,
            topLeft: null,
            bottomRight: null,
            bottomLeft: null,
        }
    }
 * @param id
 */
EnzJSX.getLayerInfo_shape_byId = function (id)
{

    var strokeStyle = ki.layer.getStrokeStyle(Kinase.REF_LayerID, id)
    //  strokeStyle = {
    //     strokeColor: {r: null, g: null, b: null, enabled: null}, /*描边颜色*/
    //     fillColor: {r: null, g: null, b: null, enabled: null}, /*填充颜色*/
    //     lineWidth: null, /*边线宽度*/
    //     dashSet: null, /*虚线设置*/
    //     lineAlignment: null, /*描边选项-对齐*/
    //     lineCapType: null, /*描边选项-端点*/
    //     lineJoinType: null, /*描边选项-角点*/
    // };


    var radian = ki.layer.getLayerRadian(Kinase.REF_LayerID, id)
    // radian = {
    //     topRight: null,
    //     topLeft: null,
    //     bottomRight: null,
    //     bottomLeft: null,
    // }

    var shapeSize = ki.layer.getLayerShapeSize(Kinase.REF_LayerID, id)
    // shapeSize = {x, y, h, w}


    var shapeInfo = {
        strokeColor: /*描边颜色*/
        {
            r: strokeStyle.strokeColor.r,
            g: strokeStyle.strokeColor.g,
            b: strokeStyle.strokeColor.b,
        },
        strokeColorEnabled: strokeStyle.strokeColor.enabled, /*启用描边*/
        fillColor: /*填充颜色*/
        {
            r: strokeStyle.fillColor.r,
            g: strokeStyle.fillColor.g,
            b: strokeStyle.fillColor.b,
        },
        fillColorEnabled: strokeStyle.fillColor.enabled, /*启用填充*/
        lineWidth: strokeStyle.lineWidth, /*边线宽度*/
        dashSet: strokeStyle.dashSet, /*虚线设置*/
        lineAlignment: strokeStyle.lineAlignment, /*描边选项-对齐*/
        lineCapType: strokeStyle.lineCapType, /*描边选项-端点*/
        lineJoinType: strokeStyle.lineJoinType, /*描边选项-角点*/
        shapeSize: shapeSize, /*形状尺寸  {x, y, h, w}*/
        radian: radian  /*圆角*/
        /* {topRight: null, topLeft: null,
         bottomRight: null, bottomLeft: null}*/
    }
    return JSON.stringify(shapeInfo)
}


/**
 * 设置形状图层属性。会导致选中指定图层。
 * @param shapeInfo
 * @param id
 */
EnzJSX.setLayerInfo_shape_byId = function (shapeInfo, id)
{

    ki.layer.selectLayer_byID(id)

    try
    {
        var strokeStyle = {
            strokeColor: {
                r: null,
                g: null,
                b: null,
                enabled:null
            }, /*描边颜色*/
            fillColor: {
                r: null,
                g: null,
                b: null,
                enabled: null
            }, /*填充颜色*/
            lineWidth: shapeInfo.lineWidth||null, /*边线宽度*/
            dashSet: shapeInfo.dashSet||null, /*虚线设置*/
            lineAlignment: shapeInfo.lineAlignment||null, /*描边选项-对齐*/
            lineCapType: shapeInfo.lineCapType||null, /*描边选项-端点*/
            lineJoinType: shapeInfo.lineJoinType||null, /*描边选项-角点*/
        };

        if( shapeInfo.strokeColorEnabled!=undefined)
        {
            strokeStyle.strokeColor.enabled = shapeInfo.strokeColorEnabled
        }

        if( shapeInfo.fillColorEnabled!=undefined)
        {
            strokeStyle.fillColor.enabled = shapeInfo.fillColorEnabled
        }


        if(shapeInfo.strokeColor!=undefined)
        {
            strokeStyle.strokeColor.r =shapeInfo.strokeColor.r||null
            strokeStyle.strokeColor.g =shapeInfo.strokeColor.g||null
            strokeStyle.strokeColor.b =shapeInfo.strokeColor.b||null
        }
        if(shapeInfo.fillColor!=undefined)
        {
            strokeStyle.fillColor.r =shapeInfo.fillColor.r||null
            strokeStyle.fillColor.g =shapeInfo.fillColor.g||null
            strokeStyle.fillColor.b =shapeInfo.fillColor.b||null
        }
        //todo：判定是否都为 null 值，减少无效99渲染次数

        $.writeln(JSON.stringify(shapeInfo.fillColorEnabled))
        ki.layer.setStrokeStyle_byActive(strokeStyle)

    } catch (e)
    {


        return e
        // console.error(`EnzJSX.setLayerInfo_shape_byId(${shapeInfo},${ id})`, ` ki.layer.setStrokeStyle_byActive(${strokeStyle})`)
    }

    try
    {
        if(shapeInfo.radian!=undefined)
        {
            var radian = shapeInfo.radian
            ki.layer.setLayerRadian_byActive(radian)
        }

    } catch (e)
    {
        return e
    }

    try
    {
        if(shapeInfo.shapeSize!=undefined)
        {
            var shapeSize = shapeInfo.shapeSize
            ki.layer.setLayerShapeSize_byActive(shapeSize)
        }

    } catch (e)
    {
        return e
    }

}


//
EnzJSX.EnhancerKeys = {
    keys: {
        parent: ["parent", "父", "親"],
        child: ["child", "子"],
        sibling: ["sibling", "near", "mate", "邻", "同级", "隣"],
        id: ["id"],
    },
    infoKeys: {
        x: ["x", "左"],
        y: ["y", "顶"],
        h: ["h", "高"],
        w: ["x", "宽"],
    }
}


/**
 *
 * @param enhancer
 * @param thisId
 */
EnzJSX.evalEnhancer = function (enhancer, thisId)
{


    if (enhancer == undefined)
    {
        return;
    }

    if (enhancer[0] == "$" && enhancer[0] == "￥")
    {
        var keys = EnzJSX.EnhancerKeys.keys;

        enhancer = enhancer.slice(1)
        var nodeList = enhancer.split(".")

        var getMode = null;


        if (nodeList.length > 0)
        {
            var _inArray = EnzJSX._inArray;


            //parent-------------------------------------------------
            if (_inArray(nodeList[0], keys.parent))
            {
                try
                {
                    var targetId = ki.layer.getParentLayerId_byItemIndex(ki.layer.getItemIndexBylayerID(thisId));
                    getMode = "layerProperty";

                } catch (e)
                {
                    getMode = null;
                }
            }
            //child-------------------------------------------------
            var result = _inArray(nodeList[0], keys.child, true)
            if (result != false)
            {
                if (result[0] == "_")
                {
                    result = "-" + result.slice(1);
                }
                try
                {
                    var idList = ki.layer.getChildLayerID_byItemIndex(ki.layer.getItemIndexBylayerID(thisId));
                    if (idList != undefined && idList.length > 0)
                    {
                        if (result.length == 0 || +result != result)
                        {
                            var targetId = idList[0];
                        } else
                        {
                            if (result > 0)
                            {
                                var targetId = idList[result];

                            } else
                            {
                                var targetId = idList[idList.length + result];
                            }
                        }

                        if (targetId != undefined)
                        {
                            getMode = "layerProperty";
                        }
                    }
                } catch (e)
                {
                    getMode = null;
                }
            }
            //near-------------------------------------------------
            var result = _inArray(nodeList[0], keys.child, true)
            if (result != false)
            {
                if (result[0] == "_")
                {
                    result = "-" + result.slice(1);
                }
                try
                {
                    var idList = ki.layer.getChildLayerID_byItemIndex(ki.layer.getItemIndexBylayerID(thisId));
                    if (idList != undefined && idList.length > 0)
                    {
                        if (result.length == 0 || +result != result)
                        {
                            var targetId = idList[0];
                        } else
                        {
                            if (result > 0)
                            {
                                var targetId = idList[result];

                            } else
                            {
                                var targetId = idList[idList.length + result];
                            }
                        }

                        if (targetId != undefined)
                        {
                            getMode = "layerProperty";
                        }
                    }
                } catch (e)
                {
                    getMode = null;
                }
            }
            //near-------------------------------------------------
            var result = _inArray(nodeList[0], keys.sibling, true)
            if (result != false)
            {
                if (result[0] == "_")
                {
                    result = "-" + result.slice(1);
                }
                try
                {
                    var targetId = ki.layer.getLayerIdByItemIndex(ki.layer.getItemIndexBylayerID(thisId) + (+result));
                    if (targetId != undefined)
                    {
                        getMode = "layerProperty";
                    }
                } catch (e)
                {
                    getMode = null;
                }
            }
        }


        if (getMode == "layerProperty")
        {
            if (nodeList.length > 2)
            {
                if (nodeList[1] = "position")
                {
                    var info = ki.layer.getLayerBounds(Kinase.REF_LayerID, targetId);
                    if (info[nodeList[2]] != undefined)
                    {
                        var re = info[nodeList[2]];
                        return re;
                    }
                }

            }

        }


    }

    return "";


}

/**
 * 执行文档渲染渲染
 * @param mRNA_Layers_json
 * @param vars_json
 * @constructor
 */
EnzJSX.DNAExpress = function (mRNA_Layers_json, vars_json)
{
    var layers = JSON.parse(mRNA_Layers_json)
    var vars = JSON.parse(vars_json)
    _func(); //封装功能代码，以便只产生一个 Photoshop 的历史记录


    function _func()
    {
        var save = EnzJSX.selectSave(true);

        //图层信息查询缓存
        var queryCache = {};


        //【首轮循环】----------------------------
        var _inArray = EnzJSX._inArray;
        for (var layerId in layers)
        {
            //position------------------------------------------
            if (layers[layerId].position != undefined)
            {

                var _info_position = {};
                var _do_position = false;
                for (var _x in layers[layerId].position)
                {
                    if (_inArray(_x, ["x", "y", "h", "w"]))
                    {
                        _info_position[_x] = layers[layerId].position[_x];
                        _do_position = true;
                    } else if (_x == "$anchor")
                    {
                        _info_position["centerState"] = layers[layerId].position[_x];
                        _do_position = true;
                    }
                }
                if (_do_position)
                {
                    ki.layer.selectLayer_byID(layerId);
                    EnzJSX.setLayerInfo_position_byId(_info_position, layerId)
                }
            }
            //text------------------------------------------

        }

        EnzJSX.selectLoad(save);
    }
}

EnzJSX._inArray = function (name, array, prefix)
{
    for (var x in array)
    {
        if (prefix)
        {
            if (name.slice(0, array[x].length) == array[x])
            {
                return name.slice(array[x].length);
            }

        } else
        {
            if (name == array[x])
            {
                return true;
            }
        }


    }
    return false;
}





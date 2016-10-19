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
    ki = new Kinase();

}


var EnzJSX = {};

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







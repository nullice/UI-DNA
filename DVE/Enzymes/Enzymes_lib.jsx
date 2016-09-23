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
    var layersList = [];
    var itemIndexs = ki.layer.getAllLayersItemIndex();

    for (var i = 0; i < itemIndexs.length; i++)
    {
        layersList.push(
            {
                name: ki.layer.getLayerName_byItemIndex(itemIndexs[i]),
                id: ki.layer.getLayerIdByItemIndex(itemIndexs[i]),
                itemIndex: itemIndexs[i]
            }
        )
    }

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


EnzJSX.checkLayerExist = function (layerHandle, handleType, scanAll)
{
    var layerList = EnzJSX.getAllLayersList(true);


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

        if (layerList[i][handleType] == layerHandle)
        {

            if (scanAll == true)
            {
                allResult.push(layerList[i]);
            } else
            {
                return JSON.stringify([layerList[i]]);
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
            return JSON.stringify(allResult);
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


EnzJSX.getSelectLayerArray = function ()
{

    var layersList = [];
    var itemIndexs = ki.layer.getTargetLayersItemIndex();

    for (var i = 0; i < itemIndexs.length; i++)
    {
        layersList.push(
            {
                name: ki.layer.getLayerName_byItemIndex(itemIndexs[i]),
                id: ki.layer.getLayerIdByItemIndex(itemIndexs[i]),
                itemIndex: itemIndexs[i]
            }
        )
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
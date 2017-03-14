/**
 * Created by bgllj on 2017/3/9.
 */


/**
 * 重命名指定 id 列表的图层名称：替换
 * @param layerIDs
 * @param findText
 * @param replace $i 代表计数
 * @param useReg
 */
Libs.layersRename_replace = function (infoObjec, envObject)
{
    if (infoObjec == undefined)
    {
        return 0
    }

    // var layerIDs = infoObjec["layerIDs"]

    var findText = infoObjec["findText"]
    var replace = infoObjec["replace"]
    var useReg = infoObjec["useReg"]

    var re = 0;
    var layerIDs = Kinase.layer.getTargetLayersID()
    if (layerIDs == undefined || layerIDs.length == 0)
    {
        return 0
    }
    var layerPool = []
    for (var i = 0; i < layerIDs.length; i++)
    {
        var itemIndex = Kinase.layer.getItemIndexBylayerID(layerIDs[i])
        var layerItem = {
            id: layerIDs[i],
            itemIndex: itemIndex,
            name: Kinase.layer.getLayerName_byID(layerIDs[i]),
        }
        layerPool.push(layerItem)
    }
    layerPool = sortObjectArray(layerPool, "itemIndex", true)


    // $.writeln(typeof layerIDs )
    function _func()
    {
        for (var i = 0; i < layerPool.length; i++)
        {
            var orgName = layerPool[i].name
            if (useReg)
            {
                var reg = new RegExp(findText, "g")

            } else
            {
                var plainText = findText.replace(/\W/g, "\\$&")
                var reg = new RegExp(plainText, "g")

            }

            var newName = orgName.replace(reg, replace)
            var finName = newName.replace(/\$i/g, i + 1)
            var finName = finName.replace(/\$\-i/g, layerPool.length - i)
            if (finName != orgName)
            {
                Kinase.layer.selectLayer_byID(layerPool[i].id)
                Kinase.layer.setLayerName_byActive(finName)
                re++;
            }
        }

    }

    Proteins.doCon(_func, "图层重命名", true)
    return re
}


/**
 * 减去形状
 * @param infoObjec
 * @param envObject
 * @returns {number}
 */
Libs.quick_shape_path_subtract = function (infoObjec, envObject)
{


}



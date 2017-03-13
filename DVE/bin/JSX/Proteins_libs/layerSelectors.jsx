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
    if(infoObjec==undefined)
    {
        return
    }


    var layerIDs =infoObjec["layerIDs"]
    var findText =infoObjec["findText"]
    var replace = infoObjec["replace"]
    var useReg =infoObjec["useReg"]

  $.writeln(typeof layerIDs )
    function _func()
    {
   
        for (var i = 0; i < layerIDs.length; i++)
        {
         
            var orgName = Kinase.layer.getLayerName_byID(layerIDs[i])


            if (useReg)
            {
                var reg = new RegExp(findText, "g")

            } else
            {
                var plainText = findText.replace(/\W/g,"\\$&")
                var reg = new RegExp(plainText, "g")

            }
           
            var newName =  orgName.replace(reg, replace)
            var finName = newName.replace(/\$i/g,i)

            if(finName!=orgName)
            {
                Kinase.layer.selectLayer_byID(layerIDs[i])
                Kinase.layer.setLayerName_byActive(finName)
            }


        }

    }

    Proteins.doCon(_func, "图层重命名", true)
    return 0


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



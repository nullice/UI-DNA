/**
 * Created by bgllj on 2017/3/7.
 */


/**
 *
 * @param infoObjec  {name:图层名字, varName 变量名字}
 *
 * @param envObject
 */
Libs.inputAssist_creatTextLayerLinkVar = function (infoObjec, envObject)
{

    var re = null

    function _func()
    {


        var textInfo = {
            text: infoObjec.value,
            color: {r: 112, g: 112, b: 112},
            size: 11,
        }


        var targetId = Kinase.layer.getLayerIdByActive();


        if (Proteins.firstFontPostScriptName != undefined)
        {
            textInfo.fontPostScriptName = Proteins.firstFontPostScriptName;
        }

        Kinase.layer.creatNewTextLayer_ByActive(infoObjec.name, 999, 999)
        Kinase.layer.setLayerTextInfo(textInfo, Kinase.REF_ActiveLayer, null)
        Kinase.layer.setLayerTextMinBounds_Quick(Kinase.REF_ActiveLayer, null)
        var id = Kinase.layer.getLayerIdByActive()
        var layerBaseInfo = Kinase.layer.getLayerBaseInfo_byID(id)
        re = layerBaseInfo

        /*设置位置*/
        if (infoObjec.title == "X" || infoObjec.title == "Y" || infoObjec.title == "W"
            || infoObjec.title == "H")
        {
            var targetBounds = Kinase.layer.getLayerBounds(Kinase.REF_LayerID, targetId)
            var pinBounds = Kinase.layer.getLayerBounds(Kinase.REF_ActiveLayer, null)

            if (infoObjec.title == "X")
            {
                Kinase.layer.setLayerBounds_byActive(
                    {
                        x: targetBounds.x - pinBounds.w - 20,
                        y: targetBounds.y + (targetBounds.h / 2) - pinBounds.h / 2
                    }
                )
            }
            else if (infoObjec.title == "Y")
            {
                Kinase.layer.setLayerBounds_byActive(
                    {
                        x: targetBounds.x + (targetBounds.w / 2) - (pinBounds.w / 2),
                        y: targetBounds.y - pinBounds.h - 20,
                    }
                )
            }
            else if (infoObjec.title == "W")
            {
                Kinase.layer.setLayerBounds_byActive(
                    {
                        x: targetBounds.x + (targetBounds.w / 2) - (pinBounds.w / 2),
                        y: targetBounds.y + targetBounds.h + 20,
                    }
                )
            }
            else if (infoObjec.title == "H")
            {
                Kinase.layer.setLayerBounds_byActive(
                    {
                        x: targetBounds.x + targetBounds.w + 20,
                        y: targetBounds.y + (targetBounds.h / 2) - (pinBounds.h / 2)
                    }
                )
            }
        }


    }

    Proteins.doCon(_func, "创建变量标注", true)
    return re
}

Libs.inputAssist_photoshopColorPicker_hex = function (infoObjec, envObject)
{
    var re = null

    function _func()
    {
        var oldColor = app.foregroundColor

        try
        {
            app.foregroundColor.rgb.hexValue = infoObjec.defualtHex;
        } catch (e)
        {
        }

        app.showColorPicker()
        var nowColor = app.foregroundColor
        app.foregroundColor = oldColor;
        re = "#" + nowColor.rgb.hexValue
    }

    Proteins.doCon(_func, "获取颜色", true)
    return re
}

/**
 *  获取前景颜色
 * @param infoObjec
 * @param envObject
 * @returns {string} "#ff2211"
 */
Libs.inputAssist_getForegroundColor_hex = function (infoObjec, envObject)
{
   var re = "#" + app.foregroundColor.rgb.hexValue
    return re
}

/**
 * 设置前景颜色
 * @param infoObjec {hexValue:"ff2211"}
 * @param envObject
 */
Libs.inputAssist_setForegroundColor_hex = function (infoObjec, envObject)
{
    app.foregroundColor.rgb.hexValue = infoObjec.hexValue
}


/**
 * 设置当前工具
 * @param infoObjec
 * @param envObject
 */
Libs.inputAssist_setCurrentTool = function (infoObjec, envObject)
{
    app.currentTool=infoObjec.toolName
}

/**
 * 获取当前工具名
 * @param infoObjec
 * @param envObject
 * @returns {string|*}
 */
Libs.inputAssist_getCurrentTool = function (infoObjec, envObject)
{

    return app.currentTool
}

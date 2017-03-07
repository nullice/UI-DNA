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
    }

    Proteins.doCon(_func, "创建变量标注", true)
    return re
}
/**
 * Created by bgllj on 2017/3/9.
 */


/**
 * 组合路径组件
 * @param infoObjec
 * @param envObject
 * @returns {*}
 */
Libs.quick_shape_path_margeShapeComponent = function (infoObjec, envObject)
{
    var adOb = {
        "null": {
            "value": {
                "container": {"container": {}},
                "form": "ReferenceFormType.ENUMERATED",
                "desiredClass": "path",
                "enumeratedType": "ordinal",
                "enumeratedValue": "targetEnum"
            }, "type": "DescValueType.REFERENCETYPE"
        }
    }
    mu.executeActionObjcet(stringIDToTypeID("combine"), adOb)
    return 0
}

/**
 * 合并形状
 * @param infoObjec
 * @param envObject
 * @returns {number}
 */
Libs.quick_shape_path_combine = function (infoObjec, envObject)
{

    function _func()
    {
        var id = charIDToTypeID("Add ")
        var ad = new ActionDescriptor();
        ad.putEnumerated(stringIDToTypeID("shapeOperation"), stringIDToTypeID("shapeOperation"), id);
        executeAction(charIDToTypeID("Mrg2"), ad, DialogModes.NO);
        if(!ScriptUI.environment.keyboardState.altKey) Libs.quick_shape_path_margeShapeComponent();
        if(activeDocument.activeLayer.kind == LayerKind.NORMAL) throw new Error();
    }

    Proteins.doCon(_func, "合并形状", false)
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

    function _func()
    {
        var id = charIDToTypeID("Sbtr")
        var ad = new ActionDescriptor();
        ad.putEnumerated(stringIDToTypeID("shapeOperation"), stringIDToTypeID("shapeOperation"), id);
        executeAction(charIDToTypeID("Mrg2"), ad, DialogModes.NO);
        if(!ScriptUI.environment.keyboardState.altKey) Libs.quick_shape_path_margeShapeComponent();
        if(activeDocument.activeLayer.kind == LayerKind.NORMAL) throw new Error();
    }

    Proteins.doCon(_func, "减去形状", false)
    return 0
}


/**
 * 形状交集
 * @param infoObjec
 * @param envObject
 * @returns {number}
 */
Libs.quick_shape_path_intersect = function (infoObjec, envObject)
{

    function _func()
    {
        var id = charIDToTypeID("Intr")
        var ad = new ActionDescriptor();
        ad.putEnumerated(stringIDToTypeID("shapeOperation"), stringIDToTypeID("shapeOperation"), id);
        executeAction(charIDToTypeID("Mrg2"), ad, DialogModes.NO);
        if(!ScriptUI.environment.keyboardState.altKey) Libs.quick_shape_path_margeShapeComponent();
        if(activeDocument.activeLayer.kind == LayerKind.NORMAL) throw new Error();
    }

    Proteins.doCon(_func, "形状交集", false)
    return 0
}

/**
 * 形状对称差
 * @param infoObjec
 * @param envObject
 * @returns {number}
 */

Libs.quick_shape_path_symDifference= function (infoObjec, envObject)
{

    function _func()
    {
        var id = stringIDToTypeID("xor")
        var ad = new ActionDescriptor();
        ad.putEnumerated(stringIDToTypeID("shapeOperation"), stringIDToTypeID("shapeOperation"), id);
        executeAction(charIDToTypeID("Mrg2"), ad, DialogModes.NO);
        if(!ScriptUI.environment.keyboardState.altKey) Libs.quick_shape_path_margeShapeComponent();
        if(activeDocument.activeLayer.kind == LayerKind.NORMAL) throw new Error();
    }

    Proteins.doCon(_func, "形状对称差", false)
    return 0
}














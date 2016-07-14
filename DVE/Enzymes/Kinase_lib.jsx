/**
 * Created by bgllj on 2016/7/10.
 */

// Kinase 激酶
//--------------------------
// By nullice ui@nullice.com
// nullice.com
// license: LGPL

$.evalFile(File($.fileName).path + "/Muclease_lib.jsx");


try
{
    var mu = new Muclease();
} catch (e)
{
}


var Kinase = function ()
{
    return this;
}


Kinase.prototype.layer = {};

// Kinase.layer
// 图层相关功能 ----------------------------------------------


/**
 * 获取图层详细信息对象，目标图层由一个 ActionReference 参数决定
 *      是 layer.getLayerInfoObject_byID()、layer.getLayerInfoObject_byItemIndex()、layer.getLayerInfoObject_byActiveLayer() 实际调用的方法
 * @param ref
 * @returns {{}}
 */
Kinase.prototype.layer.getLayerInfoObject_byReference = function (ref)
{

    var ad = executeActionGet(ref);
    var ob = mu.actionDescriptorToObject(ad);
    return ob;

}


/**
 * 根据图层 ID 获取图层详细信息对象
 * @param layerID
 * @returns {{}}
 */
Kinase.prototype.layer.getLayerInfoObject_byID = function (layerID)
{
    var ref = new ActionReference();
    ref.putIdentifier(charIDToTypeID('Lyr '), layerID);

    return Kinase.prototype.layer.getLayerInfoObject_byReference(ref);
}


/**
 * 根据图层序号（itemIndex）获取图层详细信息对象
 * @param itemIndex
 * @returns {{}}
 */
Kinase.prototype.layer.getLayerInfoObject_byItemIndex = function (itemIndex)
{
    var ref = new ActionReference();
    ref.putIndex(charIDToTypeID('Lyr '), itemIndex + Kinase.BKOffset());

    return Kinase.prototype.layer.getLayerInfoObject_byReference(ref);
}


/**
 * 获取当前选中图层的详细信息对象
 * @returns {{}}
 */
Kinase.prototype.layer.getLayerInfoObject_byActiveLayer = function ()
{
    //-------------------------------------------------
    // 更直观但速度慢一些
    // var refOb =
    // {
    //     form: "ReferenceFormType.ENUMERATED",
    //     desiredClass: "layer",
    //     enumeratedType: "ordinal",
    //     enumeratedValue: "targetEnum"
    // };
    // var ref =  mu.objectToActionReference(refOb);
    //-------------------------------------------------


    var ref = new ActionReference();
    ref.putEnumerated(charIDToTypeID("Lyr "), charIDToTypeID("Ordn"), charIDToTypeID("Trgt"));

    return Kinase.prototype.layer.getLayerInfoObject_byReference(ref);
}


/**
 * 根据图层序号（ItemIndex）获取图层 ID
 * @param itemIndex
 * @returns {*}
 */
Kinase.prototype.layer.getLayerIdByItemIndex = function (itemIndex)
{
    var ref = new ActionReference();
    ref.putProperty(charIDToTypeID("Prpr"), stringIDToTypeID('layerID'));

    ref.putIndex(charIDToTypeID("Lyr "), itemIndex + Kinase.BKOffset());
    // log("index:" + itemIndex + ":" + Kinase.BKOffset())
    var layerDesc = executeActionGet(ref);

    return layerDesc.getInteger(stringIDToTypeID('layerID'));
}


/**
 * 根据图层 ID 获取图层序号（ItemIndex）
 * @param layerID
 * @returns {*}
 */
Kinase.prototype.layer.getItemIndexBylayerID = function (layerID)
{

    var ref = new ActionReference();
    ref.putProperty(charIDToTypeID("Prpr"), stringIDToTypeID('itemIndex'));

    ref.putIdentifier(charIDToTypeID("Lyr "), layerID);
    var layerDesc = executeActionGet(ref);

    return layerDesc.getInteger(stringIDToTypeID('itemIndex'));
}

/**
 * itemIndex 数组转换到 LayerID 数组
 * @param itemIndexArray
 * @returns {Array}
 */
Kinase.prototype.layer.itemIndexArray_ToLayerIdArray = function (itemIndexArray)
{
    var layerIdArray = []
    for (var i = 0; i < itemIndexArray.length; i++)
    {
        layerIdArray.push(Kinase.prototype.layer.getLayerIdByItemIndex(itemIndexArray[i]))
    }
    return layerIdArray;
}


/**
 *  LayerID 数组转换到 itemIndex 数组
 * @param layerIdArray
 * @returns {Array}
 */
Kinase.prototype.layer.layerIdArray_ToItemIndexArray = function (layerIdArray)
{
    var itemIndexArray = []
    for (var i = 0; i < layerIdArray.length; i++)
    {
        itemIndexArray.push(Kinase.prototype.layer.getItemIndexBylayerID(layerIdArray[i]))
    }
    return itemIndexArray;
}


/**
 * 获取所有选中图层的图层序号（ItemIndex），返回数组
 * @returns {Array}
 */
Kinase.prototype.layer.getTargetLayersItemIndex = function ()
{
    var ref = new ActionReference();
    ref.putProperty(charIDToTypeID('Prpr'), stringIDToTypeID("targetLayers"));
    ref.putEnumerated(charIDToTypeID("Dcmn"), charIDToTypeID('Ordn'), charIDToTypeID('Trgt'));
    var layerDesc = executeActionGet(ref);
    var ob = mu.actionDescriptorToSimpleObject(layerDesc);
    if (ob.targetLayers == undefined)
    {
        return [];
    }

    var arr = [];
    for (var i in ob.targetLayers)
    {
        arr.push(ob.targetLayers[i].index + 1)
    }
    return arr;
}


/**
 * 获取所有选中图层的图层 ID，返回数组
 * @returns {Array}
 */
Kinase.prototype.layer.getTargetLayersID = function ()
{
    var ref = new ActionReference();
    ref.putProperty(charIDToTypeID('Prpr'), stringIDToTypeID("targetLayers"));
    ref.putEnumerated(charIDToTypeID("Dcmn"), charIDToTypeID('Ordn'), charIDToTypeID('Trgt'));
    var layerDesc = executeActionGet(ref);
    var ob = mu.actionDescriptorToSimpleObject(layerDesc);
    if (ob.targetLayers == undefined)
    {
        return [];
    }

    var arr = [];
    for (var i in ob.targetLayers)
    {
        arr.push(Kinase.prototype.layer.getLayerIdByItemIndex(ob.targetLayers[i].index + 1))
    }
    return arr;
}


Kinase.prototype.layer.getAllLayersItemIndex = function ()
{

    var doc = app.activeDocument.layers;
    var indexArray = [];
    _getLayers(doc, indexArray);

    function _getLayers(layers, indexArray)
    {
        for (var i = 0; i < layers.length; i++)
        {
            indexArray.push(layers[i].itemIndex);

            if (layers[i].typename != "ArtLayer")
            {
                _getLayers(layers[i].layers, indexArray)
            }
        }
    };

    return indexArray;

}

// 形状图层设置 =============================================================================

/**
 * 返回指定图层的 keyOriginType 信息对象，其中包含图层中形状的尺寸、位置、圆角信息。
 * 示例：ki.layer.get_keyOriginType_Objcet(ki.REF_ItemIndex, 3)
 * @param targetReference - 目标图层类型 ，可以是 Kinase.REF_ActiveLayer - 当前选中图层、Kinase.REF_LayerID - 根据图层 ID 、Kinase.REF_ItemIndex - 根据图层 ItemIndex。
 * @param target - 目标图层参数，根据图层类型，填入图层 ID 或者 ItemIndex 。当目标图层类型是 Kinase.REF_ActiveLayer 时，请填 null。
 * @returns {{}}
 */
Kinase.prototype.layer.get_keyOriginType_Objcet = function (targetReference, target)
{
    var ref = new ActionReference();
    ref.putProperty(charIDToTypeID("Prpr"), stringIDToTypeID("keyOriginType"));
    targetReference(ref, target);

    var layerDesc = executeActionGet(ref);
    return mu.actionDescriptorToObject(layerDesc);

}


/**
 * 返回指定图层的形状的圆角信息（Objcet），包括 topRight、topLeft、bottomLeft、bottomRight。
 * @param targetReference - targetReference 目标图层类型 ，可以是 Kinase.REF_ActiveLayer - 当前选中图层、Kinase.REF_LayerID - 根据图层 ID 、Kinase.REF_ItemIndex - 根据图层 ItemIndex。
 * @param target - 目标图层参数，根据图层类型，填入图层 ID 或者 ItemIndex 。当目标图层类型是 Kinase.REF_ActiveLayer 时，请填 null。
 * @param returnKeyOriginType - 在返回值中包含 keyOriginType
 * @returns {{topRight: null, topLeft: null, bottomLeft: null, bottomRight: null}}
 */
Kinase.prototype.layer.getLayerRadian = function (targetReference, target, returnKeyOriginType)
{
    var radianInfo = {topRight: null, topLeft: null, bottomLeft: null, bottomRight: null};
    var keyOriginType_raw = Kinase.prototype.layer.get_keyOriginType_Objcet(targetReference, target);

    if (isEmptyObject(keyOriginType_raw) || keyOriginType_raw.keyOriginType == undefined)
    {
        radianInfo.err = "err:not shape layer."
        return radianInfo;
    }
    else
    {
        var keyOriginType = keyOriginType_raw.keyOriginType;
    }

    for (var i in keyOriginType.value)
    {
        try
        {
            var _topRight = keyOriginType.value[i].value.keyOriginRRectRadii.value.topRight.value.doubleValue;
            var _topLeft = keyOriginType.value[i].value.keyOriginRRectRadii.value.topLeft.value.doubleValue;
            var _bottomRight = keyOriginType.value[i].value.keyOriginRRectRadii.value.bottomRight.value.doubleValue;
            var _bottomLeft = keyOriginType.value[i].value.keyOriginRRectRadii.value.bottomLeft.value.doubleValue;

            radianInfo.topRight = _topRight;
            radianInfo.topLeft = _topLeft;
            radianInfo.bottomRight = _bottomRight;
            radianInfo.bottomLeft = _bottomLeft;
        } catch (e)
        {
        }
        ;

        break;//暂定一次
    }

    if (returnKeyOriginType)
    {
        radianInfo.keyOriginType = keyOriginType_raw;
        return radianInfo;
    } else
    {
        return radianInfo;
    }

}

Kinase.prototype.layer.setLayerRadian_byActive = function (radianInfo)
{
    var oldRadianInfo = Kinase.prototype.layer.getLayerRadian(Kinase.REF_ActiveLayer, null);
    if (radianInfo.topRight == undefined) radianInfo.topRight = oldRadianInfo.topRight;
    if (radianInfo.topLeft == undefined) radianInfo.topLeft = oldRadianInfo.topLeft;
    if (radianInfo.bottomRight == undefined) radianInfo.bottomRight = oldRadianInfo.bottomRight;
    if (radianInfo.bottomLeft == undefined) radianInfo.bottomLeft = oldRadianInfo.bottomLeft;


    var adOb = {
        "keyOriginType": {
            "value": 1,
            "type": "DescValueType.INTEGERTYPE"
        },
        "keyOriginRRectRadii": {
            "value": {
                "unitValueQuadVersion": {
                    "value": 1,
                    "type": "DescValueType.INTEGERTYPE"
                },
                "topRight": {
                    "value": {
                        "doubleType": "pixelsUnit",
                        "doubleValue": radianInfo.topRight
                    },
                    "type": "DescValueType.UNITDOUBLE"
                },
                "topLeft": {
                    "value": {
                        "doubleType": "pixelsUnit",
                        "doubleValue": radianInfo.topLeft
                    },
                    "type": "DescValueType.UNITDOUBLE"
                },
                "bottomLeft": {
                    "value": {
                        "doubleType": "pixelsUnit",
                        "doubleValue": radianInfo.bottomLeft
                    },
                    "type": "DescValueType.UNITDOUBLE"
                },
                "bottomRight": {
                    "value": {
                        "doubleType": "pixelsUnit",
                        "doubleValue":radianInfo.bottomRight
                    },
                    "type": "DescValueType.UNITDOUBLE"
                }
            },
            "type": "DescValueType.OBJECTTYPE",
            "objectType": "radii"
        },
        "keyActionRadiiSource": {
            "value": 1,
            "type": "DescValueType.INTEGERTYPE"
        },
        "keyActionChangeAllCorners": {
            "value": false,
            "type": "DescValueType.BOOLEANTYPE"
        }
    }

    var ad = mu.objectToActionDescriptor(adOb);
    var idtoolModalStateChanged = stringIDToTypeID("changePathDetails");
    executeAction(idtoolModalStateChanged, ad, DialogModes.NO);

}


/**
 * 返回指定图层的形状属性对象，包括 x: 到左边界距离、y: 到顶边界距离、w: 宽度、h: 高度。
 * @param targetReference - targetReference 目标图层类型 ，可以是 Kinase.REF_ActiveLayer - 当前选中图层、Kinase.REF_LayerID - 根据图层 ID 、Kinase.REF_ItemIndex - 根据图层 ItemIndex。
 * @param target - 目标图层参数，根据图层类型，填入图层 ID 或者 ItemIndex 。当目标图层类型是 Kinase.REF_ActiveLayer 时，请填 null。
 * @param returnKeyOriginType - 在返回值中包含 keyOriginType
 * @returns {{x: null, y: null, w: null, h: null}}
 */
Kinase.prototype.layer.getLayerShapeSize = function (targetReference, target, returnKeyOriginType)
{
    var sizeInfo = {x: null, y: null, w: null, h: null};
    var keyOriginType_raw = Kinase.prototype.layer.get_keyOriginType_Objcet(targetReference, target);


    if (isEmptyObject(keyOriginType_raw) || keyOriginType_raw.keyOriginType == undefined)
    {
        sizeInfo.err = "err:not shape layer."
        return sizeInfo;
    }
    else
    {
        var keyOriginType = keyOriginType_raw.keyOriginType;
    }
    // log(json(keyOriginType))

    var len = 0;
    var left = null;
    var right = null;
    var top = null;
    var bottom = null;
    //log(json(keyOriginType_raw))
    // 一个图层可有多个形状，这里计算考虑所有形状后的尺寸和位置：
    for (var i in keyOriginType.value)
    {
        len++;

        if (keyOriginType.value[i].value.keyOriginShapeBBox !== undefined)
        {
            var _left = keyOriginType.value[i].value.keyOriginShapeBBox.value.left.value.doubleValue;
            var _right = keyOriginType.value[i].value.keyOriginShapeBBox.value.right.value.doubleValue;
            var _top = keyOriginType.value[i].value.keyOriginShapeBBox.value.top.value.doubleValue;
            var _bottom = keyOriginType.value[i].value.keyOriginShapeBBox.value.bottom.value.doubleValue;


            if (left == null || _left < left)
            {
                left = _left;
            }
            if (right == null || _right > right)
            {
                right = _right;
            }
            if (top == null || _top < top)
            {
                top = _top;
            }
            if (bottom == null || _bottom > bottom)
            {
                bottom = _bottom;
            }
        }

    }

    sizeInfo.x = left;
    sizeInfo.y = top;
    sizeInfo.w = right - left;
    sizeInfo.h = bottom - top;

    if (returnKeyOriginType)
    {
        sizeInfo.keyOriginType = keyOriginType_raw;
        return sizeInfo;
    }
    else
    {
        return sizeInfo;
    }

}

/**
 * 改变当前选中图层的形状尺寸与位置。
 * sizeInfo 参数是一个对象，可有 {x,y,h,w} 属性，每个属性都可空如仅指定 {w,h}，没有的属性会取形状原来的值。
 * 当参数 sizeInfo 对象有属性 scale 并为真值时，为缩放模式：{w:0.5,h:0.5,scale:true}
 * 当参数 sizeInfo 对象有属性 centr 并为真值时，尺寸改变会以中点位置不变为前提。：{w:0.5,h:0.5,scale:true,centr:true}
 * @param sizeInfo - 尺寸信息对象，{x,y,w,h,scale,centr}
 * @returns {string}
 */
Kinase.prototype.layer.setLayerShapeSize_byActive = function (sizeInfo)
{


    var oldSizeInfo = Kinase.prototype.layer.getLayerShapeSize(Kinase.REF_ActiveLayer, null, true);
    var keyOriginType_raw = oldSizeInfo.keyOriginType;
    // log(json(oldSizeInfo))


    if (sizeInfo == undefined || isEmptyObject(keyOriginType_raw) || oldSizeInfo.err !== undefined)
    {
        return "err";
    }


    var keyOriginType = keyOriginType_raw.keyOriginType;


    if (sizeInfo.scale !== undefined && sizeInfo.scale == true)
    {
        if (sizeInfo.w == undefined) sizeInfo.w = 1;
        if (sizeInfo.h == undefined) sizeInfo.h = 1;
        if (sizeInfo.y == undefined) sizeInfo.y = 1;
        if (sizeInfo.x == undefined) sizeInfo.x = 1;

        sizeInfo.w = oldSizeInfo.w * sizeInfo.w;
        sizeInfo.h = oldSizeInfo.h * sizeInfo.h;
        sizeInfo.y = oldSizeInfo.y * sizeInfo.y;
        sizeInfo.x = oldSizeInfo.x * sizeInfo.x;
    }
    else
    {
        if (sizeInfo.w == undefined) sizeInfo.w = oldSizeInfo.w;
        if (sizeInfo.h == undefined) sizeInfo.h = oldSizeInfo.h;
        if (sizeInfo.y == undefined) sizeInfo.y = oldSizeInfo.y;
        if (sizeInfo.x == undefined) sizeInfo.x = oldSizeInfo.x;
    }


    var scaleW, scaleH;
    scaleW = sizeInfo.w / oldSizeInfo.w;
    scaleH = sizeInfo.h / oldSizeInfo.h;


    if (sizeInfo.centr !== undefined && sizeInfo.centr == true)
    {
        var left = oldSizeInfo.x - ( sizeInfo.w - oldSizeInfo.w) / 2;
        var top = oldSizeInfo.y + (oldSizeInfo.h - sizeInfo.h) / 2
    } else
    {
        var left = sizeInfo.x;
        var top = sizeInfo.y;
    }


    var right = left + sizeInfo.w;
    var bottom = sizeInfo.h + top;


    // log(json({left: left, top: top}))
    var actionDescriptorOb = {
        "keyOriginType": {
            "value": 2,
            "type": "DescValueType.INTEGERTYPE"
        },
        "keyOriginShapeBBox": {
            "value": {
                "unitValueQuadVersion": {
                    "value": 1,
                    "type": "DescValueType.INTEGERTYPE"
                },
                "top": {
                    "value": {
                        "doubleType": "pixelsUnit",
                        "doubleValue": top
                    },
                    "type": "DescValueType.UNITDOUBLE"
                },
                "left": {
                    "value": {
                        "doubleType": "pixelsUnit",
                        "doubleValue": left
                    },
                    "type": "DescValueType.UNITDOUBLE"
                },
                "bottom": {
                    "value": {
                        "doubleType": "pixelsUnit",
                        "doubleValue": bottom
                    },
                    "type": "DescValueType.UNITDOUBLE"
                },
                "right": {
                    "value": {
                        "doubleType": "pixelsUnit",
                        "doubleValue": right
                    },
                    "type": "DescValueType.UNITDOUBLE"
                }
            },
            "type": "DescValueType.OBJECTTYPE",
            "objectType": "unitRect"
        },
        "keyActionPreserveLocation": {
            "value": false,
            "type": "DescValueType.BOOLEANTYPE"
        }
    }

    var ad = mu.objectToActionDescriptor(actionDescriptorOb);
    var idtoolModalStateChanged = stringIDToTypeID("changePathDetails");
    executeAction(idtoolModalStateChanged, ad, DialogModes.NO);


}


//----------------------

/**
 * 根据图层 ID 单选图层
 * @param layerID
 */
Kinase.prototype.layer.selctLayer_byID = function (layerID)
{
    var adOb = {
        "null": {
            "value": {
                "container": {
                    "container": {}
                },
                "form": "ReferenceFormType.NAME",
                "desiredClass": "layer",
                "name": Kinase.prototype.layer.getLayerName_byID(layerID)
            },
            "type": "DescValueType.REFERENCETYPE"
        },
        "makeVisible": {
            "value": false,
            "type": "DescValueType.BOOLEANTYPE"
        },
        "layerID": {
            "value": {
                "0": {
                    "value": layerID,
                    "type": "DescValueType.INTEGERTYPE"
                }
            },
            "type": "DescValueType.LISTTYPE"
        }
    }


    var ad = mu.objectToActionDescriptor(adOb);

    var idslct = charIDToTypeID("slct");
    executeAction(idslct, ad, DialogModes.NO);
}

/**
 * 根据图层 ItemIndex 单选图层
 * @param ItemIndex
 */
Kinase.prototype.layer.selctLayer_byItemIndex = function (ItemIndex)
{
    var layerID = Kinase.prototype.layer.getLayerIdByItemIndex(ItemIndex);
    Kinase.prototype.layer.selctLayer_byID(layerID)

}

/**
 * 根据图层 ID ，多选图层。不会取消之前选中的图层（如果 repick 不为真）。
 * @param layerIDArray
 * @param repick - 为真会取消之前的已选图层重新选择。
 * @returns {string}
 */
Kinase.prototype.layer.selctMultLayers_byID = function (layerIDArray, repick)
{

    if (layerIDArray == undefined)
    {
        return "err";
    }

    layerIDArray = layerIDArray.sort();
    if (repick)
    {
        Kinase.prototype.layer.selctLayer_byID(layerIDArray[0]);
    }
    for (var i = 0; i < layerIDArray.length; i++)
    {
        var desc = new ActionDescriptor();
        var ref = new ActionReference();
        ref.putIdentifier(charIDToTypeID('Lyr '), layerIDArray[i]);
        desc.putReference(charIDToTypeID('null'), ref);
        desc.putEnumerated(stringIDToTypeID('selectionModifier'),
            stringIDToTypeID('selectionModifierType'),
            stringIDToTypeID('addToSelection'));
        desc.putBoolean(charIDToTypeID('MkVs'), false);
        executeAction(charIDToTypeID('slct'), desc, DialogModes.NO);

    }
}

/**
 * 根据图层 ItemIndex ，多选图层。不会取消之前选中的图层（如果 repick 不为真）。
 * @param itemIndexArray
 * @param repick - 为真会取消之前的已选图层重新选择。
 * @returns {string}
 */
Kinase.prototype.layer.selctMultLayers_byItemIndex = function (itemIndexArray, repick)
{

    if (itemIndexArray == undefined)
    {
        return "err";
    }

    if (repick)
    {
        Kinase.prototype.layer.selctLayer_byItemIndex(itemIndexArray[0]);
    }

    for (var i = 0; i < itemIndexArray.length; i++)
    {
        var desc = new ActionDescriptor();
        var ref = new ActionReference();
        ref.putIndex(charIDToTypeID('Lyr '), itemIndexArray[i] + Kinase.BKOffset());
        desc.putReference(charIDToTypeID('null'), ref);
        desc.putEnumerated(stringIDToTypeID('selectionModifier'),
            stringIDToTypeID('selectionModifierType'),
            stringIDToTypeID('addToSelection'));
        desc.putBoolean(charIDToTypeID('MkVs'), false);
        executeAction(charIDToTypeID('slct'), desc, DialogModes.NO);

    }
}


/**
 * 根据图层 ID 获取图层名称
 * @param layerID
 * @returns {*}
 */
Kinase.prototype.layer.getLayerName_byID = function (layerID)
{
    var ref = new ActionReference();
    ref.putProperty(charIDToTypeID("Prpr"), charIDToTypeID("Nm  "));
    ref.putIdentifier(charIDToTypeID("Lyr "), layerID);

    try
    {
        return executeActionGet(ref).getString(charIDToTypeID("Nm  "));
    } catch (e)
    {
        return null;
    }
}

/**
 * 根据图层 ItemIndex 获取图层名称
 * @param ItemIndex
 * @returns {*}
 */
Kinase.prototype.layer.getLayerName_byItemIndex = function (ItemIndex)
{


    var ref = new ActionReference();
    ref.putProperty(charIDToTypeID("Prpr"), charIDToTypeID("Nm  "));
    ref.putIndex(charIDToTypeID("Lyr "), ItemIndex + Kinase.BKOffset());
    try
    {
        return executeActionGet(ref).getString(charIDToTypeID("Nm  "));
    } catch (e)
    {
        return null;
    }
}

// 选取目标 Reference--------------------------------
Kinase.REF_ActiveLayer = function (ref)
{
    ref.putEnumerated(charIDToTypeID("Lyr "), charIDToTypeID("Ordn"), charIDToTypeID("Trgt"));
}

Kinase.REF_LayerID = function (ref, layerID)
{
    ref.putIdentifier(charIDToTypeID("Lyr "), layerID);
}

Kinase.REF_ItemIndex = function (ref, itemIndex)
{
    ref.putIndex(charIDToTypeID("Lyr "));
}

/**
 * 取背景索引偏移。由于 PS 内部 index ，背景图层无论存在与否始终占用 0 位，所以在使用 itemIndex 时，背景图层存在时，需要 -1 位。
 * @returns {number}
 * @constructor
 */
Kinase.BKOffset = function ()
{
    backgroundIndexOffset = 0;
    try
    {
        if (app.activeDocument.backgroundLayer) backgroundIndexOffset = -1;

    }
    catch (err)
    {
    }
    return backgroundIndexOffset
}


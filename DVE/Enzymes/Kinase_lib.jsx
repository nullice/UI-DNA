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

    // log("index:"+itemIndex +":"+Kinase.BKOffset())
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
        arr.push(ob.targetLayers[i].index)
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
        arr.push(Kinase.prototype.layer.getLayerIdByItemIndex(ob.targetLayers[i].index))
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


    log(json({left: left, top: top}))
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


    // var adOb2 = {
    //     "null": {
    //         "value": {
    //             "container": {
    //                 "container": {}
    //             }
    //             ,
    //             "form": "ReferenceFormType.INDEX", "desiredClass": "layer", "index": 1
    //         }
    //         ,
    //         "type": "DescValueType.REFERENCETYPE"
    //     }
    // }

    var ad = mu.objectToActionDescriptor(adOb);

    var idslct = charIDToTypeID("slct");
    executeAction(idslct, ad, DialogModes.NO);
}


Kinase.prototype.layer.selctLayer_byItemIndex = function (ItemIndex)
{
    var layerID = Kinase.prototype.layer.getLayerIdByItemIndex(ItemIndex);
    Kinase.prototype.layer.selctLayer_byID(layerID)

}


Kinase.prototype.layer.selctMultLayers_byID = function (layerIDArray)
{

    if (layerIDArray == undefined)
    {
        return "err";
    }
    var idOb = {
        "value": null,
        "type": "DescValueType.INTEGERTYPE"
    }

    var adOb = {
        "null": {
            "value": {
                "container": {
                    "container": {}
                },
                "form": "ReferenceFormType.NAME",
                "desiredClass": "layer",
                "name": Kinase.prototype.layer.getLayerName_byID(layerIDArray[layerIDArray.length - 1])
            },
            "type": "DescValueType.REFERENCETYPE"
        },
        "selectionModifier": {
            "value": {
                "enumerationType": "selectionModifierType",
                "enumerationValue": "addToSelection"
            },
            "type": "DescValueType.ENUMERATEDTYPE"
        },
        "makeVisible": {
            "value": false,
            "type": "DescValueType.BOOLEANTYPE"
        },
        "layerID": {
            "value": {},
            "type": "DescValueType.LISTTYPE"
        }
    }

    for (var i = 0; i < layerIDArray.length; i++)
    {
        adOb.layerID.value[i] = {
            "value": layerIDArray[i],
            "type": "DescValueType.INTEGERTYPE"
        }
    }

    var ad = mu.objectToActionDescriptor(adOb);
    var idslct = charIDToTypeID("slct");
    executeAction(idslct, ad, DialogModes.NO);
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


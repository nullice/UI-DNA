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

Kinase.prototype.layer.get_AGMStrokeStyleInfo_Objcet = function (targetReference, target)
{
    var ref = new ActionReference();
    ref.putProperty(charIDToTypeID("Prpr"), stringIDToTypeID("AGMStrokeStyleInfo"));
    targetReference(ref, target, "contentLayer");
    var layerDesc = executeActionGet(ref);
    return mu.actionDescriptorToObject(layerDesc);
}

Kinase.prototype.layer.get_XXX_Objcet = function (targetReference, target, xxx)
{
    var ref = new ActionReference();
    ref.putProperty(charIDToTypeID("Prpr"), stringIDToTypeID(xxx));
    targetReference(ref, target, "contentLayer");
    var layerDesc = executeActionGet(ref);
    return mu.actionDescriptorToObject(layerDesc);
}


Kinase.prototype.layer.getAppearance = function (targetReference, target)
{
    var appearanceInfo = {
        fillOpacity: null, /*不透明度*/
        opacity: null, /*不透明*/
        visible: null, /*可视*/
        userMaskDensity: null, /*图层蒙版-浓度*/
        userMaskFeather: null, /*图层蒙版-羽化*/
        vectorMaskDensity: null, /*矢量蒙版-浓度*/
        vectorMaskFeather: null, /*矢量蒙版-羽化*/
    };

    var fillOpacity_raw = Kinase.prototype.layer.get_XXX_Objcet(targetReference, target, "fillOpacity")
    if (fillOpacity_raw.fillOpacity != undefined)
    {
        appearanceInfo.fillOpacity=fillOpacity_raw.fillOpacity.value;
    }



        log(json(fillOpacity_raw))
}


Kinase.prototype.layer.getStrokeStyle = function (targetReference, target, returnKeyOriginType)
{
    var strokeStyle = {
        strokeColor: {r: null, g: null, b: null, enabled: null}, /*描边颜色*/
        fillColor: {r: null, g: null, b: null, enabled: null}, /*填充颜色*/
        lineWidth: null, /*边线宽度*/
        dashSet: null, /*虚线设置*/
        lineAlignment: null, /*描边选项-对齐*/
        lineCapType: null, /*描边选项-端点*/
        lineJoinType: null, /*描边选项-角点*/
    };
    var AGMStrokeStyleInfo_raw = Kinase.prototype.layer.get_AGMStrokeStyleInfo_Objcet(targetReference, target);
    var adjustment_raw = Kinase.prototype.layer.get_XXX_Objcet(targetReference, target, "adjustment")


    if (isEmptyObject(AGMStrokeStyleInfo_raw) || AGMStrokeStyleInfo_raw.AGMStrokeStyleInfo == undefined)
    {
        strokeStyle.err = "err:not shape layer."
        return strokeStyle;
    }
    else
    {
        var AGMStrokeStyleInfo = AGMStrokeStyleInfo_raw.AGMStrokeStyleInfo;
    }
    try
    {
        strokeStyle.strokeColor.enabled = AGMStrokeStyleInfo.value.strokeEnabled.value;
        strokeStyle.strokeColor.r = AGMStrokeStyleInfo.value.strokeStyleContent.value.color.value.red.value;
        strokeStyle.strokeColor.g = AGMStrokeStyleInfo.value.strokeStyleContent.value.color.value.grain.value;
        strokeStyle.strokeColor.b = AGMStrokeStyleInfo.value.strokeStyleContent.value.color.value.blue.value;

    } catch (e)
    {
        log(e);
    }
    try
    {
        strokeStyle.fillColor.enabled = AGMStrokeStyleInfo.value.fillEnabled.value;
        strokeStyle.fillColor.r = adjustment_raw.adjustment.value[0].value.color.value.red.value;
        strokeStyle.fillColor.g = adjustment_raw.adjustment.value[0].value.color.value.grain.value;
        strokeStyle.fillColor.b = adjustment_raw.adjustment.value[0].value.color.value.blue.value;
    } catch (e)
    {
        log(e);
    }
    try
    {
        strokeStyle.lineWidth = AGMStrokeStyleInfo.value.strokeStyleLineWidth.value.doubleValue;
    } catch (e)
    {
        log(e);
    }
    try
    {
        var set = [];
        for (var i in AGMStrokeStyleInfo.value.strokeStyleLineDashSet.value)
        {
            set.push(strokeStyle.dashSet = AGMStrokeStyleInfo.value.strokeStyleLineDashSet.value[i].value.doubleValue);
        }
        if (set.length > 0) strokeStyle.dashSet = set;

    } catch (e)
    {
        log(e);
    }
    try
    {
        strokeStyle.lineAlignment = AGMStrokeStyleInfo.value.strokeStyleLineAlignment.value.enumerationValue;
        strokeStyle.lineCapType = AGMStrokeStyleInfo.value.strokeStyleLineCapType.value.enumerationValue;
        strokeStyle.lineJoinType = AGMStrokeStyleInfo.value.strokeStyleLineJoinType.value.enumerationValue;

    } catch (e)
    {
        log(e);
    }

    return strokeStyle;
}

Kinase.prototype.layer.setStrokeStyle_byActive = function (strokeStyle)
{
    var oldStrokeStyle = Kinase.prototype.layer.getStrokeStyle(Kinase.REF_ActiveLayer, null);

    //颜色-------------------------------------------------------------------
    if (strokeStyle.strokeColor.enabled == undefined) strokeStyle.strokeColor.enabled = oldStrokeStyle.strokeColor.enabled;
    if (strokeStyle.strokeColor.r == undefined) strokeStyle.strokeColor.r = oldStrokeStyle.strokeColor.r;
    if (strokeStyle.strokeColor.g == undefined) strokeStyle.strokeColor.g = oldStrokeStyle.strokeColor.g;
    if (strokeStyle.strokeColor.b == undefined) strokeStyle.strokeColor.b = oldStrokeStyle.strokeColor.b;
    if (strokeStyle.fillColor.enabled == undefined) strokeStyle.fillColor.enabled = oldStrokeStyle.fillColor.enabled;
    if (strokeStyle.fillColor.r == undefined) strokeStyle.fillColor.r = oldStrokeStyle.fillColor.r;
    if (strokeStyle.fillColor.g == undefined) strokeStyle.fillColor.g = oldStrokeStyle.fillColor.g;
    if (strokeStyle.fillColor.b == undefined) strokeStyle.fillColor.b = oldStrokeStyle.fillColor.b;

    var adOb_strokeColor = {
        "null": {
            "value": {
                "container": {
                    "container": {}
                },
                "form": "ReferenceFormType.ENUMERATED",
                "desiredClass": "contentLayer",
                "enumeratedType": "ordinal",
                "enumeratedValue": "targetEnum"
            }, "type": "DescValueType.REFERENCETYPE"
        },
        "to": {
            "value": {
                "strokeStyle": {
                    "value": {
                        "strokeStyleContent": {
                            "value": {
                                "color": {
                                    "value": {
                                        "red": {"value": strokeStyle.strokeColor.r, "type": "DescValueType.DOUBLETYPE"},
                                        "grain": {
                                            "value": strokeStyle.strokeColor.g,
                                            "type": "DescValueType.DOUBLETYPE"
                                        },
                                        "blue": {"value": strokeStyle.strokeColor.b, "type": "DescValueType.DOUBLETYPE"}
                                    }, "type": "DescValueType.OBJECTTYPE", "objectType": "RGBColor"
                                }
                            }, "type": "DescValueType.OBJECTTYPE", "objectType": "solidColorLayer"
                        },
                        "strokeStyleVersion": {"value": 2, "type": "DescValueType.INTEGERTYPE"},
                        "strokeEnabled": {"value": strokeStyle.strokeColor.enabled, "type": "DescValueType.BOOLEANTYPE"}
                    }, "type": "DescValueType.OBJECTTYPE", "objectType": "strokeStyle"
                }
            }, "type": "DescValueType.OBJECTTYPE", "objectType": "shapeStyle"
        }
    }
    mu.executeActionObjcet(charIDToTypeID("setd"), adOb_strokeColor)

    var adOb_fillColor = {
        "null": {
            "value": {
                "container": {
                    "container": {}
                },
                "form": "ReferenceFormType.ENUMERATED",
                "desiredClass": "contentLayer",
                "enumeratedType": "ordinal",
                "enumeratedValue": "targetEnum"
            }, "type": "DescValueType.REFERENCETYPE"
        },
        "to": {
            "value": {
                "fillContents": {
                    "value": {
                        "color": {
                            "value": {
                                "red": {"value": strokeStyle.fillColor.r, "type": "DescValueType.DOUBLETYPE"},
                                "grain": {"value": strokeStyle.fillColor.g, "type": "DescValueType.DOUBLETYPE"},
                                "blue": {"value": strokeStyle.fillColor.b, "type": "DescValueType.DOUBLETYPE"}
                            }, "type": "DescValueType.OBJECTTYPE", "objectType": "RGBColor"
                        }
                    }, "type": "DescValueType.OBJECTTYPE", "objectType": "solidColorLayer"
                },
                "strokeStyle": {
                    "value": {
                        "strokeStyleVersion": {"value": 2, "type": "DescValueType.INTEGERTYPE"},
                        "fillEnabled": {"value": strokeStyle.fillColor.enabled, "type": "DescValueType.BOOLEANTYPE"}
                    }, "type": "DescValueType.OBJECTTYPE", "objectType": "strokeStyle"
                }
            }, "type": "DescValueType.OBJECTTYPE", "objectType": "shapeStyle"
        }
    }
    mu.executeActionObjcet(charIDToTypeID("setd"), adOb_fillColor)

    //描边宽度-------------------------------------------------------------------
    if (strokeStyle.lineWidth != undefined)
    {
        var adOb_lineWidth = {
            "null": {
                "value": {
                    "container": {
                        "container": {}
                    },
                    "form": "ReferenceFormType.ENUMERATED",
                    "desiredClass": "contentLayer",
                    "enumeratedType": "ordinal",
                    "enumeratedValue": "targetEnum"
                }, "type": "DescValueType.REFERENCETYPE"
            },
            "to": {
                "value": {
                    "strokeStyle": {
                        "value": {
                            "strokeStyleLineWidth": {
                                "value": {
                                    "doubleType": "pixelsUnit",
                                    "doubleValue": strokeStyle.lineWidth
                                }, "type": "DescValueType.UNITDOUBLE"
                            },
                            "strokeStyleVersion": {"value": 2, "type": "DescValueType.INTEGERTYPE"},
                            "strokeEnabled": {
                                "value": strokeStyle.strokeColor.enabled,
                                "type": "DescValueType.BOOLEANTYPE"
                            }
                        }, "type": "DescValueType.OBJECTTYPE", "objectType": "strokeStyle"
                    }
                }, "type": "DescValueType.OBJECTTYPE", "objectType": "shapeStyle"
            }
        }
        mu.executeActionObjcet(charIDToTypeID("setd"), adOb_lineWidth)
    }
    //虚线设置-------------------------------------------------------------------
    if (strokeStyle.dashSet != undefined)
    {
        var adOb_dashSet = {
            "null": {
                "value": {
                    "container": {
                        "container": {}
                    },
                    "form": "ReferenceFormType.ENUMERATED",
                    "desiredClass": "contentLayer",
                    "enumeratedType": "ordinal",
                    "enumeratedValue": "targetEnum"
                },
                "type": "DescValueType.REFERENCETYPE"
            },
            "to": {
                "value": {
                    "strokeStyle": {
                        "value": {
                            "strokeStyleLineDashSet": {
                                "value": {},
                                "type": "DescValueType.LISTTYPE"
                            },
                            "strokeStyleVersion": {
                                "value": 2,
                                "type": "DescValueType.INTEGERTYPE"
                            },
                            "strokeEnabled": {
                                "value": strokeStyle.strokeColor.enabled,
                                "type": "DescValueType.BOOLEANTYPE"
                            }
                        },
                        "type": "DescValueType.OBJECTTYPE",
                        "objectType": "strokeStyle"
                    }
                },
                "type": "DescValueType.OBJECTTYPE",
                "objectType": "shapeStyle"
            }
        }
        for (var i = 0; i < strokeStyle.dashSet.length; i++)
        {
            adOb_dashSet.to.value.strokeStyle.value.strokeStyleLineDashSet.value[i] = {
                "value": {
                    "doubleType": "noneUnit",
                    "doubleValue": strokeStyle.dashSet[i],
                }, "type": "DescValueType.UNITDOUBLE"
            }
        }

        mu.executeActionObjcet(charIDToTypeID("setd"), adOb_dashSet)
    }
    //描边选项-对齐-------------------------------------------------------------------
    if (strokeStyle.lineAlignment != undefined)
    {
        var adOb_lineAlignment = {
            "null": {
                "value": {
                    "container": {
                        "container": {}
                    },
                    "form": "ReferenceFormType.ENUMERATED",
                    "desiredClass": "contentLayer",
                    "enumeratedType": "ordinal",
                    "enumeratedValue": "targetEnum"
                },
                "type": "DescValueType.REFERENCETYPE"
            },
            "to": {
                "value": {
                    "strokeStyle": {
                        "value": {
                            "strokeStyleLineAlignment": {
                                "value": {
                                    "enumerationType": "strokeStyleLineAlignment",
                                    "enumerationValue": strokeStyle.lineAlignment
                                },
                                "type": "DescValueType.ENUMERATEDTYPE"
                            },
                            "strokeStyleVersion": {
                                "value": 2,
                                "type": "DescValueType.INTEGERTYPE"
                            },
                            "strokeEnabled": {
                                "value": strokeStyle.strokeColor.enabled,
                                "type": "DescValueType.BOOLEANTYPE"
                            }
                        },
                        "type": "DescValueType.OBJECTTYPE",
                        "objectType": "strokeStyle"
                    }
                },
                "type": "DescValueType.OBJECTTYPE",
                "objectType": "shapeStyle"
            }
        }
        mu.executeActionObjcet(charIDToTypeID("setd"), adOb_lineAlignment)
    }
    //描边选项-端点-------------------------------------------------------------------
    if (strokeStyle.lineCapType != undefined)
    {
        var adOb_lineCapType = {
            "null": {
                "value": {
                    "container": {
                        "container": {}
                    },
                    "form": "ReferenceFormType.ENUMERATED",
                    "desiredClass": "contentLayer",
                    "enumeratedType": "ordinal",
                    "enumeratedValue": "targetEnum"
                }, "type": "DescValueType.REFERENCETYPE"
            },
            "to": {
                "value": {
                    "strokeStyle": {
                        "value": {
                            "strokeStyleLineCapType": {
                                "value": {
                                    "enumerationType": "strokeStyleLineCapType",
                                    "enumerationValue": strokeStyle.lineCapType
                                }, "type": "DescValueType.ENUMERATEDTYPE"
                            },
                            "strokeStyleVersion": {"value": 2, "type": "DescValueType.INTEGERTYPE"},
                            "strokeEnabled": {
                                "value": strokeStyle.strokeColor.enabled,
                                "type": "DescValueType.BOOLEANTYPE"
                            }
                        }, "type": "DescValueType.OBJECTTYPE", "objectType": "strokeStyle"
                    }
                }, "type": "DescValueType.OBJECTTYPE", "objectType": "shapeStyle"
            }
        }
        mu.executeActionObjcet(charIDToTypeID("setd"), adOb_lineCapType)
    }
    //描边选项-角点-------------------------------------------------------------------
    if (strokeStyle.lineJoinType != undefined)
    {
        var adOb_lineJoinType = {
            "null": {
                "value": {
                    "container": {
                        "container": {}
                    },
                    "form": "ReferenceFormType.ENUMERATED",
                    "desiredClass": "contentLayer",
                    "enumeratedType": "ordinal",
                    "enumeratedValue": "targetEnum"
                }, "type": "DescValueType.REFERENCETYPE"
            },
            "to": {
                "value": {
                    "strokeStyle": {
                        "value": {
                            "strokeStyleLineJoinType": {
                                "value": {
                                    "enumerationType": "strokeStyleLineJoinType",
                                    "enumerationValue": strokeStyle.lineJoinType
                                }, "type": "DescValueType.ENUMERATEDTYPE"
                            },
                            "strokeStyleVersion": {"value": 2, "type": "DescValueType.INTEGERTYPE"},
                            "strokeEnabled": {
                                "value": strokeStyle.strokeColor.enabled,
                                "type": "DescValueType.BOOLEANTYPE"
                            }
                        }, "type": "DescValueType.OBJECTTYPE", "objectType": "strokeStyle"
                    }
                }, "type": "DescValueType.OBJECTTYPE", "objectType": "shapeStyle"
            }
        }
        mu.executeActionObjcet(charIDToTypeID("setd"), adOb_lineJoinType)
    }
    // if (strokeStyle.dashSet == undefined) strokeStyle.dashSet = oldStrokeStyle.dashSet;
    // if (strokeStyle.lineAlignment == undefined) strokeStyle.lineAlignment = oldStrokeStyle.lineAlignment;
    // if (strokeStyle.lineCapType == undefined) strokeStyle.lineCapType = oldStrokeStyle.lineCapType;
    // if (strokeStyle.lineJoinType == undefined) strokeStyle.lineJoinType = oldStrokeStyle.lineJoinType;
}


/**
 * 返回指定图层的形状的圆角信息（Objcet），包括 topRight、topLeft、bottomLeft、bottomRight。fillColor
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

/**
 * 设置
 * @param radianInfo
 */
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
                        "doubleValue": radianInfo.bottomRight
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


Kinase.prototype.layer.getLayerBounds = function (targetReference, target, getType)
{
    var boundsInfo = {x: null, y: null, w: null, h: null, right: null, bottom: null}
    var classStr = getType || "boundsNoEffects";//"bounds"、"boundsNoMask"
    var boundsInfo_raw = Kinase.prototype.layer.get_XXX_Objcet(targetReference, target, classStr);


    if (isEmptyObject(boundsInfo_raw) || boundsInfo_raw[classStr] == undefined)
    {
        boundsInfo.err = "err:not shape layer."
        return boundsInfo;
    }
    else
    {
        var boundsInfo_raw = boundsInfo_raw[classStr];
    }

    boundsInfo.x = boundsInfo_raw.value.left.value.doubleValue
    boundsInfo.y = boundsInfo_raw.value.top.value.doubleValue
    boundsInfo.w = boundsInfo_raw.value.width.value.doubleValue
    boundsInfo.h = boundsInfo_raw.value.height.value.doubleValue
    boundsInfo.right = boundsInfo_raw.value.right.value.doubleValue
    boundsInfo.bottom = boundsInfo_raw.value.bottom.value.doubleValue

    return boundsInfo;
}


/**
 * 改变图层边界，相当于自由形变，可位移图层、改变改变图层尺寸。
 * @param boundsInfo {x:新的 X 坐标, y：新的 Y 坐标, w：新的宽度, h：新的高度，centerState：锚点位置（默认左上角，8为中心）}
 * @param targetReference - targetReference 目标图层类型 ，可以是 Kinase.REF_ActiveLayer - 当前选中图层、Kinase.REF_LayerID - 根据图层 ID 、Kinase.REF_ItemIndex - 根据图层 ItemIndex。
 * @param target - 目标图层参数，根据图层类型，填入图层 ID 或者 ItemIndex 。当目标图层类型是 Kinase.REF_ActiveLayer 时，请填 null。
 */
Kinase.prototype.layer.setLayerBounds = function (boundsInfo, targetReference, target)
{
    // {x: null, y: null, w: null, h: null,centerStatea,}
    var oldradianInfo = Kinase.prototype.layer.getLayerBounds(targetReference || Kinase.REF_ActiveLayer, target || null);


    var adOb = {
        "null": {
            "value": {
                "container": {
                    "container": {}
                },
                "form": "ReferenceFormType.ENUMERATED",
                "desiredClass": "layer",
                "enumeratedType": "ordinal",
                "enumeratedValue": "targetEnum"
            },
            "type": "DescValueType.REFERENCETYPE"
        },
        "freeTransformCenterState": {
            "value": {
                "enumerationType": "quadCenterState",
                "enumerationValue": "QCSCorner0"
            },
            "type": "DescValueType.ENUMERATEDTYPE"
        },
        "offset": {
            "value": {
                "horizontal": {
                    "value": {
                        "doubleType": "pixelsUnit",
                        "doubleValue": 0
                    },
                    "type": "DescValueType.UNITDOUBLE"
                },
                "vertical": {
                    "value": {
                        "doubleType": "pixelsUnit",
                        "doubleValue": 0
                    },
                    "type": "DescValueType.UNITDOUBLE"
                }
            },
            "type": "DescValueType.OBJECTTYPE",
            "objectType": "offset"
        },
        "interfaceIconFrameDimmed": {
            "value": {
                "enumerationType": "interpolationType",
                "enumerationValue": "bicubic"
            },
            "type": "DescValueType.ENUMERATEDTYPE"
        }
    }

    //描点位置
    // ----------------------------------------------------------
    // | (0):QCSCorner0   | (1):QCSSide0   |  (2):QCSCorner1    |
    // | (7):QCSSide3     | (8):QCSAverage |  (3):QCSSide1      |
    // | (6):QCSCorner3   | (5):QCSSide2   |  (4):QCSCorner2    |
    // ----------------------------------------------------------
    if (boundsInfo.centerState == undefined) boundsInfo.centerState = 0;
    var centerStatelist = ["QCSCorner0", "QCSSide0", "QCSCorner1", "QCSSide1", "QCSCorner2", "QCSSide2", "QCSCorner3", "QCSSide3", "QCSAverage"]
    var centerStateStr = centerStatelist[boundsInfo.centerState]
    adOb.freeTransformCenterState.value.enumerationValue = centerStateStr;

    Kinase._boundsAnchor(oldradianInfo, boundsInfo.centerState);
    if (boundsInfo.x != undefined) adOb.offset.value.horizontal.value.doubleValue = boundsInfo.x - oldradianInfo.x;
    if (boundsInfo.y != undefined) adOb.offset.value.vertical.value.doubleValue = boundsInfo.y - oldradianInfo.y;
    if (boundsInfo.h != undefined)
    {
        var offset = (boundsInfo.h / oldradianInfo.h) * 100;
        adOb.height = {
            "value": {
                "doubleType": "percentUnit",
                "doubleValue": offset
            },
            "type": "DescValueType.UNITDOUBLE"
        }
    }
    if (boundsInfo.w != undefined)
    {
        var offset = (boundsInfo.w / oldradianInfo.w) * 100;
        adOb.width = {
            "value": {
                "doubleType": "percentUnit",
                "doubleValue": offset
            },
            "type": "DescValueType.UNITDOUBLE"
        }
    }


    // log(json(adOb))
    mu.executeActionObjcet(charIDToTypeID("Trnf"), adOb);
}


Kinase._rltb2xywh = function (boundsInfo)
{
// {x: null, y: null, w: null, h: null,centerStatea,}
    var newBoundsInfo = {x: null, y: null, w: null, h: null};

    newBoundsInfo.x = boundsInfo.left;
    newBoundsInfo.y = boundsInfo.top;
    newBoundsInfo.h = boundsInfo.bottom - boundsInfo.top;
    newBoundsInfo.w = boundsInfo.right - boundsInfo.left;

    return newBoundsInfo;
}


Kinase._xywh2rltb = function (boundsInfo)
{
// {x: null, y: null, w: null, h: null,centerStatea,}
    var newBoundsInfo = {left: null, right: null, top: null, bottom: null};

    newBoundsInfo.left = boundsInfo.x;
    newBoundsInfo.top = boundsInfo.y;
    newBoundsInfo.right = boundsInfo.x + boundsInfo.w;
    newBoundsInfo.bottom = boundsInfo.y + boundsInfo.h;

    return newBoundsInfo;
}


/**
 * 计算锚点位置
 * @param boundsInfo - {x: null, y: null, w: null, h: null}
 * @param centerStatea - 锚点
 * @returns {*}
 * @private
 */
Kinase._boundsAnchor = function (boundsInfo, centerStatea)
{
    // {x: null, y: null, w: null, h: null,centerStatea,}
    //描点位置
    // ----------------------------------------------------------
    // | (0):QCSCorner0   | (1):QCSSide0   |  (2):QCSCorner1    |
    // | (7):QCSSide3     | (8):QCSAverage |  (3):QCSSide1      |
    // | (6):QCSCorner3   | (5):QCSSide2   |  (4):QCSCorner2    |
    // ----------------------------------------------------------


    if (centerStatea == 0)
    {
        boundsInfo.x = boundsInfo.x;
        boundsInfo.y = boundsInfo.y;
    }
    else if (centerStatea == 1)
    {
        boundsInfo.x = boundsInfo.x + (boundsInfo.w / 2);
        boundsInfo.y = boundsInfo.y
    }
    else if (centerStatea == 2)
    {
        boundsInfo.x = boundsInfo.x + boundsInfo.w;
        boundsInfo.y = boundsInfo.y
    }
    else if (centerStatea == 3)
    {
        boundsInfo.x = boundsInfo.x + boundsInfo.w;
        boundsInfo.y = boundsInfo.y + (boundsInfo.h / 2);
    }
    else if (centerStatea == 4)
    {
        boundsInfo.x = boundsInfo.x + boundsInfo.w;
        boundsInfo.y = boundsInfo.y + boundsInfo.h;
    }
    else if (centerStatea == 5)
    {
        boundsInfo.x = boundsInfo.x + (boundsInfo.w / 2);
        boundsInfo.y = boundsInfo.y + boundsInfo.h;
    }
    else if (centerStatea == 6)
    {
        boundsInfo.x = boundsInfo.x;
        boundsInfo.y = boundsInfo.y + boundsInfo.h;
    }
    else if (centerStatea == 7)
    {
        boundsInfo.x = boundsInfo.x;
        boundsInfo.y = boundsInfo.y + (boundsInfo.h / 2);
    }
    else if (centerStatea == 8)
    {
        boundsInfo.x = boundsInfo.x + (boundsInfo.w / 2);
        boundsInfo.y = boundsInfo.y + (boundsInfo.h / 2);
    }

    // log("aaa:" + json(boundsInfo))
    return boundsInfo;
}

/**
 * 移动图层位置，使用的是偏移值
 * @param targetReference - targetReference 目标图层类型 ，可以是 Kinase.REF_ActiveLayer - 当前选中图层、Kinase.REF_LayerID - 根据图层 ID 、Kinase.REF_ItemIndex - 根据图层 ItemIndex。
 * @param target - 目标图层参数，根据图层类型，填入图层 ID 或者 ItemIndex 。当目标图层类型是 Kinase.REF_ActiveLayer 时，请填 null。
 * @param offsets - 偏移值对象 {x,y}
 */
Kinase.prototype.layer.moveLayerXY = function (targetReference, target, offsets)
{

    var desc = new ActionDescriptor();
    var ref = new ActionReference();
    targetReference(ref, target);
    desc.putReference(charIDToTypeID("null"), ref);
    var pdesc = new ActionDescriptor();
    pdesc.putUnitDouble(charIDToTypeID('Hrzn'), charIDToTypeID('#Pxl'), offsets.x);
    pdesc.putUnitDouble(charIDToTypeID('Vrtc'), charIDToTypeID('#Pxl'), offsets.y);
    desc.putObject(charIDToTypeID('T   '), charIDToTypeID('Ofst'), pdesc);
    executeAction(charIDToTypeID('move'), desc, DialogModes.NO);
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
    var ref = new ActionReference();
    ref.putIdentifier(charIDToTypeID("Lyr "), layerID);
    var desc = new ActionDescriptor();
    desc.putReference(charIDToTypeID("null"), ref);
    executeAction(charIDToTypeID("slct"), desc, DialogModes.NO);
}

/**
 * 根据图层 ItemIndex 单选图层
 * @param ItemIndex
 */
Kinase.prototype.layer.selctLayer_byItemIndex = function (ItemIndex)
{
    var ref = new ActionReference();
    ref.putIndex(charIDToTypeID("Lyr "), ItemIndex + Kinase.BKOffset());
    var desc = new ActionDescriptor();
    desc.putReference(charIDToTypeID("null"), ref);
    executeAction(charIDToTypeID("slct"), desc, DialogModes.NO);

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
Kinase.REF_ActiveLayer = function (ref, classString)
{
    var desiredClass = classString || "Lyr ";
    ref.putEnumerated(charIDToTypeID(desiredClass), charIDToTypeID("Ordn"), charIDToTypeID("Trgt"));
}

Kinase.REF_LayerID = function (ref, layerID, classString)
{
    var desiredClass = classString || "Lyr ";
    ref.putIdentifier(charIDToTypeID(desiredClass), layerID);
}

Kinase.REF_ItemIndex = function (ref, itemIndex, classString)
{
    var desiredClass = classString || "Lyr ";
    ref.putIndex(charIDToTypeID(desiredClass), itemIndex);

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


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


if (this.log == undefined)
{
    this.log = function (x)
    {
        return x;
    }
}

var Kinase = function ()
{
    return this;
}


// Kinase.app
// 宿主应用相关功能 ----------------------------------------------
Kinase.app = {};

/**
 * 复制文本到剪贴板。
 * @param text 文本
 */
Kinase.app.clipboardCopyText = function (text)
{
    var ad = new ActionDescriptor();
    ad.putString(charIDToTypeID('TxtD'), text);
    executeAction(stringIDToTypeID("textToClipboard"), ad, DialogModes.NO);
}

/**
 * 根据字体 Family 列表顺序的优先级获取一个存在的字体 postScriptName
 * 如：getFontPostScriptName_byFontFamilyList(["微软雅黑 Bold", "苹方"]) => "MicrosoftYaHei-Bold"
 * @param fontFamilyList []
 * @returns {*}
 */
Kinase.app.getFontPostScriptName_byFontFamilyList = function (fontFamilyList)
{

    for (var i = 0; i < fontFamilyList.length; i++)
    {
        for (var x = 0; x < app.fonts.length; x++)
        {

            try
            {
                var re = RegExp("^" + fontFamilyList[i]);
                var family = app.fonts[x]["family"] + " " + app.fonts[x]["style"]
                if (re.test(family))
                {
                    return app.fonts[x].postScriptName;
                }

            } catch (e)
            {
                $.writeln("Kinase.app.getFontPostScriptName_byFontNameList:" + e)
            }
        }
    }

    return null;
}


/**
 * 根据字体 postScriptName 列表顺序的优先级获取一个存在的字体 postScriptName
 * 如 ：["MicrosoftYaHei", "SourceHanSansCN-Normal", "HiraginoSansGB-W3"] => "MicrosoftYaHei"
 * @param fontFamilyList
 * @returns {*}
 */
Kinase.app.getFontPostScriptName_byFontPostScriptName = function (fontFamilyList)
{


    if (app.fonts == undefined)    return null;


    for (var i = 0; i < fontFamilyList.length; i++)
    {
        for (var x = 0; x < app.fonts.length; x++)
        {
            try
            {
                if (app.fonts[x].postScriptName == fontFamilyList[i])
                {
                    return app.fonts[x].postScriptName;
                }

            } catch (e)
            {
                $.writeln("Kinase.app.getFontPostScriptName_byFontPostScriptName:" + e)
            }
        }
    }

    return null;
}


// Kinase.document
// 文档相关功能 ====================================================================================================
Kinase.document = {};


/**
 *  获取当前文档详细信息对象
 * @returns {{}}
 */
Kinase.document.getDocumentInfoObject_byActive = function ()
{
    var ref = new ActionReference();
    ref.putEnumerated(charIDToTypeID('Dcmn'), charIDToTypeID('Ordn'), charIDToTypeID('Trgt'));
    var ad = executeActionGet(ref);
    var ob = mu.actionDescriptorToObject(ad);
    return ob;
}

/**
 * 是否存在画板。
 * @param returnArtBoard 为真返回值会是个对象，会包含最先找到的画板 id：{hasArtBoard: true, aArtBoardId: id}
 * @returns {*}
 */
Kinase.document.hasArtBoard = function (returnArtBoard)
{

    for (var i = 0; i < activeDocument.layers.length; i++)
    {
        if (Kinase.layer.isArtBoard(Kinase.REF_LayerID, activeDocument.layers[i].id))
        {
            if (returnArtBoard)
            {
                return {hasArtBoard: true, aArtBoardId: activeDocument.layers[i].id}
            } else
            {
                return true
            }

        }
    }

    if (returnArtBoard)
    {
        return {hasArtBoard: false, aArtBoardId: null}
    } else
    {
        return false;
    }
}

// if (!app.activeDocument.saved)

/**
 * 保存当前文档，如果文档从未保存，弹出对话框
 */
Kinase.document.save_byActive = function ()
{
    try
    {
        app.activeDocument.save()
    } catch (e)
    {

        try
        {
            executeAction(charIDToTypeID("save"), new ActionDescriptor(), DialogModes.ALL);
        } catch (e)
        {
        }
    }

}


// Kinase.selection
// 选区相关功能  ====================================================================================================
Kinase.selection = {}

/**
 * 从选择的图层创建选区
 */
Kinase.selection.createSelection_byActive = function ()
{

    var ad = new ActionDescriptor();
    var af = new ActionReference();
    af.putProperty(charIDToTypeID("Chnl"), charIDToTypeID("fsel"));
    ad.putReference(charIDToTypeID("null"), af);
    var af2 = new ActionReference();
    af2.putEnumerated(charIDToTypeID("Chnl"), charIDToTypeID("Chnl"), charIDToTypeID("Trsp"));
    ad.putReference(charIDToTypeID("T   "), af2);
    executeAction(charIDToTypeID("setd"), ad, DialogModes.NO);
}


// Kinase.layer
// 图层相关功能  ====================================================================================================

Kinase.layer = {};

/**
 * 根据 layerId 返回图层基本信息
 * {
        name: name,
        id: layerId,
        index: itemIndex
    }
 * @param layerId
 * @returns {{name: (*|Promise), id: *, index: *}}
 */
Kinase.layer.getLayerBaseInfo_byID = function (layerId)
{
    var itemIndex = Kinase.layer.getItemIndexBylayerID(layerId)
    var name = Kinase.layer.getLayerName_byID(layerId)

    return {
        name: name,
        id: layerId,
        index: itemIndex
    }
}


Kinase.layer.getLayerType = function (targetReference, target)
{

    //todo:补充图层类型
    /*
     * bitmap: 像素图层 layerKind:1
     * text: 文本图层 layerKind:3
     * shape: 形状 layerKind:4
     * smartObject: 智能对象 layerKind:5
     * layerSet: 图层组（包括画板）layerKind:7
     *
     * */
    var layerType = {
        typeName: "other", /*图层类型名称 （Kinase 内部名称）*/
        layerKind: null, /*Photoshop 内部属性值*/
        isLayerSet: Kinase.layer.isLayerSet(targetReference, target), /*是否是图层组*/
        isArtBoard: Kinase.layer.isArtBoard(targetReference, target)/*是否是画板*/
    }

    var ob = Kinase.layer.get_XXX_Objcet(targetReference, target, "layerKind")

    if (ob["layerKind"] != undefined)
    {
        var layerKind = ob["layerKind"]["value"]

        layerType.layerKind = layerKind;

        if (layerKind == 1)
        {
            layerType.typeName = "bitmap";
            return layerType
        }
        else if (layerKind == 3)
        {
            layerType.typeName = "text";
            return layerType
        }
        else if (layerKind == 4)
        {
            layerType.typeName = "shape";
            return layerType
        }
        else if (layerKind == 5)
        {
            layerType.typeName = "smartObject";
            return layerType
        }
        else if (layerKind == 7)
        {
            layerType.typeName = "layerSet";
            return layerType
        }

    }


    return layerType
}


/**
 * 获取图层详细信息对象，目标图层由一个 ActionReference 参数决定
 *      是 layer.getLayerInfoObject_byID()、layer.getLayerInfoObject_byItemIndex()、layer.getLayerInfoObject_byActiveLayer() 实际调用的方法
 * @param ref
 * @returns {{}}
 */
Kinase.layer.getLayerInfoObject_byReference = function (ref)
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
Kinase.layer.getLayerInfoObject_byID = function (layerID)
{
    var ref = new ActionReference();
    ref.putIdentifier(charIDToTypeID('Lyr '), layerID);

    return Kinase.layer.getLayerInfoObject_byReference(ref);
}


/**
 * 根据图层序号（itemIndex）获取图层详细信息对象
 * @param itemIndex
 * @returns {{}}
 */
Kinase.layer.getLayerInfoObject_byItemIndex = function (itemIndex)
{
    var ref = new ActionReference();
    ref.putIndex(charIDToTypeID('Lyr '), itemIndex + Kinase.BKOffset());

    return Kinase.layer.getLayerInfoObject_byReference(ref);
}


/**
 * 获取当前选中图层的详细信息对象
 * @returns {{}}
 */
Kinase.layer.getLayerInfoObject_byActiveLayer = function ()
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

    return Kinase.layer.getLayerInfoObject_byReference(ref);
}

/**
 *  获取当前选中图层图层 ID
 * @param itemIndex
 * @returns {*}
 */
Kinase.layer.getLayerIdByActive = function ()
{
    var ref = new ActionReference();
    ref.putProperty(charIDToTypeID("Prpr"), stringIDToTypeID('layerID'));
    ref.putEnumerated(charIDToTypeID("Lyr "), charIDToTypeID("Ordn"), charIDToTypeID("Trgt"));
    // log("index:" + itemIndex + ":" + Kinase.BKOffset())
    var layerDesc = executeActionGet(ref);

    return layerDesc.getInteger(stringIDToTypeID('layerID'));
}
/**
 * 根据图层序号（ItemIndex）获取图层 ID
 * @param itemIndex
 * @returns {*}
 */
Kinase.layer.getLayerIdByItemIndex = function (itemIndex)
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
Kinase.layer.getItemIndexBylayerID = function (layerID)
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
Kinase.layer.itemIndexArray_ToLayerIdArray = function (itemIndexArray)
{
    var layerIdArray = []
    for (var i = 0; i < itemIndexArray.length; i++)
    {
        layerIdArray.push(Kinase.layer.getLayerIdByItemIndex(itemIndexArray[i]))
    }
    return layerIdArray;
}


/**
 *  LayerID 数组转换到 itemIndex 数组
 * @param layerIdArray
 * @returns {Array}
 */
Kinase.layer.layerIdArray_ToItemIndexArray = function (layerIdArray)
{
    var itemIndexArray = []
    for (var i = 0; i < layerIdArray.length; i++)
    {
        itemIndexArray.push(Kinase.layer.getItemIndexBylayerID(layerIdArray[i]))
    }
    return itemIndexArray;
}


/**
 * 获取所有选中图层的图层序号（ItemIndex），返回数组
 * @returns {Array}
 */
Kinase.layer.getTargetLayersItemIndex = function ()
{
    if (app.documents.length < 1)//
    {
        return []
    }

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
Kinase.layer.getTargetLayersID = function ()
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
        arr.push(Kinase.layer.getLayerIdByItemIndex(ob.targetLayers[i].index + 1))
    }
    return arr;
}


/**
 * 返回包含全部图层的图层索引（ItemIndex）的数组
 * @returns {Array}
 */
Kinase.layer.getAllLayersItemIndex = function ()
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

/**
 * 返回包含全部图层的 layerList [{id,name,itemIndex}]数组
 * @returns {Array}
 */
Kinase.layer.getAllLayerList = function ()
{
    var doc = app.activeDocument.layers;
    var layerList = [];
    _getLayers(doc, layerList);

    function _getLayers(layers, layerList)
    {
        for (var i = 0; i < layers.length; i++)
        {
            layerList.push({
                id: layers[i].id,
                name: layers[i].name,
                itemIndex: layers[i].itemIndex
            });

            if (layers[i].typename != "ArtLayer")
            {
                _getLayers(layers[i].layers, layerList)
            }
        }
    };

    return layerList;
}


// 形状图层设置 =============================================================================

/**
 * 返回指定图层的 keyOriginType 信息对象，其中包含图层中形状的尺寸、位置、圆角信息。
 * 示例：ki.layer.get_keyOriginType_Objcet(ki.REF_ItemIndex, 3)
 * @param targetReference - 目标图层类型 ，可以是 Kinase.REF_ActiveLayer - 当前选中图层、Kinase.REF_LayerID - 根据图层 ID 、Kinase.REF_ItemIndex - 根据图层 ItemIndex。
 * @param target - 目标图层参数，根据图层类型，填入图层 ID 或者 ItemIndex 。当目标图层类型是 Kinase.REF_ActiveLayer 时，请填 null。
 * @returns {{}}
 */
Kinase.layer.get_keyOriginType_Objcet = function (targetReference, target)
{
    var ref = new ActionReference();
    ref.putProperty(charIDToTypeID("Prpr"), stringIDToTypeID("keyOriginType"));
    targetReference(ref, target);

    var layerDesc = executeActionGet(ref);
    return mu.actionDescriptorToObject(layerDesc);

}


/**
 * 返回指定图层的 AGMStrokeStyle 信息对象，其中包含图层中形状的描边信息。
 * @param targetReference - 目标图层类型 ，可以是 Kinase.REF_ActiveLayer - 当前选中图层、Kinase.REF_LayerID - 根据图层 ID 、Kinase.REF_ItemIndex - 根据图层 ItemIndex。
 * @param target - 目标图层参数，根据图层类型，填入图层 ID 或者 ItemIndex 。当目标图层类型是 Kinase.REF_ActiveLayer 时，请填 null。
 * @returns {{}}
 */
Kinase.layer.get_AGMStrokeStyleInfo_Objcet = function (targetReference, target)
{
    try
    {
        var ref = new ActionReference();
        ref.putProperty(charIDToTypeID("Prpr"), stringIDToTypeID("AGMStrokeStyleInfo"));
        targetReference(ref, target, "contentLayer");
        var layerDesc = executeActionGet(ref);
        return mu.actionDescriptorToObject(layerDesc);
    } catch (e)
    {
        return null;
    }

}


/**
 * 返回指定图层信息对象中指定的属性
 * @param targetReference - 目标图层类型 ，可以是 Kinase.REF_ActiveLayer - 当前选中图层、Kinase.REF_LayerID - 根据图层 ID 、Kinase.REF_ItemIndex - 根据图层 ItemIndex。
 * @param target - 目标图层参数，根据图层类型，填入图层 ID 或者 ItemIndex 。当目标图层类型是 Kinase.REF_ActiveLayer 时，请填 null。
 * @param xxx - 属性名称
 * @param getSimpleObject - 获取简单对象
 * @returns {{}}
 */
Kinase.layer.get_XXX_Objcet = function (targetReference, target, xxx, getSimpleObject)
{

    try
    {
        var ref = new ActionReference();
        ref.putProperty(charIDToTypeID("Prpr"), stringIDToTypeID(xxx));
        targetReference(ref, target, "layer");//"contentLayer"
        var layerDesc = executeActionGet(ref);
    }
    catch (e)
    {
        $.writeln(e)
    }

    if (getSimpleObject === true)
    {
        return mu.actionDescriptorToSimpleObject(layerDesc)
    } else
    {
        return mu.actionDescriptorToObject(layerDesc);
    }


}

/**
 * 获取图层外观信息，以对象形式返回。包括不透明度、填充不透明度、可视性
 * @param {function} targetReference - 目标图层类型 ，可以是 Kinase.REF_ActiveLayer - 当前选中图层、Kinase.REF_LayerID - 根据图层 ID 、Kinase.REF_ItemIndex - 根据图层 ItemIndex。
 * @param target - 目标图层参数，根据图层类型，填入图层 ID 或者 ItemIndex 。当目标图层类型是 Kinase.REF_ActiveLayer 时，请填 null。
 * @returns {{fillOpacity: null, opacity: null, visible: null}}
 */
Kinase.layer.getAppearance = function (targetReference, target)
{
    var appearanceInfo = {
        fillOpacity: null, /*填充不透明度 0-255*/
        opacity: null, /*不透明 0-255*/
        visible: null, /*可视*/
        mode: null, /*混合模式*/
        // userMaskDensity: null, /*图层蒙版-浓度*/
        // userMaskFeather: null, /*图层蒙版-羽化*/
        // vectorMaskDensity: null, /*矢量蒙版-浓度*/
        // vectorMaskFeather: null, /*矢量蒙版-羽化*/
    };

    var fillOpacity_raw = Kinase.layer.get_XXX_Objcet(targetReference, target, "fillOpacity")
    if (fillOpacity_raw != undefined && fillOpacity_raw.fillOpacity != undefined)
    {
        appearanceInfo.fillOpacity = fillOpacity_raw.fillOpacity.value;
        appearanceInfo.fillOpacity = appearanceInfo.fillOpacity / 255 * 100
        appearanceInfo.fillOpacity = appearanceInfo.fillOpacity.toFixed();
    }

    var opacity_raw = Kinase.layer.get_XXX_Objcet(targetReference, target, "opacity")
    if (opacity_raw != undefined && opacity_raw.opacity != undefined)
    {
        appearanceInfo.opacity = opacity_raw.opacity.value;
        appearanceInfo.opacity = appearanceInfo.opacity / 255 * 100
        appearanceInfo.opacity = appearanceInfo.opacity.toFixed();
    }

    var visible_raw = Kinase.layer.get_XXX_Objcet(targetReference, target, "visible")
    if (visible_raw != undefined && visible_raw.visible != undefined)
    {
        appearanceInfo.visible = visible_raw.visible.value;
    }

    var visible_raw = Kinase.layer.get_XXX_Objcet(targetReference, target, "mode")
    if (visible_raw != undefined && visible_raw.mode != undefined)
    {
        appearanceInfo.mode = visible_raw.mode.value.enumerationValue;
    }


    // log(json(fillOpacity_raw));
    return appearanceInfo;
}


Kinase.layer.setAppearance_byActive = function (appearanceInfo)
{
    var oldAppearanceInfo = Kinase.layer.getAppearance(Kinase.REF_ActiveLayer, null);

    if (appearanceInfo.opacity != undefined)
    {
        var adOb_opacity = {
            "null": {
                "value": {
                    "container": {
                        "container": {}
                    },
                    "form": "ReferenceFormType.ENUMERATED",
                    "desiredClass": "layer",
                    "enumeratedType": "ordinal",
                    "enumeratedValue": "targetEnum"
                }, "type": "DescValueType.REFERENCETYPE"
            },
            "to": {
                "value": {
                    "opacity": {
                        "value": {"doubleType": "percentUnit", "doubleValue": appearanceInfo.opacity},
                        "type": "DescValueType.UNITDOUBLE"
                    }
                }, "type": "DescValueType.OBJECTTYPE", "objectType": "layer"
            }
        }
        mu.executeActionObjcet(charIDToTypeID("setd"), adOb_opacity);
    }

    if (appearanceInfo.fillOpacity != undefined)
    {
        var adOb_fillOpacity = {
            "null": {
                "value": {
                    "container": {
                        "container": {}
                    },
                    "form": "ReferenceFormType.ENUMERATED",
                    "desiredClass": "layer",
                    "enumeratedType": "ordinal",
                    "enumeratedValue": "targetEnum"
                }, "type": "DescValueType.REFERENCETYPE"
            },
            "to": {
                "value": {
                    "fillOpacity": {
                        "value": {"doubleType": "percentUnit", "doubleValue": appearanceInfo.fillOpacity},
                        "type": "DescValueType.UNITDOUBLE"
                    }
                }, "type": "DescValueType.OBJECTTYPE", "objectType": "layer"
            }
        }
        mu.executeActionObjcet(charIDToTypeID("setd"), adOb_fillOpacity);
    }


    if (appearanceInfo.mode != undefined)
    {
        var adOb_mode = {
            "null": {
                "value": {
                    "container": {
                        "container": {}
                    },
                    "form": "ReferenceFormType.ENUMERATED",
                    "desiredClass": "layer",
                    "enumeratedType": "ordinal",
                    "enumeratedValue": "targetEnum"
                }, "type": "DescValueType.REFERENCETYPE"
            },
            "to": {
                "value": {
                    "mode": {
                        "value": {
                            "enumerationType": "blendMode",
                            "enumerationValue": appearanceInfo.mode
                        },
                        "type": "DescValueType.ENUMERATEDTYPE"
                    },
                }, "type": "DescValueType.OBJECTTYPE", "objectType": "layer"
            }
        }
        mu.executeActionObjcet(charIDToTypeID("setd"), adOb_mode);
    }


    if (appearanceInfo.visible != undefined)
    {
        var adOb_visible = {
            "null": {
                "value": {
                    "0": {
                        "value": {
                            "container": {
                                "container": {}
                            },
                            "form": "ReferenceFormType.ENUMERATED",
                            "desiredClass": "layer",
                            "enumeratedType": "ordinal",
                            "enumeratedValue": "targetEnum"
                        }, "type": "DescValueType.REFERENCETYPE"
                    }
                }, "type": "DescValueType.LISTTYPE"
            }
        };
        if ((appearanceInfo.visible == true) && (oldAppearanceInfo.visible == false))
        {
            mu.executeActionObjcet(charIDToTypeID("Shw "), adOb_visible);
        }
        else if ((appearanceInfo.visible == false) && (oldAppearanceInfo.visible == true))
        {
            mu.executeActionObjcet(charIDToTypeID("Hd  "), adOb_visible);
        }
    }

}


/**
 * 获取文本图层的各文本信息
 * @param {function} targetReference - 目标图层类型 ，可以是 Kinase.REF_ActiveLayer - 当前选中图层、Kinase.REF_LayerID - 根据图层 ID 、Kinase.REF_ItemIndex - 根据图层 ItemIndex。
 * @param target - 目标图层参数，根据图层类型，填入图层 ID 或者 ItemIndex 。当目标图层类型是 Kinase.REF_ActiveLayer 时，请填 null。
 * @returns {{text: null, bounds: {x: null, y: null, w: null, h: null}, boundingBox: {x: null, y: null, w: null, h: null}, color: {r: null, g: null, b: null}, size: null, fontPostScriptName: null, bold: null, italic: null, antiAlias: null, underline: null, justification: null, leading: null, tracking: null, baselineShift: null, horizontalScale: null, verticalScale: null}}
 */
Kinase.layer.getLayerTextInfo = function (targetReference, target)
{
    var textInfo = {
        text: null, /*文本内容*/
        bounds: {x: null, y: null, w: null, h: null}, /*文本框边界(在图层边界内的位置)*/
        boundingBox: {x: null, y: null, w: null, h: null}, /*文本框最小边界(在图层边界内的位置)*/
        color: {r: null, g: null, b: null}, /*字体颜色*/
        size: null, /*字体尺寸*/
        fontPostScriptName: null, /*字体*/
        bold: null, /*仿粗体*/
        italic: null, /*仿斜体*/
        antiAlias: null, /*消除锯齿方式*/
        underline: null, /*下划线类型 underlineOnLeftInVertical:下划线,underlineOff:无，*/
        justification: null, /*段落对齐方式*/
        leading: null, /*行距*/
        tracking: null, /*字符间距*/
        baselineShift: null, /*基线偏移*/
        horizontalScale: null, /*水平缩放*/
        verticalScale: null, /*垂直缩放*/
    }


    var layerKind = Kinase.layer.get_XXX_Objcet(targetReference, target, "layerKind");
    // log("layerKind :" + layerKind.layerKind.value)
    if (layerKind.layerKind.value == 3)
    {
        var textKey_raw = Kinase.layer.get_XXX_Objcet(targetReference, target, "textKey");
        textKey_raw = textKey_raw.textKey;

        textInfo.text = textKey_raw.value.textKey.value;
        textInfo.boundingBox = Kinase._rltb2xywh(textKey_raw.value.boundingBox.value);
        textInfo.bounds = Kinase._rltb2xywh(textKey_raw.value.bounds.value);
        textInfo.antiAlias = textKey_raw.value.antiAlias.value.enumerationValue;


        textInfo.color.r = 0;
        textInfo.color.g = 0;
        textInfo.color.b = 0;
        if (textKey_raw.value.textStyleRange.value[0] != undefined)
        {
            if (textKey_raw.value.textStyleRange.value[0].value.textStyle.value.color != undefined)
            {
                textInfo.color.r = textKey_raw.value.textStyleRange.value[0].value.textStyle.value.color.value.red.value;
                textInfo.color.g = textKey_raw.value.textStyleRange.value[0].value.textStyle.value.color.value.grain.value;
                textInfo.color.b = textKey_raw.value.textStyleRange.value[0].value.textStyle.value.color.value.blue.value;
            }
        }


        try
        {
            textInfo.size = textKey_raw.value.textStyleRange.value[0].value.textStyle.value.size.value.doubleValue;
        } catch (e)
        {
        }
        try
        {
            textInfo.fontPostScriptName = textKey_raw.value.textStyleRange.value[0].value.textStyle.value.fontPostScriptName.value;
        } catch (e)
        {
        }
        try
        {
            textInfo.bold = textKey_raw.value.textStyleRange.value[0].value.textStyle.value.syntheticBold.value;
        } catch (e)
        {
            textInfo.bold = false;
        }
        try
        {
            textInfo.italic = textKey_raw.value.textStyleRange.value[0].value.textStyle.value.syntheticItalic.value;
        } catch (e)
        {
            textInfo.italic = false;
        }
        try
        {
            textInfo.underline = textKey_raw.value.textStyleRange.value[0].value.textStyle.value.underline.value.enumerationValue;
        } catch (e)
        {

        }
        try
        {
            textInfo.justification = textKey_raw.value.paragraphStyleRange.value[0].value.paragraphStyle.value.align.value.enumerationValue;
        } catch (e)
        {
        }
        try
        {
            textInfo.leading = textKey_raw.value.textStyleRange.value[0].value.textStyle.value.leading.value.doubleValue;
        } catch (e)
        {
        }
        try
        {
            textInfo.tracking = textKey_raw.value.textStyleRange.value[0].value.textStyle.value.tracking.value;
        } catch (e)
        {
        }
        try
        {
            textInfo.baselineShift = textKey_raw.value.textStyleRange.value[0].value.textStyle.value.baselineShift.value.doubleValue;
        } catch (e)
        {

        }
        try
        {
            textInfo.horizontalScale = textKey_raw.value.textStyleRange.value[0].value.textStyle.value.horizontalScale.value;
        } catch (e)
        {

        }
        try
        {
            textInfo.verticalScale = textKey_raw.value.textStyleRange.value[0].value.textStyle.value.verticalScale.value;
        } catch (e)
        {

        }


    }
    else
    {
        log("not text layer :" + layerKind.layerKind.value)
    }


    return textInfo
}


/**
 * 快速设置文本图层的文本内容
 * @param text - 文本内容
 * @param {function} targetReference - 目标图层类型 ，可以是 Kinase.REF_ActiveLayer - 当前选中图层、Kinase.REF_LayerID - 根据图层 ID 、Kinase.REF_ItemIndex - 根据图层 ItemIndex。
 * @param target - 目标图层参数，根据图层类型，填入图层 ID 或者 ItemIndex 。当目标图层类型是 Kinase.REF_ActiveLayer 时，请填 null。
 */
Kinase.layer.setLayerText_Quick = function (text, targetReference, target)
{

    text = Kinase.textLR2CR(text)

    var adOb = {
        "null": {
            "value": {
                "container": {
                    "container": {}
                },
                "form": "ReferenceFormType.ENUMERATED",
                "desiredClass": "textLayer",
                "enumeratedType": "ordinal",
                "enumeratedValue": "targetEnum"
            },
            "type": "DescValueType.REFERENCETYPE"
        },
        "to": {
            "value": {
                "textKey": {
                    "value": text,
                    "type": "DescValueType.STRINGTYPE"
                },

            },
            "type": "DescValueType.OBJECTTYPE",
            "objectType": "textLayer"
        }
    }


    var ref = new ActionReference();

    if (targetReference == undefined) targetReference = Kinase.REF_ActiveLayer;
    targetReference(ref, _value(target, null), "textLayer")
    var refOb = mu.actionReferenceToObject(ref)
    adOb.null.value = refOb;
    mu.executeActionObjcet(charIDToTypeID("setd"), adOb)

}

Kinase.textLR2CR = function (text)
{
    if (text != undefined)
    {
        var reg = /(\r){0,1}\n/g
        if (text.replace != undefined)
        {
            text = text.replace(reg, '\r')
        }
    }
    return text
}

/**
 * 设置文本图层文本范围为最小
 * @param targetReference
 * @param target
 */
Kinase.layer.setLayerTextMinBounds_Quick = function (targetReference, target)
{

    Kinase.layer.setLayerTextInfo({bounds: {w: 9999, h: 9999}}, targetReference, target)

    var layerKind = Kinase.layer.get_XXX_Objcet(targetReference, target, "layerKind");
    if (layerKind.layerKind.value != 3)
    {
        return;
    }

    var textKey_raw = Kinase.layer.get_XXX_Objcet(targetReference, target, "textKey");
    textKey_raw = textKey_raw.textKey;

    var adOb = {
        "null": {
            "value": {
                "container": {
                    "container": {}
                },
                "form": "ReferenceFormType.ENUMERATED",
                "desiredClass": "textLayer",
                "enumeratedType": "ordinal",
                "enumeratedValue": "targetEnum"
            },
            "type": "DescValueType.REFERENCETYPE"
        },
        "to": {
            "value": {},
            "type": "DescValueType.OBJECTTYPE",
            "objectType": "textLayer"
        }
    }


    // log("-----------")
    // log(json(textKey_raw.value.boundingBox))
    // log("-----------")
    var newBounds = {
        top: textKey_raw.value.textShape.value[0].value.bounds.value.top.value,
        left: textKey_raw.value.textShape.value[0].value.bounds.value.left.value,
        bottom: textKey_raw.value.textShape.value[0].value.bounds.value.top.value + textKey_raw.value.boundingBox.value.bottom.value.doubleValue - textKey_raw.value.boundingBox.value.top.value.doubleValue + 3,
        right: textKey_raw.value.textShape.value[0].value.bounds.value.left.value + textKey_raw.value.boundingBox.value.right.value.doubleValue - textKey_raw.value.boundingBox.value.left.value.doubleValue + 3
    }


    adOb.to.value.textShape = textKey_raw.value.textShape;
    adOb.to.value.textShape.value[0].value.char.value.enumerationValue = "box";
    adOb.to.value.textShape.value[0].value.bounds =
        {
            "value": {
                "top": {
                    "value": newBounds.top,
                    "type": "DescValueType.DOUBLETYPE"
                },
                "left": {
                    "value": newBounds.left,
                    "type": "DescValueType.DOUBLETYPE"
                },
                "bottom": {
                    "value": newBounds.bottom,
                    "type": "DescValueType.DOUBLETYPE"
                },
                "right": {
                    "value": newBounds.right,
                    "type": "DescValueType.DOUBLETYPE"
                }
            },
            "type": "DescValueType.OBJECTTYPE",
            "objectType": "rectangle"
        }


    var ref = new ActionReference();
    if (targetReference == undefined) targetReference = Kinase.REF_ActiveLayer;
    targetReference(ref, _value(target, null), "textLayer")
    var refOb = mu.actionReferenceToObject(ref)
    adOb.null.value = refOb;
    // log(json(adOb))
    // logSave();

    mu.executeActionObjcet(charIDToTypeID("setd"), adOb)
}


/**
 * 设置文本图层各属性
 * @param {object} textInfo 参数
 * @param {function} targetReference - 目标图层类型 ，可以是 Kinase.REF_ActiveLayer - 当前选中图层、Kinase.REF_LayerID - 根据图层 ID 、Kinase.REF_ItemIndex - 根据图层 ItemIndex。
 * @param target - 目标图层参数，根据图层类型，填入图层 ID 或者 ItemIndex 。当目标图层类型是 Kinase.REF_ActiveLayer 时，请填 null。
 */
Kinase.layer.setLayerTextInfo = function (textInfo, targetReference, target)
{
    /*    textInfo{
     text: null, /!*文本内容，\r 表示换行*!/
     bounds: {x: null, y: null, w: null, h: null}, /!*文本框边界(在图层边界内的位置)*!/
     boundingBox: {x: null, y: null, w: null, h: null}, /!*文本框最小边界(在图层边界内的位置)*!/
     color: {r: null, g: null, b: null}, /!*字体颜色*!/
     size: null, /!*字体尺寸*!/
     fontPostScriptName: null, /!*字体*!/
     bold: null, /!*仿粗体*!/
     italic: null, /!*仿斜体*!/
     antiAlias: null, /!*消除锯齿方式*!/
     underline: null, /!*下划线类型 underlineOnLeftInVertical:下划线,underlineOff:无，*!/
     justification: null, /!*段落对齐方式*!/
     leading: null, /!*行距*!/
     tracking: null, /!*字符间距*!/
     baselineShift: null, /!*基线偏移*!/
     horizontalScale: null, /!*水平缩放*!/
     verticalScale: null, /!*垂直缩放*!/
     }*/

    var layerKind = Kinase.layer.get_XXX_Objcet(targetReference, target, "layerKind");
    if (layerKind.layerKind.value != 3)
    {
        return;
    }

    // 单独设置动作-----
    if (textInfo.size != undefined)
    {
        var adOb = {
            "null": {
                "value": {
                    "container": {
                        "container": {
                            "container": {}
                        },
                        "form": "ReferenceFormType.ENUMERATED",
                        "desiredClass": "textLayer",
                        "enumeratedType": "ordinal",
                        "enumeratedValue": "targetEnum"
                    },
                    "form": "ReferenceFormType.PROPERTY",
                    "desiredClass": "property",
                    "property": "textStyle"
                },
                "type": "DescValueType.REFERENCETYPE"
            },
            "to": {
                "value": {
                    "textOverrideFeatureName": {
                        "value": 808465458,
                        "type": "DescValueType.INTEGERTYPE"
                    },
                    "typeStyleOperationType": {
                        "value": 3,
                        "type": "DescValueType.INTEGERTYPE"
                    },
                    "size": {
                        "value": {
                            "doubleType": "pointsUnit",
                            "doubleValue": textInfo.size
                        },
                        "type": "DescValueType.UNITDOUBLE"
                    }
                },
                "type": "DescValueType.OBJECTTYPE",
                "objectType": "textStyle"
            }
        }

        var ref = new ActionReference();
        if (targetReference == undefined) targetReference = Kinase.REF_ActiveLayer;
        targetReference(ref, _value(target, null), "textLayer")
        var refOb = mu.actionReferenceToObject(ref)
        adOb.null.value.container = refOb;
        mu.executeActionObjcet(charIDToTypeID("setd"), adOb)
    }
    if (textInfo.fontPostScriptName != undefined)
    {
        var adOb = {
            "null": {
                "value": {
                    "container": {
                        "container": {
                            "container": {}
                        },
                        "form": "ReferenceFormType.ENUMERATED",
                        "desiredClass": "textLayer",
                        "enumeratedType": "ordinal",
                        "enumeratedValue": "targetEnum"
                    },
                    "form": "ReferenceFormType.PROPERTY",
                    "desiredClass": "property",
                    "property": "textStyle"
                },
                "type": "DescValueType.REFERENCETYPE"
            },
            "to": {
                "value": {
                    "fontPostScriptName": {
                        "value": textInfo.fontPostScriptName,
                        "type": "DescValueType.STRINGTYPE"
                    }
                },
                "type": "DescValueType.OBJECTTYPE",
                "objectType": "textStyle"
            }
        }


        var ref = new ActionReference();
        if (targetReference == undefined) targetReference = Kinase.REF_ActiveLayer;
        targetReference(ref, _value(target, null), "textLayer")
        var refOb = mu.actionReferenceToObject(ref)
        adOb.null.value.container = refOb;
        mu.executeActionObjcet(charIDToTypeID("setd"), adOb)
    }
    if (textInfo.bold != undefined)
    {
        var adOb = {
            "null": {
                "value": {
                    "container": {
                        "container": {
                            "container": {}
                        },
                        "form": "ReferenceFormType.ENUMERATED",
                        "desiredClass": "textLayer",
                        "enumeratedType": "ordinal",
                        "enumeratedValue": "targetEnum"
                    },
                    "form": "ReferenceFormType.PROPERTY",
                    "desiredClass": "property",
                    "property": "textStyle"
                },
                "type": "DescValueType.REFERENCETYPE"
            },
            "to": {
                "value": {
                    "textOverrideFeatureName": {
                        "value": 808465459,
                        "type": "DescValueType.INTEGERTYPE"
                    },
                    "typeStyleOperationType": {
                        "value": 3,
                        "type": "DescValueType.INTEGERTYPE"
                    },
                    "syntheticBold": {
                        "value": textInfo.bold,
                        "type": "DescValueType.BOOLEANTYPE"
                    }
                },
                "type": "DescValueType.OBJECTTYPE",
                "objectType": "textStyle"
            }
        }

        var ref = new ActionReference();
        if (targetReference == undefined) targetReference = Kinase.REF_ActiveLayer;
        targetReference(ref, _value(target, null), "textLayer")
        var refOb = mu.actionReferenceToObject(ref)
        adOb.null.value.container = refOb;
        mu.executeActionObjcet(charIDToTypeID("setd"), adOb)
    }

    if (textInfo.italic != undefined)
    {
        var adOb = {
            "null": {
                "value": {
                    "container": {
                        "container": {
                            "container": {}
                        },
                        "form": "ReferenceFormType.ENUMERATED",
                        "desiredClass": "textLayer",
                        "enumeratedType": "ordinal",
                        "enumeratedValue": "targetEnum"
                    },
                    "form": "ReferenceFormType.PROPERTY",
                    "desiredClass": "property",
                    "property": "textStyle"
                },
                "type": "DescValueType.REFERENCETYPE"
            },
            "to": {
                "value": {
                    "textOverrideFeatureName": {
                        "value": 808465460,
                        "type": "DescValueType.INTEGERTYPE"
                    },
                    "typeStyleOperationType": {
                        "value": 3,
                        "type": "DescValueType.INTEGERTYPE"
                    },
                    "syntheticItalic": {
                        "value": textInfo.italic,
                        "type": "DescValueType.BOOLEANTYPE"
                    }
                },
                "type": "DescValueType.OBJECTTYPE",
                "objectType": "textStyle"
            }
        }

        var ref = new ActionReference();
        if (targetReference == undefined) targetReference = Kinase.REF_ActiveLayer;
        targetReference(ref, _value(target, null), "textLayer")
        var refOb = mu.actionReferenceToObject(ref)
        adOb.null.value.container = refOb;
        mu.executeActionObjcet(charIDToTypeID("setd"), adOb)
    }

    if (textInfo.underline != undefined)
    {
        var adOb = {
            "null": {
                "value": {
                    "container": {
                        "container": {
                            "container": {}
                        },
                        "form": "ReferenceFormType.ENUMERATED",
                        "desiredClass": "textLayer",
                        "enumeratedType": "ordinal",
                        "enumeratedValue": "targetEnum"
                    },
                    "form": "ReferenceFormType.PROPERTY",
                    "desiredClass": "property",
                    "property": "textStyle"
                },
                "type": "DescValueType.REFERENCETYPE"
            },
            "to": {
                "value": {
                    "textOverrideFeatureName": {
                        "value": 808465715,
                        "type": "DescValueType.INTEGERTYPE"
                    },
                    "typeStyleOperationType": {
                        "value": 3,
                        "type": "DescValueType.INTEGERTYPE"
                    },
                    "underline": {
                        "value": {
                            "enumerationType": "underline",
                            "enumerationValue": textInfo.underline
                        },
                        "type": "DescValueType.ENUMERATEDTYPE"
                    }
                },
                "type": "DescValueType.OBJECTTYPE",
                "objectType": "textStyle"
            }
        }


        var ref = new ActionReference();
        if (targetReference == undefined) targetReference = Kinase.REF_ActiveLayer;
        targetReference(ref, _value(target, null), "textLayer")
        var refOb = mu.actionReferenceToObject(ref)
        adOb.null.value.container = refOb;
        mu.executeActionObjcet(charIDToTypeID("setd"), adOb)
    }


    if (textInfo.justification != undefined)
    {
        var adOb = {
            "null": {
                "value": {
                    "container": {
                        "container": {
                            "container": {}
                        },
                        "form": "ReferenceFormType.ENUMERATED",
                        "desiredClass": "textLayer",
                        "enumeratedType": "ordinal",
                        "enumeratedValue": "targetEnum"
                    },
                    "form": "ReferenceFormType.PROPERTY",
                    "desiredClass": "property",
                    "property": "paragraphStyle"
                },
                "type": "DescValueType.REFERENCETYPE"
            },
            "to": {
                "value": {
                    "textOverrideFeatureName": {
                        "value": 808464433,
                        "type": "DescValueType.INTEGERTYPE"
                    },
                    "align": {
                        "value": {
                            "enumerationType": "alignmentType",
                            "enumerationValue": textInfo.justification
                        },
                        "type": "DescValueType.ENUMERATEDTYPE"
                    }
                },
                "type": "DescValueType.OBJECTTYPE",
                "objectType": "paragraphStyle"
            }
        }

        var ref = new ActionReference();
        if (targetReference == undefined) targetReference = Kinase.REF_ActiveLayer;
        targetReference(ref, _value(target, null), "textLayer")
        var refOb = mu.actionReferenceToObject(ref)
        adOb.null.value.container = refOb;
        mu.executeActionObjcet(charIDToTypeID("setd"), adOb)
    }

    if (textInfo.leading != undefined)
    {
        if (textInfo.leading == "auto")
        {
            var adOb = {
                "null": {
                    "value": {
                        "container": {
                            "container": {
                                "container": {}
                            },
                            "form": "ReferenceFormType.ENUMERATED",
                            "desiredClass": "textLayer",
                            "enumeratedType": "ordinal",
                            "enumeratedValue": "targetEnum"
                        },
                        "form": "ReferenceFormType.PROPERTY",
                        "desiredClass": "property",
                        "property": "textStyle"
                    },
                    "type": "DescValueType.REFERENCETYPE"
                },
                "to": {
                    "value": {
                        "textOverrideFeatureName": {
                            "value": 808465462,
                            "type": "DescValueType.INTEGERTYPE"
                        },
                        "typeStyleOperationType": {
                            "value": 3,
                            "type": "DescValueType.INTEGERTYPE"
                        },
                        "autoLeading": {
                            "value": true,
                            "type": "DescValueType.BOOLEANTYPE"
                        }
                    },
                    "type": "DescValueType.OBJECTTYPE",
                    "objectType": "textStyle"
                }
            }

        }
        else
        {

            var adOb = {
                "null": {
                    "value": {
                        "container": {
                            "container": {
                                "container": {}
                            },
                            "form": "ReferenceFormType.ENUMERATED",
                            "desiredClass": "textLayer",
                            "enumeratedType": "ordinal",
                            "enumeratedValue": "targetEnum"
                        }, "form": "ReferenceFormType.PROPERTY", "desiredClass": "property", "property": "textStyle"
                    }, "type": "DescValueType.REFERENCETYPE"
                },
                "to": {
                    "value": {
                        "textOverrideFeatureName": {"value": 808465461, "type": "DescValueType.INTEGERTYPE"},
                        "typeStyleOperationType": {"value": 3, "type": "DescValueType.INTEGERTYPE"},
                        "autoLeading": {"value": false, "type": "DescValueType.BOOLEANTYPE"},
                        "leading": {
                            "value": {"doubleType": "pointsUnit", "doubleValue": textInfo.leading},
                            "type": "DescValueType.UNITDOUBLE"
                        }
                    }, "type": "DescValueType.OBJECTTYPE", "objectType": "textStyle"
                }
            }
        }


        var ref = new ActionReference();
        if (targetReference == undefined) targetReference = Kinase.REF_ActiveLayer;
        targetReference(ref, _value(target, null), "textLayer")
        var refOb = mu.actionReferenceToObject(ref)
        adOb.null.value.container = refOb;
        mu.executeActionObjcet(charIDToTypeID("setd"), adOb)
    }


    if (textInfo.tracking != undefined)
    {
        var adOb = {
            "null": {
                "value": {
                    "container": {
                        "container": {
                            "container": {}
                        },
                        "form": "ReferenceFormType.ENUMERATED",
                        "desiredClass": "textLayer",
                        "enumeratedType": "ordinal",
                        "enumeratedValue": "targetEnum"
                    }, "form": "ReferenceFormType.PROPERTY", "desiredClass": "property", "property": "textStyle"
                }, "type": "DescValueType.REFERENCETYPE"
            },
            "to": {
                "value": {
                    "textOverrideFeatureName": {"value": 808465465, "type": "DescValueType.INTEGERTYPE"},
                    "typeStyleOperationType": {"value": 3, "type": "DescValueType.INTEGERTYPE"},
                    "tracking": {"value": textInfo.tracking, "type": "DescValueType.INTEGERTYPE"}
                }, "type": "DescValueType.OBJECTTYPE", "objectType": "textStyle"
            }
        }


        var ref = new ActionReference();
        if (targetReference == undefined) targetReference = Kinase.REF_ActiveLayer;
        targetReference(ref, _value(target, null), "textLayer")
        var refOb = mu.actionReferenceToObject(ref)
        adOb.null.value.container = refOb;
        mu.executeActionObjcet(charIDToTypeID("setd"), adOb)
    }

    if (textInfo.baselineShift != undefined)
    {
        var adOb = {
            "null": {
                "value": {
                    "container": {
                        "container": {
                            "container": {}
                        },
                        "form": "ReferenceFormType.ENUMERATED",
                        "desiredClass": "textLayer",
                        "enumeratedType": "ordinal",
                        "enumeratedValue": "targetEnum"
                    }, "form": "ReferenceFormType.PROPERTY", "desiredClass": "property", "property": "textStyle"
                }, "type": "DescValueType.REFERENCETYPE"
            },
            "to": {
                "value": {
                    "textOverrideFeatureName": {"value": 808465712, "type": "DescValueType.INTEGERTYPE"},
                    "typeStyleOperationType": {"value": 3, "type": "DescValueType.INTEGERTYPE"},
                    "baselineShift": {
                        "value": {"doubleType": "pointsUnit", "doubleValue": textInfo.baselineShift},
                        "type": "DescValueType.UNITDOUBLE"
                    }
                }, "type": "DescValueType.OBJECTTYPE", "objectType": "textStyle"
            }
        }

        var ref = new ActionReference();
        if (targetReference == undefined) targetReference = Kinase.REF_ActiveLayer;
        targetReference(ref, _value(target, null), "textLayer")
        var refOb = mu.actionReferenceToObject(ref)
        adOb.null.value.container = refOb;
        mu.executeActionObjcet(charIDToTypeID("setd"), adOb)
    }


    if (textInfo.verticalScale != undefined)
    {
        var adOb = {
            "null": {
                "value": {
                    "container": {
                        "container": {
                            "container": {}
                        },
                        "form": "ReferenceFormType.ENUMERATED",
                        "desiredClass": "textLayer",
                        "enumeratedType": "ordinal",
                        "enumeratedValue": "targetEnum"
                    }, "form": "ReferenceFormType.PROPERTY", "desiredClass": "property", "property": "textStyle"
                }, "type": "DescValueType.REFERENCETYPE"
            },
            "to": {
                "value": {
                    "textOverrideFeatureName": {"value": 808465464, "type": "DescValueType.INTEGERTYPE"},
                    "typeStyleOperationType": {"value": 3, "type": "DescValueType.INTEGERTYPE"},
                    "verticalScale": {"value": textInfo.verticalScale, "type": "DescValueType.DOUBLETYPE"}
                }, "type": "DescValueType.OBJECTTYPE", "objectType": "textStyle"
            }
        }

        var ref = new ActionReference();
        if (targetReference == undefined) targetReference = Kinase.REF_ActiveLayer;
        targetReference(ref, _value(target, null), "textLayer")
        var refOb = mu.actionReferenceToObject(ref)
        adOb.null.value.container = refOb;
        mu.executeActionObjcet(charIDToTypeID("setd"), adOb)
    }


    if (textInfo.horizontalScale != undefined)
    {
        var adOb = {
            "null": {
                "value": {
                    "container": {
                        "container": {
                            "container": {}
                        },
                        "form": "ReferenceFormType.ENUMERATED",
                        "desiredClass": "textLayer",
                        "enumeratedType": "ordinal",
                        "enumeratedValue": "targetEnum"
                    }, "form": "ReferenceFormType.PROPERTY", "desiredClass": "property", "property": "textStyle"
                }, "type": "DescValueType.REFERENCETYPE"
            },
            "to": {
                "value": {
                    "textOverrideFeatureName": {"value": 808465463, "type": "DescValueType.INTEGERTYPE"},
                    "typeStyleOperationType": {"value": 3, "type": "DescValueType.INTEGERTYPE"},
                    "horizontalScale": {"value": textInfo.horizontalScale, "type": "DescValueType.DOUBLETYPE"}
                }, "type": "DescValueType.OBJECTTYPE", "objectType": "textStyle"
            }
        }


        var ref = new ActionReference();
        if (targetReference == undefined) targetReference = Kinase.REF_ActiveLayer;
        targetReference(ref, _value(target, null), "textLayer")
        var refOb = mu.actionReferenceToObject(ref)
        adOb.null.value.container = refOb;
        mu.executeActionObjcet(charIDToTypeID("setd"), adOb)
    }
//--------------------------------------------------
    var textKey_raw = Kinase.layer.get_XXX_Objcet(targetReference, target, "textKey");
    textKey_raw = textKey_raw.textKey;

    var adOb = {
        "null": {
            "value": {
                "container": {
                    "container": {}
                },
                "form": "ReferenceFormType.ENUMERATED",
                "desiredClass": "textLayer",
                "enumeratedType": "ordinal",
                "enumeratedValue": "targetEnum"
            },
            "type": "DescValueType.REFERENCETYPE"
        },
        "to": {
            "value": {},
            "type": "DescValueType.OBJECTTYPE",
            "objectType": "textLayer"
        }
    }

    if (textInfo.text != undefined)
    {
        // \r 表示换行符。

        adOb.to.value.textKey = {
            "value": Kinase.textLR2CR(textInfo.text),
            "type": "DescValueType.STRINGTYPE"
        }
    }
    if (textInfo.bounds != undefined)
    {
        //----考虑没有指定某边界值时，用当前边界替代，如不指定 x,y 只指定 h,w
        var oldBounds = Kinase._rltb2xywh({
            top: textKey_raw.value.textShape.value[0].value.bounds.value.top.value,
            left: textKey_raw.value.textShape.value[0].value.bounds.value.left.value,
            bottom: textKey_raw.value.textShape.value[0].value.bounds.value.bottom.value,
            right: textKey_raw.value.textShape.value[0].value.bounds.value.right.value
        })

        if (textInfo.bounds.x == undefined) textInfo.bounds.x = oldBounds.x;
        if (textInfo.bounds.y == undefined) textInfo.bounds.y = oldBounds.y;
        if (textInfo.bounds.h == undefined) textInfo.bounds.h = oldBounds.h;
        if (textInfo.bounds.w == undefined) textInfo.bounds.w = oldBounds.w;
        //--------------------------------------------------------------------undefined
        var tempBounds = Kinase._xywh2rltb(textInfo.bounds);

        adOb.to.value.textShape = textKey_raw.value.textShape;


        adOb.to.value.textShape.value[0].value.char.value.enumerationValue = "box";
        adOb.to.value.textShape.value[0].value.bounds =
            {
                "value": {
                    "top": {
                        "value": tempBounds.top,
                        "type": "DescValueType.DOUBLETYPE"
                    },
                    "left": {
                        "value": tempBounds.left,
                        "type": "DescValueType.DOUBLETYPE"
                    },
                    "bottom": {
                        "value": tempBounds.bottom,
                        "type": "DescValueType.DOUBLETYPE"
                    },
                    "right": {
                        "value": tempBounds.right,
                        "type": "DescValueType.DOUBLETYPE"
                    }
                },
                "type": "DescValueType.OBJECTTYPE",
                "objectType": "rectangle"
            }
    }

    if (textInfo.antiAlias != undefined)
    {
        adOb.to.value.antiAlias = {
            "value": {
                "enumerationType": "antiAliasType",
                "enumerationValue": textInfo.antiAlias
            },
            "type": "DescValueType.ENUMERATEDTYPE"
        }
    }


    if (textInfo.color != undefined)
    {
        if (adOb.to.value.textStyleRange == undefined)
        {
            adOb.to.value.textStyleRange = textKey_raw.value.textStyleRange
        }

        for (var i in  adOb.to.value.textStyleRange.value)
        {
            try
            {
                adOb.to.value.textStyleRange.value[i].value.textStyle.value.color.value.red.value = textInfo.color.r;
                adOb.to.value.textStyleRange.value[i].value.textStyle.value.color.value.grain.value = textInfo.color.g;
                adOb.to.value.textStyleRange.value[i].value.textStyle.value.color.value.blue.value = textInfo.color.b;
            } catch (e)
            {

            }
        }
    }


    var ref = new ActionReference();
    if (targetReference == undefined) targetReference = Kinase.REF_ActiveLayer;
    targetReference(ref, _value(target, null), "textLayer")
    var refOb = mu.actionReferenceToObject(ref)
    adOb.null.value = refOb;
    // log(json(adOb))
    // logSave();

    mu.executeActionObjcet(charIDToTypeID("setd"), adOb)
}

/**
 * 获取形状图层描边信息
 * @param targetReference
 * @param target
 * @param returnKeyOriginType
 * @returns {{strokeColor: {r: null, g: null, b: null, enabled: null}, fillColor: {r: null, g: null, b: null, enabled: null}, lineWidth: null, dashSet: null, lineAlignment: null, lineCapType: null, lineJoinType: null}}
 */
Kinase.layer.getStrokeStyle = function (targetReference, target, returnKeyOriginType)
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
    var AGMStrokeStyleInfo_raw = Kinase.layer.get_AGMStrokeStyleInfo_Objcet(targetReference, target);
    var adjustment_raw = Kinase.layer.get_XXX_Objcet(targetReference, target, "adjustment")


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

Kinase.layer.setStrokeStyle_byActive = function (strokeStyle)
{
    var oldStrokeStyle = Kinase.layer.getStrokeStyle(Kinase.REF_ActiveLayer, null);

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
Kinase.layer.getLayerRadian = function (targetReference, target, returnKeyOriginType)
{
    var radianInfo = {topRight: null, topLeft: null, bottomLeft: null, bottomRight: null};
    var keyOriginType_raw = Kinase.layer.get_keyOriginType_Objcet(targetReference, target);

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
            if (keyOriginType.value[i].value.keyOriginRRectRadii != undefined)
            {
                var _topRight = keyOriginType.value[i].value.keyOriginRRectRadii.value.topRight.value.doubleValue;
                var _topLeft = keyOriginType.value[i].value.keyOriginRRectRadii.value.topLeft.value.doubleValue;
                var _bottomRight = keyOriginType.value[i].value.keyOriginRRectRadii.value.bottomRight.value.doubleValue;
                var _bottomLeft = keyOriginType.value[i].value.keyOriginRRectRadii.value.bottomLeft.value.doubleValue;
            } else
            {
                var _topRight = null
                var _topLeft = null
                var _bottomRight = null
                var _bottomLeft = null

            }

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
 * 设置图层圆角信息
 * @param radianInfo
 */
Kinase.layer.setLayerRadian_byActive = function (radianInfo)
{
    var oldRadianInfo = Kinase.layer.getLayerRadian(Kinase.REF_ActiveLayer, null);
    if (radianInfo.topRight == undefined) radianInfo.topRight = oldRadianInfo.topRight;
    if (radianInfo.topLeft == undefined) radianInfo.topLeft = oldRadianInfo.topLeft;
    if (radianInfo.bottomRight == undefined) radianInfo.bottomRight = oldRadianInfo.bottomRight;
    if (radianInfo.bottomLeft == undefined) radianInfo.bottomLeft = oldRadianInfo.bottomLeft;


    $.writeln(JSON.stringify(radianInfo))
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
                        "doubleValue": +radianInfo.topRight
                    },
                    "type": "DescValueType.UNITDOUBLE"
                },
                "topLeft": {
                    "value": {
                        "doubleType": "pixelsUnit",
                        "doubleValue": +radianInfo.topLeft
                    },
                    "type": "DescValueType.UNITDOUBLE"
                },
                "bottomLeft": {
                    "value": {
                        "doubleType": "pixelsUnit",
                        "doubleValue": +radianInfo.bottomLeft
                    },
                    "type": "DescValueType.UNITDOUBLE"
                },
                "bottomRight": {
                    "value": {
                        "doubleType": "pixelsUnit",
                        "doubleValue": +radianInfo.bottomRight
                    },
                    "type": "DescValueType.UNITDOUBLE"
                }
            },
            "type": "DescValueType.OBJECTTYPE",
            "objectType": "radii"
        }
    }

    var ad = mu.objectToActionDescriptor(adOb);
    var idtoolModalStateChanged = stringIDToTypeID("changePathDetails");
    executeAction(idtoolModalStateChanged, ad, DialogModes.NO);

}


/**
 * 获取当前所有选中图层的范围，x,y,h,w, right, bottom
 * @param ids 可指定 id 数组，如如不提供将获取当前选中的图层
 * @returns {{x: *, y: *, h: number, w: number, right: *, bottom: *}}
 */
Kinase.layer.getLayersRange = function (ids)
{

    if (ids == undefined)
    {
        var ids = Kinase.layer.getTargetLayersID()
    }


    var maxX = null, maxY = null, maxRight = null, maxBottom = null;

    for (var i = 0; i < ids.length; i++)
    {
        var bound = Kinase.layer.getLayerBounds(Kinase.REF_LayerID, ids[i])
        if (maxX === null || bound.x < maxX)
        {
            maxX = bound.x;
        }

        if (maxY === null || bound.y < maxY)
        {
            maxY = bound.y;
        }

        if (maxRight === null || bound.right > maxRight)
        {
            maxRight = bound.right
        }

        if (maxBottom === null || bound.bottom > maxBottom)
        {
            maxBottom = bound.bottom
        }
    }


    return {
        x: maxX, y: maxY, h: maxBottom - maxY, w: maxRight - maxX, right: maxRight, bottom: maxBottom
    }

}


/**
 * 获取图层范围边界信息
 * @param targetReference - targetReference 目标图层类型 ，可以是 Kinase.REF_ActiveLayer - 当前选中图层、Kinase.REF_LayerID - 根据图层 ID 、Kinase.REF_ItemIndex - 根据图层 ItemIndex。
 * @param target - 目标图层参数，根据图层类型，填入图层 ID 或者 ItemIndex 。当目标图层类型是 Kinase.REF_ActiveLayer 时，请填 null。
 * @param getType 获取边类型，默认为："boundsNoEffects"，还可以是："bounds"、"boundsNoMask"
 * @returns {{x: null, y: null, w: null, h: null, right: null, bottom: null}}
 */
Kinase.layer.getLayerBounds = function (targetReference, target, getType)
{
    var boundsInfo = {x: null, y: null, w: null, h: null, right: null, bottom: null}
    var classStr = _value(getType, "boundsNoEffects");//"bounds"、"boundsNoMask"


    if (Kinase.layer.isLayerSet(targetReference, target))//判断是否是图层组
    {
        var _itemIndex = null
        // $.writeln("isLayerSet")


        if (targetReference === Kinase.REF_ActiveLayer)
        {
            _itemIndex = Kinase.layer.getItemIndexBylayerID(Kinase.layer.getLayerIdByActive())
            // $.writeln("_itemIndex:" + _itemIndex)
        } else if (targetReference === Kinase.REF_LayerID)
        {
            _itemIndex = Kinase.layer.getItemIndexBylayerID(target)
        } else if (targetReference === Kinase.REF_ItemIndex)
        {
            _itemIndex = target
        }


        if (_itemIndex != undefined)
        {
            var DOMObject = Kinase.layer.getLayerDOMObject_byItemIndex(_itemIndex)

            // $.writeln("classStr:" + classStr + "=" + DOMObject[classStr])
            if (DOMObject[classStr] != undefined)
            {
                var reg = /[0-9]*/
                var DOmBounds = DOMObject[classStr]
                boundsInfo.x = +reg.exec(DOmBounds[0])[0]
                boundsInfo.y = +reg.exec(DOmBounds[1])[0]
                boundsInfo.right = +reg.exec(DOmBounds[2])[0]
                boundsInfo.bottom = +reg.exec(DOmBounds[3])[0]
                boundsInfo.w = boundsInfo.right - boundsInfo.x;
                boundsInfo.h = boundsInfo.bottom - boundsInfo.y;


            }
        }


    }

    else
    {
        var boundsInfo_raw = Kinase.layer.get_XXX_Objcet(targetReference, target, classStr, "Lyr ");

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
        boundsInfo.right = boundsInfo_raw.value.right.value.doubleValue
        boundsInfo.bottom = boundsInfo_raw.value.bottom.value.doubleValue

        if (boundsInfo_raw.value.width == undefined)
        {
            boundsInfo.w = boundsInfo.right - boundsInfo.x;
            boundsInfo.h = boundsInfo.bottom - boundsInfo.y;
        } else
        {
            boundsInfo.w = boundsInfo_raw.value.width.value.doubleValue
            boundsInfo.h = boundsInfo_raw.value.height.value.doubleValue
        }


    }


    //画板修正
    var itemIndex_raw = Kinase.layer.get_XXX_Objcet(targetReference, target, "itemIndex", "Lyr ");
    var parentLayerItemIndex = ki.layer.getParentLayerItemIndex_byItemIndex(itemIndex_raw.itemIndex.value);
    if (parentLayerItemIndex > -1)
    {
        var artBoard_raw = Kinase.layer.get_XXX_Objcet(Kinase.REF_ItemIndex, parentLayerItemIndex + Kinase.BKOffset(), "artboardEnabled", "Lyr ");
        if (artBoard_raw.artboardEnabled.value == true)
        {
            var artBoard_boundsInfo_raw = Kinase.layer.get_XXX_Objcet(Kinase.REF_ItemIndex, parentLayerItemIndex + Kinase.BKOffset(), "boundsNoEffects", "Lyr ");
            artBoard_boundsInfo_raw = artBoard_boundsInfo_raw.boundsNoEffects;

            boundsInfo.x = boundsInfo.x - artBoard_boundsInfo_raw.value.left.value.doubleValue;
            boundsInfo.right = boundsInfo.right - artBoard_boundsInfo_raw.value.left.value.doubleValue;

            boundsInfo.y = boundsInfo.y - artBoard_boundsInfo_raw.value.top.value.doubleValue;
            boundsInfo.bottom = boundsInfo.bottom - artBoard_boundsInfo_raw.value.top.value.doubleValue;
        }
    }


    return boundsInfo;
}


Kinase.layer.setLayerBounds_byActive = function (boundsInfo)
{
    return ki.layer.setLayerBounds(boundsInfo, Kinase.REF_ActiveLayer, null);
}


/**
 * 改变图层边界，相当于自由形变，可位移图层、改变改变图层尺寸。
 * @param boundsInfo {x:新的 X 坐标, y：新的 Y 坐标, w：新的宽度, h：新的高度，centerState：锚点位置（默认左上角，8为中心）}
 * @param targetReference - targetReference 目标图层类型 ，可以是 Kinase.REF_ActiveLayer - 当前选中图层、Kinase.REF_LayerID - 根据图层 ID 、Kinase.REF_ItemIndex - 根据图层 ItemIndex。
 * @param target - 目标图层参数，根据图层类型，填入图层 ID 或者 ItemIndex 。当目标图层类型是 Kinase.REF_ActiveLayer 时，请填 null。
 */
Kinase.layer.setLayerBounds = function (boundsInfo, targetReference, target, doVerify)
{
    // {x: null, y: null, w: null, h: null,centerStatea,}
    var oldradianInfo = Kinase.layer.getLayerBounds(targetReference || Kinase.REF_ActiveLayer, _value(target, null));

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
    var ref = new ActionReference();

    if (targetReference == undefined) targetReference = Kinase.REF_ActiveLayer;
    targetReference(ref, _value(target, null))
    var refOb = mu.actionReferenceToObject(ref)
    adOb.null.value = refOb;

    // log(json(oldradianInfo))

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

        if (typeof  boundsInfo.h == "string" && boundsInfo.h.toLowerCase()[boundsInfo.h.length - 1] == "x")
        {
            var offset = +(boundsInfo.h.slice(0, boundsInfo.h.length - 1)) * 100;
        } else
        {
            var offset = (boundsInfo.h / oldradianInfo.h) * 100;
        }


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
        if (typeof  boundsInfo.w == "string" && boundsInfo.w.toLowerCase()[boundsInfo.w.length - 1] == "x")
        {
            var offset = +(boundsInfo.w.slice(0, boundsInfo.w.length - 1)) * 100;
        } else
        {
            var offset = (boundsInfo.w / oldradianInfo.w) * 100;
        }


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


    if (doVerify)
    {
        var oldradianInfo2 = Kinase.layer.getLayerBounds(targetReference || Kinase.REF_ActiveLayer, _value(target, null));
        if (boundsInfo.x != oldradianInfo2.x ||
            boundsInfo.y != oldradianInfo2.y ||
            boundsInfo.h != oldradianInfo2.h ||
            boundsInfo.w != oldradianInfo2.w
        )
        {
            Kinase.layer.setLayerBounds(boundsInfo, targetReference, target)
        }

    }

}

/**
 * 旋转当前选择图层
 * @param boundsInfo { angle：角度，centerState：锚点位置（默认左上角，8为中心）}
 */
Kinase.layer.rotationLayer_byActive = function (boundsInfo)
{

    //描点位置
    // ----------------------------------------------------------
    // | (0):QCSCorner0   | (1):QCSSide0   |  (2):QCSCorner1    |
    // | (7):QCSSide3     | (8):QCSAverage |  (3):QCSSide1      |
    // | (6):QCSCorner3   | (5):QCSSide2   |  (4):QCSCorner2    |
    // ----------------------------------------------------------
    if (boundsInfo.centerState == undefined) boundsInfo.centerState = 0;
    var centerStatelist = ["QCSCorner0", "QCSSide0", "QCSCorner1", "QCSSide1", "QCSCorner2", "QCSSide2", "QCSCorner3", "QCSSide3", "QCSAverage"]
    var centerStateStr = centerStatelist[boundsInfo.centerState]


    var adOb = {
        "null": {
            "value": {
                "container": {"container": {}},
                "form": "ReferenceFormType.ENUMERATED",
                "desiredClass": "layer",
                "enumeratedType": "ordinal",
                "enumeratedValue": "targetEnum"
            }, "type": "DescValueType.REFERENCETYPE"
        },
        "freeTransformCenterState": {
            "value": {"enumerationType": "quadCenterState", "enumerationValue": centerStateStr},
            "type": "DescValueType.ENUMERATEDTYPE"
        },
        "offset": {
            "value": {
                "horizontal": {
                    "value": {"doubleType": "pixelsUnit", "doubleValue": 0},
                    "type": "DescValueType.UNITDOUBLE"
                },
                "vertical": {
                    "value": {"doubleType": "pixelsUnit", "doubleValue": 0},
                    "type": "DescValueType.UNITDOUBLE"
                }
            }, "type": "DescValueType.OBJECTTYPE", "objectType": "offset"
        },
        "angle": {
            "value": {"doubleType": "angleUnit", "doubleValue": +boundsInfo.angle},
            "type": "DescValueType.UNITDOUBLE"
        },
        "interfaceIconFrameDimmed": {
            "value": {"enumerationType": "interpolationType", "enumerationValue": "bicubic"},
            "type": "DescValueType.ENUMERATEDTYPE"
        }
    }

    mu.executeActionObjcet(charIDToTypeID("Trnf"), adOb);


}
Kinase._rltb2xywh = function (boundsInfo)
{
// {x: null, y: null, w: null, h: null,centerStatea,}
    var newBoundsInfo = {x: null, y: null, w: null, h: null};


    for (var i in boundsInfo)
    {
        if (boundsInfo[i].value != undefined) boundsInfo[i] = boundsInfo[i].value.doubleValue;
    }


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

    for (var i in boundsInfo)
    {
        if (boundsInfo[i].value != undefined) boundsInfo[i] = boundsInfo[i].value.doubleValue;
    }


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
Kinase.layer.moveLayerXY = function (targetReference, target, offsets)
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
 * 翻转变换图层
 * @param direction 0：水平翻转 ； 1：垂直翻转
 */
Kinase.layer.mirrorLayer_byActive = function (direction)
{
    if (direction == 0)
    {//水平翻转
        var adOb = {
            "null": {
                "value": {
                    "container": {"container": {}},
                    "form": "ReferenceFormType.ENUMERATED",
                    "desiredClass": "layer",
                    "enumeratedType": "ordinal",
                    "enumeratedValue": "targetEnum"
                }, "type": "DescValueType.REFERENCETYPE"
            },
            "freeTransformCenterState": {
                "value": {"enumerationType": "quadCenterState", "enumerationValue": "QCSAverage"},
                "type": "DescValueType.ENUMERATEDTYPE"
            },
            "offset": {
                "value": {
                    "horizontal": {
                        "value": {"doubleType": "pixelsUnit", "doubleValue": 0},
                        "type": "DescValueType.UNITDOUBLE"
                    },
                    "vertical": {
                        "value": {"doubleType": "pixelsUnit", "doubleValue": 0},
                        "type": "DescValueType.UNITDOUBLE"
                    }
                }, "type": "DescValueType.OBJECTTYPE", "objectType": "offset"
            },
            "width": {"value": {"doubleType": "percentUnit", "doubleValue": -100}, "type": "DescValueType.UNITDOUBLE"},
            "interfaceIconFrameDimmed": {
                "value": {"enumerationType": "interpolationType", "enumerationValue": "bicubic"},
                "type": "DescValueType.ENUMERATEDTYPE"
            }
        }
    } else
    {
        var adOb = {
            "null": {
                "value": {
                    "container": {"container": {}},
                    "form": "ReferenceFormType.ENUMERATED",
                    "desiredClass": "layer",
                    "enumeratedType": "ordinal",
                    "enumeratedValue": "targetEnum"
                }, "type": "DescValueType.REFERENCETYPE"
            },
            "freeTransformCenterState": {
                "value": {
                    "enumerationType": "quadCenterState",
                    "enumerationValue": "QCSAverage"
                }, "type": "DescValueType.ENUMERATEDTYPE"
            },
            "offset": {
                "value": {
                    "horizontal": {
                        "value": {"doubleType": "pixelsUnit", "doubleValue": 0},
                        "type": "DescValueType.UNITDOUBLE"
                    },
                    "vertical": {
                        "value": {"doubleType": "pixelsUnit", "doubleValue": 0},
                        "type": "DescValueType.UNITDOUBLE"
                    }
                }, "type": "DescValueType.OBJECTTYPE", "objectType": "offset"
            },
            "height": {"value": {"doubleType": "percentUnit", "doubleValue": -100}, "type": "DescValueType.UNITDOUBLE"},
            "interfaceIconFrameDimmed": {
                "value": {
                    "enumerationType": "interpolationType",
                    "enumerationValue": "bicubic"
                }, "type": "DescValueType.ENUMERATEDTYPE"
            }
        }
    }

    mu.executeActionObjcet(charIDToTypeID("Trnf"), adOb);

}

/**
 * 返回指定图层的形状属性对象，包括 x: 到左边界距离、y: 到顶边界距离、w: 宽度、h: 高度。
 * @param targetReference - targetReference 目标图层类型 ，可以是 Kinase.REF_ActiveLayer - 当前选中图层、Kinase.REF_LayerID - 根据图层 ID 、Kinase.REF_ItemIndex - 根据图层 ItemIndex。
 * @param target - 目标图层参数，根据图层类型，填入图层 ID 或者 ItemIndex 。当目标图层类型是 Kinase.REF_ActiveLayer 时，请填 null。
 * @param returnKeyOriginType - 在返回值中包含 keyOriginType
 * @returns {{x: null, y: null, w: null, h: null}}
 */
Kinase.layer.getLayerShapeSize = function (targetReference, target, returnKeyOriginType)
{
    var sizeInfo = {x: null, y: null, w: null, h: null};
    var keyOriginType_raw = Kinase.layer.get_keyOriginType_Objcet(targetReference, target);


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
Kinase.layer.setLayerShapeSize_byActive = function (sizeInfo)
{


    var oldSizeInfo = Kinase.layer.getLayerShapeSize(Kinase.REF_ActiveLayer, null, true);
    var keyOriginType_raw = oldSizeInfo.keyOriginType;
    // log(json(oldSizeInfo))


    if (sizeInfo == undefined || isEmptyObject(keyOriginType_raw) || oldSizeInfo.err !== undefined)
    {
        return "err";
    }


    var keyOriginType = keyOriginType_raw.keyOriginType;


    if (sizeInfo.scale !== undefined && sizeInfo.scale == true)
    {
        $.writeln("scale")
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
        $.writeln("not")
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
        var left = +sizeInfo.x;
        var top = +sizeInfo.y;
    }


    var right = left + +sizeInfo.w;
    var bottom = top + +sizeInfo.h;


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


/**
 * 获取图层编辑信息
 * 获取图层编辑信息：可视、锁定、备注颜色、图层类型、是否为画板
 * @param targetReference
 * @param target
 * @returns {{visible: null, color: null, lock: {all: null, artboardAutonest: null, composite: null, position: null, transparency: null}, kind: null, isArtboard: null}}
 */
Kinase.layer.getLayerEditInfo = function (targetReference, target)
{
    var editInfo = {
        visible: null, /*可视*/
        color: null, /*备注颜色*/
        lock: {
            all: null/*全部锁定*/,
            artboardAutonest: null/*画板自动嵌套*/,
            composite: null, /*锁定像素*/
            position: null, /*位置锁定*/
            transparency: null/*锁定透明度*/
        },
        kind: null, /*图层类型 1：普通图层，2：调整图层，3：文本图层，4：形状图层，5：智能对象，7：图层组 */
        isArtboard: null,
    }

    var kind_raw = Kinase.layer.get_XXX_Objcet(targetReference, target, "layerKind");
    kind_raw = kind_raw.layerKind;
    editInfo.kind = kind_raw.value;

    var artboardEnabled_raw = Kinase.layer.get_XXX_Objcet(targetReference, target, "artboardEnabled");
    if (artboardEnabled_raw != undefined)
    {
        artboardEnabled_raw = artboardEnabled_raw.artboardEnabled;
        if (artboardEnabled_raw != undefined)
        {
            editInfo.isArtboard = artboardEnabled_raw.value;
        } else
        {
            editInfo.isArtboard = false
        }

    }


    var color_raw = Kinase.layer.get_XXX_Objcet(targetReference, target, "color");
    color_raw = color_raw.color;

    if (color_raw != undefined && color_raw.value != undefined && color_raw.value.enumerationValue != undefined)
    {
        editInfo.color = color_raw.value.enumerationValue;
    }


    var visible_raw = Kinase.layer.get_XXX_Objcet(targetReference, target, "visible");
    visible_raw = visible_raw.visible;
    if (visible_raw != undefined && visible_raw.value != undefined)
    {
        editInfo.visible = visible_raw.value;
    }


    var layerLocking_raw = Kinase.layer.get_XXX_Objcet(targetReference, target, "layerLocking");
    layerLocking_raw = layerLocking_raw.layerLocking;
    if (layerLocking_raw != undefined)
    {
        editInfo.lock.transparency = layerLocking_raw.value.protectTransparency.value;
        editInfo.lock.all = layerLocking_raw.value.protectAll.value;
        editInfo.lock.composite = layerLocking_raw.value.protectComposite.value;
        editInfo.lock.position = layerLocking_raw.value.protectPosition.value
    }

    if (layerLocking_raw.value.protectArtboardAutonest != undefined)
    {
        editInfo.lock.artboardAutonest = layerLocking_raw.value.protectArtboardAutonest.value;
    }

    return editInfo;
}


/**
 * 设置图层编辑信息（可视，备注颜色，锁定）
 * 色彩设置只可对当前图层设置（参数 targetReference == Kinase.REF_ActiveLayer）
 * 要取消所有图层锁定，要设置每一个 lock 项都为 false： ki.layer.setLayerEditInfo( {lock:{all:false,artboardAutonest:false,position:false, composite:false}},Kinase.REF_ItemIndex,2);
 * @param editInfo
 * @param targetReference
 * @param target
 */
Kinase.layer.setLayerEditInfo = function (editInfo, targetReference, target)
{
    if (editInfo.visible != undefined)
    {
        var adOb = {
            "null": {
                "value": {
                    "0": {
                        "value": {
                            "container": {
                                "container": {}
                            },
                            "form": "ReferenceFormType.ENUMERATED",
                            "desiredClass": "layer",
                            "enumeratedType": "ordinal",
                            "enumeratedValue": "targetEnum"
                        }, "type": "DescValueType.REFERENCETYPE"
                    }
                }, "type": "DescValueType.LISTTYPE"
            }
        }

        var ref = new ActionReference();
        if (targetReference == undefined) targetReference = Kinase.REF_ActiveLayer;
        targetReference(ref, _value(target, null), "layer")
        var refOb = mu.actionReferenceToObject(ref)
        adOb.null.value[0].value = refOb;
        if (editInfo.visible)
        {
            mu.executeActionObjcet(charIDToTypeID("Shw "), adOb)
        } else
        {
            mu.executeActionObjcet(charIDToTypeID("Hd  "), adOb)
        }
    }


    if (editInfo.lock != undefined)
    {
        var lockItems = ["all", "artboardAutonest", "composite", "position", "transparency"];
        var lockOrgName = ["protectAll", "protectArtboardAutonest", "protectComposite", "protectPosition", "protectTransparency"];

        var oldEditInfo = Kinase.layer.getLayerEditInfo(targetReference, target);


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
                }, "type": "DescValueType.REFERENCETYPE"
            },
            "layerLocking": {
                "value": {},
                "type": "DescValueType.OBJECTTYPE",
                "objectType": "layerLocking"
            }
        }

        var leng = 0;


        for (var i = 0; i < lockItems.length; i++)
        {
            if (editInfo.lock[lockItems[i]] != undefined)
            {
                if (editInfo.lock[lockItems[i]])
                {
                    _setLock(lockOrgName[i]);
                    if (i == 0)break;
                }
            } else
            {
                if (oldEditInfo.lock[lockItems[i]])
                {
                    _setLock(lockOrgName[i]);
                    if (i == 0)break;

                }
            }
        }


        if (leng == 0)
        {
            _setLock("protectNone");
        }

        var ref = new ActionReference();
        if (targetReference == undefined) targetReference = Kinase.REF_ActiveLayer;
        targetReference(ref, _value(target, null), "layer")
        var refOb = mu.actionReferenceToObject(ref)
        adOb.null.value = refOb;
        mu.executeActionObjcet(stringIDToTypeID("applyLocking"), adOb);

        function _setLock(orgName)
        {
            adOb.layerLocking.value[orgName] = {"value": true, "type": "DescValueType.BOOLEANTYPE"};
            leng++;
        }


    }


    if ((editInfo.color != undefined) && (targetReference == Kinase.REF_ActiveLayer))
    {
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
                }, "type": "DescValueType.REFERENCETYPE"
            },
            "to": {
                "value": {
                    "color": {
                        "value": {"enumerationType": "color", "enumerationValue": editInfo.color},
                        "type": "DescValueType.ENUMERATEDTYPE"
                    }
                }, "type": "DescValueType.OBJECTTYPE", "objectType": "layer"
            }
        }

        var ref = new ActionReference();
        if (targetReference == undefined) targetReference = Kinase.REF_ActiveLayer;
        targetReference(ref, _value(target, null), "layer")
        var refOb = mu.actionReferenceToObject(ref)
        adOb.null.value = refOb;
        // log(json(adOb))
        mu.executeActionObjcet(charIDToTypeID("setd"), adOb)

    }

}


//==============================[图层样式]======================


/**
 * 获取图层样式对象
 * @param targetReference
 * @param target
 * @returns {*}
 */
Kinase.layer.getLayerEffectsObject = function (targetReference, target)
{
    var layerEffects_raw = Kinase.layer.get_XXX_Objcet(targetReference, target, "layerEffects")
    if (layerEffects_raw == undefined)
    {
        return null
    }

    layerEffects_raw = layerEffects_raw.layerEffects;

    if (layerEffects_raw == undefined)
    {
        return null
    }
    return layerEffects_raw;
}


/**
 * 设置图层样式对象
 * @param effectsObejct 通过 Kinase.layer.getLayerEffectsObject 获取的
 * @param targetReference
 * @param target
 */
Kinase.layer.setLayerEffectsObject = function (effectsObejct, targetReference, target)
{

    var adOb = {
        "null": {
            "value": {
                "container": {
                    "container": {
                        "container": {}
                    },
                    "form": "ReferenceFormType.ENUMERATED",
                    "desiredClass": "layer",
                    "enumeratedType": "ordinal",
                    "enumeratedValue": "targetEnum"
                }, "form": "ReferenceFormType.PROPERTY", "desiredClass": "property", "property": "layerEffects"
            }, "type": "DescValueType.REFERENCETYPE"
        },
        "to": {
            "value": effectsObejct.value,
            "type": "DescValueType.OBJECTTYPE", "objectType": "layerEffects"
        }
    }

    var ref = new ActionReference();
    if (targetReference == undefined) targetReference = Kinase.REF_ActiveLayer;
    targetReference(ref, _value(target, null), "layer")
    var refOb = mu.actionReferenceToObject(ref)
    adOb.null.value.container = refOb;

    // log(json(adOb))
    mu.executeActionObjcet(charIDToTypeID("setd"), adOb)
}

//----

Kinase.layer.getEffectsList_dropShadow = function (layerEffects_raw, onlyEnabled)
{
    if (layerEffects_raw == undefined)
    {
        return null;
    }

    var dropShadowInfo = [];
    if (layerEffects_raw.value.dropShadowMulti != undefined)
    {

        for (var i in layerEffects_raw.value.dropShadowMulti.value)
        {
            var info = _analyseDropShadow(layerEffects_raw.value.dropShadowMulti.value[i], onlyEnabled)
            if (info != undefined)
            {
                dropShadowInfo.push(info)
            }

        }
    }
    else
    {
        var info = _analyseDropShadow(layerEffects_raw.value.dropShadow, onlyEnabled);
        dropShadowInfo.push(info);
    }
    return dropShadowInfo;

    function _analyseDropShadow(dropShadow, onlyEnabled)
    {
        var ob = {
            enabled: null, /*启用*/
            color: {r: null, g: null, b: null}, /*结构-颜色*/
            opacity: null, /*结构-不透明度*/
            lightingAngle: null, /*结构-角度*/
            useGlobalAngle: null, /*结构-使用全局光*/
            blendMode: null, /*结构-混合模式*/
            distance: null, /*结构-距离*/
            chokeMatte: null, /*结构-扩展*/
            blur: null, /*结构-大小*/
            antiAlias: null, /*品质-消除锯齿*/
            noise: null, /*品质-杂色*/
            transferSpec: null, /*品质-等高线*/
            layerConceals: null, /*???*/
            present: null, /*???*/
            showInDialog: null, /*???*/
        };

        ob.enabled = dropShadow.value.enabled.value;
        if (onlyEnabled && ( ob.enabled == false))
        {
            return null;
        }
        ob.antiAlias = dropShadow.value.antiAlias.value;
        ob.chokeMatte = dropShadow.value.chokeMatte.value.doubleValue;
        ob.blur = dropShadow.value.blur.value.doubleValue;
        ob.color.r = dropShadow.value.color.value.red.value;
        ob.color.g = dropShadow.value.color.value.grain.value;
        ob.color.b = dropShadow.value.color.value.blue.value;
        ob.distance = dropShadow.value.distance.value.doubleValue;
        ob.layerConceals = dropShadow.value.layerConceals.value;
        ob.lightingAngle = dropShadow.value.localLightingAngle.value.doubleValue;
        ob.blendMode = dropShadow.value.mode.value.enumerationValue;
        ob.noise = dropShadow.value.noise.value.doubleValue;
        ob.opacity = dropShadow.value.opacity.value.doubleValue;
        ob.present = dropShadow.value.present.value;
        ob.showInDialog = dropShadow.value.showInDialog.value
        ob.transferSpec = dropShadow.value.transferSpec.value.name.value;
        ob.useGlobalAngle = dropShadow.value.useGlobalAngle.value;
        return ob;
    }
}

Kinase.layer.putEffectsList_dropShadow = function (layerEffects_raw, dropShadowList)
{
    var ob = {
        enabled: null, /*启用*/
        color: {r: null, g: null, b: null}, /*结构-颜色*/
        opacity: null, /*结构-不透明度*/
        lightingAngle: null, /*结构-角度*/
        useGlobalAngle: null, /*结构-使用全局光*/
        blendMode: null, /*结构-混合模式*/
        distance: null, /*结构-距离*/
        chokeMatte: null, /*结构-扩展*/
        blur: null, /*结构-大小*/
        antiAlias: null, /*品质-消除锯齿*/
        noise: null, /*品质-杂色*/
        transferSpec: null, /*品质-等高线*/
        layerConceals: null, /*???*/
        present: null, /*???*/
        showInDialog: null, /*???*/
    };


    if (layerEffects_raw == undefined || layerEffects_raw.noEffects)
    {
        layerEffects_raw = {
            "value": {
                "scale": {
                    "value": {
                        "doubleType": "percentUnit",
                        "doubleValue": 100
                    },
                    "type": "DescValueType.UNITDOUBLE"
                }
            },
            "type": "DescValueType.OBJECTTYPE",
            "objectType": "null"
        };

    }


    if (layerEffects_raw.value.dropShadowMulti != undefined)
    {
        _setMulti()
    }
    else
    {

        if (dropShadowList.length > 1)
        {
            layerEffects_raw.value.dropShadowMulti = {
                "value": {}, "type": "DescValueType.LISTTYPE"
            }
            _setMulti();
            if (layerEffects_raw.value.dropShadow != undefined)
            {
                delete layerEffects_raw.value.dropShadow;
            }

        } else
        {
            if (layerEffects_raw.value.dropShadow == undefined)
            {
                layerEffects_raw.value.dropShadow = {
                    "value": {
                        "enabled": {
                            "value": true,
                            "type": "DescValueType.BOOLEANTYPE"
                        },
                        "present": {
                            "value": true,
                            "type": "DescValueType.BOOLEANTYPE"
                        },
                        "showInDialog": {
                            "value": true,
                            "type": "DescValueType.BOOLEANTYPE"
                        },
                        "mode": {
                            "value": {
                                "enumerationType": "blendMode",
                                "enumerationValue": "multiply"
                            },
                            "type": "DescValueType.ENUMERATEDTYPE"
                        },
                        "color": {
                            "value": {
                                "red": {
                                    "value": 3.53486244566739,
                                    "type": "DescValueType.DOUBLETYPE"
                                },
                                "grain": {
                                    "value": 0,
                                    "type": "DescValueType.DOUBLETYPE"
                                },
                                "blue": {
                                    "value": 0,
                                    "type": "DescValueType.DOUBLETYPE"
                                }
                            },
                            "type": "DescValueType.OBJECTTYPE",
                            "objectType": "RGBColor"
                        },
                        "opacity": {
                            "value": {
                                "doubleType": "percentUnit",
                                "doubleValue": 35
                            },
                            "type": "DescValueType.UNITDOUBLE"
                        },
                        "useGlobalAngle": {
                            "value": true,
                            "type": "DescValueType.BOOLEANTYPE"
                        },
                        "localLightingAngle": {
                            "value": {
                                "doubleType": "angleUnit",
                                "doubleValue": 90
                            },
                            "type": "DescValueType.UNITDOUBLE"
                        },
                        "distance": {
                            "value": {
                                "doubleType": "pixelsUnit",
                                "doubleValue": 3
                            },
                            "type": "DescValueType.UNITDOUBLE"
                        },
                        "chokeMatte": {
                            "value": {
                                "doubleType": "pixelsUnit",
                                "doubleValue": 0
                            },
                            "type": "DescValueType.UNITDOUBLE"
                        },
                        "blur": {
                            "value": {
                                "doubleType": "pixelsUnit",
                                "doubleValue": 7
                            },
                            "type": "DescValueType.UNITDOUBLE"
                        },
                        "noise": {
                            "value": {
                                "doubleType": "percentUnit",
                                "doubleValue": 0
                            },
                            "type": "DescValueType.UNITDOUBLE"
                        },
                        "antiAlias": {
                            "value": false,
                            "type": "DescValueType.BOOLEANTYPE"
                        },
                        "transferSpec": {
                            "value": {
                                "name": {
                                    "value": "线性",
                                    "type": "DescValueType.STRINGTYPE"
                                }
                            },
                            "type": "DescValueType.OBJECTTYPE",
                            "objectType": "shapeCurveType"
                        },
                        "layerConceals": {
                            "value": true,
                            "type": "DescValueType.BOOLEANTYPE"
                        }
                    },
                    "type": "DescValueType.OBJECTTYPE",
                    "objectType": "dropShadow"
                };
            }
            _setSingle();
        }

    }
    return layerEffects_raw;

    function _setMulti()
    {
        var len = 0;
        for (var i in layerEffects_raw.value.dropShadowMulti.value)
        {
            len++;
        }

        if (len < dropShadowList.length)
        {
            for (var i = 0; i < dropShadowList.length - len; i++)
            {
                layerEffects_raw.value.dropShadowMulti.value[len + i] = {
                    "value": {
                        "enabled": {
                            "value": true,
                            "type": "DescValueType.BOOLEANTYPE"
                        },
                        "present": {
                            "value": true,
                            "type": "DescValueType.BOOLEANTYPE"
                        },
                        "showInDialog": {
                            "value": true,
                            "type": "DescValueType.BOOLEANTYPE"
                        },
                        "mode": {
                            "value": {
                                "enumerationType": "blendMode",
                                "enumerationValue": "multiply"
                            },
                            "type": "DescValueType.ENUMERATEDTYPE"
                        },
                        "color": {
                            "value": {
                                "red": {
                                    "value": 3.53486244566739,
                                    "type": "DescValueType.DOUBLETYPE"
                                },
                                "grain": {
                                    "value": 0,
                                    "type": "DescValueType.DOUBLETYPE"
                                },
                                "blue": {
                                    "value": 0,
                                    "type": "DescValueType.DOUBLETYPE"
                                }
                            },
                            "type": "DescValueType.OBJECTTYPE",
                            "objectType": "RGBColor"
                        },
                        "opacity": {
                            "value": {
                                "doubleType": "percentUnit",
                                "doubleValue": 35
                            },
                            "type": "DescValueType.UNITDOUBLE"
                        },
                        "useGlobalAngle": {
                            "value": true,
                            "type": "DescValueType.BOOLEANTYPE"
                        },
                        "localLightingAngle": {
                            "value": {
                                "doubleType": "angleUnit",
                                "doubleValue": 90
                            },
                            "type": "DescValueType.UNITDOUBLE"
                        },
                        "distance": {
                            "value": {
                                "doubleType": "pixelsUnit",
                                "doubleValue": 3
                            },
                            "type": "DescValueType.UNITDOUBLE"
                        },
                        "chokeMatte": {
                            "value": {
                                "doubleType": "pixelsUnit",
                                "doubleValue": 0
                            },
                            "type": "DescValueType.UNITDOUBLE"
                        },
                        "blur": {
                            "value": {
                                "doubleType": "pixelsUnit",
                                "doubleValue": 7
                            },
                            "type": "DescValueType.UNITDOUBLE"
                        },
                        "noise": {
                            "value": {
                                "doubleType": "percentUnit",
                                "doubleValue": 0
                            },
                            "type": "DescValueType.UNITDOUBLE"
                        },
                        "antiAlias": {
                            "value": false,
                            "type": "DescValueType.BOOLEANTYPE"
                        },
                        "transferSpec": {
                            "value": {
                                "name": {
                                    "value": "线性",
                                    "type": "DescValueType.STRINGTYPE"
                                }
                            },
                            "type": "DescValueType.OBJECTTYPE",
                            "objectType": "shapeCurveType"
                        },
                        "layerConceals": {
                            "value": true,
                            "type": "DescValueType.BOOLEANTYPE"
                        }
                    },
                    "type": "DescValueType.OBJECTTYPE",
                    "objectType": "dropShadow"
                }
            }
        }
        for (var i = 0; i < dropShadowList.length; i++)
        {
            layerEffects_raw.value.dropShadowMulti.value[i].value.enabled.value = _value(dropShadowList[i].enabled, layerEffects_raw.value.dropShadowMulti.value[i].value.enabled.value)
            layerEffects_raw.value.dropShadowMulti.value[i].value.antiAlias.value = _value(dropShadowList[i].antiAlias, layerEffects_raw.value.dropShadowMulti.value[i].value.antiAlias.value)
            layerEffects_raw.value.dropShadowMulti.value[i].value.chokeMatte.value.doubleValue = _value(dropShadowList[i].chokeMatte, layerEffects_raw.value.dropShadowMulti.value[i].value.chokeMatte.value.doubleValue)
            layerEffects_raw.value.dropShadowMulti.value[i].value.blur.value.doubleValue = _value(dropShadowList[i].blur, layerEffects_raw.value.dropShadowMulti.value[i].value.blur.value.doubleValue)
            layerEffects_raw.value.dropShadowMulti.value[i].value.color.value.red.value = _value(dropShadowList[i].color.r, layerEffects_raw.value.dropShadowMulti.value[i].value.color.value.red.value)
            layerEffects_raw.value.dropShadowMulti.value[i].value.color.value.grain.value = _value(dropShadowList[i].color.g, layerEffects_raw.value.dropShadowMulti.value[i].value.color.value.grain.value)
            layerEffects_raw.value.dropShadowMulti.value[i].value.color.value.blue.value = _value(dropShadowList[i].color.b, layerEffects_raw.value.dropShadowMulti.value[i].value.color.value.blue.value)
            layerEffects_raw.value.dropShadowMulti.value[i].value.distance.value.doubleValue = _value(dropShadowList[i].distance, layerEffects_raw.value.dropShadowMulti.value[i].value.distance.value.doubleValue)
            layerEffects_raw.value.dropShadowMulti.value[i].value.layerConceals.value = _value(dropShadowList[i].layerConceals, layerEffects_raw.value.dropShadowMulti.value[i].value.layerConceals.value)
            layerEffects_raw.value.dropShadowMulti.value[i].value.localLightingAngle.value.doubleValue = _value(dropShadowList[i].lightingAngle, layerEffects_raw.value.dropShadowMulti.value[i].value.localLightingAngle.value.doubleValue)
            layerEffects_raw.value.dropShadowMulti.value[i].value.mode.value.enumerationValue = _value(dropShadowList[i].blendMode, layerEffects_raw.value.dropShadowMulti.value[i].value.mode.value.enumerationValue)
            layerEffects_raw.value.dropShadowMulti.value[i].value.noise.value.doubleValue = _value(dropShadowList[i].noise, layerEffects_raw.value.dropShadowMulti.value[i].value.noise.value.doubleValue)
            layerEffects_raw.value.dropShadowMulti.value[i].value.opacity.value.doubleValue = _value(dropShadowList[i].opacity, layerEffects_raw.value.dropShadowMulti.value[i].value.opacity.value.doubleValue)
            layerEffects_raw.value.dropShadowMulti.value[i].value.present.value = _value(dropShadowList[i].present, layerEffects_raw.value.dropShadowMulti.value[i].value.present.value)
            layerEffects_raw.value.dropShadowMulti.value[i].value.showInDialog.value = _value(dropShadowList[i].showInDialog, layerEffects_raw.value.dropShadowMulti.value[i].value.showInDialog.value)
            layerEffects_raw.value.dropShadowMulti.value[i].value.transferSpec.value.name.value = _value(dropShadowList[i].transferSpec, layerEffects_raw.value.dropShadowMulti.value[i].value.transferSpec.value.name.value)
            layerEffects_raw.value.dropShadowMulti.value[i].value.useGlobalAngle.value = _value(dropShadowList[i].useGlobalAngle, layerEffects_raw.value.dropShadowMulti.value[i].value.useGlobalAngle.value)


            // layerEffects_raw.value.dropShadowMulti.value[i].value.enabled.value = dropShadowList[i].enabled || layerEffects_raw.value.dropShadowMulti.value[i].value.enabled.value
            // layerEffects_raw.value.dropShadowMulti.value[i].value.antiAlias.value = dropShadowList[i].antiAlias || layerEffects_raw.value.dropShadowMulti.value[i].value.antiAlias.value;
            // layerEffects_raw.value.dropShadowMulti.value[i].value.chokeMatte.value.doubleValue = dropShadowList[i].chokeMatte || layerEffects_raw.value.dropShadowMulti.value[i].value.chokeMatte.value.doubleValue;
            // layerEffects_raw.value.dropShadowMulti.value[i].value.blur.value.doubleValue = dropShadowList[i].blur || layerEffects_raw.value.dropShadowMulti.value[i].value.blur.value.doubleValue;
            // layerEffects_raw.value.dropShadowMulti.value[i].value.color.value.red.value = dropShadowList[i].color.r || layerEffects_raw.value.dropShadowMulti.value[i].value.color.value.red.value;
            // layerEffects_raw.value.dropShadowMulti.value[i].value.color.value.grain.value = dropShadowList[i].color.g || layerEffects_raw.value.dropShadowMulti.value[i].value.color.value.grain.value;
            // layerEffects_raw.value.dropShadowMulti.value[i].value.color.value.blue.value = dropShadowList[i].color.b || layerEffects_raw.value.dropShadowMulti.value[i].value.color.value.blue.value;
            // layerEffects_raw.value.dropShadowMulti.value[i].value.distance.value.doubleValue = dropShadowList[i].distance || layerEffects_raw.value.dropShadowMulti.value[i].value.distance.value.doubleValue;
            // layerEffects_raw.value.dropShadowMulti.value[i].value.layerConceals.value = dropShadowList[i].layerConceals || layerEffects_raw.value.dropShadowMulti.value[i].value.layerConceals.value;
            // layerEffects_raw.value.dropShadowMulti.value[i].value.localLightingAngle.value.doubleValue = dropShadowList[i].lightingAngle || layerEffects_raw.value.dropShadowMulti.value[i].value.localLightingAngle.value.doubleValue;
            // layerEffects_raw.value.dropShadowMulti.value[i].value.mode.value.enumerationValue = dropShadowList[i].blendMode || layerEffects_raw.value.dropShadowMulti.value[i].value.mode.value.enumerationValue;
            // layerEffects_raw.value.dropShadowMulti.value[i].value.noise.value.doubleValue = dropShadowList[i].noise || layerEffects_raw.value.dropShadowMulti.value[i].value.noise.value.doubleValue;
            // layerEffects_raw.value.dropShadowMulti.value[i].value.opacity.value.doubleValue = dropShadowList[i].opacity || layerEffects_raw.value.dropShadowMulti.value[i].value.opacity.value.doubleValue;
            // layerEffects_raw.value.dropShadowMulti.value[i].value.present.value = dropShadowList[i].present || layerEffects_raw.value.dropShadowMulti.value[i].value.present.value;
            // layerEffects_raw.value.dropShadowMulti.value[i].value.showInDialog.value = dropShadowList[i].showInDialog || layerEffects_raw.value.dropShadowMulti.value[i].value.showInDialog.value;
            // layerEffects_raw.value.dropShadowMulti.value[i].value.transferSpec.value.name.value = dropShadowList[i].transferSpec || layerEffects_raw.value.dropShadowMulti.value[i].value.transferSpec.value.name.value;
            // layerEffects_raw.value.dropShadowMulti.value[i].value.useGlobalAngle.value = dropShadowList[i].useGlobalAngle || layerEffects_raw.value.dropShadowMulti.value[i].value.useGlobalAngle.value;
        }
    }

    function _setSingle()
    {


        if (dropShadowList[0].useGlobalAngle != undefined)
        {
            layerEffects_raw.value.dropShadow.value.useGlobalAngle.value = dropShadowList[0].useGlobalAngle
        }

        if (dropShadowList[0].enabled != undefined)
        {
            layerEffects_raw.value.dropShadow.value.enabled.value = dropShadowList[0].enabled
        }

        if (dropShadowList[0].antiAlias != undefined)
        {
            layerEffects_raw.value.dropShadow.value.antiAlias.value = dropShadowList[0].antiAlias
        }


        layerEffects_raw.value.dropShadow.value.chokeMatte.value.doubleValue = _value(dropShadowList[0].chokeMatte, layerEffects_raw.value.dropShadow.value.chokeMatte.value.doubleValue)
        layerEffects_raw.value.dropShadow.value.blur.value.doubleValue = _value(dropShadowList[0].blur, layerEffects_raw.value.dropShadow.value.blur.value.doubleValue)
        layerEffects_raw.value.dropShadow.value.color.value.red.value = _value(dropShadowList[0].color.r, layerEffects_raw.value.dropShadow.value.color.value.red.value)
        layerEffects_raw.value.dropShadow.value.color.value.grain.value = _value(dropShadowList[0].color.g, layerEffects_raw.value.dropShadow.value.color.value.grain.value)
        layerEffects_raw.value.dropShadow.value.color.value.blue.value = _value(dropShadowList[0].color.b, layerEffects_raw.value.dropShadow.value.color.value.blue.value)
        layerEffects_raw.value.dropShadow.value.distance.value.doubleValue = _value(dropShadowList[0].distance, layerEffects_raw.value.dropShadow.value.distance.value.doubleValue)
        layerEffects_raw.value.dropShadow.value.layerConceals.value = _value(dropShadowList[0].layerConceals, layerEffects_raw.value.dropShadow.value.layerConceals.value)
        layerEffects_raw.value.dropShadow.value.localLightingAngle.value.doubleValue = _value(dropShadowList[0].lightingAngle, layerEffects_raw.value.dropShadow.value.localLightingAngle.value.doubleValue)
        layerEffects_raw.value.dropShadow.value.mode.value.enumerationValue = _value(dropShadowList[0].blendMode, layerEffects_raw.value.dropShadow.value.mode.value.enumerationValue)
        layerEffects_raw.value.dropShadow.value.noise.value.doubleValue = _value(dropShadowList[0].noise, layerEffects_raw.value.dropShadow.value.noise.value.doubleValue)
        layerEffects_raw.value.dropShadow.value.opacity.value.doubleValue = _value(dropShadowList[0].opacity, layerEffects_raw.value.dropShadow.value.opacity.value.doubleValue)
        layerEffects_raw.value.dropShadow.value.present.value = _value(dropShadowList[0].present, layerEffects_raw.value.dropShadow.value.present.value)
        layerEffects_raw.value.dropShadow.value.showInDialog.value = _value(dropShadowList[0].showInDialog, layerEffects_raw.value.dropShadow.value.showInDialog.value)
        layerEffects_raw.value.dropShadow.value.transferSpec.value.name.value = _value(dropShadowList[0].transferSpec, layerEffects_raw.value.dropShadow.value.transferSpec.value.name.value)

        // layerEffects_raw.value.dropShadow.value.chokeMatte.value.doubleValue = dropShadowList[0].chokeMatte || layerEffects_raw.value.dropShadow.value.chokeMatte.value.doubleValue;
        // layerEffects_raw.value.dropShadow.value.blur.value.doubleValue = dropShadowList[0].blur || layerEffects_raw.value.dropShadow.value.blur.value.doubleValue;
        // layerEffects_raw.value.dropShadow.value.color.value.red.value = dropShadowList[0].color.r || layerEffects_raw.value.dropShadow.value.color.value.red.value;
        // layerEffects_raw.value.dropShadow.value.color.value.grain.value = dropShadowList[0].color.g || layerEffects_raw.value.dropShadow.value.color.value.grain.value;
        // layerEffects_raw.value.dropShadow.value.color.value.blue.value = dropShadowList[0].color.b || layerEffects_raw.value.dropShadow.value.color.value.blue.value;
        // layerEffects_raw.value.dropShadow.value.distance.value.doubleValue = dropShadowList[0].distance || layerEffects_raw.value.dropShadow.value.distance.value.doubleValue;
        // layerEffects_raw.value.dropShadow.value.layerConceals.value = dropShadowList[0].layerConceals || layerEffects_raw.value.dropShadow.value.layerConceals.value;
        // layerEffects_raw.value.dropShadow.value.localLightingAngle.value.doubleValue = dropShadowList[0].lightingAngle || layerEffects_raw.value.dropShadow.value.localLightingAngle.value.doubleValue;
        // layerEffects_raw.value.dropShadow.value.mode.value.enumerationValue = dropShadowList[0].blendMode || layerEffects_raw.value.dropShadow.value.mode.value.enumerationValue;
        // layerEffects_raw.value.dropShadow.value.noise.value.doubleValue = dropShadowList[0].noise || layerEffects_raw.value.dropShadow.value.noise.value.doubleValue;
        // layerEffects_raw.value.dropShadow.value.opacity.value.doubleValue = dropShadowList[0].opacity || layerEffects_raw.value.dropShadow.value.opacity.value.doubleValue;
        // layerEffects_raw.value.dropShadow.value.present.value = dropShadowList[0].present || layerEffects_raw.value.dropShadow.value.present.value;
        // layerEffects_raw.value.dropShadow.value.showInDialog.value = dropShadowList[0].showInDialog || layerEffects_raw.value.dropShadow.value.showInDialog.value;
        // layerEffects_raw.value.dropShadow.value.transferSpec.value.name.value = dropShadowList[0].transferSpec || layerEffects_raw.value.dropShadow.value.transferSpec.value.name.value;

    }
}

/**
 * 获取图层样式项
 * @param layerEffects_raw 通过 Kinase.layer.getLayerEffectsObject() 获取的图层样式对象
 * @param effectName 样式项名称，如"dropShadow"
 * @param onlyEnabled 只获取激活的样式
 * @returns {Array}
 */
Kinase.layer.getEffectsList_universal = function (layerEffects_raw, effectName, onlyEnabled)
{
    var effectInfo = [];
    if (layerEffects_raw.value[effectName + "Multi"] != undefined)
    {
        for (var i in layerEffects_raw.value[effectName + "Multi"].value)
        {
            var info = Kinase.layer._effectUniverAnalyse(layerEffects_raw.value[effectName + "Multi"].value[i], onlyEnabled)
            if (info != undefined)
            {
                effectInfo.push(info)
            }
        }
    }
    else
    {
        var info = Kinase.layer._effectUniverAnalyse(layerEffects_raw.value[effectName], onlyEnabled);
        effectInfo.push(info);
    }
    return effectInfo;

}

/**
 * 设置图层样式项
 * @param layerEffects_raw
 * @param effectName
 * @param list
 * @returns {*}
 */
Kinase.layer.putEffectsList_universal = function (layerEffects_raw, effectName, list)
{
    // log(json(list))

    if (layerEffects_raw == undefined || layerEffects_raw.noEffects)
    {
        layerEffects_raw = {
            "value": {
                "scale": {
                    "value": {
                        "doubleType": "percentUnit",
                        "doubleValue": 100
                    },
                    "type": "DescValueType.UNITDOUBLE"
                }
            },
            "type": "DescValueType.OBJECTTYPE",
            "objectType": "null"
        };

    }

    if (layerEffects_raw.value[effectName + "Multi"] != undefined)
    {
        _setMulti()
    }
    else
    {
        if (list.length > 1)
        {
            layerEffects_raw.value[effectName + "Multi"] = {
                "value": {}, "type": "DescValueType.LISTTYPE"
            }
            _setMulti();
            if (layerEffects_raw.value[effectName] != undefined)
            {
                delete layerEffects_raw.value[effectName];
            }

        } else
        {
            if (layerEffects_raw.value[effectName] == undefined)
            {
                layerEffects_raw.value[effectName] = _getDefaultEffectObject(effectName);
            }
            _setSingle(layerEffects_raw.value[effectName].value, list[0])
        }

    }


    return layerEffects_raw;

    function _setMulti()
    {
        var len = 0;
        for (var i in layerEffects_raw.value[effectName + "Multi"].value)
        {
            len++;
        }

        if (len < list.length)
        {
            for (var i = 0; i < list.length - len; i++)
            {
                layerEffects_raw.value[effectName + "Multi"].value[len + i] = _getDefaultEffectObject(effectName);
            }
        }
        for (var i = 0; i < list.length; i++)
        {
            _setSingle(layerEffects_raw.value[effectName + "Multi"].value[i].value, list[i])

        }
    }

    function _setSingle(ob, listItem)
    {
        var nameList = ["value", "enumerationValue", "doubleValue"];

        // log(json(ob))
        for (var i in listItem)
        {
            if (listItem[i] != undefined)
            {
                if (ob[i] != undefined)
                {

                    // log(i + "=" + (ob[i].value.constructor == Object) + json(ob[i]))
                    if (ob[i].value.constructor == Object)
                    {


                        if (listItem[i].constructor == Object)
                        {
                            _setSingle(ob[i].value, listItem[i])
                        } else
                        {

                            // _setSingle(ob[i].value, listItem)
                            // log("set:" + i + "----" + json(ob[i]) +"-"+ json(listItem[i]))
                            _unCut(ob[i].value, ["value", "enumerationValue", "doubleValue"])

                        }


                    } else
                    {

                        _unCut(ob[i], ["value", "enumerationValue", "doubleValue"])
                    }
                }
            }
            function _unCut(ob, nameList)
            {
                for (var name in nameList)
                {
                    // log(json(ob[i] ))
                    if (ob[nameList[name]] != undefined)
                    {
                        ob[nameList[name]] = listItem[i];
                        return;
                    }
                }
            }

        }
    }


    function _getDefaultEffectObject(effectName)
    {
        if (effectName == "bevelEmboss")
        {
            return {
                "value": {
                    "enabled": {
                        "value": true,
                        "type": "DescValueType.BOOLEANTYPE"
                    },
                    "present": {
                        "value": true,
                        "type": "DescValueType.BOOLEANTYPE"
                    },
                    "showInDialog": {
                        "value": true,
                        "type": "DescValueType.BOOLEANTYPE"
                    },
                    "highlightMode": {
                        "value": {
                            "enumerationType": "blendMode",
                            "enumerationValue": "screen"
                        },
                        "type": "DescValueType.ENUMERATEDTYPE"
                    },
                    "highlightColor": {
                        "value": {
                            "red": {
                                "value": 255,
                                "type": "DescValueType.DOUBLETYPE"
                            },
                            "grain": {
                                "value": 255,
                                "type": "DescValueType.DOUBLETYPE"
                            },
                            "blue": {
                                "value": 255,
                                "type": "DescValueType.DOUBLETYPE"
                            }
                        },
                        "type": "DescValueType.OBJECTTYPE",
                        "objectType": "RGBColor"
                    },
                    "highlightOpacity": {
                        "value": {
                            "doubleType": "percentUnit",
                            "doubleValue": 50
                        },
                        "type": "DescValueType.UNITDOUBLE"
                    },
                    "shadowMode": {
                        "value": {
                            "enumerationType": "blendMode",
                            "enumerationValue": "multiply"
                        },
                        "type": "DescValueType.ENUMERATEDTYPE"
                    },
                    "shadowColor": {
                        "value": {
                            "red": {
                                "value": 0,
                                "type": "DescValueType.DOUBLETYPE"
                            },
                            "grain": {
                                "value": 0,
                                "type": "DescValueType.DOUBLETYPE"
                            },
                            "blue": {
                                "value": 0,
                                "type": "DescValueType.DOUBLETYPE"
                            }
                        },
                        "type": "DescValueType.OBJECTTYPE",
                        "objectType": "RGBColor"
                    },
                    "shadowOpacity": {
                        "value": {
                            "doubleType": "percentUnit",
                            "doubleValue": 50
                        },
                        "type": "DescValueType.UNITDOUBLE"
                    },
                    "bevelTechnique": {
                        "value": {
                            "enumerationType": "bevelTechnique",
                            "enumerationValue": "softMatte"
                        },
                        "type": "DescValueType.ENUMERATEDTYPE"
                    },
                    "bevelStyle": {
                        "value": {
                            "enumerationType": "bevelEmbossStyle",
                            "enumerationValue": "innerBevel"
                        },
                        "type": "DescValueType.ENUMERATEDTYPE"
                    },
                    "useGlobalAngle": {
                        "value": true,
                        "type": "DescValueType.BOOLEANTYPE"
                    },
                    "localLightingAngle": {
                        "value": {
                            "doubleType": "angleUnit",
                            "doubleValue": 90
                        },
                        "type": "DescValueType.UNITDOUBLE"
                    },
                    "localLightingAltitude": {
                        "value": {
                            "doubleType": "angleUnit",
                            "doubleValue": 30
                        },
                        "type": "DescValueType.UNITDOUBLE"
                    },
                    "strengthRatio": {
                        "value": {
                            "doubleType": "percentUnit",
                            "doubleValue": 100
                        },
                        "type": "DescValueType.UNITDOUBLE"
                    },
                    "blur": {
                        "value": {
                            "doubleType": "pixelsUnit",
                            "doubleValue": 7
                        },
                        "type": "DescValueType.UNITDOUBLE"
                    },
                    "bevelDirection": {
                        "value": {
                            "enumerationType": "bevelEmbossStampStyle",
                            "enumerationValue": "in"
                        },
                        "type": "DescValueType.ENUMERATEDTYPE"
                    },
                    "transferSpec": {
                        "value": {
                            "name": {
                                "value": "线性",
                                "type": "DescValueType.STRINGTYPE"
                            }
                        },
                        "type": "DescValueType.OBJECTTYPE",
                        "objectType": "shapeCurveType"
                    },
                    "antialiasGloss": {
                        "value": false,
                        "type": "DescValueType.BOOLEANTYPE"
                    },
                    "softness": {
                        "value": {
                            "doubleType": "pixelsUnit",
                            "doubleValue": 0
                        },
                        "type": "DescValueType.UNITDOUBLE"
                    },
                    "useShape": {
                        "value": true,
                        "type": "DescValueType.BOOLEANTYPE"
                    },
                    "mappingShape": {
                        "value": {
                            "name": {
                                "value": "线性",
                                "type": "DescValueType.STRINGTYPE"
                            }
                        },
                        "type": "DescValueType.OBJECTTYPE",
                        "objectType": "shapeCurveType"
                    },
                    "antiAlias": {
                        "value": false,
                        "type": "DescValueType.BOOLEANTYPE"
                    },
                    "inputRange": {
                        "value": {
                            "doubleType": "percentUnit",
                            "doubleValue": 50
                        },
                        "type": "DescValueType.UNITDOUBLE"
                    },
                    "useTexture": {
                        "value": true,
                        "type": "DescValueType.BOOLEANTYPE"
                    },
                    "invertTexture": {
                        "value": false,
                        "type": "DescValueType.BOOLEANTYPE"
                    },
                    "align": {
                        "value": true,
                        "type": "DescValueType.BOOLEANTYPE"
                    },
                    "scale": {
                        "value": {
                            "doubleType": "percentUnit",
                            "doubleValue": 100
                        },
                        "type": "DescValueType.UNITDOUBLE"
                    },
                    "textureDepth": {
                        "value": {
                            "doubleType": "percentUnit",
                            "doubleValue": 100
                        },
                        "type": "DescValueType.UNITDOUBLE"
                    },
                    "pattern": {
                        "value": {
                            "name": {
                                "value": "$$$/Patterns/Defaults/Watercolor=Watercolor",
                                "type": "DescValueType.STRINGTYPE"
                            },
                            "ID": {
                                "value": "af45cb54-5b90-11e6-b53f-dd17143f2590",
                                "type": "DescValueType.STRINGTYPE"
                            }
                        },
                        "type": "DescValueType.OBJECTTYPE",
                        "objectType": "pattern"
                    },
                    "phase": {
                        "value": {
                            "horizontal": {
                                "value": 0,
                                "type": "DescValueType.DOUBLETYPE"
                            },
                            "vertical": {
                                "value": 0,
                                "type": "DescValueType.DOUBLETYPE"
                            }
                        },
                        "type": "DescValueType.OBJECTTYPE",
                        "objectType": "paint"
                    }
                },
                "type": "DescValueType.OBJECTTYPE",
                "objectType": "bevelEmboss"
            };
        }
        else if (effectName == "innerShadow")
        {
            return {
                "value": {
                    "enabled": {
                        "value": true,
                        "type": "DescValueType.BOOLEANTYPE"
                    },
                    "present": {
                        "value": true,
                        "type": "DescValueType.BOOLEANTYPE"
                    },
                    "showInDialog": {
                        "value": true,
                        "type": "DescValueType.BOOLEANTYPE"
                    },
                    "mode": {
                        "value": {
                            "enumerationType": "blendMode",
                            "enumerationValue": "normal"
                        },
                        "type": "DescValueType.ENUMERATEDTYPE"
                    },
                    "color": {
                        "value": {
                            "red": {
                                "value": 235.000001192093,
                                "type": "DescValueType.DOUBLETYPE"
                            },
                            "grain": {
                                "value": 0,
                                "type": "DescValueType.DOUBLETYPE"
                            },
                            "blue": {
                                "value": 0,
                                "type": "DescValueType.DOUBLETYPE"
                            }
                        },
                        "type": "DescValueType.OBJECTTYPE",
                        "objectType": "RGBColor"
                    },
                    "opacity": {
                        "value": {
                            "doubleType": "percentUnit",
                            "doubleValue": 100
                        },
                        "type": "DescValueType.UNITDOUBLE"
                    },
                    "useGlobalAngle": {
                        "value": false,
                        "type": "DescValueType.BOOLEANTYPE"
                    },
                    "localLightingAngle": {
                        "value": {
                            "doubleType": "angleUnit",
                            "doubleValue": 90
                        },
                        "type": "DescValueType.UNITDOUBLE"
                    },
                    "distance": {
                        "value": {
                            "doubleType": "pixelsUnit",
                            "doubleValue": 0
                        },
                        "type": "DescValueType.UNITDOUBLE"
                    },
                    "chokeMatte": {
                        "value": {
                            "doubleType": "pixelsUnit",
                            "doubleValue": 0
                        },
                        "type": "DescValueType.UNITDOUBLE"
                    },
                    "blur": {
                        "value": {
                            "doubleType": "pixelsUnit",
                            "doubleValue": 38
                        },
                        "type": "DescValueType.UNITDOUBLE"
                    },
                    "noise": {
                        "value": {
                            "doubleType": "percentUnit",
                            "doubleValue": 0
                        },
                        "type": "DescValueType.UNITDOUBLE"
                    },
                    "antiAlias": {
                        "value": false,
                        "type": "DescValueType.BOOLEANTYPE"
                    },
                    "transferSpec": {
                        "value": {
                            "name": {
                                "value": "$$$/Contours/Defaults/Linear=Linear",
                                "type": "DescValueType.STRINGTYPE"
                            }
                        },
                        "type": "DescValueType.OBJECTTYPE",
                        "objectType": "shapeCurveType"
                    }
                },
                "type": "DescValueType.OBJECTTYPE",
                "objectType": "innerShadow"
            };
        }
        else if (effectName == "chromeFX")
        {
            return {
                "value": {
                    "enabled": {
                        "value": true,
                        "type": "DescValueType.BOOLEANTYPE"
                    },
                    "present": {
                        "value": true,
                        "type": "DescValueType.BOOLEANTYPE"
                    },
                    "showInDialog": {
                        "value": true,
                        "type": "DescValueType.BOOLEANTYPE"
                    },
                    "mode": {
                        "value": {
                            "enumerationType": "blendMode",
                            "enumerationValue": "multiply"
                        },
                        "type": "DescValueType.ENUMERATEDTYPE"
                    },
                    "color": {
                        "value": {
                            "red": {
                                "value": 0,
                                "type": "DescValueType.DOUBLETYPE"
                            },
                            "grain": {
                                "value": 0,
                                "type": "DescValueType.DOUBLETYPE"
                            },
                            "blue": {
                                "value": 0,
                                "type": "DescValueType.DOUBLETYPE"
                            }
                        },
                        "type": "DescValueType.OBJECTTYPE",
                        "objectType": "RGBColor"
                    },
                    "antiAlias": {
                        "value": true,
                        "type": "DescValueType.BOOLEANTYPE"
                    },
                    "invert": {
                        "value": true,
                        "type": "DescValueType.BOOLEANTYPE"
                    },
                    "opacity": {
                        "value": {
                            "doubleType": "percentUnit",
                            "doubleValue": 50
                        },
                        "type": "DescValueType.UNITDOUBLE"
                    },
                    "localLightingAngle": {
                        "value": {
                            "doubleType": "angleUnit",
                            "doubleValue": 90
                        },
                        "type": "DescValueType.UNITDOUBLE"
                    },
                    "distance": {
                        "value": {
                            "doubleType": "pixelsUnit",
                            "doubleValue": 50
                        },
                        "type": "DescValueType.UNITDOUBLE"
                    },
                    "blur": {
                        "value": {
                            "doubleType": "pixelsUnit",
                            "doubleValue": 80
                        },
                        "type": "DescValueType.UNITDOUBLE"
                    },
                    "mappingShape": {
                        "value": {
                            "name": {
                                "value": "线性",
                                "type": "DescValueType.STRINGTYPE"
                            }
                        },
                        "type": "DescValueType.OBJECTTYPE",
                        "objectType": "shapeCurveType"
                    }
                },
                "type": "DescValueType.OBJECTTYPE",
                "objectType": "chromeFX"
            }
        }
        else if (effectName == "dropShadow")
        {
            return {
                "value": {
                    "enabled": {
                        "value": true,
                        "type": "DescValueType.BOOLEANTYPE"
                    },
                    "present": {
                        "value": true,
                        "type": "DescValueType.BOOLEANTYPE"
                    },
                    "showInDialog": {
                        "value": true,
                        "type": "DescValueType.BOOLEANTYPE"
                    },
                    "mode": {
                        "value": {
                            "enumerationType": "blendMode",
                            "enumerationValue": "normal"
                        },
                        "type": "DescValueType.ENUMERATEDTYPE"
                    },
                    "color": {
                        "value": {
                            "red": {
                                "value": 79.0000028908253,
                                "type": "DescValueType.DOUBLETYPE"
                            },
                            "grain": {
                                "value": 79.0000028908253,
                                "type": "DescValueType.DOUBLETYPE"
                            },
                            "blue": {
                                "value": 79.0000028908253,
                                "type": "DescValueType.DOUBLETYPE"
                            }
                        },
                        "type": "DescValueType.OBJECTTYPE",
                        "objectType": "RGBColor"
                    },
                    "opacity": {
                        "value": {
                            "doubleType": "percentUnit",
                            "doubleValue": 71
                        },
                        "type": "DescValueType.UNITDOUBLE"
                    },
                    "useGlobalAngle": {
                        "value": false,
                        "type": "DescValueType.BOOLEANTYPE"
                    },
                    "localLightingAngle": {
                        "value": {
                            "doubleType": "angleUnit",
                            "doubleValue": 90
                        },
                        "type": "DescValueType.UNITDOUBLE"
                    },
                    "distance": {
                        "value": {
                            "doubleType": "pixelsUnit",
                            "doubleValue": 40
                        },
                        "type": "DescValueType.UNITDOUBLE"
                    },
                    "chokeMatte": {
                        "value": {
                            "doubleType": "pixelsUnit",
                            "doubleValue": 1
                        },
                        "type": "DescValueType.UNITDOUBLE"
                    },
                    "blur": {
                        "value": {
                            "doubleType": "pixelsUnit",
                            "doubleValue": 43
                        },
                        "type": "DescValueType.UNITDOUBLE"
                    },
                    "noise": {
                        "value": {
                            "doubleType": "percentUnit",
                            "doubleValue": 0
                        },
                        "type": "DescValueType.UNITDOUBLE"
                    },
                    "antiAlias": {
                        "value": false,
                        "type": "DescValueType.BOOLEANTYPE"
                    },
                    "transferSpec": {
                        "value": {
                            "name": {
                                "value": "$$$/Contours/Defaults/Linear=Linear",
                                "type": "DescValueType.STRINGTYPE"
                            }
                        },
                        "type": "DescValueType.OBJECTTYPE",
                        "objectType": "shapeCurveType"
                    },
                    "layerConceals": {
                        "value": true,
                        "type": "DescValueType.BOOLEANTYPE"
                    }
                },
                "type": "DescValueType.OBJECTTYPE",
                "objectType": "dropShadow"
            }
        }
        else if (effectName == "frameFX")
        {
            return {
                "value": {
                    "enabled": {
                        "value": true,
                        "type": "DescValueType.BOOLEANTYPE"
                    },
                    "present": {
                        "value": true,
                        "type": "DescValueType.BOOLEANTYPE"
                    },
                    "showInDialog": {
                        "value": true,
                        "type": "DescValueType.BOOLEANTYPE"
                    },
                    "style": {
                        "value": {
                            "enumerationType": "frameStyle",
                            "enumerationValue": "outsetFrame"
                        },
                        "type": "DescValueType.ENUMERATEDTYPE"
                    },
                    "paintType": {
                        "value": {
                            "enumerationType": "frameFill",
                            "enumerationValue": "solidColor"
                        },
                        "type": "DescValueType.ENUMERATEDTYPE"
                    },
                    "mode": {
                        "value": {
                            "enumerationType": "blendMode",
                            "enumerationValue": "normal"
                        },
                        "type": "DescValueType.ENUMERATEDTYPE"
                    },
                    "opacity": {
                        "value": {
                            "doubleType": "percentUnit",
                            "doubleValue": 85
                        },
                        "type": "DescValueType.UNITDOUBLE"
                    },
                    "size": {
                        "value": {
                            "doubleType": "pixelsUnit",
                            "doubleValue": 9
                        },
                        "type": "DescValueType.UNITDOUBLE"
                    },
                    "color": {
                        "value": {
                            "red": {
                                "value": 251.5681001544,
                                "type": "DescValueType.DOUBLETYPE"
                            },
                            "grain": {
                                "value": 252.715957760811,
                                "type": "DescValueType.DOUBLETYPE"
                            },
                            "blue": {
                                "value": 255,
                                "type": "DescValueType.DOUBLETYPE"
                            }
                        },
                        "type": "DescValueType.OBJECTTYPE",
                        "objectType": "RGBColor"
                    },
                    "overprint": {
                        "value": false,
                        "type": "DescValueType.BOOLEANTYPE"
                    }
                },
                "type": "DescValueType.OBJECTTYPE",
                "objectType": "frameFX"
            };
        }
        else if (effectName == "innerGlow")
        {
            return {
                "value": {
                    "enabled": {
                        "value": true,
                        "type": "DescValueType.BOOLEANTYPE"
                    },
                    "present": {
                        "value": true,
                        "type": "DescValueType.BOOLEANTYPE"
                    },
                    "showInDialog": {
                        "value": true,
                        "type": "DescValueType.BOOLEANTYPE"
                    },
                    "mode": {
                        "value": {
                            "enumerationType": "blendMode",
                            "enumerationValue": "screen"
                        },
                        "type": "DescValueType.ENUMERATEDTYPE"
                    },
                    "color": {
                        "value": {
                            "red": {
                                "value": 255,
                                "type": "DescValueType.DOUBLETYPE"
                            },
                            "grain": {
                                "value": 255,
                                "type": "DescValueType.DOUBLETYPE"
                            },
                            "blue": {
                                "value": 255,
                                "type": "DescValueType.DOUBLETYPE"
                            }
                        },
                        "type": "DescValueType.OBJECTTYPE",
                        "objectType": "RGBColor"
                    },
                    "opacity": {
                        "value": {
                            "doubleType": "percentUnit",
                            "doubleValue": 35
                        },
                        "type": "DescValueType.UNITDOUBLE"
                    },
                    "glowTechnique": {
                        "value": {
                            "enumerationType": "matteTechnique",
                            "enumerationValue": "softMatte"
                        },
                        "type": "DescValueType.ENUMERATEDTYPE"
                    },
                    "chokeMatte": {
                        "value": {
                            "doubleType": "pixelsUnit",
                            "doubleValue": 0
                        },
                        "type": "DescValueType.UNITDOUBLE"
                    },
                    "blur": {
                        "value": {
                            "doubleType": "pixelsUnit",
                            "doubleValue": 7
                        },
                        "type": "DescValueType.UNITDOUBLE"
                    },
                    "noise": {
                        "value": {
                            "doubleType": "percentUnit",
                            "doubleValue": 0
                        },
                        "type": "DescValueType.UNITDOUBLE"
                    },
                    "shadingNoise": {
                        "value": {
                            "doubleType": "percentUnit",
                            "doubleValue": 0
                        },
                        "type": "DescValueType.UNITDOUBLE"
                    },
                    "antiAlias": {
                        "value": false,
                        "type": "DescValueType.BOOLEANTYPE"
                    },
                    "transferSpec": {
                        "value": {
                            "name": {
                                "value": "线性",
                                "type": "DescValueType.STRINGTYPE"
                            }
                        },
                        "type": "DescValueType.OBJECTTYPE",
                        "objectType": "shapeCurveType"
                    },
                    "inputRange": {
                        "value": {
                            "doubleType": "percentUnit",
                            "doubleValue": 50
                        },
                        "type": "DescValueType.UNITDOUBLE"
                    },
                    "innerGlowSource": {
                        "value": {
                            "enumerationType": "innerGlowSourceType",
                            "enumerationValue": "edgeGlow"
                        },
                        "type": "DescValueType.ENUMERATEDTYPE"
                    }
                },
                "type": "DescValueType.OBJECTTYPE",
                "objectType": "innerGlow"
            }
        }
        else if (effectName == "outerGlow")
        {
            return {
                "value": {
                    "enabled": {
                        "value": true,
                        "type": "DescValueType.BOOLEANTYPE"
                    },
                    "present": {
                        "value": true,
                        "type": "DescValueType.BOOLEANTYPE"
                    },
                    "showInDialog": {
                        "value": true,
                        "type": "DescValueType.BOOLEANTYPE"
                    },
                    "mode": {
                        "value": {
                            "enumerationType": "blendMode",
                            "enumerationValue": "screen"
                        },
                        "type": "DescValueType.ENUMERATEDTYPE"
                    },
                    "color": {
                        "value": {
                            "red": {
                                "value": 255,
                                "type": "DescValueType.DOUBLETYPE"
                            },
                            "grain": {
                                "value": 255,
                                "type": "DescValueType.DOUBLETYPE"
                            },
                            "blue": {
                                "value": 255,
                                "type": "DescValueType.DOUBLETYPE"
                            }
                        },
                        "type": "DescValueType.OBJECTTYPE",
                        "objectType": "RGBColor"
                    },
                    "opacity": {
                        "value": {
                            "doubleType": "percentUnit",
                            "doubleValue": 35
                        },
                        "type": "DescValueType.UNITDOUBLE"
                    },
                    "glowTechnique": {
                        "value": {
                            "enumerationType": "matteTechnique",
                            "enumerationValue": "softMatte"
                        },
                        "type": "DescValueType.ENUMERATEDTYPE"
                    },
                    "chokeMatte": {
                        "value": {
                            "doubleType": "pixelsUnit",
                            "doubleValue": 0
                        },
                        "type": "DescValueType.UNITDOUBLE"
                    },
                    "blur": {
                        "value": {
                            "doubleType": "pixelsUnit",
                            "doubleValue": 7
                        },
                        "type": "DescValueType.UNITDOUBLE"
                    },
                    "noise": {
                        "value": {
                            "doubleType": "percentUnit",
                            "doubleValue": 0
                        },
                        "type": "DescValueType.UNITDOUBLE"
                    },
                    "shadingNoise": {
                        "value": {
                            "doubleType": "percentUnit",
                            "doubleValue": 0
                        },
                        "type": "DescValueType.UNITDOUBLE"
                    },
                    "antiAlias": {
                        "value": false,
                        "type": "DescValueType.BOOLEANTYPE"
                    },
                    "transferSpec": {
                        "value": {
                            "name": {
                                "value": "默认",
                                "type": "DescValueType.STRINGTYPE"
                            },
                            "curve": {
                                "value": {
                                    "0": {
                                        "value": {
                                            "horizontal": {
                                                "value": 0,
                                                "type": "DescValueType.DOUBLETYPE"
                                            },
                                            "vertical": {
                                                "value": 0,
                                                "type": "DescValueType.DOUBLETYPE"
                                            }
                                        },
                                        "type": "DescValueType.OBJECTTYPE",
                                        "objectType": "curvePoint"
                                    },
                                    "1": {
                                        "value": {
                                            "horizontal": {
                                                "value": 255,
                                                "type": "DescValueType.DOUBLETYPE"
                                            },
                                            "vertical": {
                                                "value": 255,
                                                "type": "DescValueType.DOUBLETYPE"
                                            }
                                        },
                                        "type": "DescValueType.OBJECTTYPE",
                                        "objectType": "curvePoint"
                                    }
                                },
                                "type": "DescValueType.LISTTYPE"
                            }
                        },
                        "type": "DescValueType.OBJECTTYPE",
                        "objectType": "shapeCurveType"
                    },
                    "inputRange": {
                        "value": {
                            "doubleType": "percentUnit",
                            "doubleValue": 50
                        },
                        "type": "DescValueType.UNITDOUBLE"
                    }
                },
                "type": "DescValueType.OBJECTTYPE",
                "objectType": "outerGlow"
            }
        }
        else if (effectName == "patternFill")
        {
            return {
                "value": {
                    "enabled": {
                        "value": true,
                        "type": "DescValueType.BOOLEANTYPE"
                    },
                    "present": {
                        "value": true,
                        "type": "DescValueType.BOOLEANTYPE"
                    },
                    "showInDialog": {
                        "value": true,
                        "type": "DescValueType.BOOLEANTYPE"
                    },
                    "mode": {
                        "value": {
                            "enumerationType": "blendMode",
                            "enumerationValue": "normal"
                        },
                        "type": "DescValueType.ENUMERATEDTYPE"
                    },
                    "opacity": {
                        "value": {
                            "doubleType": "percentUnit",
                            "doubleValue": 100
                        },
                        "type": "DescValueType.UNITDOUBLE"
                    },
                    "pattern": {
                        "value": {
                            "name": {
                                "value": "$$$/Patterns/Defaults/RightDiagonalLine1=Right Diagonal Line 1",
                                "type": "DescValueType.STRINGTYPE"
                            },
                            "ID": {
                                "value": "bf565312-67b6-1177-9181-9d5762aa7056",
                                "type": "DescValueType.STRINGTYPE"
                            }
                        },
                        "type": "DescValueType.OBJECTTYPE",
                        "objectType": "pattern"
                    },
                    "scale": {
                        "value": {
                            "doubleType": "percentUnit",
                            "doubleValue": 100
                        },
                        "type": "DescValueType.UNITDOUBLE"
                    },
                    "align": {
                        "value": true,
                        "type": "DescValueType.BOOLEANTYPE"
                    },
                    "phase": {
                        "value": {
                            "horizontal": {
                                "value": 0,
                                "type": "DescValueType.DOUBLETYPE"
                            },
                            "vertical": {
                                "value": 0,
                                "type": "DescValueType.DOUBLETYPE"
                            }
                        },
                        "type": "DescValueType.OBJECTTYPE",
                        "objectType": "paint"
                    }
                },
                "type": "DescValueType.OBJECTTYPE",
                "objectType": "patternFill"
            }
        }
        else if (effectName == "solidFill")
        {
            return {
                "value": {
                    "enabled": {
                        "value": true,
                        "type": "DescValueType.BOOLEANTYPE"
                    },
                    "present": {
                        "value": true,
                        "type": "DescValueType.BOOLEANTYPE"
                    },
                    "showInDialog": {
                        "value": true,
                        "type": "DescValueType.BOOLEANTYPE"
                    },
                    "mode": {
                        "value": {
                            "enumerationType": "blendMode",
                            "enumerationValue": "normal"
                        },
                        "type": "DescValueType.ENUMERATEDTYPE"
                    },
                    "color": {
                        "value": {
                            "red": {
                                "value": 147.000006437302,
                                "type": "DescValueType.DOUBLETYPE"
                            },
                            "grain": {
                                "value": 147.000006437302,
                                "type": "DescValueType.DOUBLETYPE"
                            },
                            "blue": {
                                "value": 147.000006437302,
                                "type": "DescValueType.DOUBLETYPE"
                            }
                        },
                        "type": "DescValueType.OBJECTTYPE",
                        "objectType": "RGBColor"
                    },
                    "opacity": {
                        "value": {
                            "doubleType": "percentUnit",
                            "doubleValue": 100
                        },
                        "type": "DescValueType.UNITDOUBLE"
                    }
                },
                "type": "DescValueType.OBJECTTYPE",
                "objectType": "solidFill"
            };
        }
        else if (effectName == "gradientFill")
        {
            return {
                "value": {
                    "enabled": {
                        "value": true,
                        "type": "DescValueType.BOOLEANTYPE"
                    },
                    "present": {
                        "value": true,
                        "type": "DescValueType.BOOLEANTYPE"
                    },
                    "showInDialog": {
                        "value": true,
                        "type": "DescValueType.BOOLEANTYPE"
                    },
                    "mode": {
                        "value": {
                            "enumerationType": "blendMode",
                            "enumerationValue": "normal"
                        },
                        "type": "DescValueType.ENUMERATEDTYPE"
                    },
                    "opacity": {
                        "value": {
                            "doubleType": "percentUnit",
                            "doubleValue": 100
                        },
                        "type": "DescValueType.UNITDOUBLE"
                    },
                    "gradient": {
                        "value": {
                            "name": {
                                "value": "自定",
                                "type": "DescValueType.STRINGTYPE"
                            },
                            "gradientForm": {
                                "value": {
                                    "enumerationType": "gradientForm",
                                    "enumerationValue": "customStops"
                                },
                                "type": "DescValueType.ENUMERATEDTYPE"
                            },
                            "interfaceIconFrameDimmed": {
                                "value": 4096,
                                "type": "DescValueType.DOUBLETYPE"
                            },
                            "colors": {
                                "value": {
                                    "0": {
                                        "value": {
                                            "color": {
                                                "value": {
                                                    "red": {
                                                        "value": 43.9993286132813,
                                                        "type": "DescValueType.DOUBLETYPE"
                                                    },
                                                    "grain": {
                                                        "value": 251.000061035156,
                                                        "type": "DescValueType.DOUBLETYPE"
                                                    },
                                                    "blue": {
                                                        "value": 243.996276855469,
                                                        "type": "DescValueType.DOUBLETYPE"
                                                    }
                                                },
                                                "type": "DescValueType.OBJECTTYPE",
                                                "objectType": "RGBColor"
                                            },
                                            "type": {
                                                "value": {
                                                    "enumerationType": "colorStopType",
                                                    "enumerationValue": "userStop"
                                                },
                                                "type": "DescValueType.ENUMERATEDTYPE"
                                            },
                                            "location": {
                                                "value": 32,
                                                "type": "DescValueType.INTEGERTYPE"
                                            },
                                            "midpoint": {
                                                "value": 50,
                                                "type": "DescValueType.INTEGERTYPE"
                                            }
                                        },
                                        "type": "DescValueType.OBJECTTYPE",
                                        "objectType": "colorStop"
                                    },
                                    "1": {
                                        "value": {
                                            "color": {
                                                "value": {
                                                    "red": {
                                                        "value": 33.9994812011719,
                                                        "type": "DescValueType.DOUBLETYPE"
                                                    },
                                                    "grain": {
                                                        "value": 213.996734619141,
                                                        "type": "DescValueType.DOUBLETYPE"
                                                    },
                                                    "blue": {
                                                        "value": 253.000030517578,
                                                        "type": "DescValueType.DOUBLETYPE"
                                                    }
                                                },
                                                "type": "DescValueType.OBJECTTYPE",
                                                "objectType": "RGBColor"
                                            },
                                            "type": {
                                                "value": {
                                                    "enumerationType": "colorStopType",
                                                    "enumerationValue": "userStop"
                                                },
                                                "type": "DescValueType.ENUMERATEDTYPE"
                                            },
                                            "location": {
                                                "value": 4096,
                                                "type": "DescValueType.INTEGERTYPE"
                                            },
                                            "midpoint": {
                                                "value": 50,
                                                "type": "DescValueType.INTEGERTYPE"
                                            }
                                        },
                                        "type": "DescValueType.OBJECTTYPE",
                                        "objectType": "colorStop"
                                    }
                                },
                                "type": "DescValueType.LISTTYPE"
                            },
                            "transparency": {
                                "value": {
                                    "0": {
                                        "value": {
                                            "opacity": {
                                                "value": {
                                                    "doubleType": "percentUnit",
                                                    "doubleValue": 100
                                                },
                                                "type": "DescValueType.UNITDOUBLE"
                                            },
                                            "location": {
                                                "value": 0,
                                                "type": "DescValueType.INTEGERTYPE"
                                            },
                                            "midpoint": {
                                                "value": 50,
                                                "type": "DescValueType.INTEGERTYPE"
                                            }
                                        },
                                        "type": "DescValueType.OBJECTTYPE",
                                        "objectType": "transferSpec"
                                    },
                                    "1": {
                                        "value": {
                                            "opacity": {
                                                "value": {
                                                    "doubleType": "percentUnit",
                                                    "doubleValue": 100
                                                },
                                                "type": "DescValueType.UNITDOUBLE"
                                            },
                                            "location": {
                                                "value": 4096,
                                                "type": "DescValueType.INTEGERTYPE"
                                            },
                                            "midpoint": {
                                                "value": 50,
                                                "type": "DescValueType.INTEGERTYPE"
                                            }
                                        },
                                        "type": "DescValueType.OBJECTTYPE",
                                        "objectType": "transferSpec"
                                    }
                                },
                                "type": "DescValueType.LISTTYPE"
                            }
                        },
                        "type": "DescValueType.OBJECTTYPE",
                        "objectType": "gradientClassEvent"
                    },
                    "angle": {
                        "value": {
                            "doubleType": "angleUnit",
                            "doubleValue": 157
                        },
                        "type": "DescValueType.UNITDOUBLE"
                    },
                    "type": {
                        "value": {
                            "enumerationType": "gradientType",
                            "enumerationValue": "linear"
                        },
                        "type": "DescValueType.ENUMERATEDTYPE"
                    },
                    "reverse": {
                        "value": false,
                        "type": "DescValueType.BOOLEANTYPE"
                    },
                    "dither": {
                        "value": false,
                        "type": "DescValueType.BOOLEANTYPE"
                    },
                    "align": {
                        "value": true,
                        "type": "DescValueType.BOOLEANTYPE"
                    },
                    "scale": {
                        "value": {
                            "doubleType": "percentUnit",
                            "doubleValue": 150
                        },
                        "type": "DescValueType.UNITDOUBLE"
                    },
                    "offset": {
                        "value": {
                            "horizontal": {
                                "value": {
                                    "doubleType": "percentUnit",
                                    "doubleValue": -27.2748476849434
                                },
                                "type": "DescValueType.UNITDOUBLE"
                            },
                            "vertical": {
                                "value": {
                                    "doubleType": "percentUnit",
                                    "doubleValue": -40.5780746892962
                                },
                                "type": "DescValueType.UNITDOUBLE"
                            }
                        },
                        "type": "DescValueType.OBJECTTYPE",
                        "objectType": "paint"
                    }
                },
                "type": "DescValueType.OBJECTTYPE",
                "objectType": "gradientFill"
            };
        }

    }


}

Kinase.layer._effectUniverAnalyse = function (effectObject, onlyEnabled)
{
    var ob = {};
    _scanEffct(effectObject, ob);

    function _scanEffct(effectObject, ob)
    {
        for (var i in effectObject.value)
        {
            if ((effectObject.value[i].type == "DescValueType.OBJECTTYPE"))
            {

                ob[i] = {};
                _scanEffct(effectObject.value[i], ob[i])
            }
            else if ((i != "type" ))
            {
                if (effectObject.value[i].value.constructor == Object)
                {
                    _cut(effectObject.value[i].value, ["enumerationValue", "doubleValue"])
                    function _cut(value, nameList)
                    {
                        for (var name in nameList)
                        {
                            if (value[nameList[name]] != undefined)
                            {
                                ob[i] = value[nameList[name]];
                                return
                            }
                        }
                    }


                }
                else
                {
                    ob[i] = effectObject.value[i].value;
                }

            }
        }
    }

    return ob;
}


/*
 @param targetReference - targetReference 目标图层类型 ，可以是 Kinase.REF_ActiveLayer - 当前选中图层、Kinase.REF_LayerID - 根据图层 ID 、Kinase.REF_ItemIndex - 根据图层 ItemIndex。
 @param target - 目标图层参数，根据图层类型，填入图层 ID 或者 ItemIndex 。当目标图层类型是 Kinase.REF_ActiveLayer 时，请填 null。
 */



/*
 Kinase.layer.setLayerEffects_ByList(ki.layer.putEffectsList_dropShadow, list, Kinase.REF_ActiveLayer, null)
 */
Kinase.layer.setLayerEffects_ByList = function (listFunction, list, targetReference, target, effectName)
{

    var eOb = ki.layer.getLayerEffectsObject(targetReference, target)

    if (effectName == undefined)
    {
        eOb = listFunction(eOb, list)    // 如 eOb = ki.layer.putEffectsList_dropShadow(eOb, list)
    } else
    {
        eOb = listFunction(eOb, effectName, list)
    }


    ki.layer.setLayerEffectsObject(eOb, targetReference, target)

}


/**
 * 清楚当前选中图层图层样式
 */
Kinase.layer.removeLayerEffects_byActive = function ()
{
    var adOb = {
        "null": {
            "value": {
                "container": {"container": {}},
                "form": "ReferenceFormType.ENUMERATED",
                "desiredClass": "layer",
                "enumeratedType": "ordinal",
                "enumeratedValue": "targetEnum"
            }, "type": "DescValueType.REFERENCETYPE"
        }
    }

    mu.executeActionObjcet(stringIDToTypeID("disableLayerStyle"), adOb)
}


//END===========================[图层样式]========================


// ===========================[智能对象]========================


/*转换图层到智能对象*/
Kinase.layer.setLayerToSmart_ByActive = function ()
{
    var idnewPlacedLayer = stringIDToTypeID("newPlacedLayer");
    executeAction(idnewPlacedLayer, undefined, DialogModes.NO);
}


/*获取智能对象信息*/
Kinase.layer.getLayerSmartInfo = function (targetReference, target)
{
    var smartInfo = {
        linked: null, /*是否为链接对象*/
        link: null, /*链接地址*/
        fileReference: null, /*链接文件名*/

    }

    var smart_raw = Kinase.layer.get_XXX_Objcet(targetReference, target, "smartObject")
    if (smart_raw == undefined || smart_raw.smartObject == undefined)
    {
        return smartInfo;
    }

    smart_raw = smart_raw.smartObject;


    if (smart_raw.value.linked != undefined)
    {
        smartInfo.linked = smart_raw.value.linked.value
    }

    try
    {
        if (smart_raw.value.link.value.elementReference != undefined)
        {
            smartInfo.link = smart_raw.value.link.value.elementReference.value
        } else
        {
            smartInfo.link = smart_raw.value.link.value;
        }

    } catch (e)
    {
    }


    try
    {
        smartInfo.fileReference = smart_raw.value.fileReference.value
    } catch (e)
    {
    }


    return smartInfo
}

/**获取智能对象更多信息
 *
 *
 * @param targetReference
 * @param target
 * @returns {{linked: null, link: null, fileReference: null}}
 */
Kinase.layer.getLayerSmartMoreInfo = function (targetReference, target)
{
    // 返回例子：{
    //         "ID": "e28f121e-03f2-11e7-83da-96bd594a42b8",
    //         "placed": "e4e8fc97-03f2-11e7-83da-96bd594a42b8",
    //         "pageNumber": 1,
    //         "totalPages": 1,
    //         "crop": 1,
    //         "frameStep": {"numerator": 0, "denominator": 600, "_objectType": "null"},
    //         "duration": {"numerator": 0, "denominator": 600, "_objectType": "null"},
    //         "frameCount": 1,
    //         "antiAliasType": 16,
    //         "type": 2,
    //         "transform": [476, 144, 616, 144, 616, 309, 476, 309],
    //         "nonAffineTransform": [476, 144, 616, 144, 616, 309, 476, 309],
    //         "warp": {
    //             "warpStyle": {"enumerationType": "warpStyle", "enumerationValue": "warpNone"},
    //             "warpValue": 0,
    //             "warpPerspective": 0,
    //             "warpPerspectiveOther": 0,
    //             "warpRotate": {"enumerationType": "orientation", "enumerationValue": "horizontal"},
    //             "bounds": {
    //                 "top": {"doubleType": "pixelsUnit", "doubleValue": 0},
    //                 "left": {"doubleType": "pixelsUnit", "doubleValue": 0},
    //                 "bottom": {"doubleType": "pixelsUnit", "doubleValue": 600},
    //                 "right": {"doubleType": "pixelsUnit", "doubleValue": 800},
    //                 "_objectType": "rectangle"
    //             },
    //             "uOrder": 4,
    //             "vOrder": 4,
    //             "_objectType": "warp"
    //         },
    //         "size": {"width": 800, "height": 600, "_objectType": "paint"},
    //         "resolution": {"doubleType": "densityUnit", "doubleValue": 72},
    //         "comp": -1,
    //         "compInfo": {"compID": -1, "originalCompID": -1, "_objectType": "null"},
    //         "_objectType": "null"
    //     }
    // }
    var smart_raw = Kinase.layer.get_XXX_Objcet(targetReference, target, "smartObjectMore", true)

    if (smart_raw != undefined && smart_raw["smartObjectMore"] != undefined)
    {
        return smart_raw.smartObjectMore
    } else
    {
        return
    }

}


/**
 * 设置智能对象信息
 * @param smartInfo
 * @returns {null}
 */
Kinase.layer.setLayerSmartInfo_ByActive = function (smartInfo)
{
    if (smartInfo == undefined)
    {
        return null;
    }

    var oldSmartInfo = Kinase.layer.getLayerSmartInfo(Kinase.REF_ActiveLayer, null)

    if (smartInfo.linked != undefined && smartInfo.linked == false)
    {
        if (oldSmartInfo.linked == true)
        {
            Kinase.layer.embedSmartLink_ByActive()
            return
        }
    }


    if (smartInfo.link != undefined && smartInfo.link != "")
    {
        if (smartInfo.link != oldSmartInfo.link)
        {
            Kinase.layer.smartRelinkToFile_ByActive(smartInfo.link)
        }
    }

}


/*通过拷贝创建新智能对象，新的智能对象会成为当前选中图层*/
Kinase.layer.newSmartFromCopy_ByActive = function ()
{
    var ob = executeAction(stringIDToTypeID("placedLayerMakeCopy"), undefined, DialogModes.NO);
    // log(ki.layer.getLayerName_byActive())
}


/*重新链接到文件*/
Kinase.layer.smartRelinkToFile_ByActive = function (fileName)
{

    var ad = new ActionDescriptor();
    ad.putPath(charIDToTypeID("null"), new File(fileName));
    executeAction(stringIDToTypeID("placedLayerRelinkToFile"), ad, DialogModes.NO);
}

/* 把链接智能对象转化为嵌入智能对象*/
Kinase.layer.embedSmartLink_ByActive = function ()
{
    executeAction(stringIDToTypeID("placedLayerConvertToEmbedded"), undefined, DialogModes.NO);

}


// END===========================[智能对象]========================

// ===========================[图层链接]========================

/**
 * 为当前选中图层创建图层链接
 */
Kinase.layer.linkLayers_ByActive = function ()
{
    try
    {
        var ad = new ActionDescriptor();
        var af = new ActionReference();
        af.putEnumerated(charIDToTypeID("Lyr "), charIDToTypeID("Ordn"), charIDToTypeID("Trgt"));
        ad.putReference(charIDToTypeID("null"), af);
        executeAction(stringIDToTypeID("linkSelectedLayers"), ad, DialogModes.NO);
    } catch (e)
    {

        $.writeln("err: Kinase.layer.linkLayers_ByActive :" + e)
    }
}

/**
 * 选中链接图层的所有链接的图层
 */
Kinase.layer.slecteLinkLayers_ByActive = function ()
{
    try
    {
        var ad = new ActionDescriptor();
        var af = new ActionReference();
        af.putEnumerated(charIDToTypeID("Lyr "), charIDToTypeID("Ordn"), charIDToTypeID("Trgt"));
        ad.putReference(charIDToTypeID("null"), af);
        executeAction(stringIDToTypeID("selectLinkedLayers"), ad, DialogModes.NO);
    } catch (e)
    {

        $.writeln("err: Kinase.layer.slecteLinkLayers_ByActive :" + e)
    }
}


/**
 * 取消当前图层的图层链接
 */
Kinase.layer.cancelLinkLayers_ByActive = function ()
{
    try
    {
        var ad = new ActionDescriptor();
        var af = new ActionReference();
        af.putEnumerated(charIDToTypeID("Lyr "), charIDToTypeID("Ordn"), charIDToTypeID("Trgt"));
        ad.putReference(charIDToTypeID("null"), af);
        executeAction(stringIDToTypeID("unlinkSelectedLayers"), ad, DialogModes.NO);
    } catch (e)
    {

        $.writeln("err: Kinase.layer.cancelLinkLayers_ByActive :" + e)
    }
}


// END===========================[图层链接]========================


// ===========================[拾色器]========================

/*创建拾色器*/
Kinase.layer.creatNewColorSampler = function (x, y)
{
    var adOb = {
        "null": {
            "value": {
                "container": {
                    "container": {}
                },
                "form": "ReferenceFormType.CLASSTYPE",
                "desiredClass": "colorSampler"
            },
            "type": "DescValueType.REFERENCETYPE"
        },
        "position": {
            "value": {
                "horizontal": {
                    "value": {
                        "doubleType": "pixelsUnit",
                        "doubleValue": x
                    },
                    "type": "DescValueType.UNITDOUBLE"
                },
                "vertical": {
                    "value": {
                        "doubleType": "pixelsUnit",
                        "doubleValue": y
                    },
                    "type": "DescValueType.UNITDOUBLE"
                }
            },
            "type": "DescValueType.OBJECTTYPE",
            "objectType": "paint"
        }
    }
    mu.executeActionObjcet(charIDToTypeID("Mk  "), adOb)
}


// END===========================[拾色器]========================


/**
 * 判断图层是否是图层组.
 * @param targetReference - 目标图层类型 ，可以是 Kinase.REF_ActiveLayer - 当前选中图层、Kinase.REF_LayerID - 根据图层 ID 、Kinase.REF_ItemIndex - 根据图层 ItemIndex。
 * @param target - 目标图层参数，根据图层类型，填入图层 ID 或者 ItemIndex 。当目标图层类型是 Kinase.REF_ActiveLayer 时，请填 null。
 * @returns {boolean}
 */
Kinase.layer.isLayerSet = function (targetReference, target)
{

    try
    {
        var layerSection = ki.layer.get_XXX_Objcet(targetReference, target, "layerSection").layerSection.value.enumerationValue;

        if (layerSection == "layerSectionStart")
        {
            return true;
        } else
        {
            return false;
        }
    } catch (e)
    {

        $.writeln("err : Kinase.layer.isLayerSet: " + e)

    }
    return false;

}
/**
 * 判断图层是否是画板
 * @param targetReference
 * @param target
 * @returns {boolean}
 */
Kinase.layer.isArtBoard = function (targetReference, target)
{

    try
    {
        var artBoard_raw = Kinase.layer.get_XXX_Objcet(targetReference, target, "artboardEnabled", "Lyr ");

        if (artBoard_raw.artboardEnabled.value == true)
        {
            return true;
        } else
        {
            return false;
        }

    } catch (e)
    {
        return false
    }

}


/**
 * 创建新图层
 * @param name
 */
Kinase.layer.creatNewLayer_ByActive = function (name)
{

    var ad = new ActionDescriptor();
    var rf = new ActionReference();
    rf.putClass(charIDToTypeID("Lyr "));
    ad.putReference(charIDToTypeID("null"), rf);
    executeAction(charIDToTypeID("Mk  "), ad, DialogModes.NO);

    if (name != undefined)
    {
        Kinase.layer.setLayerName_byActive("");
    }
}

/**
 * 创建新图层组
 * @param name
 */
Kinase.layer.creatNewLayerSet_ByActive = function (name)
{
    adOb = {
        "null": {
            "value": {
                "container": {
                    "container": {}
                }, "form": "ReferenceFormType.CLASSTYPE", "desiredClass": "layerSection"
            }, "type": "DescValueType.REFERENCETYPE"
        },
        "layerSectionStart": {"value": 0, "type": "DescValueType.INTEGERTYPE"},
        "layerSectionEnd": {"value": 0, "type": "DescValueType.INTEGERTYPE"},
        "name": {"value": "", "type": "DescValueType.STRINGTYPE"}
    }
    mu.executeActionObjcet(charIDToTypeID("Mk  "), adOb)

    if (name != undefined)
    {
        Kinase.layer.setLayerName_byActive(name);
    }
}


/**
 * 创建新文本图层
 * @param name
 * @param w
 * @param h
 * @param text
 */
Kinase.layer.creatNewTextLayer_ByActive = function (name, w, h, text, english)
{

    var ad = new ActionDescriptor();
    var rf = new ActionReference();
    rf.putClass(charIDToTypeID("Lyr "));
    ad.putReference(charIDToTypeID("null"), rf);
    executeAction(charIDToTypeID("Mk  "), ad, DialogModes.NO);


    var w = _value(w, 100);
    var h = _value(h, 50);

    var itemIndex = ki.layer.getItemIndexBylayerID(ki.layer.getLayerIdByActive())

    var adOb = {
        "null": {
            "value": {
                "container": {
                    "container": {}
                },
                "form": "ReferenceFormType.CLASSTYPE",
                "desiredClass": "textLayer"
            },
            "type": "DescValueType.REFERENCETYPE"
        },
        "using": {
            "value": {
                "textKey": {
                    "value": "",
                    "type": "DescValueType.STRINGTYPE"
                },
                "warp": {
                    "value": {
                        "warpStyle": {
                            "value": {
                                "enumerationType": "warpStyle",
                                "enumerationValue": "warpNone"
                            },
                            "type": "DescValueType.ENUMERATEDTYPE"
                        },
                        "warpValue": {
                            "value": 0,
                            "type": "DescValueType.DOUBLETYPE"
                        },
                        "warpPerspective": {
                            "value": 0,
                            "type": "DescValueType.DOUBLETYPE"
                        },
                        "warpPerspectiveOther": {
                            "value": 0,
                            "type": "DescValueType.DOUBLETYPE"
                        },
                        "warpRotate": {
                            "value": {
                                "enumerationType": "orientation",
                                "enumerationValue": "horizontal"
                            },
                            "type": "DescValueType.ENUMERATEDTYPE"
                        }
                    },
                    "type": "DescValueType.OBJECTTYPE",
                    "objectType": "warp"
                },
                "textClickPoint": {
                    "value": {
                        "horizontal": {
                            "value": {
                                "doubleType": "percentUnit",
                                "doubleValue": 7.421875
                            },
                            "type": "DescValueType.UNITDOUBLE"
                        },
                        "vertical": {
                            "value": {
                                "doubleType": "percentUnit",
                                "doubleValue": 7.8
                            },
                            "type": "DescValueType.UNITDOUBLE"
                        }
                    },
                    "type": "DescValueType.OBJECTTYPE",
                    "objectType": "paint"
                },
                "textGridding": {
                    "value": {
                        "enumerationType": "textGridding",
                        "enumerationValue": "none"
                    },
                    "type": "DescValueType.ENUMERATEDTYPE"
                },
                "orientation": {
                    "value": {
                        "enumerationType": "orientation",
                        "enumerationValue": "horizontal"
                    },
                    "type": "DescValueType.ENUMERATEDTYPE"
                },
                "antiAlias": {
                    "value": {
                        "enumerationType": "antiAliasType",
                        "enumerationValue": "antiAliasPlatformLCD"
                    },
                    "type": "DescValueType.ENUMERATEDTYPE"
                },
                "bounds": {
                    "value": {
                        "left": {
                            "value": {
                                "doubleType": "pointsUnit",
                                "doubleValue": 0
                            },
                            "type": "DescValueType.UNITDOUBLE"
                        },
                        "top": {
                            "value": {
                                "doubleType": "pointsUnit",
                                "doubleValue": -2.047638
                            },
                            "type": "DescValueType.UNITDOUBLE"
                        },
                        "right": {
                            "value": {
                                "doubleType": "pointsUnit",
                                "doubleValue": 160
                            },
                            "type": "DescValueType.UNITDOUBLE"
                        },
                        "bottom": {
                            "value": {
                                "doubleType": "pointsUnit",
                                "doubleValue": 108
                            },
                            "type": "DescValueType.UNITDOUBLE"
                        }
                    },
                    "type": "DescValueType.OBJECTTYPE",
                    "objectType": "bounds"
                },
                "boundingBox": {
                    "value": {
                        "left": {
                            "value": {
                                "doubleType": "pointsUnit",
                                "doubleValue": 0
                            },
                            "type": "DescValueType.UNITDOUBLE"
                        },
                        "top": {
                            "value": {
                                "doubleType": "pointsUnit",
                                "doubleValue": 0
                            },
                            "type": "DescValueType.UNITDOUBLE"
                        },
                        "right": {
                            "value": {
                                "doubleType": "pointsUnit",
                                "doubleValue": 0
                            },
                            "type": "DescValueType.UNITDOUBLE"
                        },
                        "bottom": {
                            "value": {
                                "doubleType": "pointsUnit",
                                "doubleValue": -1
                            },
                            "type": "DescValueType.UNITDOUBLE"
                        }
                    },
                    "type": "DescValueType.OBJECTTYPE",
                    "objectType": "boundingBox"
                },
                "textShape": {
                    "value": {
                        "0": {
                            "value": {
                                "char": {
                                    "value": {
                                        "enumerationType": "char",
                                        "enumerationValue": "box"
                                    },
                                    "type": "DescValueType.ENUMERATEDTYPE"
                                },
                                "orientation": {
                                    "value": {
                                        "enumerationType": "orientation",
                                        "enumerationValue": "horizontal"
                                    },
                                    "type": "DescValueType.ENUMERATEDTYPE"
                                },
                                "transform": {
                                    "value": {
                                        "xx": {
                                            "value": 1,
                                            "type": "DescValueType.DOUBLETYPE"
                                        },
                                        "xy": {
                                            "value": 0,
                                            "type": "DescValueType.DOUBLETYPE"
                                        },
                                        "yx": {
                                            "value": 0,
                                            "type": "DescValueType.DOUBLETYPE"
                                        },
                                        "yy": {
                                            "value": 1,
                                            "type": "DescValueType.DOUBLETYPE"
                                        },
                                        "tx": {
                                            "value": 0,
                                            "type": "DescValueType.DOUBLETYPE"
                                        },
                                        "ty": {
                                            "value": 0,
                                            "type": "DescValueType.DOUBLETYPE"
                                        }
                                    },
                                    "type": "DescValueType.OBJECTTYPE",
                                    "objectType": "transform"
                                },
                                "rowCount": {
                                    "value": 1,
                                    "type": "DescValueType.INTEGERTYPE"
                                },
                                "columnCount": {
                                    "value": 1,
                                    "type": "DescValueType.INTEGERTYPE"
                                },
                                "rowMajorOrder": {
                                    "value": true,
                                    "type": "DescValueType.BOOLEANTYPE"
                                },
                                "rowGutter": {
                                    "value": {
                                        "doubleType": "pointsUnit",
                                        "doubleValue": 0
                                    },
                                    "type": "DescValueType.UNITDOUBLE"
                                },
                                "columnGutter": {
                                    "value": {
                                        "doubleType": "pointsUnit",
                                        "doubleValue": 0
                                    },
                                    "type": "DescValueType.UNITDOUBLE"
                                },
                                "spacing": {
                                    "value": {
                                        "doubleType": "pointsUnit",
                                        "doubleValue": 0
                                    },
                                    "type": "DescValueType.UNITDOUBLE"
                                },
                                "frameBaselineAlignment": {
                                    "value": {
                                        "enumerationType": "frameBaselineAlignment",
                                        "enumerationValue": "alignByAscent"
                                    },
                                    "type": "DescValueType.ENUMERATEDTYPE"
                                },
                                "firstBaselineMinimum": {
                                    "value": {
                                        "doubleType": "pointsUnit",
                                        "doubleValue": 0
                                    },
                                    "type": "DescValueType.UNITDOUBLE"
                                },
                                "bounds": {
                                    "value": {
                                        "top": {
                                            "value": 0,
                                            "type": "DescValueType.DOUBLETYPE"
                                        },
                                        "left": {
                                            "value": 0,
                                            "type": "DescValueType.DOUBLETYPE"
                                        },
                                        "bottom": {
                                            "value": h,
                                            "type": "DescValueType.DOUBLETYPE"
                                        },
                                        "right": {
                                            "value": w,
                                            "type": "DescValueType.DOUBLETYPE"
                                        }
                                    },
                                    "type": "DescValueType.OBJECTTYPE",
                                    "objectType": "rectangle"
                                }
                            },
                            "type": "DescValueType.OBJECTTYPE",
                            "objectType": "textShape"
                        }
                    },
                    "type": "DescValueType.LISTTYPE"
                },
                "textStyleRange": {
                    "value": {},
                    "type": "DescValueType.LISTTYPE"
                }
            },
            "type": "DescValueType.OBJECTTYPE",
            "objectType": "textLayer"
        },
        "layerID": {
            "value": 0,
            "type": "DescValueType.INTEGERTYPE"
        }
    }
    mu.executeActionObjcet(charIDToTypeID("Mk  "), adOb)
    if (english == true)
    {
        _setEnglish();
    }

    if (text != undefined)
    {
        Kinase.layer.setLayerText_Quick(text, Kinase.REF_ActiveLayer, null);
    }

    if (name != undefined)
    {
        Kinase.layer.setLayerName_byActive(name);
    }

    function _setEnglish()
    {
        var idsetd = charIDToTypeID("setd");
        var desc2569 = new ActionDescriptor();
        var idnull = charIDToTypeID("null");
        var ref412 = new ActionReference();
        var idPrpr = charIDToTypeID("Prpr");
        var idTxtS = charIDToTypeID("TxtS");
        ref412.putProperty(idPrpr, idTxtS);
        var idTxLr = charIDToTypeID("TxLr");
        var idOrdn = charIDToTypeID("Ordn");
        var idTrgt = charIDToTypeID("Trgt");
        ref412.putEnumerated(idTxLr, idOrdn, idTrgt);
        desc2569.putReference(idnull, ref412);
        var idT = charIDToTypeID("T   ");
        var desc2570 = new ActionDescriptor();
        var idtextOverrideFeatureName = stringIDToTypeID("textOverrideFeatureName");
        desc2570.putInteger(idtextOverrideFeatureName, 808466225);
        var idtypeStyleOperationType = stringIDToTypeID("typeStyleOperationType");
        desc2570.putInteger(idtypeStyleOperationType, 3);
        var idtextLanguage = stringIDToTypeID("textLanguage");
        var idtextLanguage = stringIDToTypeID("textLanguage");
        var idenglishLanguage = stringIDToTypeID("englishLanguage");
        desc2570.putEnumerated(idtextLanguage, idtextLanguage, idenglishLanguage);
        var idTxtS = charIDToTypeID("TxtS");
        desc2569.putObject(idT, idTxtS, desc2570);
        executeAction(idsetd, desc2569, DialogModes.NO);
    }

    ki.layer.moveActiveLayerOrder(itemIndex)
}


/**
 * 创建一个新的圆角矩形形状图层
 *  // defaultInfo = {
    //     fillColor:  {r: 0, g: 0, b: 0}, 填充颜色/
    //     strokeColor:  {r: 0, g: 0, b: 0}, 描边颜色/
    //     lineWidth: 0, 描边宽度
    //     x: 10,
    //     y: 10,
    //     h: 30,
    //     w: 60,
    //     radian: shapeInfo.radian || {
    //         圆角
    //         topRight: 3,
    //         topLeft: 3,
    //         bottomRight: 3,
    //         bottomLeft: 3,
    //     },
    // }
 * @param layerName 图层名称
 * @param shapeInfo 形状信息
 */
Kinase.layer.creatNewShapeLayerSquarenss_ByActive = function (layerName, shapeInfo)
{
    if (shapeInfo == undefined) shapeInfo = {};

    var defaultInfo = {
        fillColor: shapeInfo.fillColor || {r: 0, g: 0, b: 0}, /*填充颜色*/
        strokeColor: shapeInfo.strokeColor || {r: 0, g: 0, b: 0}, /*描边颜色*/
        lineWidth: 0, /*描边宽度*/
        x: 10,
        y: 10,
        h: 30,
        w: 60,
        radian: shapeInfo.radian || {
            /*圆角*/
            topRight: 3,
            topLeft: 3,
            bottomRight: 3,
            bottomLeft: 3,
        },
    }
    if (shapeInfo.x != undefined) defaultInfo.x = shapeInfo.x;
    if (shapeInfo.y != undefined) defaultInfo.y = shapeInfo.y;
    if (shapeInfo.h != undefined) defaultInfo.h = shapeInfo.h;
    if (shapeInfo.w != undefined) defaultInfo.w = shapeInfo.w;
    if (shapeInfo.lineWidth != undefined) defaultInfo.lineWidth = shapeInfo.lineWidth;

    var rltb = Kinase._xywh2rltb({x: defaultInfo.x, y: defaultInfo.y, w: defaultInfo.w, h: defaultInfo.h})

    var adOb = {
        "null": {
            "value": {
                "container": {"container": {}},
                "form": "ReferenceFormType.CLASSTYPE",
                "desiredClass": "contentLayer"
            }, "type": "DescValueType.REFERENCETYPE"
        },
        "using": {
            "value": {
                "type": {
                    "value": {
                        "color": {
                            "value": {
                                "red": {"value": defaultInfo.fillColor.r, "type": "DescValueType.DOUBLETYPE"},
                                "grain": {"value": defaultInfo.fillColor.g, "type": "DescValueType.DOUBLETYPE"},
                                "blue": {"value": defaultInfo.fillColor.b, "type": "DescValueType.DOUBLETYPE"}
                            }, "type": "DescValueType.OBJECTTYPE", "objectType": "RGBColor"
                        }
                    }, "type": "DescValueType.OBJECTTYPE", "objectType": "solidColorLayer"
                },
                "shape": {
                    "value": {
                        "unitValueQuadVersion": {"value": 1, "type": "DescValueType.INTEGERTYPE"},
                        "top": {
                            "value": {"doubleType": "pixelsUnit", "doubleValue": rltb.top},
                            "type": "DescValueType.UNITDOUBLE"
                        },
                        "left": {
                            "value": {"doubleType": "pixelsUnit", "doubleValue": rltb.left},
                            "type": "DescValueType.UNITDOUBLE"
                        },
                        "bottom": {
                            "value": {"doubleType": "pixelsUnit", "doubleValue": rltb.bottom},
                            "type": "DescValueType.UNITDOUBLE"
                        },
                        "right": {
                            "value": {"doubleType": "pixelsUnit", "doubleValue": rltb.right},
                            "type": "DescValueType.UNITDOUBLE"
                        },
                        "topRight": {
                            "value": {"doubleType": "pixelsUnit", "doubleValue": defaultInfo.radian.topRight},
                            "type": "DescValueType.UNITDOUBLE"
                        },
                        "topLeft": {
                            "value": {"doubleType": "pixelsUnit", "doubleValue": defaultInfo.radian.topLeft},
                            "type": "DescValueType.UNITDOUBLE"
                        },
                        "bottomLeft": {
                            "value": {"doubleType": "pixelsUnit", "doubleValue": defaultInfo.radian.bottomLeft},
                            "type": "DescValueType.UNITDOUBLE"
                        },
                        "bottomRight": {
                            "value": {"doubleType": "pixelsUnit", "doubleValue": defaultInfo.radian.bottomRight},
                            "type": "DescValueType.UNITDOUBLE"
                        }
                    }, "type": "DescValueType.OBJECTTYPE", "objectType": "rectangle"
                },
                "strokeStyle": {
                    "value": {
                        "strokeStyleVersion": {"value": 2, "type": "DescValueType.INTEGERTYPE"},
                        "strokeEnabled": {"value": true, "type": "DescValueType.BOOLEANTYPE"},
                        "fillEnabled": {"value": true, "type": "DescValueType.BOOLEANTYPE"},
                        "strokeStyleLineWidth": {
                            "value": {"doubleType": "pixelsUnit", "doubleValue": defaultInfo.lineWidth},
                            "type": "DescValueType.UNITDOUBLE"
                        },
                        "strokeStyleLineDashOffset": {
                            "value": {"doubleType": "pointsUnit", "doubleValue": 0},
                            "type": "DescValueType.UNITDOUBLE"
                        },
                        "strokeStyleMiterLimit": {"value": 100, "type": "DescValueType.DOUBLETYPE"},
                        "strokeStyleLineCapType": {
                            "value": {
                                "enumerationType": "strokeStyleLineCapType",
                                "enumerationValue": "strokeStyleButtCap"
                            }, "type": "DescValueType.ENUMERATEDTYPE"
                        },
                        "strokeStyleLineJoinType": {
                            "value": {
                                "enumerationType": "strokeStyleLineJoinType",
                                "enumerationValue": "strokeStyleMiterJoin"
                            }, "type": "DescValueType.ENUMERATEDTYPE"
                        },
                        "strokeStyleLineAlignment": {
                            "value": {
                                "enumerationType": "strokeStyleLineAlignment",
                                "enumerationValue": "strokeStyleAlignInside"
                            }, "type": "DescValueType.ENUMERATEDTYPE"
                        },
                        "strokeStyleScaleLock": {"value": false, "type": "DescValueType.BOOLEANTYPE"},
                        "strokeStyleStrokeAdjust": {"value": false, "type": "DescValueType.BOOLEANTYPE"},
                        "strokeStyleLineDashSet": {"value": {}, "type": "DescValueType.LISTTYPE"},
                        "strokeStyleBlendMode": {
                            "value": {
                                "enumerationType": "blendMode",
                                "enumerationValue": "normal"
                            }, "type": "DescValueType.ENUMERATEDTYPE"
                        },
                        "strokeStyleOpacity": {
                            "value": {"doubleType": "percentUnit", "doubleValue": 100},
                            "type": "DescValueType.UNITDOUBLE"
                        },
                        "strokeStyleContent": {
                            "value": {
                                "color": {
                                    "value": {
                                        "red": {
                                            "value": defaultInfo.strokeColor.r,
                                            "type": "DescValueType.DOUBLETYPE"
                                        },
                                        "grain": {
                                            "value": defaultInfo.strokeColor.g,
                                            "type": "DescValueType.DOUBLETYPE"
                                        },
                                        "blue": {"value": defaultInfo.strokeColor.b, "type": "DescValueType.DOUBLETYPE"}
                                    }, "type": "DescValueType.OBJECTTYPE", "objectType": "RGBColor"
                                }
                            }, "type": "DescValueType.OBJECTTYPE", "objectType": "solidColorLayer"
                        },
                        "strokeStyleResolution": {"value": 96, "type": "DescValueType.DOUBLETYPE"}
                    }, "type": "DescValueType.OBJECTTYPE", "objectType": "strokeStyle"
                }
            }, "type": "DescValueType.OBJECTTYPE", "objectType": "contentLayer"
        },
    }
    mu.executeActionObjcet(charIDToTypeID("Mk  "), adOb)


    if (layerName != undefined)
    {
        Kinase.layer.setLayerName_byActive(layerName);
    }
}

/**
 * 为当前创建一个指定 padding 的背板形状图层
 *
 *  *  // shapeInfo = {
    //     fillColor:  {r: 0, g: 0, b: 0}, 填充颜色/
    //     strokeColor:  {r: 0, g: 0, b: 0}, 描边颜色/
    //     lineWidth: 0, 描边宽度
    //     radian: shapeInfo.radian || {
    //         圆角
    //         topRight: 3,
    //         topLeft: 3,
    //         bottomRight: 3,
    //         bottomLeft: 3,
    //     },
    // }
 * @param layerName 图层名称
 * @param padding {left: , right: , top: , bottom: }
 * @param shapeInfo
 */
Kinase.layer.creatNewShapeLayerBackBox_ByActive = function (layerName, padding, shapeInfo)
{
    if (shapeInfo == undefined) shapeInfo = {};
    if (padding == undefined) padding = {};

    var trgetId = Kinase.layer.getLayerIdByActive();
    var trgetBounds = Kinase.layer.getLayerBounds(Kinase.REF_ActiveLayer, null)
    // {{x: null, y: null, w: null, h: null, right: null, bottom: null}}


    var boxBounds_rltb = {
        left: trgetBounds.x - +_value(padding.left, 10),
        top: trgetBounds.y - +_value(padding.top, 10),
        right: trgetBounds.right + +_value(padding.right, 10),
        bottom: trgetBounds.bottom + +_value(padding.bottom, 10),
    }

    var boxBounds_xywh = Kinase._rltb2xywh(boxBounds_rltb);


    shapeInfo.x = boxBounds_xywh.x
    shapeInfo.y = boxBounds_xywh.y
    shapeInfo.w = boxBounds_xywh.w
    shapeInfo.h = boxBounds_xywh.h

    Kinase.layer.creatNewShapeLayerSquarenss_ByActive(layerName, shapeInfo)
    Kinase.layer.moveActiveLayerOrder(Kinase.layer.getItemIndexBylayerID(trgetId))

}

/**
 * 载入选区，从当前图层载入选区
 */
Kinase.layer.loadSelection_byActive = function ()
{
    var adOb = {
        "null": {
            "value": {
                "container": {"container": {}},
                "form": "ReferenceFormType.PROPERTY",
                "desiredClass": "channel",
                "property": "selection"
            }, "type": "DescValueType.REFERENCETYPE"
        },
        "to": {
            "value": {
                "container": {"container": {}},
                "form": "ReferenceFormType.ENUMERATED",
                "desiredClass": "channel",
                "enumeratedType": "channel",
                "enumeratedValue": "transparencyEnum"
            }, "type": "DescValueType.REFERENCETYPE"
        }
    }

    mu.executeActionObjcet(charIDToTypeID("setd"), adOb)
}


/**
 * 取消图层选择
 */
Kinase.layer.cancelSelection_byActive = function ()
{
    var adOb = {
        "null": {
            "value": {
                "container": {"container": {}},
                "form": "ReferenceFormType.PROPERTY",
                "desiredClass": "channel",
                "property": "selection"
            }, "type": "DescValueType.REFERENCETYPE"
        },
        "to": {
            "value": {"enumerationType": "ordinal", "enumerationValue": "none"},
            "type": "DescValueType.ENUMERATEDTYPE"
        }
    }


    mu.executeActionObjcet(charIDToTypeID("setd"), adOb)
}


/**
 * 复制当前选中图层, 返回新图层 id 数组
 * @returns {Array}
 */
Kinase.layer.copyLayer_byActive = function ()
{
    try
    {
        var ad = new ActionDescriptor();
        var af = new ActionReference();
        af.putEnumerated(charIDToTypeID("Lyr "), charIDToTypeID("Ordn"), charIDToTypeID("Trgt"));
        ad.putReference(charIDToTypeID("null"), af);
        ad.putInteger(charIDToTypeID("Vrsn"), 5);
        var adResult = executeAction(charIDToTypeID("Dplc"), ad, DialogModes.NO);
        var obResult = mu.actionDescriptorToObject(adResult)

        var ids = []
        // $.writeln(json(obResult))
        if (obResult["ID"]["value"] != undefined)
        {
            for (var i in obResult["ID"]["value"])
            {
                if (obResult["ID"]["value"][i]["value"] != undefined)
                {
                    ids.push(obResult["ID"]["value"][i]["value"])
                }

            }
        }
        return ids;
    } catch (e)
    {
        $.writeln("Kinase.layer.copyLayer_byActive:" + e)
        return null
    }
}


/**
 * 创建剪贴蒙版
 * @returns {null}
 */
Kinase.layer.createCMask_byActive = function ()
{
    try
    {
        var ad = new ActionDescriptor();
        var af = new ActionReference();
        af.putEnumerated(charIDToTypeID("Lyr "), charIDToTypeID("Ordn"), charIDToTypeID("Trgt"));
        ad.putReference(charIDToTypeID("null"), af);
        executeAction(charIDToTypeID("GrpL"), ad, DialogModes.NO);

    } catch (e)
    {
        $.writeln("Kinase.layer.createCMask_byActive:" + e)
        return null
    }
}


/**创建图层蒙版
 * @returns {null}
 */
Kinase.layer.createMask_byActive = function ()
{
    try
    {
        var ad = new ActionDescriptor();
        ad.putClass(charIDToTypeID("Nw  "), charIDToTypeID("Chnl"));
        var af = new ActionReference();
        af.putEnumerated(charIDToTypeID("Chnl"), charIDToTypeID("Chnl"), charIDToTypeID("Msk "));
        ad.putReference(charIDToTypeID("At  "), af);
        ad.putEnumerated(charIDToTypeID("Usng"), charIDToTypeID("UsrM"), charIDToTypeID("RvlS"));
        executeAction(charIDToTypeID("Mk  "), ad, DialogModes.NO);


    } catch (e)
    {
        $.writeln("Kinase.layer.createCMask_byActive:" + e)
        return null
    }
}

/**应用蒙版
 *
 * @returns {null}
 */
Kinase.layer.applyMask_byActive = function ()
{
    try
    {
        var ad = new ActionDescriptor();
        var af = new ActionReference();
        af.putEnumerated(charIDToTypeID("Chnl"), charIDToTypeID("Chnl"), charIDToTypeID("Msk "));
        ad.putReference(charIDToTypeID("null"), af);
        ad.putBoolean(charIDToTypeID("Aply"), true);
        executeAction(charIDToTypeID("Dlt "), ad, DialogModes.NO);

    } catch (e)
    {
        $.writeln("Kinase.layer.deleteMask_byActive:" + e)
        return null
    }
}


/**
 * 删除选中图层
 */
Kinase.layer.deleteLayer_ByActive = function ()
{
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
        "layerID": {
            "value": {},
            "type": "DescValueType.LISTTYPE"
        }
    }

    // if (id instanceof Array)
    // {
    //     for (var i = 0; i < id.length; i++)
    //     {
    //         adOb.layerID.value[i] = {
    //             "value": id[i],
    //             "type": "DescValueType.INTEGERTYPE"
    //         }
    //     }
    //
    // } else
    // {
    //     adOb.layerID.value[0] = {
    //         "value": id,
    //         "type": "DescValueType.INTEGERTYPE"
    //     }
    // }

    // log(json(adOb))
    mu.executeActionObjcet(charIDToTypeID("Dlt "), adOb)

}


/**
 * 移动图层排序
 * @param itemIndex
 */
Kinase.layer.moveActiveLayerOrder = function (itemIndex)
{

    if (itemIndex == undefined)
    {
        return
    }

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
        "to": {
            "value": {
                "container": {
                    "container": {}
                },
                "form": "ReferenceFormType.INDEX",
                "desiredClass": "layer",
                "index": itemIndex + Kinase.BKOffset()
            },
            "type": "DescValueType.REFERENCETYPE"
        },
        "adjustment": {
            "value": false,
            "type": "DescValueType.BOOLEANTYPE"
        },
        "version": {
            "value": 5,
            "type": "DescValueType.INTEGERTYPE"
        }
    }
    mu.executeActionObjcet(charIDToTypeID("move"), adOb)
}

/**
 * 关闭展开的图层组。图层组内必须有 2 个及以上成员图层（可以添加临时图层来给关闭只有一个图层的图层组）。会丢失图层组蒙版属性。
 */
Kinase.layer.closeLayerSet_byActive = function ()
{
    var layerSet = activeDocument.activeLayer;
    var oldName = layerSet.name;
    var oldOpacity = layerSet.opacity;
    var oldBlendMode = layerSet.blendMode;
    var oldVisible = layerSet.visible
    var oldLinkedLayers = layerSet.linkedLayers;


    Kinase.layer.ungroupLayers_byActive();
    Kinase.layer.groupLayers_byActive(oldName);


    var newLyaerSet = activeDocument.activeLayer;

    newLyaerSet.opacity = oldOpacity;
    newLyaerSet.blendMode = oldBlendMode;
    newLyaerSet.visible = oldVisible;

    for (var x in oldLinkedLayers)
    {
        if (oldLinkedLayers[x].typename == "LayerSet")
            activeDocument.activeLayer.link(oldLinkedLayers[x]);
    }
}


/**
 * 拼合选中图层
 */
Kinase.layer.mergeLayer_byActive = function ()
{
    try
    {
        executeAction(charIDToTypeID("Mrg2"), new ActionDescriptor(), DialogModes.NO);
    }
    catch (e)
    {
        $.writeln("err : Kinase.layer.mergeLayer_byActive:" + e)
    }
}


/**
 * 栅格化当前选中图层
 */
Kinase.layer.rasterizeLayer_byActive = function ()
{
    try
    {
        var adOb = {
            "null": {
                "value": {
                    "container": {"container": {}},
                    "form": "ReferenceFormType.ENUMERATED",
                    "desiredClass": "layer",
                    "enumeratedType": "ordinal",
                    "enumeratedValue": "targetEnum"
                }, "type": "DescValueType.REFERENCETYPE"
            }
        }

        mu.executeActionObjcet(stringIDToTypeID("rasterizeLayer"), adOb)
    }
    catch (e)
    {
        $.writeln("err : Kinase.layer.rasterizeLayer_byActive:" + e)
    }
}


/**
 * 取消当前选中图层图层组，
 */
Kinase.layer.ungroupLayers_byActive = function ()
{
    var ad = new ActionDescriptor();
    var ref = new ActionReference();
    ref.putEnumerated(charIDToTypeID("Lyr "), charIDToTypeID("Ordn"), charIDToTypeID("Trgt"));
    ad.putReference(charIDToTypeID("null"), ref);

    try
    {
        executeAction(stringIDToTypeID("ungroupLayersEvent"), ad, DialogModes.NO);
    }
    catch (e)
    {
    }

}

/**
 * 为当前选中图层创建图层组
 * @param name
 */
Kinase.layer.groupLayers_byActive = function (name)
{
    var ad = new ActionDescriptor();
    var ref = new ActionReference();
    ref.putClass(stringIDToTypeID("layerSection"));
    ad.putReference(charIDToTypeID("null"), ref);
    var m_Ref02 = new ActionReference();
    m_Ref02.putEnumerated(charIDToTypeID("Lyr "), charIDToTypeID("Ordn"), charIDToTypeID("Trgt"));
    ad.putReference(charIDToTypeID("From"), m_Ref02);
    var m_Dsc02 = new ActionDescriptor();
    m_Dsc02.putString(charIDToTypeID("Nm  "), name);
    ad.putObject(charIDToTypeID("Usng"), stringIDToTypeID("layerSection"), m_Dsc02);
    executeAction(charIDToTypeID("Mk  "), ad, DialogModes.NO);
}


/**
 * 保存当前各图层选中状态，把返回值用作 Kinase.layer.selectLoad() 的参数，能再现当前各图层选中状态
 * @returns {Array} layerIDArray
 */
Kinase.layer.selectSave = function ()
{
    return Kinase.layer.getTargetLayersID()
}


/**
 * 再现各图层选中状态。参数为使用 Kinase.layer.selectSave() 的返回值。
 * @param layerIDArray
 */
Kinase.layer.selectLoad = function (layerIDArray)
{

    var nowSelect = Kinase.layer.selectSave()

    var symD = symDifference(layerIDArray, nowSelect);

    if (symD != undefined)
    {
        if (symD.length > 0)
        {
            Kinase.layer.selectMultLayers_byID(layerIDArray, true);
        }
    }

    function symDifference(a, b)
    {
        var ob = {};
        for (var i = 0; i < a.length; i++)
        {
            ob[a[i]] = true;
        }

        for (var i = 0; i < b.length; i++)
        {
            if (ob[b[i]] == undefined)
            {
                ob[b[i]] = true;
            } else
            {
                ob[b[i]] = false;
            }
        }

        var arr = [];
        for (var x in ob)
        {
            if (ob[x] != false)
            {
                arr.push(x);
            }
        }
        return arr;
    }
}


/**
 * 根据图层 ID 单选图层
 * @param layerID
 */
Kinase.layer.selectLayer_byID = function (layerID)
{
    if (layerID == undefined)
    {
        return;
    }

    try
    {
        var ref = new ActionReference();
        ref.putIdentifier(charIDToTypeID("Lyr "), layerID);
        var desc = new ActionDescriptor();
        desc.putReference(charIDToTypeID("null"), ref);
        executeAction(charIDToTypeID("slct"), desc, DialogModes.NO);
    } catch (e)
    {
        $.writeln("Kinase.layer.selectLayer_byID:" + e)
    }
}

/**
 * 根据图层 ItemIndex 单选图层
 * @param ItemIndex
 */
Kinase.layer.selectLayer_byItemIndex = function (ItemIndex)
{

    try
    {
        var ref = new ActionReference();
        ref.putIndex(charIDToTypeID("Lyr "), ItemIndex + Kinase.BKOffset());
        var desc = new ActionDescriptor();
        desc.putReference(charIDToTypeID("null"), ref);
        executeAction(charIDToTypeID("slct"), desc, DialogModes.NO);

    } catch (e)
    {
        $.writeln("Kinase.layer.selectLayer_byID:" + e)
    }

}

/**
 * 根据图层 ID ，多选图层。不会取消之前选中的图层（如果 repick 不为真）。
 * @param layerIDArray
 * @param repick - 为真会取消之前的已选图层重新选择。
 * @returns {string}
 */
Kinase.layer.selectMultLayers_byID = function (layerIDArray, repick)
{

    if (layerIDArray == undefined)
    {
        return "err";
    }

    layerIDArray = layerIDArray.sort();
    if (repick)
    {
        Kinase.layer.selectLayer_byID(layerIDArray[0]);
    }
    for (var i = 0; i < layerIDArray.length; i++)
    {
        try
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
        } catch (e)
        {
            $.writeln("Kinase.layer.selectMultLayers_byID :" + e)
        }


    }
}

/**
 * 根据图层 ItemIndex ，多选图层。不会取消之前选中的图层（如果 repick 不为真）。
 * @param itemIndexArray
 * @param repick - 为真会取消之前的已选图层重新选择。
 * @returns {string}
 */
Kinase.layer.selectMultLayers_byItemIndex = function (itemIndexArray, repick)
{

    if (itemIndexArray == undefined)
    {
        return "err";
    }

    if (repick)
    {
        Kinase.layer.selectLayer_byItemIndex(itemIndexArray[0]);
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
 * 获取当前图层名称
 * @param layerID
 * @returns {*}
 */
Kinase.layer.getLayerName_byActive = function ()
{
    var ref = new ActionReference();
    ref.putEnumerated(charIDToTypeID("Lyr "), charIDToTypeID("Ordn"), charIDToTypeID("Trgt"));

    try
    {
        return executeActionGet(ref).getString(charIDToTypeID("Nm  "));
    } catch (e)
    {
        return null;
    }
}

/**
 * 根据图层 ID 获取图层名称
 * @param layerID
 * @returns {*}
 */
Kinase.layer.getLayerName_byID = function (layerID)
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
Kinase.layer.getLayerName_byItemIndex = function (ItemIndex)
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

/**
 * 设置当前图层名称
 * @param name
 */
Kinase.layer.setLayerName_byActive = function (name)
{

    var isLayerSet = Kinase.layer.isLayerSet(Kinase.REF_ActiveLayer, null)

    var ad = new ActionDescriptor();
    var ref = new ActionReference();
    ref.putEnumerated(charIDToTypeID("Lyr "), charIDToTypeID("Ordn"), charIDToTypeID("Trgt"));


    ad.putReference(charIDToTypeID("null"), ref);
    var ad2 = new ActionDescriptor();
    ad2.putString(charIDToTypeID("Nm  "), name);

    if (isLayerSet)
    {
        ad.putObject(charIDToTypeID("T   "), stringIDToTypeID("layerSection"), ad2);
    }
    else
    {
        ad.putObject(charIDToTypeID("T   "), charIDToTypeID("Lyr "), ad2);
    }


    executeAction(charIDToTypeID("setd"), ad, DialogModes.NO);
}


/**
 * 根据 ItemIndex 获取图层父级图层的 ItemIndex
 * @param itemIndex
 * @returns {number}
 */
Kinase.layer.getParentLayerItemIndex_byItemIndex = function (itemIndex)
{

    var parentItemIndex = -1;
    try
    {
        parentItemIndex = ki.layer.getLayerDOMObject_byItemIndex(itemIndex).parent.itemIndex;
    } catch (e)
    {
        // log(e)
    }
    return parentItemIndex;

}


/**
 * 根据 ItemIndex 获取图层父级图层的 Id
 * @param itemIndex
 * @returns {number}
 */
Kinase.layer.getParentLayerId_byItemIndex = function (itemIndex)
{

    var parentItemIndex = -1;
    try
    {
        parentItemIndex = ki.layer.getLayerDOMObject_byItemIndex(itemIndex).parent.id;
    } catch (e)
    {
        // log(e)
    }
    return parentItemIndex;

}


/**
 * 根据 ItemIndex 获取图层组的所有子元素的 id 数组
 * @param itemIndex
 * @param getLayerList
 * @returns {*}
 */
Kinase.layer.getChildLayerID_byItemIndex = function (itemIndex, getLayerList)
{
    var ids = [];
    var childs = Kinase.layer.getChildLayerDOM_byItemIndex(itemIndex)
    if (childs != undefined)
    {
        for (var i = 0; i < childs.length; i++)
        {
            if (getLayerList)
            {
                ids.push({id: childs[i].id, name: childs[i].name, itemIndex: childs[i].itemIndex});
            }
            else
            {
                ids.push(childs[i].id)
            }
        }
        return ids;
    }
    else
    {
        return null;
    }
}

/**
 * 展开 id 数组中的图层组，得到除了图层组外所有图层 id
 * @param layerIds id 数组
 * @returns {Array}
 */
Kinase.layer.getAllContainLayerID_byIds = function (layerIds)
{
    var allIds = []
    _scan(layerIds)
    function _scan(ids)
    {
        for (var i = 0; i < ids.length; i++)
        {
            var id = ids[i]
            var type = Kinase.layer.getLayerType(Kinase.REF_LayerID, id)

            if (type.typeName == "layerSet")
            {
                var child = Kinase.layer.getChildLayerID_byItemIndex(Kinase.layer.getItemIndexBylayerID(id))

                if (child != undefined)
                {
                    _scan(child)
                }

            } else
            {

                allIds.push(id)
            }
        }
    }

    return allIds
}


/**
 * 根据 ItemIndex 获取图层组的所有子元素的 layerList （[{name, id , itemIndex}]）
 * @param itemIndex
 * @returns {*}
 */
Kinase.layer.getChildLayerList_byItemIndex = function (itemIndex)
{
    return Kinase.layer.getChildLayerID_byItemIndex(itemIndex, true);
}


/**
 * 根据 ItemIndex 获取图层组的所有子元素的 DOM 对象
 * @param itemIndex
 * @returns {*}
 */
Kinase.layer.getChildLayerDOM_byItemIndex = function (itemIndex)
{
    var rootLayer = Kinase.layer.getLayerDOMObject_byItemIndex(itemIndex)
    var childs = []

    if (rootLayer.typename == "LayerSet")
    {
        _scanLayers(rootLayer.layers);

        return childs;

    }
    else
    {
        return null
    }


    function _scanLayers(layers)
    {
        var layerSet;
        for (var i = 0; i < layers.length; i++)
        {
            childs.push(layers[i]);
            if ((layers[i].typename == "LayerSet"))
            {
                _scanLayers(layers[i].layers)
            }
        }
    }
}


/**
 * 根据 ItemIndex 获取图层的 DOM 对象
 * @param itemIndex
 * @returns {*}
 */
Kinase.layer.getLayerDOMObject_byItemIndex = function (itemIndex)
{

    return _scanLayers(app.activeDocument.layers)

    function _scanLayers(layers)
    {
        var layerSet;
        // log("===_scanLayers:"+layers +"("+layers.length+")")
        for (var i = layers.length - 1; i >= 0; i--)
        {
            // log(i + "/" + layers.length + "-#" + layers[i].itemIndex + layers[i])
            if (layers[i].itemIndex == itemIndex)
            {
                return layers[i];
            }

            if ((layers[i].typename == "LayerSet") && layers[i].itemIndex > itemIndex)
            {
                return _scanLayers(layers[i].layers)
            }
        }
    }
}


// 选取目标 Reference--------------------------------
Kinase.REF_ActiveLayer = function (ref, noting, classString)
{
    if (classString != undefined)
    {
        var typeID = stringIDToTypeID(classString);
    } else
    {
        var typeID = charIDToTypeID("Lyr ");
    }


    ref.putEnumerated(typeID, charIDToTypeID("Ordn"), charIDToTypeID("Trgt"));
}

Kinase.REF_LayerID = function (ref, layerID, classString)
{
    if (classString != undefined)
    {
        var typeID = stringIDToTypeID(classString);
    } else
    {
        var typeID = charIDToTypeID("Lyr ");
    }

    ref.putIdentifier(typeID, layerID);
}

Kinase.REF_ItemIndex = function (ref, itemIndex, classString)
{
    if (classString != undefined)
    {
        var typeID = stringIDToTypeID(classString);
    } else
    {
        var typeID = charIDToTypeID("Lyr ");
    }

    // log(itemIndex)
    // log(desiredClass)
    ref.putIndex(typeID, itemIndex);

}

/**
 * 取背景索引偏移。由于 PS 内部 index ，背景图层无论存在与否始终占用 0 位，所以在使用 itemIndex 时，背景图层存在时，需要 -1 位。
 * @returns {number}
 * @constructor
 */
Kinase.BKOffset = function ()
{
    var backgroundIndexOffset = 0;
    try
    {
        if (app.activeDocument.backgroundLayer) backgroundIndexOffset = -1;

    }
    catch (err)
    {
    }
    return backgroundIndexOffset
}

Kinase.lowerIndex = function ()
{
    var lowerIndex = 0;
    try
    {
        if (app.activeDocument.backgroundLayer) lowerIndex = 2;

    }
    catch (err)
    {
    }
    return lowerIndex
}

Kinase.upperIndex = function ()
{
    return app.activeDocument.layers[0].itemIndex;
}

var _value = function (value, defaultValue)
{
    if (value != undefined)
    {
        return value;
    } else
    {
        if (defaultValue != undefined)
        {
            return defaultValue;
        } else
        {
            return null;
        }
    }
}

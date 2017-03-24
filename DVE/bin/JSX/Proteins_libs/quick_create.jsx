/**
 * Created by bgllj on 2017/3/16.
 */
(function ()
{

    /**
     * 以现有图层为蒙版创建链接对象
     * {
     *      images:[], //图片文件地址数组
     *      maskType:"CM","CM",//蒙版类型，"CM"：剪贴蒙版，"SM"：形状蒙版或栅格蒙版
     *      linkLayer:true,//链接图层
     *      deleteOrgMask:true,//删除用来生成蒙版的原图层
     *      rasterizeLayer:false,//栅格化图层
     * }
     * @param infoObjec
     * @param envObject
     */
    Libs.quick_create_smartlink_fromShape = function (infoObjec, envObject)
    {
        if (infoObjec["images"] == undefined)
        {
            return
        }


        function _func()
        {
            var imagesPool = infoObjec["images"]
            var ids = Kinase.layer.getTargetLayersID()
            if (ids == undefined)
            {
                return 0
            }
            else if (ids.length > 1)
            {
                for (var i = 0; i < ids.length; i++)
                {
                    createOnce(ids[i], i)
                }
            } else
            {
                createOnce(ids[0], 0)
            }


            function createOnce(id, i)
            {

                Kinase.layer.selectLayer_byID(id)
                var orgName = Kinase.layer.getLayerName_byActive()
                var OldBounds = Kinase.layer.getLayerBounds(Kinase.REF_ActiveLayer, null)
                Kinase.layer.copyLayer_byActive()
                Kinase.layer.setLayerToSmart_ByActive()
                Kinase.layer.setLayerSmartInfo_ByActive({linked: true, link: imagesPool[i]})
                setBounds_byActive(OldBounds)

                if (infoObjec["maskType"] == "CM")
                {
                    Kinase.layer.createCMask_byActive()

                    if (infoObjec["linkLayer"])
                    {
                        Kinase.layer.selectMultLayers_byID([id])
                        Kinase.layer.linkLayers_ByActive()
                    }

                    if (infoObjec["rasterizeLayer"])
                    {
                        Kinase.layer.selectMultLayers_byID([id])
                        Kinase.layer.rasterizeLayer_byActive();
                        Kinase.layer.mergeLayer_byActive()
                    }

                } else if (infoObjec["maskType"] == "SM")
                {
                    var newId = Kinase.layer.getLayerIdByActive()
                    Kinase.layer.selectLayer_byID(id)

                    var type = Kinase.layer.getLayerType(Kinase.REF_ActiveLayer, null)
                    if (type.typeName == "shape")
                    {

                        setShapeMask(newId, infoObjec["deleteOrgMask"], infoObjec["rasterizeLayer"])
                    } else
                    {

                        setBitmapMask(newId, infoObjec["deleteOrgMask"], infoObjec["rasterizeLayer"])
                    }
                }

                Kinase.layer.setLayerName_byActive(orgName)

                function setBounds_byActive(OldBounds)
                {
                    var newBounds = Kinase.layer.getLayerBounds(Kinase.REF_ActiveLayer, null)

                    if (newBounds.h < newBounds.w)
                    {
                        var newH = OldBounds.h
                        var ratio = newH / newBounds.h
                        var newW = newBounds.w * ratio
                    } else
                    {
                        var newW = OldBounds.w
                        var ratio = newW / newBounds.w
                        var newH = newBounds.h * ratio
                    }


                    var newX = (OldBounds.x + OldBounds.w / 2) - newW / 2
                    var newY = (OldBounds.y + OldBounds.h / 2) - newH / 2

                    Kinase.layer.setLayerBounds_byActive({x: newX, y: newY, h: newH, w: newW})
                }
            }


        }

        Proteins.doCon(_func, "从现有图层创建链接对象", false)
    }


    /**
     *  创建矢量蒙版
     * @param targetLayerId
     * @param deleteOrgMask
     */
    function setShapeMask(targetLayerId, deleteOrgMask, rasterizeLayer)
    {
        //创建当前形状的路径，并重命名，作为临时路径
        var orgId = Kinase.layer.getLayerIdByActive()
        var adOb_createPath = {
            "null": {
                "value": {
                    "container": {"container": {}},
                    "form": "ReferenceFormType.CLASSTYPE",
                    "desiredClass": "path"
                }, "type": "DescValueType.REFERENCETYPE"
            },
            "from": {
                "value": {
                    "container": {
                        "container": {"container": {}},
                        "form": "ReferenceFormType.ENUMERATED",
                        "desiredClass": "layer",
                        "enumeratedType": "ordinal",
                        "enumeratedValue": "targetEnum"
                    },
                    "form": "ReferenceFormType.ENUMERATED",
                    "desiredClass": "path",
                    "enumeratedType": "path",
                    "enumeratedValue": "vectorMask"
                }, "type": "DescValueType.REFERENCETYPE"
            },
            "duplicate": {"value": true, "type": "DescValueType.BOOLEANTYPE"}
        }
        mu.executeActionObjcet(charIDToTypeID("Mk  "), adOb_createPath)
        renamePathitem_ByActive("_UIDNA_TEMP_VM_ONCE_")

        //删除形状图层
        if (deleteOrgMask)
        {
            Kinase.layer.deleteLayer_ByActive()
        }

        //选中目标图层
        Kinase.layer.selectLayer_byID(targetLayerId)

        //创建矢量蒙版
        var adOb_createShapeMask = {
            "null": {
                "value": {
                    "container": {"container": {}},
                    "form": "ReferenceFormType.CLASSTYPE",
                    "desiredClass": "path"
                }, "type": "DescValueType.REFERENCETYPE"
            },
            "at": {
                "value": {
                    "container": {"container": {}},
                    "form": "ReferenceFormType.ENUMERATED",
                    "desiredClass": "path",
                    "enumeratedType": "path",
                    "enumeratedValue": "vectorMask"
                }, "type": "DescValueType.REFERENCETYPE"
            },
            "using": {
                "value": {
                    "container": {"container": {}},
                    "form": "ReferenceFormType.ENUMERATED",
                    "desiredClass": "path",
                    "enumeratedType": "ordinal",
                    "enumeratedValue": "targetEnum"
                }, "type": "DescValueType.REFERENCETYPE"
            }
        }
        mu.executeActionObjcet(charIDToTypeID("Mk  "), adOb_createShapeMask)

        //选中临时路径
        var vp_name = "_UIDNA_TEMP_VM_ONCE_";
        var adOb_selectLayer = {
            "null": {
                "value": {
                    "container": {"container": {}},
                    "form": "ReferenceFormType.NAME",
                    "desiredClass": "path",
                    "name": vp_name,
                }, "type": "DescValueType.REFERENCETYPE"
            }
        }
        mu.executeActionObjcet(charIDToTypeID("slct"), adOb_selectLayer)

        //删除临时路径
        var adOb_deleteVP = {
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
        mu.executeActionObjcet(charIDToTypeID("Dlt "), adOb_deleteVP)


        //栅格化图层
        if (rasterizeLayer)
        {
            Kinase.layer.rasterizeLayer_byActive();
            Kinase.layer.applyMask_byActive();
        }
    }


    function setBitmapMask(targetLayerId, deleteOrgMask, rasterizeLayer)
    {
        Kinase.selection.createSelection_byActive()

        if (deleteOrgMask)
        {
            Kinase.layer.deleteLayer_ByActive()
        }

        Kinase.layer.selectLayer_byID(targetLayerId)

        Kinase.layer.createMask_byActive()

        if (rasterizeLayer)
        {
            Kinase.layer.rasterizeLayer_byActive();
            Kinase.layer.applyMask_byActive();
        }


    }

    function renamePathitem_ByActive(name)
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
            }, "to": {"value": name, "type": "DescValueType.STRINGTYPE"}
        }

        mu.executeActionObjcet(charIDToTypeID("Rnm "), adOb)

    }

    // Libs.quick_text_textTableToCsvArr= function (infoObjec, envObject)
    // {
    //
    //     if(infoObjec["textTable"] == undefined)
    //     {
    //         return
    //     }
    //
    //
    //     var textTable = infoObjec["textTable"]
    //     var csvArr  =[]
    //     for (var r = 0; r < textTable.length; r++)
    //     {
    //         var row = []
    //         for (var c = 0; c < textTable[r].length; c++)
    //         {
    //             var text = ""
    //             if (textTable[r][c].text != undefined )
    //             {
    //                 text = textTable[r][c].text
    //             }
    //             row.push(text)
    //         }
    //         csvArr.push(row)
    //     }
    //
    //     return csvArr
    // }


})()







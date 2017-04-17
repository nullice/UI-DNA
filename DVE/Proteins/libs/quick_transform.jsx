/**
 * Created by bgllj on 2017/3/16.
 */
(function ()
{

    /**
     * 变换平面角度
     * {
     * angleIndex：0,//0：left, 1:right
     *
     * }
     *
     * @param infoObjec
     * @param envObject
     * @returns {number}
     */
    Libs.quick_transform_anglePanel = function (infoObjec, envObject)
    {

        var adOb_left = {
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
                        "value": {"doubleType": "pixelsUnit", "doubleValue": -144.996879664274},
                        "type": "DescValueType.UNITDOUBLE"
                    },
                    "vertical": {
                        "value": {"doubleType": "pixelsUnit", "doubleValue": 0.51665625808567},
                        "type": "DescValueType.UNITDOUBLE"
                    }
                }, "type": "DescValueType.OBJECTTYPE", "objectType": "offset"
            },
            "width": {
                "value": {"doubleType": "percentUnit", "doubleValue": 105.772267621547},
                "type": "DescValueType.UNITDOUBLE"
            },
            "height": {
                "value": {"doubleType": "percentUnit", "doubleValue": 90.3938114243487},
                "type": "DescValueType.UNITDOUBLE"
            },
            "skew": {
                "value": {
                    "horizontal": {
                        "value": {"doubleType": "angleUnit", "doubleValue": 35.2338657258402},
                        "type": "DescValueType.UNITDOUBLE"
                    },
                    "vertical": {
                        "value": {"doubleType": "angleUnit", "doubleValue": 0},
                        "type": "DescValueType.UNITDOUBLE"
                    }
                }, "type": "DescValueType.OBJECTTYPE", "objectType": "paint"
            },
            "angle": {
                "value": {"doubleType": "angleUnit", "doubleValue": -24.8815451058607},
                "type": "DescValueType.UNITDOUBLE"
            },
            "interfaceIconFrameDimmed": {
                "value": {
                    "enumerationType": "interpolationType",
                    "enumerationValue": "bicubic"
                }, "type": "DescValueType.ENUMERATEDTYPE"
            }
        }
        var adOb_rigth =
            {
                "null": {
                    "value": {
                        "container": {"container": {}},
                        "form": "ReferenceFormType.ENUMERATED",
                        "desiredClass": "path",
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
                            "value": {
                                "doubleType": "pixelsUnit",
                                "doubleValue": 151.797439596545
                            }, "type": "DescValueType.UNITDOUBLE"
                        },
                        "vertical": {
                            "value": {"doubleType": "pixelsUnit", "doubleValue": -0.11627233685189},
                            "type": "DescValueType.UNITDOUBLE"
                        }
                    }, "type": "DescValueType.OBJECTTYPE", "objectType": "offset"
                },
                "width": {
                    "value": {"doubleType": "percentUnit", "doubleValue": 111.23302982717},
                    "type": "DescValueType.UNITDOUBLE"
                },
                "height": {
                    "value": {"doubleType": "percentUnit", "doubleValue": 86.7275907201129},
                    "type": "DescValueType.UNITDOUBLE"
                },
                "skew": {
                    "value": {
                        "horizontal": {
                            "value": {
                                "doubleType": "angleUnit",
                                "doubleValue": -35.2515829509307
                            }, "type": "DescValueType.UNITDOUBLE"
                        },
                        "vertical": {
                            "value": {"doubleType": "angleUnit", "doubleValue": 0},
                            "type": "DescValueType.UNITDOUBLE"
                        }
                    }, "type": "DescValueType.OBJECTTYPE", "objectType": "paint"
                },
                "angle": {
                    "value": {"doubleType": "angleUnit", "doubleValue": 29.8563909888917},
                    "type": "DescValueType.UNITDOUBLE"
                }
            }


        function _func()
        {

            var ids = Kinase.layer.getTargetLayersID()
            if (ids == undefined)
            {
                return 0
            } else if (ids.length > 1)
            {
                for (var i = 0; i < ids.length; i++)
                {
                    Kinase.layer.selectLayer_byID(ids[i])
                    angleOnce()
                }
            } else
            {
                angleOnce()
            }


            function angleOnce()
            {
                var orgBounds = Kinase.layer.getLayersRange(Kinase.layer.getTargetLayersID())
                if (infoObjec["angleIndex"] == 1)
                {
                    var ad = adOb_rigth;
                } else
                {
                    var ad = adOb_left;
                }
                mu.executeActionObjcet(stringIDToTypeID("transform"), ad)

                var newBounds = Kinase.layer.getLayersRange(Kinase.layer.getTargetLayersID())


                Kinase.layer.setLayerBounds_byActive({
                    x: orgBounds.x + (orgBounds.w / 2) - (newBounds.w / 2)
                })
            }

        }

        Proteins.doCon(_func, "平面角度", true)
        return 0
    }

    /**
     * 缩放图层
     * @param infoObjec {scale:2}
     * @param envObject
     */
    Libs.quick_transform_scale = function (infoObjec, envObject)
    {

        function _func()
        {
            var ids = Kinase.layer.getTargetLayersID()
            if (ids == undefined)
            {
                return 0
            } else if (ids.length > 1)
            {
                for (var i = 0; i < ids.length; i++)
                {
                    Kinase.layer.selectLayer_byID(ids[i])
                    scaleOnce()
                }
            } else
            {
                scaleOnce()
            }

            function scaleOnce()
            {
                Kinase.layer.setLayerBounds_byActive({
                    w: infoObjec.scale + "x",
                    h: infoObjec.scale + "x",
                    centerState: 8
                })

                if (infoObjec.scaleEffect)
                {
                    scaleEffect(infoObjec.scale)
                }
            }

            function scaleEffect(scale)
            {
                try
                {
                    var ad = new ActionDescriptor();
                    ad.putUnitDouble(charIDToTypeID("Scl "), charIDToTypeID("#Prc"), (+scale) * 100);
                    executeAction(stringIDToTypeID("scaleEffectsEvent"), ad, DialogModes.NO);
                } catch (e)
                {
                    $.writeln("  Libs.quick_transform_scale scaleEffect",e)
                }
            }

        }


        Proteins.doCon(_func, "缩放", true)
    }


    Libs.quick_transform_rotation = function (infoObjec, envObject)
    {

        function _func()
        {
            var ids = Kinase.layer.getTargetLayersID()
            if (ids == undefined)
            {
                return 0
            } else if (ids.length > 1)
            {
                for (var i = 0; i < ids.length; i++)
                {
                    Kinase.layer.selectLayer_byID(ids[i])
                    rotationOnce()
                }
            } else
            {
                rotationOnce()
            }

            function rotationOnce()
            {
                Kinase.layer.rotationLayer_byActive({
                    angle: infoObjec.angle || 0,
                    centerState: infoObjec.centerState,

                })
            }


        }


        Proteins.doCon(_func, "旋转", false)

    }


})()







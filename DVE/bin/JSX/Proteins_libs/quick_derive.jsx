/**
 * Created by bgllj on 2017/3/16.
 */
(function ()
{


    /**
     * 派生 矩阵
     * {
 *      col:3, //列数
 *      row:2, //行数
 *      dX:50, //x 间距
 *      dX:50, //y 间距
 *      rename:0,1,2//0:photoshop 默认 1: “xx-1” ~"xx-99"‘；2："xx-1-1"~ "xx-2-4"
 * }
     * @param infoObjec
     * @param envObject
     * @returns {number}
     */
    Libs.quick_derive_matrix = function (infoObjec, envObject)
    {

        if (infoObjec == undefined)
        {
            return;
        }

        var newIds = [];
        var col = 1;
        var row = 1;


        if (infoObjec.col != undefined && infoObjec.col > 0)
        {
            col = infoObjec.col;
        }

        if (infoObjec.row != undefined && infoObjec.row > 0)
        {
            row = infoObjec.row;
        }

        var len = row * col


        var ids = Kinase.layer.getTargetLayersID()
        if (ids == undefined || ids.length === 0)
        {
            return 0;
        } else if (ids.length == 1)
        {
            var bounds = Kinase.layer.getLayerBounds(Kinase.REF_ActiveLayer, null)
            var orgX = bounds.w
            var orgY = bounds.h


        } else
        {
            var bounds = Kinase.layer.getLayersRange(ids)
            var orgX = bounds.w
            var orgY = bounds.h
        }


        function _func()
        {
            if (infoObjec.rename != undefined && infoObjec.rename > 0)
            {
                var orgName = Kinase.layer.getLayerName_byActive()

                if (+infoObjec.rename == 1)
                {
                    Kinase.layer.setLayerName_byActive(orgName + " -1")
                } else if (+infoObjec.rename == 2)
                {
                    Kinase.layer.setLayerName_byActive(orgName + " -1-1")
                }

            }

            var offset = {x: infoObjec.dX + orgX, y: 0}
            var time = 0
            for (var r = 0; r < row; r++)
            {
                for (var c = 0; c < col; c++)
                {
                    time++;
                    if (r == 0 && c == 0)
                    {
                        continue;
                    }

                    if (c > 0)
                    {
                        var offset = {x: infoObjec.dX + orgX, y: 0}
                    }

                    var ids = Kinase.layer.copyLayer_byActive()
                    newIds.push(ids)
                    Kinase.layer.moveLayerXY(Kinase.REF_ActiveLayer, null, offset)
                    if (infoObjec.rename != undefined && +infoObjec.rename == 1)
                    {
                        Kinase.layer.setLayerName_byActive(orgName + " -" + time)

                    } else if (infoObjec.rename != undefined && +infoObjec.rename == 2)
                    {
                        Kinase.layer.setLayerName_byActive(orgName + " -" + (r + 1) + "-" + (c + 1))
                    }

                }
                // $.writeln("r::::" + -(infoObjec.dX * (col - 1))+","+infoObjec.dY)
                // $.writeln("r::::" + -(infoObjec.dX * (col - 1))+","+infoObjec.dY)
                var offset = {x: -((infoObjec.dX + orgX) * (col - 1 )), y: infoObjec.dY + orgY}

            }
        }

        Proteins.doCon(_func, " 派生阵列", false)
        return newIds
    }

    /**
     * 派生镜像
     * {
 * direction:0,//水平镜像，垂直镜像
 * }
     * @returns {number}
     */
    Libs.quick_derive_mirror = function (infoObjec, envObject)
    {
        function _func()
        {
            var ids = Kinase.layer.getTargetLayersID()
            if (ids == undefined || ids.length === 0)
            {
                return 0;
            } else if (ids.length == 1)
            {
                var bounds = Kinase.layer.getLayerBounds(Kinase.REF_ActiveLayer, null)
                var selectW = bounds.w
                var selectH = bounds.h


            } else
            {
                var bounds = Kinase.layer.getLayersRange(ids)
                var selectW = bounds.w
                var selectH = bounds.h
            }

            if (infoObjec.direction != undefined && (infoObjec.direction == 1))
            {//垂直
                var offset = {x: 0, y: selectH}

            } else
            {//水平
                var offset = {x: selectW, y: 0}
            }


            Kinase.layer.copyLayer_byActive()
            Kinase.layer.mirrorLayer_byActive(infoObjec.direction)
            Kinase.layer.moveLayerXY(Kinase.REF_ActiveLayer, null, offset)
        }

        Proteins.doCon(_func, "派生镜像", false)
        return 0

    }


    var EFFECT_longShadow_gradient = {
        "value": {
            "scale": {
                "value": {
                    "doubleType": "percentUnit",
                    "doubleValue": 100
                },
                "type": "DescValueType.UNITDOUBLE"
            },
            "gradientFill": {
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
                                "value": "$$$/DefaultGradient/ForegroundToTransparent=Foreground to Transparent",
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
                                            "type": {
                                                "value": {
                                                    "enumerationType": "colorStopType",
                                                    "enumerationValue": "userStop"
                                                },
                                                "type": "DescValueType.ENUMERATEDTYPE"
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
                                        "objectType": "colorStop"
                                    },
                                    "1": {
                                        "value": {
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
                                                    "doubleValue": 0
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
                            "doubleValue": -45
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
                        "value": true,
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
                            "doubleValue": 100
                        },
                        "type": "DescValueType.UNITDOUBLE"
                    },
                    "offset": {
                        "value": {
                            "horizontal": {
                                "value": {
                                    "doubleType": "percentUnit",
                                    "doubleValue": 0
                                },
                                "type": "DescValueType.UNITDOUBLE"
                            },
                            "vertical": {
                                "value": {
                                    "doubleType": "percentUnit",
                                    "doubleValue": 0
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
            },
        },
        "type": "DescValueType.OBJECTTYPE",
        "objectType": "null"
    }
    var EFFECT_3D_depth_bottom = {
        "value": {
            "scale": {
                "value": {
                    "doubleType": "percentUnit",
                    "doubleValue": 100
                },
                "type": "DescValueType.UNITDOUBLE"
            },


            "bevelEmboss": {
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
                            "enumerationValue": "multiply"
                        },
                        "type": "DescValueType.ENUMERATEDTYPE"
                    },
                    "highlightColor": {
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
                    "highlightOpacity": {
                        "value": {
                            "doubleType": "percentUnit",
                            "doubleValue": 0
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
                        "value": false,
                        "type": "DescValueType.BOOLEANTYPE"
                    },
                    "localLightingAngle": {
                        "value": {
                            "doubleType": "angleUnit",
                            "doubleValue": 0
                        },
                        "type": "DescValueType.UNITDOUBLE"
                    },
                    "localLightingAltitude": {
                        "value": {
                            "doubleType": "angleUnit",
                            "doubleValue": 10
                        },
                        "type": "DescValueType.UNITDOUBLE"
                    },
                    "strengthRatio": {
                        "value": {
                            "doubleType": "percentUnit",
                            "doubleValue": 1000
                        },
                        "type": "DescValueType.UNITDOUBLE"
                    },
                    "blur": {
                        "value": {
                            "doubleType": "pixelsUnit",
                            "doubleValue": 2
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
                                "value": "Linear",
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
                    "antialiasGloss": {
                        "value": true,
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
                        "value": false,
                        "type": "DescValueType.BOOLEANTYPE"
                    },
                    "useTexture": {
                        "value": false,
                        "type": "DescValueType.BOOLEANTYPE"
                    }
                },
                "type": "DescValueType.OBJECTTYPE",
                "objectType": "bevelEmboss"
            },

        },
        "type": "DescValueType.OBJECTTYPE",
        "objectType": "null"
    }
    var EFFECT_3D_depth_top = {
        "value": {
            "scale": {
                "value": {
                    "doubleType": "percentUnit",
                    "doubleValue": 100
                },
                "type": "DescValueType.UNITDOUBLE"
            },

            "bevelEmboss": {
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
                            "enumerationValue": "multiply"
                        },
                        "type": "DescValueType.ENUMERATEDTYPE"
                    },
                    "highlightColor": {
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
                    "highlightOpacity": {
                        "value": {
                            "doubleType": "percentUnit",
                            "doubleValue": 0
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
                            "doubleValue": 25
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
                        "value": false,
                        "type": "DescValueType.BOOLEANTYPE"
                    },
                    "localLightingAngle": {
                        "value": {
                            "doubleType": "angleUnit",
                            "doubleValue": 180
                        },
                        "type": "DescValueType.UNITDOUBLE"
                    },
                    "localLightingAltitude": {
                        "value": {
                            "doubleType": "angleUnit",
                            "doubleValue": 10
                        },
                        "type": "DescValueType.UNITDOUBLE"
                    },
                    "strengthRatio": {
                        "value": {
                            "doubleType": "percentUnit",
                            "doubleValue": 1000
                        },
                        "type": "DescValueType.UNITDOUBLE"
                    },
                    "blur": {
                        "value": {
                            "doubleType": "pixelsUnit",
                            "doubleValue": 2
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
                                "value": "Linear",
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
                        "value": false,
                        "type": "DescValueType.BOOLEANTYPE"
                    },
                    "useTexture": {
                        "value": false,
                        "type": "DescValueType.BOOLEANTYPE"
                    }
                },
                "type": "DescValueType.OBJECTTYPE",
                "objectType": "bevelEmboss"
            }
        },
        "type": "DescValueType.OBJECTTYPE",
        "objectType": "null"
    }


    /**
     * 派生长阴影
     * {
 *      notRezShape:false,//不栅格化图层
 *      angle:135, //阴影角度
 *      length:10, //阴影长度
 *      opacity:89,//阴影不透明度
 *      effect:true,//样式
 *      stepByStep:false,//逐步产生阴影
 *      initOpacity:100,//逐步产生阴影-起始不透明度
 *
 *
 * }
     * @param infoObjec
     * @param envObject
     * @returns {number}
     */
    Libs.quick_derive_longShadow = function (infoObjec, envObject)
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
                    execOnceLayer(ids[i])
                }
            } else
            {
                execOnceLayer(ids[0])
            }


            function execOnceLayer(id)
            {

                var count = 0
                var notRezShape = false;//不栅格化
                if (infoObjec['notRezShape'])
                {
                    notRezShape = true
                }
                var setOpacity = false;
                if (infoObjec['opacity'] != undefined && infoObjec['opacity'] < 100)
                {
                    setOpacity = true
                }


                var orgItemIndex = Kinase.layer.getItemIndexBylayerID(id)
                var orgName = Kinase.layer.getLayerName_byActive()

                var len = infoObjec['length'] || 3;


                var offset = {x: 1, y: 1}
                offset = setOffsetByAngle(infoObjec.angle || 0, offset)

                $.writeln("offset: " + json(offset))
                var orgOffset = {
                    x: offset.x,
                    y: offset.y,
                }
                var stepLengt = 1

                if (infoObjec['stepByStep'])//逐步完成
                {
                    doEvery()
                } else
                {
                    doFastSample()
                }

                if (orgName == undefined)
                {
                    orgName = Kinase.layer.getLayerName_byActive()
                }
                Kinase.layer.setLayerName_byActive("_" + orgName + "[" + infoObjec['angle'] + "°]")

                if (infoObjec["effect"])
                {
                    EFFECT_longShadow_gradient.value.gradientFill.value.angle.value.doubleValue = +infoObjec.angle
                    Kinase.layer.removeLayerEffects_byActive()
                    Kinase.layer.setLayerEffectsObject(EFFECT_longShadow_gradient, Kinase.REF_ActiveLayer, null)
                    Kinase.layer.setAppearance_byActive({
                        fillOpacity: 0,
                        opacity: 25,
                    })
                }

                function doEvery()
                {
                    var newIds = []
                    for (var i = 0; i < len; i++)
                    {
                        var ids = stepOnce()
                        for (var x in ids)
                        {
                            newIds.push(ids[x])
                        }
                    }

                    Kinase.layer.selectLoad(newIds)
                    Kinase.layer.mergeLayer_byActive()
                    if (notRezShape != true)
                    {
                        Kinase.layer.rasterizeLayer_byActive()
                    }

                }

                function doFastSample()
                {
                    if (len < 3)
                    {
                        doEvery();
                        return 0;
                    }

                    var newQueueIds = []

                    var id = stepQueue(3)
                    newQueueIds.push(id)
                    for (var i = 0; (count + stepLengt ) < len; i++)
                    {
                        id = stepQueue(3)
                        newQueueIds.push(id)
                    }

                    offset.x = orgOffset.x * (len - count)
                    offset.y = orgOffset.y * (len - count)
                    stepLengt = (len - count)
                    // $.writeln(" -stepLengt:" + stepLengt)
                    var ids = stepOnce()
                    for (var x in ids)
                    {
                        newQueueIds.push(ids[x])
                    }
                    Kinase.layer.selectLoad(newQueueIds)
                    Kinase.layer.mergeLayer_byActive()
                    if (notRezShape != true)
                    {
                        Kinase.layer.rasterizeLayer_byActive()
                    }

                    if (setOpacity)
                    {
                        Kinase.layer.setAppearance_byActive({opacity: infoObjec['opacity']});
                    }
                }

                function setOffsetByAngle(angle, offset)
                {
                    var des = EnzJSX._psShadow2CssShadow(angle, 1, 9, 9)
                    // $.writeln(" -des:" + json(des))


                    offset.x = des.x;
                    offset.y = des.y;

                    if (des.x == 0)
                    {
                        return offset
                    }
                    return normalize(offset)

                    function normalize(offset)
                    {
                        if (offset.x == 0)
                        {
                            offset.x = 1;
                        }
                        var ratio = Math.abs(1 / offset.x);


                        offset.x = offset.x < 0 ? -1 : 1;

                        offset.y = offset.y * ratio


                        return offset
                    }

                }

                function stepOnce()
                {
                    count += stepLengt;
                    var ids = Kinase.layer.copyLayer_byActive()
                    Kinase.layer.moveLayerXY(Kinase.REF_ActiveLayer, null, offset)
                    Kinase.layer.moveActiveLayerOrder(orgItemIndex)
                    if (notRezShape != true)
                    {
                        Kinase.layer.rasterizeLayer_byActive()
                    }
                    if (infoObjec['stepByStep'] && infoObjec['initOpacity'] < 100)
                    {
                        var initOpacity = 100;
                        if (infoObjec['initOpacity'] != undefined && infoObjec['initOpacity'] > 0)
                        {
                            initOpacity = infoObjec['initOpacity'];
                        }

                        Kinase.layer.setAppearance_byActive({opacity: initOpacity * (1 - (count / len))})
                    }

                    return ids
                }


                function stepQueue(length)
                {
                    var newIds = []
                    for (var i = 0; i < ( length || 5); i++)
                    {
                        var ids = stepOnce()

                        for (var x in ids)
                        {
                            newIds.push(ids[x])
                        }
                    }

                    Kinase.layer.selectLoad(newIds)
                    Kinase.layer.mergeLayer_byActive()
                    offset.x = offset.x * length;
                    offset.y = offset.y * length
                    stepLengt = stepLengt * length
                    // $.writeln(" -stepLengt:" + stepLengt)
                    return Kinase.layer.getLayerIdByActive()
                }

                // $.writeln("stepLengt:" + stepLengt)
            }


        }


        Proteins.doCon(_func, "派生长阴影", false)

        return 0
    }


    /**
     * 派生厚度层
     * {
     *      angle:90, //角度
     *      length:20, //厚度
     *      bevelDirection:0,//斜面方向 0:in 1:stampOut
     *      bottomShadowOpacity:25,//下部阴影不透明度
     *      topShadowOpacity:25,//上部阴影不透明度
     *      smooth:true,//表面平滑
     *
     *
     * }
     */
    Libs.quick_derive_3Ddepth = function (infoObjec, envObject)
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
                    execOnceLayer(ids[i])
                }
            } else
            {
                execOnceLayer(ids[0])
            }


            function execOnceLayer(id)
            {

                var count = 0
                var orgItemIndex = Kinase.layer.getItemIndexBylayerID(id)
                var orgName = Kinase.layer.getLayerName_byActive()

                var newIds = []
                var ids = Kinase.layer.copyLayer_byActive()
                Kinase.layer.removeLayerEffects_byActive()

                if (infoObjec["bevelDirection"] == "stampOut")
                {
                    var bevelDirection = "stampOut"
                } else
                {
                    var bevelDirection = "in"
                }

                EFFECT_3D_depth_bottom.value.bevelEmboss.value.bevelDirection.value.enumerationValue = bevelDirection;
                EFFECT_3D_depth_bottom.value.bevelEmboss.value.shadowOpacity.value.doubleValue = +(infoObjec["bottomShadowOpacity"] || 25);
                Kinase.layer.setLayerEffectsObject(EFFECT_3D_depth_bottom, Kinase.REF_ActiveLayer, null)
                if (ids.length > 0) newIds.push(ids[0]);

                ids = Kinase.layer.copyLayer_byActive()
                Kinase.layer.removeLayerEffects_byActive()

                EFFECT_3D_depth_top.value.bevelEmboss.value.bevelDirection.value.enumerationValue = bevelDirection;
                EFFECT_3D_depth_top.value.bevelEmboss.value.shadowOpacity.value.doubleValue = +(infoObjec["topShadowOpacity"] || 50);
                Kinase.layer.setLayerEffectsObject(EFFECT_3D_depth_top, Kinase.REF_ActiveLayer, null)
                Kinase.layer.setAppearance_byActive({
                    fillOpacity: 0,
                    opacity: 100,
                })
                if (ids.length > 0) newIds.push(ids[0]);

                Kinase.layer.selectLoad(newIds)
                Kinase.layer.mergeLayer_byActive()


                Kinase.layer.moveActiveLayerOrder(orgItemIndex)
                var tempIds = [Kinase.layer.getLayerIdByActive()]
                Libs.quick_derive_longShadow({
                    "notRezShape": false,
                    "angle": _value(infoObjec["angle"], 90),
                    "length": _value(infoObjec["length"], 20),
                    "effect": false,
                    "opacity": "100",
                    "stepByStep": false,
                    "initOpacity": 95
                })
                Kinase.layer.moveActiveLayerOrder(orgItemIndex)
                tempIds.push(Kinase.layer.getLayerIdByActive())
                Kinase.layer.selectLoad(tempIds)
                Kinase.layer.mergeLayer_byActive()

                if (infoObjec["smooth"])
                {
                    Kinase.layer.loadSelection_byActive()
                    surfaceBlur();
                    Kinase.layer.cancelSelection_byActive()
                }

                Kinase.layer.setLayerName_byActive("_" + orgName + "[" + infoObjec["length"] + "dp]")


                // function stepOnce()
                // {
                //     count += stepLengt;
                //     var ids = Kinase.layer.copyLayer_byActive()
                //     Kinase.layer.moveLayerXY(Kinase.REF_ActiveLayer, null, offset)
                //     Kinase.layer.moveActiveLayerOrder(orgItemIndex)
                //
                //     return ids
                // }

            }


        }


        Proteins.doCon(_func, "派生3D厚度", false)

        return
    }


    function surfaceBlur(radius, threshold)
    {
        if (radius === undefined)
        {
            radius = 32
        }

        if (threshold === undefined)
        {
            threshold = 24
        }

        var ad = new ActionDescriptor();
        ad.putUnitDouble(charIDToTypeID("Rds "), charIDToTypeID("#Pxl"), radius);
        ad.putInteger(charIDToTypeID("Thsh"), threshold);
        executeAction(stringIDToTypeID("surfaceBlur"), ad, DialogModes.NO);
    }
})()







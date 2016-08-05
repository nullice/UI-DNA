/**
 * Created by bgllj on 2016/7/12.
 */
$.evalFile(File($.fileName).path + "/test.jsx")


var adOb=
{
    "null": {
        "value": {
            "container": {
                "container": {
                }
            },
            "form": "ReferenceFormType.INDEX",
            "desiredClass": "textLayer",
            "index": 3
        },
        "type": "DescValueType.REFERENCETYPE"
    },
    "to": {
        "value": {
            

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
                                        "value": 98.780998,
                                        "type": "DescValueType.DOUBLETYPE"
                                    },
                                    "right": {
                                        "value": 197.687088,
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


        },
        "type": "DescValueType.OBJECTTYPE",
        "objectType": "textLayer"
    }
}




mu.executeActionObjcet(charIDToTypeID( "setd" ),adOb)
// log(json(arr))


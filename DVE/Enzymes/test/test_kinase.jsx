/**
 * Created by bgllj on 2016/7/10.
 */
$.evalFile(File($.fileName).path + "/test.jsx")

log(json(ki.layer.getLayerInfoObject_byActiveLayer()))
logSave();


var ob = {
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
                    "doubleValue": 352
                },
                "type": "DescValueType.UNITDOUBLE"
            },
            "left": {
                "value": {
                    "doubleType": "pixelsUnit",
                    "doubleValue": 840
                },
                "type": "DescValueType.UNITDOUBLE"
            },
            "bottom": {
                "value": {
                    "doubleType": "pixelsUnit",
                    "doubleValue": 552
                },
                "type": "DescValueType.UNITDOUBLE"
            },
            "right": {
                "value": {
                    "doubleType": "pixelsUnit",
                    "doubleValue": 944
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


executeAction(idsetd, desc1270, DialogModes.NO);
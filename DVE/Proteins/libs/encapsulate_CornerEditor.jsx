/**
 * Created by bgllj on 2017/3/9.
 */



/*
 这个脚本是对 David Jensen 的 Corner Editor 脚本的封装
 * The original author of the script is David Jensen
 * this is only a encapsulate script.
 * */

/////////////////////////////////
// Photoshop Corner Editor 1.0.6
// by David Jensen
//
// http://photoshopscripts.wordpress.com/
//

/**
 * 组合路径组件
 *  {
 *              radiiTxt:"21", //圆角参数文本
                cornerType: 0,//= 0Round;  1Inverse; 2Chamfer;  3Inset
                cornerMethod: 0,//0 Radius 模式, 1 Adobe 模式
                editable: false, // Save Original Corners
                selectedLayers:[]//当前选中图层 itemIndex 数组，提供这个能提高速度
            }
 * @param infoObjec
 * @param envObject
 * @returns {*}
 */
Libs.encapsulate_cornerEditor_do = function (infoObjec, envObject)
{
    function _func0()
    {
        var oldTool = app.currentTool
        app.currentTool="pathComponentSelectTool"
        func()
        app.currentTool=oldTool
        function func()
        {


            var docRef = activeDocument;
            if (infoObjec.selectedLayers != undefined)
            {
                var  selectedLayers = infoObjec.selectedLayers
            } else
            {
                var  selectedLayers = getSelectedLayersIdx();
            }
            /*记录 Photoshop 原单位设置：*/
            if (app.preferences.rulerUnits != Units.PIXELS)
            {
                var unitsChanged = true;
                app.preferences.rulerUnits = Units.PIXELS;
                var originalRulerUnits = app.preferences.rulerUnits;
            }


            var res = docRef.resolution;
            if (res != 72)
            {
                docRef.resizeImage(undefined, undefined, 72, ResampleMethod.NONE);
            }
            try
            {
                main();
            } catch (e)
            {
                $.writeln("err Libs.encapsulate_cornerEditor:" + e)
            }
            /*还原 Photoshop 原单位设置：*/
            if (unitsChanged)
            {
                app.preferences.rulerUnits = originalRulerUnits;
            }
            if (res != 72) docRef.resizeImage(undefined, undefined, res, ResampleMethod.NONE);

            //--------------------------------------------------------------------------------------

            function main()
            {
                var modifierKey = false;
                if (ExternalObject.AdobeXMPScript == undefined) ExternalObject.AdobeXMPScript = new ExternalObject("lib:AdobeXMPScript");

                var vectorLayers = new Array();
                var radii = new Array();
                radii = [[5]]

                var newVersion = (parseInt(version, 10) >= 11)
                var lineArray = new Array();
                var lineSubPathArray = new Array();
                var selectedRadius = 0;
                var cornerPatternMetadata = null;
                var cornerTypeMetadata = null;
                var cornerMethodMetadata = null;
                var editable = true;

                var round = 0;
                var inverseRound = 1;
                var chamfer = 2;
                var inset = 3;
                var soft = 4;


                var cornerType = round;
                var cornerMethod = 0;
                //var hasSelectedSubPaths=false;


                for (var i = 0; i < selectedLayers.length; i++)
                {
                    makeActiveByIndex([selectedLayers[i]], false);
                    if (hasVectorMask())
                    {
                        var layerPathIdx = docRef.pathItems.length - 1;
                        vectorLayers.push(collectPathInfoFromDesc2012(docRef, docRef.pathItems[layerPathIdx]));
                        vectorLayers[vectorLayers.length - 1].layerIdx = selectedLayers[i]

                        // if (newVersion){
                        //     if(cornerPatternMetadata==null)cornerPatternMetadata = getLayerMetadata("CornerPattern");
                        //     if(cornerTypeMetadata==null)cornerTypeMetadata = getLayerMetadata("CornerType");
                        //     if(cornerMethodMetadata==null)cornerMethodMetadata = getLayerMetadata("CornerMethod");
                        // }
                    }
                }
                getSelectedSubPaths();

                //deselect Paths
                var idDslc = charIDToTypeID("Dslc");
                var desc11 = new ActionDescriptor();
                var idnull = charIDToTypeID("null");
                var ref2 = new ActionReference();
                var idPath = charIDToTypeID("Path");
                ref2.putClass(idPath);
                desc11.putReference(idnull, ref2);
                executeAction(idDslc, desc11, DialogModes.NO);


                if (vectorLayers.length == 0)
                {
                    alert("请选中形状图层路径");
                    return;
                }

                for (var i = 0; i < vectorLayers.length; i++)
                {
                    for (var j = 0; j < vectorLayers[i].length; j++)
                    {
                        getCorners(vectorLayers[i][j]);
                    }
                }


                /*---------------------------------------------------*/
                //cornerType = 0;  Round
                //cornerType = 1;  Inverse
                //cornerType = 2;  Chamfer
                //cornerType = 3;  Inset
                cornerType = infoObjec.cornerType || 0;

                // [SAVE] methodRadio.children[cornerMethod].value
                // cornerMethod = parseInt(cornerMethodMetadata)
                // cornerMethod = 0 Radius 模式
                // cornerMethod = 1 Adobe 模式
                cornerMethod = infoObjec.cornerMethod || 0;


                // Save Original Corners
                //  editable = true;
                // editable = false;

                editable = infoObjec.editable || false;


                /*
                 *
                 *
                 *
                 *
                 * */
                smooth(infoObjec.radiiTxt)

                // [SAVE] methodRadio.children[cornerMethod].value

                // if (cornerPatternMetadata != null) {
                //     dlg.radiiText.text = cornerPatternMetadata.toString();
                // }else {
                //
                // dlg.radiiText.text=existingRadius(vectorLayers[0][0]).toString()
                // }
                // if (cornerTypeMetadata != null) {
                //     cornerType = parseInt(cornerTypeMetadata)
                // }

/////////////////////////////////////////////
/////////////////////////////////////////////
//////////////////////////////////////////////

                //smooth()
                function smooth(radiiTxt)
                {

                    var rTxt = radiiTxt.toString().split(" ")
                    radii = []
                    for (var i = 0; i < rTxt.length; i++)
                    {
                        rTxt[i] = rTxt[i].split(",")
                        radii[i] = new Array()
                        for (var j = 0; j < rTxt[i].length; j++)
                        {
                            if (isNaN(parseFloat(rTxt[i][j])))
                            {
                                alert("Incorrect Radius Pattern format")
                                return;
                            }
                            radii[i][j] = parseFloat(rTxt[i][j]);
                        }
                    }
                    var extraLayer = false;

                    for (var i = 0; i < vectorLayers.length; i++)
                    {
                        //cornerType=round
                        makeActiveByIndex([vectorLayers[i].layerIdx], false)

                        if (newVersion)
                        {
                            setLayerMetadata(radiiTxt, "CornerPattern")
                            setLayerMetadata(cornerType, "CornerType")
                            setLayerMetadata(cornerMethod, "CornerMethod")
                        }

                        lineSubPathArray = []
                        selectedRadius = 0;
                        for (var j = 0; j < vectorLayers[i].length; j++)
                        {

                            lineArray = [];

                            if ((vectorLayers[0][j].selected == false) || vectorLayers[i][j].corners.length < 1)
                            {
                                recreateSubPath(vectorLayers[i][j])

                            } else
                            {

                                if (vectorLayers[i][j].closed == false)
                                {

                                    lineArray[0] = new PathPointInfo
                                    lineArray[0].kind = PointKind.CORNERPOINT
                                    lineArray[0].anchor = Array(vectorLayers[i][j][0][0][0], vectorLayers[i][j][0][0][1])
                                    lineArray[0].rightDirection = lineArray[0].anchor
                                    lineArray[0].leftDirection = lineArray[0].anchor

                                }

                                roundSubpath(vectorLayers[i][j].corners, radii[selectedRadius], vectorLayers[i][j].closed)

                                selectedRadius++;
                                if (selectedRadius === radii.length) selectedRadius = 0;
                                //if (selectedRadius < radii.length - 1) selectedRadius++;
                            }

                            if (vectorLayers[i][j].closed == false)
                            {
                                lineArrayLength = lineArray.length
                                lineArray[lineArrayLength] = new PathPointInfo
                                lineArray[lineArrayLength].kind = PointKind.CORNERPOINT
                                lineArray[lineArrayLength].anchor = Array(vectorLayers[i][j][vectorLayers[i][j].length - 1][0][0], vectorLayers[i][j][vectorLayers[i][j].length - 1][0][1])
                                lineArray[lineArrayLength].rightDirection = lineArray[lineArrayLength].anchor
                                lineArray[lineArrayLength].leftDirection = lineArray[lineArrayLength].anchor

                            }
                            lineSubPathArray[j] = new SubPathInfo()
                            lineSubPathArray[j].operation = vectorLayers[i][j].operation
                            lineSubPathArray[j].closed = vectorLayers[i][j].closed
                            lineSubPathArray[j].entireSubPath = lineArray


                            //round=false;
                        }
                        replacePath()
                    }

                    deselectPath()
                    app.refresh();
                }

                function roundSubpath(corners, radii)
                {
                    var selectedRadius = 0;
                    for (var i = 0; i < corners.length; i++)
                    {
                        lineArray = lineArray.concat(fillet(corners[i][0], corners[i][1], corners[i][2], radii[selectedRadius], cornerType))
                        selectedRadius++
                        if (selectedRadius == radii.length) selectedRadius = 0;
                    }
                }

                function fillet(p0, p1, p2, radius, cornerType)
                {


                    if (radius < 0)
                    {
                        if (cornerType == round)
                        {
                            cornerType = inverseRound;
                        } else if (cornerType == inverseRound)
                        {
                            cornerType = round;
                        }

                    }
                    radius = Math.abs(radius);
                    if (cornerType == inverseRound)
                    {

                    }
                    var TWO_PI = Math.PI * 2;
                    var PI = Math.PI;
                    var HALF_PI = Math.PI / 2;
                    var KAPPA = (4.0 * ((Math.sqrt(2.0) - 1.0) / 3.0));


                    var x0 = p0[0];
                    var y0 = p0[1];
                    var x1 = p1[0];
                    var y1 = p1[1];

                    var x2 = x1;
                    var y2 = y1;
                    var x3 = p2[0];
                    var y3 = p2[1];

                    var l1xAvg = (x0 + x1);
                    var xAvg = (x0 + x1 + x2 + x3) / 4.0;
                    var yAvg = (y0 + y1 + y2 + y3) / 4.0;

                    var rise1 = y1 - y0;
                    var run1 = x1 - x0;
                    var rise2 = y3 - y2;
                    var run2 = x3 - x2;

                    var l1Angle = Math.atan2(rise1, run1);
                    var l2Angle = Math.atan2(-rise2, -run2);


                    var l2AngleTemp = l2Angle;
                    if (l2AngleTemp < l1Angle)
                    {
                        l2AngleTemp += TWO_PI;

                    }
                    var dif = l2AngleTemp - l1Angle;

                    if (dif < PI)
                    {
                        run1 = -run1;
                        run2 = -run2;
                    } else
                    {
                        rise1 = -rise1;
                        rise2 = -rise2;
                    }


                    var l1pAngle = Math.atan2(run1, rise1);

                    var ix0 = Math.cos(Math.atan2(run1, rise1)) * radius + x0;
                    var iy0 = Math.sin(Math.atan2(run1, rise1)) * radius + y0;
                    var ix1 = Math.cos(Math.atan2(run1, rise1)) * radius + x1;
                    var iy1 = Math.sin(Math.atan2(run1, rise1)) * radius + y1;

                    var l2pAngle = Math.atan2(run2, rise2);

                    var ix2 = Math.cos(Math.atan2(run2, rise2)) * radius + x2;
                    var iy2 = Math.sin(Math.atan2(run2, rise2)) * radius + y2;
                    var ix3 = Math.cos(Math.atan2(run2, rise2)) * radius + x3;
                    var iy3 = Math.sin(Math.atan2(run2, rise2)) * radius + y3;


                    var angleAverage = ((l1pAngle + l2pAngle) / 2);
                    var midDir = 0;


                    var x12 = x0 - x1;
                    var x34 = x2 - x3;
                    var y12 = y0 - y1;
                    var y34 = y2 - y3;

                    var c = x12 * y34 - y12 * x34;

                    var a = ix0 * iy1 - iy0 * ix1;
                    var b = ix2 * iy3 - iy2 * ix3;

                    var x = (a * x34 - b * x12) / c;
                    var y = (a * y34 - b * y12) / c;


                    var difference = Math.abs(l2Angle - l1Angle);
                    if (difference > PI)
                    {
                        difference = TWO_PI - difference;
                    }
                    if (dif < PI)
                    {
                        midDir = 1;
                    } else
                    {
                        midDir = -1;

                    }
                    if (Math.abs(l2Angle) < HALF_PI && Math.abs(l1Angle) <= HALF_PI)
                    {
                        angleAverage += PI;
                    }


                    if (cornerMethod == 0)
                    {
                        KAPPA = KAPPA * ((PI - (difference)) / HALF_PI);
                        if (difference < HALF_PI)
                        {
                            KAPPA /= 2
                        }
                        var line1newEndX = x - Math.cos(l1pAngle) * radius;
                        var line1newEndY = y - Math.sin(l1pAngle) * radius;
                        var line2newEndX = x - Math.cos(l2pAngle) * radius;
                        var line2newEndY = y - Math.sin(l2pAngle) * radius;
                    } else
                    {
                        var line1newEndX = x2 - Math.cos(l1Angle) * radius;
                        var line1newEndY = y2 - Math.sin(l1Angle) * radius;
                        var line2newEndX = x2 - Math.cos(l2Angle) * radius;
                        var line2newEndY = y2 - Math.sin(l2Angle) * radius;
                    }


                    var midX = x - Math.cos(angleAverage) * radius;
                    var midY = y - Math.sin(angleAverage) * radius;

                    if (cornerType == inverseRound || cornerType == inset)
                    {

                        //angleAverage+=PI
                        var l3 = l1Angle
                        l1Angle = l2Angle + PI
                        l2Angle = l3 + PI
                        var endXMid = (line1newEndX + line2newEndX) / 2
                        var endYMid = (line1newEndY + line2newEndY) / 2
                        if (cornerType == inverseRound)
                        {
                            midX = endXMid + (endXMid - midX)
                            midY = endYMid + (endYMid - midY)
                        } else
                        {
                            midX = endXMid + (endXMid - x1)
                            midY = endYMid + (endYMid - y1)


                        }

                    }


                    var handle1x = line1newEndX + Math.cos(l1Angle) * radius * KAPPA;
                    var handle1y = line1newEndY + Math.sin(l1Angle) * radius * KAPPA;

                    var handleMidInX = midX + Math.cos(angleAverage - HALF_PI * midDir) * radius * KAPPA;
                    var handleMidInY = midY + Math.sin(angleAverage - HALF_PI * midDir) * radius * KAPPA;
                    var handleMidOutX = midX + Math.cos(angleAverage + HALF_PI * midDir) * radius * KAPPA;
                    var handleMidOutY = midY + Math.sin(angleAverage + HALF_PI * midDir) * radius * KAPPA;


                    var handle2x = line2newEndX + Math.cos(l2Angle) * radius * KAPPA;
                    var handle2y = line2newEndY + Math.sin(l2Angle) * radius * KAPPA;

                    //bezier(line1newEndX, line1newEndY, handle1x, handle1y, handleMidInX, handleMidInY, midX, midY);

                    //bezier(midX, midY, handleMidOutX, handleMidOutY, handle2x, handle2y, line2newEndX, line2newEndY);

                    //line(x0,y0,line1newEndX,line1newEndY);
                    //line(line2newEndX,line2newEndY,x3,y3);

                    var lineArray = new Array();


                    anchorNumber = 0;

                    if (Math.abs(Math.abs(difference) - Math.PI) < .0001)
                    {
                    } else
                    {


                        lineArray[anchorNumber] = new PathPointInfo
                        lineArray[anchorNumber].kind = PointKind.CORNERPOINT
                        lineArray[anchorNumber].anchor = Array(line1newEndX, line1newEndY)
                        lineArray[anchorNumber].rightDirection = lineArray[anchorNumber].anchor
                        if (cornerType == chamfer || (cornerType == inset && editable == false))
                        {
                            lineArray[anchorNumber].leftDirection = lineArray[anchorNumber].anchor
                        } else
                        {
                            lineArray[anchorNumber].leftDirection = Array(handle1x, handle1y);
                        }
                        if (radius != 0)
                        {

                            //If the curve is going to cover more than 90 degrees

                            if ((difference < HALF_PI && cornerType != chamfer && cornerMethod == 0) || cornerType == inset)
                            {
                                anchorNumber++
                                lineArray[anchorNumber] = new PathPointInfo
                                lineArray[anchorNumber].kind = PointKind.CORNERPOINT
                                lineArray[anchorNumber].anchor = Array(midX, midY)
                                if (cornerType == inset)
                                {
                                    lineArray[anchorNumber].rightDirection = lineArray[anchorNumber].anchor
                                    lineArray[anchorNumber].leftDirection = lineArray[anchorNumber].anchor

                                } else
                                {
                                    lineArray[anchorNumber].rightDirection = Array(handleMidInX, handleMidInY)
                                    lineArray[anchorNumber].leftDirection = Array(handleMidOutX, handleMidOutY)
                                }
                            }


                            anchorNumber++

                            lineArray[anchorNumber] = new PathPointInfo
                            lineArray[anchorNumber].kind = PointKind.CORNERPOINT
                            lineArray[anchorNumber].anchor = Array(line2newEndX, line2newEndY)
                            if (cornerType == chamfer || (cornerType == inset && editable == false))
                            {
                                if (editable) lineArray[anchorNumber].rightDirection = Array(line1newEndX, line1newEndY)
                                else lineArray[anchorNumber].rightDirection = lineArray[anchorNumber].anchor
                            } else
                            {
                                lineArray[anchorNumber].rightDirection = Array(handle2x, handle2y)
                            }
                            lineArray[anchorNumber].leftDirection = lineArray[anchorNumber].anchor
                        }
                    }


                    return lineArray;
                }

                function collectPathInfoFromDesc2012(myDocument, thePath)
                {

                    // based of functions from xbytor’s stdlib;
                    var ref = new ActionReference();
                    for (var l = 0; l < myDocument.pathItems.length; l++)
                    {
                        var thisPath = myDocument.pathItems[l];
                        if (thisPath == thePath && thisPath.name == "Work Path")
                        {
                            ref.putProperty(cTID("Path"), cTID("WrPt"));
                        }
                        ;
                        if (thisPath == thePath && thisPath.name != "Work Path" && thisPath.kind != PathKind.VECTORMASK)
                        {
                            ref.putIndex(cTID("Path"), l + 1);
                        }
                        ;
                        if (thisPath == thePath && thisPath.kind == PathKind.VECTORMASK)
                        {
                            var idPath = charIDToTypeID("Path");
                            var idPath = charIDToTypeID("Path");
                            var idvectorMask = stringIDToTypeID("vectorMask");
                            ref.putEnumerated(idPath, idPath, idvectorMask);
                        }
                        ;
                    }
                    ;
                    var desc = app.executeActionGet(ref);
                    var pname = desc.getString(cTID('PthN'));
                    // create new array;
                    var theArray = new Array;
                    var pathComponents = desc.getObjectValue(cTID("PthC")).getList(sTID('pathComponents'));
                    // for subpathitems;
                    for (var m = 0; m < pathComponents.count; m++)
                    {
                        var listKey = pathComponents.getObjectValue(m).getList(sTID("subpathListKey"));
                        var operation1 = pathComponents.getObjectValue(m).getEnumerationValue(sTID("shapeOperation"));
                        switch (operation1)
                        {
                            case 1097098272:
                                var operation = ShapeOperation.SHAPEADD //cTID('Add ');
                                break;
                            case 1398961266:
                                var operation = ShapeOperation.SHAPESUBTRACT //cTID('Sbtr');
                                break;
                            case 1231975538:
                                var operation = ShapeOperation.SHAPEINTERSECT //cTID('Intr');
                                break;
                            default:
                                //      case 1102:
                                var operation = ShapeOperation.SHAPEXOR //ShapeOperation.SHAPEXOR;
                                break;
                        }
                        ;
                        // for subpathitem’s count;
                        for (var n = 0; n < listKey.count; n++)
                        {
                            theArray.push(new Array);
                            var points = listKey.getObjectValue(n).getList(sTID('points'));
                            try
                            {
                                var closed = listKey.getObjectValue(n).getBoolean(sTID("closedSubpath"))
                            } catch (e)
                            {
                                var closed = false
                            }
                            ;
                            // for subpathitem’s segment’s number of points;
                            for (var o = 0; o < points.count; o++)
                            {
                                var anchorObj = points.getObjectValue(o).getObjectValue(sTID("anchor"));
                                var anchor = [anchorObj.getUnitDoubleValue(sTID('horizontal')), anchorObj.getUnitDoubleValue(sTID('vertical'))];
                                var thisPoint = [anchor];
                                try
                                {
                                    var left = points.getObjectValue(o).getObjectValue(cTID("Fwd "));
                                    var leftDirection = [left.getUnitDoubleValue(sTID('horizontal')), left.getUnitDoubleValue(sTID('vertical'))];
                                    thisPoint.push(leftDirection)
                                } catch (e)
                                {
                                    thisPoint.push(anchor)
                                }
                                ;
                                try
                                {
                                    var right = points.getObjectValue(o).getObjectValue(cTID("Bwd "));
                                    var rightDirection = [right.getUnitDoubleValue(sTID('horizontal')), right.getUnitDoubleValue(sTID('vertical'))];
                                    thisPoint.push(rightDirection)
                                } catch (e)
                                {
                                    thisPoint.push(anchor)
                                }
                                ;
                                try
                                {
                                    var smoothOr = points.getObjectValue(o).getBoolean(cTID("Smoo"));
                                    thisPoint.push(smoothOr)
                                } catch (e)
                                {
                                    thisPoint.push(false)
                                }
                                ;
                                theArray[theArray.length - 1].push(thisPoint);
                            }
                            ;
                            theArray[theArray.length - 1].closed = closed;
                            theArray[theArray.length - 1].operation = operation;
                        }
                        ;
                    }
                    ;
                    // by xbytor, thanks to him;
                    function cTID(s)
                    {
                        return cTID[s] || cTID[s] = app.charIDToTypeID(s);
                    };

                    function sTID(s)
                    {
                        return sTID[s] || sTID[s] = app.stringIDToTypeID(s);
                    };
                    // reset;

                    return theArray;
                };

                function getSelectedLayersIdx()
                {
                    var selectedLayers = new Array;
                    var ref = new ActionReference();
                    ref.putEnumerated(charIDToTypeID("Dcmn"), charIDToTypeID("Ordn"), charIDToTypeID("Trgt"));
                    var desc = executeActionGet(ref);
                    if (desc.hasKey(stringIDToTypeID('targetLayers')))
                    {
                        desc = desc.getList(stringIDToTypeID('targetLayers'));
                        var c = desc.count
                        var selectedLayers = new Array();
                        for (var i = 0; i < c; i++)
                        {
                            try
                            {
                                docRef.backgroundLayer;
                                selectedLayers.push(desc.getReference(i).getIndex());
                            } catch (e)
                            {
                                selectedLayers.push(desc.getReference(i).getIndex() + 1);
                            }
                        }
                    } else
                    {
                        var ref = new ActionReference();
                        ref.putProperty(charIDToTypeID("Prpr"), charIDToTypeID("ItmI"));
                        ref.putEnumerated(charIDToTypeID("Lyr "), charIDToTypeID("Ordn"), charIDToTypeID("Trgt"));
                        try
                        {
                            docRef.backgroundLayer;
                            selectedLayers.push(executeActionGet(ref).getInteger(charIDToTypeID("ItmI")) - 1);
                        } catch (e)
                        {
                            selectedLayers.push(executeActionGet(ref).getInteger(charIDToTypeID("ItmI")));
                        }
                    }
                    return selectedLayers;
                }

                function makeActiveByIndex(idx, visible)
                {
                    for (var i = 0; i < idx.length; i++)
                    {
                        var desc = new ActionDescriptor();
                        var ref = new ActionReference();
                        ref.putIndex(charIDToTypeID("Lyr "), idx[i])
                        desc.putReference(charIDToTypeID("null"), ref);
                        if (i > 0)
                        {
                            var idselectionModifier = stringIDToTypeID("selectionModifier");
                            var idselectionModifierType = stringIDToTypeID("selectionModifierType");
                            var idaddToSelection = stringIDToTypeID("addToSelection");
                            desc.putEnumerated(idselectionModifier, idselectionModifierType, idaddToSelection);
                        }
                        desc.putBoolean(charIDToTypeID("MkVs"), visible);
                        executeAction(charIDToTypeID("slct"), desc, DialogModes.NO);
                    }
                }

                function hasVectorMask()
                {
                    var hasVectorMask = false;
                    try
                    {
                        var ref = new ActionReference();
                        var keyVectorMaskEnabled = app.stringIDToTypeID('vectorMask');
                        var keyKind = app.charIDToTypeID('Knd ');
                        ref.putEnumerated(app.charIDToTypeID('Path'), app.charIDToTypeID('Ordn'), keyVectorMaskEnabled);
                        var desc = executeActionGet(ref);
                        if (desc.hasKey(keyKind))
                        {
                            var kindValue = desc.getEnumerationValue(keyKind);
                            if (kindValue == keyVectorMaskEnabled)
                            {
                                hasVectorMask = true;
                            }
                        }
                    } catch (e)
                    {
                        hasVectorMask = false;
                    }
                    return hasVectorMask;
                };

                function getCorners(subPath)
                {
                    subPath.corners = new Array()
                    //find points that begin a straigt line segment
                    var straightSegments = new Array();
                    for (var i = 0; i < subPath.length; i++)
                    {
                        var point1 = i;
                        var point2 = (i == subPath.length - 1) ? 0 : i + 1;
                        var polen = subPath.length
                        var condition1 = subPath[point1][0].toString() == subPath[point1][1].toString();
                        var condition2 = subPath[point2][0].toString() == subPath[point2][2].toString();
                        if (condition1 && condition2)
                        {
                            straightSegments.push(i);
                        }
                    }

                    //find the four points that define the straight lines that intersect at each corner
                    //subPath.selected=true;
                    for (var i = 0; i < straightSegments.length; i++)
                    {


                        if (i === 0)
                        {
                            var pp0 = straightSegments[straightSegments.length - 1];
                            var pp1 = straightSegments[straightSegments.length - 1] + 1;

                        } else
                        {
                            var pp0 = straightSegments[i - 1];
                            var pp1 = straightSegments[i - 1] + 1;
                        }
                        var pp2 = straightSegments[i];
                        var pp3 = straightSegments[i] + 1;
                        if (pp1 == subPath.length) pp1 = 0;
                        if (pp3 == subPath.length) pp3 = 0;

                        prevPoint = [subPath[pp0][0][0], subPath[pp0][0][1]];
                        intersect = intersectionOfTwoLines(subPath[pp0][0], subPath[pp1][0], subPath[pp2][0], subPath[pp3][0])
                        if (isNaN(intersect[0]) || isNaN(intersect[1]))
                        {
                            subPath.selected = false;
                            //continue;
                        }
                        nextPoint = [subPath[pp3][0][0], subPath[pp3][0][1]];
                        subPath.corners[i] = [prevPoint, intersect, nextPoint]
                    }
                    if (subPath.closed == false)
                    {

                        subPath.corners.shift();

                        subPath.corners.pop();

                    }


                }

                function intersectionOfTwoLines(p0, p1, p2, p3)
                {
                    var x0 = p0[0];
                    var y0 = p0[1];
                    var x1 = p1[0];
                    var y1 = p1[1];

                    var x2 = p2[0];
                    var y2 = p2[1];
                    var x3 = p3[0];
                    var y3 = p3[1];

                    var x12 = x0 - x1;
                    var x34 = x2 - x3;
                    var y12 = y0 - y1;
                    var y34 = y2 - y3;

                    var c = x12 * y34 - y12 * x34;

                    var a = x0 * y1 - y0 * x1;
                    var b = x2 * y3 - y2 * x3;

                    var x = (a * x34 - b * x12) / c;
                    var y = (a * y34 - b * y12) / c;


                    return ([x, y]);
                }

                function showCount()
                {
                    var idcountAddGroup = stringIDToTypeID("countAddGroup");
                    var desc66 = new ActionDescriptor();
                    var idNm = charIDToTypeID("Nm  ");
                    desc66.putString(idNm, "CornerCount");
                    executeAction(idcountAddGroup, desc66, DialogModes.NO);

                    var idcountColor = stringIDToTypeID("countColor");
                    var desc629 = new ActionDescriptor();
                    var idRd = charIDToTypeID("Rd  ");
                    desc629.putInteger(idRd, 55);
                    var idGrn = charIDToTypeID("Grn ");
                    desc629.putInteger(idGrn, 48);
                    var idBl = charIDToTypeID("Bl  ");
                    desc629.putInteger(idBl, 246);
                    executeAction(idcountColor, desc629, DialogModes.NO);

                    // =======================================================
                    var idcountGroupFontSize = stringIDToTypeID("countGroupFontSize");
                    var desc630 = new ActionDescriptor();
                    var idSz = charIDToTypeID("Sz  ");
                    desc630.putInteger(idSz, 20);
                    executeAction(idcountGroupFontSize, desc630, DialogModes.NO);

                    for (var i = 0; i < vectorLayers[0][0].corners.length; i++)
                    {
                        var x = vectorLayers[0][0].corners[i][1][0]
                        var y = vectorLayers[0][0].corners[i][1][1]
                        docRef.countItems.add([UnitValue(x, "px"), UnitValue(y, "px")])
                    }


                }

                function clearCount()
                {
                    index = activeDocument.countItems.length - 1
                    if (index > 0)
                    {
                        // make a reference to the activeDocument
                        var ref = new ActionReference();
                        ref.putEnumerated(charIDToTypeID("Dcmn"), charIDToTypeID("Ordn"), charIDToTypeID("Trgt"));
                        // get the descriptor for the doc
                        var desc = executeActionGet(ref);
                        // get a list of count items. not sure but may be in order created not by group
                        var countList = desc.getList(stringIDToTypeID('countClass'));
                        // get the number of items in the list
                        var numberOfCounts = countList.count;
                        // for each in countList
                        groupIndex = countList.getObjectValue(index).getInteger(stringIDToTypeID('group'));

                        var idcountDeleteGroup = stringIDToTypeID("countDeleteGroup");
                        var desc249 = new ActionDescriptor();
                        var idItmI = charIDToTypeID("ItmI");
                        desc249.putInteger(idItmI, groupIndex);
                        executeAction(idcountDeleteGroup, desc249, DialogModes.NO);
                    }

                }

                function replacePath()
                {
                    try
                    {
                        var idDlt = charIDToTypeID("Dlt ");
                        var desc171 = new ActionDescriptor();
                        var idnull = charIDToTypeID("null");
                        var ref129 = new ActionReference();
                        var idPath = charIDToTypeID("Path");
                        var idPath = charIDToTypeID("Path");
                        var idvectorMask = stringIDToTypeID("vectorMask");
                        ref129.putEnumerated(idPath, idPath, idvectorMask);
                        var idLyr = charIDToTypeID("Lyr ");
                        var idOrdn = charIDToTypeID("Ordn");
                        var idTrgt = charIDToTypeID("Trgt");
                        ref129.putEnumerated(idLyr, idOrdn, idTrgt);
                        desc171.putReference(idnull, ref129);
                        executeAction(idDlt, desc171, DialogModes.NO);
                    } catch (err)
                    {
                    }
                    try
                    {
                        var idDlt = charIDToTypeID("Dlt ");
                        var desc16 = new ActionDescriptor();
                        var idnull = charIDToTypeID("null");
                        var ref7 = new ActionReference();
                        var idPath = charIDToTypeID("Path");
                        ref7.putName(idPath, "randomName");
                        desc16.putReference(idnull, ref7);
                        executeAction(idDlt, desc16, DialogModes.NO);
                    } catch (err)
                    {
                    }
                    var myPathItem = docRef.pathItems.add("randomName", lineSubPathArray);

                    var idMk = charIDToTypeID("Mk  ");
                    var desc170 = new ActionDescriptor();
                    var idnull = charIDToTypeID("null");
                    var ref126 = new ActionReference();
                    var idPath = charIDToTypeID("Path");
                    ref126.putClass(idPath);
                    desc170.putReference(idnull, ref126);
                    var idAt = charIDToTypeID("At  ");
                    var ref127 = new ActionReference();
                    var idPath = charIDToTypeID("Path");
                    var idPath = charIDToTypeID("Path");
                    var idvectorMask = stringIDToTypeID("vectorMask");
                    ref127.putEnumerated(idPath, idPath, idvectorMask);
                    desc170.putReference(idAt, ref127);
                    var idUsng = charIDToTypeID("Usng");
                    var ref128 = new ActionReference();
                    var idPath = charIDToTypeID("Path");
                    var idOrdn = charIDToTypeID("Ordn");
                    var idTrgt = charIDToTypeID("Trgt");
                    ref128.putEnumerated(idPath, idOrdn, idTrgt);
                    desc170.putReference(idUsng, ref128);
                    executeAction(idMk, desc170, DialogModes.NO);
                    try
                    {
                        var idDlt = charIDToTypeID("Dlt ");
                        var desc16 = new ActionDescriptor();
                        var idnull = charIDToTypeID("null");
                        var ref7 = new ActionReference();
                        var idPath = charIDToTypeID("Path");
                        ref7.putName(idPath, "randomName");
                        desc16.putReference(idnull, ref7);
                        executeAction(idDlt, desc16, DialogModes.NO);
                    } catch (err)
                    {
                    }

                }

                function recreateSubPath(subPath)
                {
                    for (var i = 0; i < subPath.length; i++)
                    {
                        lineArray[i] = new PathPointInfo
                        lineArray[i].kind = PointKind.CORNERPOINT
                        lineArray[i].anchor = subPath[i][0]
                        lineArray[i].rightDirection = subPath[i][2]
                        lineArray[i].leftDirection = subPath[i][1]

                    }
                }

                function deselectPath()
                {
                    var idDslc = charIDToTypeID("Dslc");
                    var desc77 = new ActionDescriptor();
                    var idnull = charIDToTypeID("null");
                    var ref32 = new ActionReference();
                    var idPath = charIDToTypeID("Path");
                    ref32.putClass(idPath);
                    desc77.putReference(idnull, ref32);
                    executeAction(idDslc, desc77, DialogModes.NO);
                }


                function setLayerMetadata(info, property)
                {
                    try
                    {
                        xmp = docRef.activeLayer.xmpMetadata.rawData;
                        xmpObject = new XMPMeta(xmp);
                    } catch (e)
                    {
                        xmpObject = new XMPMeta();
                    }
                    var psNamespace = "http://ns.cornerRounder/1.0/";
                    var psPrefix = "dsjRounder:";
                    XMPMeta.registerNamespace(psNamespace, psPrefix);

                    xmpObject.deleteProperty(psNamespace, property);
                    xmpObject.setProperty(psNamespace, property, info);
                    app.activeDocument.activeLayer.xmpMetadata.rawData = xmpObject.serialize();
                }

                function getLayerMetadata(property)
                {
                    try
                    {
                        xmp = docRef.activeLayer.xmpMetadata.rawData;
                        xmpObject = new XMPMeta(xmp);
                    } catch (e)
                    {
                        return;
                    }
                    var psNamespace = "http://ns.cornerRounder/1.0/";
                    var psPrefix = "dsjRounder:";
                    return xmpObject.getProperty(psNamespace, property);
                }

                function existingRadius(shape)
                {
                    //point,anchor,x/y
                    if (shape.length == 8 &&
                        shape[0][0][1] == shape[1][0][1] &&
                        shape[2][0][0] == shape[3][0][0] &&
                        shape[4][0][1] == shape[5][0][1] &&
                        shape[6][0][0] == shape[7][0][0])
                    {
                        var radius = (shape[0][0][0] - shape[7][0][0])
                    } else
                    {
                        radius = "";
                    }
                    return radius;

                }

                function getSelectedSubPaths()
                {
                    if (selectedLayers.length == 1)
                    {
                        var activeLayer = activeDocument.activeLayer
                        try
                        {
                            executeAction(charIDToTypeID("Dlt "), undefined, DialogModes.NO);
                        } catch (e)
                        {
                            return;
                        }
                        if (activeLayer == "[ArtLayer]")
                        {
                            executeAction(charIDToTypeID('undo'), undefined, DialogModes.NO);
                            return;
                        }

                        var layerPathIdx = docRef.pathItems.length - 1;
                        var partialPath = collectPathInfoFromDesc2012(docRef, docRef.pathItems[layerPathIdx])
                        executeAction(charIDToTypeID('undo'), undefined, DialogModes.NO);

                        //hasSelectedSubPaths=true;
                        for (var i = 0; i < vectorLayers[0].length; i++)
                        {
                            vectorLayers[0][i].selected = true;
                            for (var j = 0; j < partialPath.length; j++)
                            {
                                if (partialPath[j].toString() == vectorLayers[0][i].toString())
                                {
                                    vectorLayers[0][i].selected = false;
                                    break;
                                }
                            }
                        }
                    }
                }
            }


        }
    }

    Proteins.doCon(_func0, "路径角变换", false)

    return 0
}

Libs.encapsulate_cornerEditor_getEditLog = function (infoObjec, envObject)
{
    if (ExternalObject.AdobeXMPScript == undefined) ExternalObject.AdobeXMPScript = new ExternalObject("lib:AdobeXMPScript");
    function getLayerMetadata(property)
    {
        try
        {
            var xmp = activeDocument.activeLayer.xmpMetadata.rawData;
            var xmpObject = new XMPMeta(xmp);
        } catch (e)
        {
            return;
        }
        var psNamespace = "http://ns.cornerRounder/1.0/";
        var psPrefix = "dsjRounder:";
        return xmpObject.getProperty(psNamespace, property);
    }

    var re = null
    try
    {
        var re =
            {
                isZ: 0,
                cornerPatternMetadata: getLayerMetadata("CornerPattern").toString(),
                cornerTypeMetadata: parseInt(getLayerMetadata("CornerType")),
                cornerMethodMetadata: parseInt(getLayerMetadata("CornerMethod")),
            }
    } catch (e)
    {

    }
    return re
}











$.evalFile(File($.fileName).path + "/Muclease_lib.jsx")
mu = new Muclease();



//$.writeln(mu.actionDescriptorToJSON(desc207));
//mu.actionReferenceToJSON(ref50)
//$.writeln(mu.actionReferenceToJSON(ref50));


// do ----------------------------------------

// task_objectToActionReference()

// task_objectToActionDescriptor()

var idMk = charIDToTypeID( "Mk  " );
var desc597 = new ActionDescriptor();
var idnull = charIDToTypeID( "null" );
var ref153 = new ActionReference();
var idcontentLayer = stringIDToTypeID( "contentLayer" );
ref153.putClass( idcontentLayer );
desc597.putReference( idnull, ref153 );


// $.writeln( typeIDToStringID(ref153.getDesiredClass()))

var idUsng = charIDToTypeID( "Usng" );
var desc598 = new ActionDescriptor();
var idType = charIDToTypeID( "Type" );
var desc599 = new ActionDescriptor();
var idClr = charIDToTypeID( "Clr " );
var desc600 = new ActionDescriptor();
var idRd = charIDToTypeID( "Rd  " );
desc600.putDouble( idRd, 68.392105 );
var idGrn = charIDToTypeID( "Grn " );
desc600.putDouble( idGrn, 137.781245 );
var idBl = charIDToTypeID( "Bl  " );
desc600.putDouble( idBl, 201.557221 );
var idRGBC = charIDToTypeID( "RGBC" );
desc599.putObject( idClr, idRGBC, desc600 );
var idsolidColorLayer = stringIDToTypeID( "solidColorLayer" );
desc598.putObject( idType, idsolidColorLayer, desc599 );
var idShp = charIDToTypeID( "Shp " );
var desc601 = new ActionDescriptor();
var idunitValueQuadVersion = stringIDToTypeID( "unitValueQuadVersion" );
desc601.putInteger( idunitValueQuadVersion, 1 );
var idTop = charIDToTypeID( "Top " );
var idPxl = charIDToTypeID( "#Pxl" );
desc601.putUnitDouble( idTop, idPxl, 124.000000 );
var idLeft = charIDToTypeID( "Left" );
var idPxl = charIDToTypeID( "#Pxl" );
desc601.putUnitDouble( idLeft, idPxl, 154.000000 );
var idBtom = charIDToTypeID( "Btom" );
var idPxl = charIDToTypeID( "#Pxl" );
desc601.putUnitDouble( idBtom, idPxl, 544.000000 );
var idRght = charIDToTypeID( "Rght" );
var idPxl = charIDToTypeID( "#Pxl" );
desc601.putUnitDouble( idRght, idPxl, 882.000000 );
var idtopRight = stringIDToTypeID( "topRight" );
var idPxl = charIDToTypeID( "#Pxl" );
desc601.putUnitDouble( idtopRight, idPxl, 0.000000 );
var idtopLeft = stringIDToTypeID( "topLeft" );
var idPxl = charIDToTypeID( "#Pxl" );
desc601.putUnitDouble( idtopLeft, idPxl, 0.000000 );
var idbottomLeft = stringIDToTypeID( "bottomLeft" );
var idPxl = charIDToTypeID( "#Pxl" );
desc601.putUnitDouble( idbottomLeft, idPxl, 0.000000 );
var idbottomRight = stringIDToTypeID( "bottomRight" );
var idPxl = charIDToTypeID( "#Pxl" );
desc601.putUnitDouble( idbottomRight, idPxl, 0.000000 );
var idRctn = charIDToTypeID( "Rctn" );
desc598.putObject( idShp, idRctn, desc601 );
var idstrokeStyle = stringIDToTypeID( "strokeStyle" );
var desc602 = new ActionDescriptor();
var idstrokeStyleVersion = stringIDToTypeID( "strokeStyleVersion" );
desc602.putInteger( idstrokeStyleVersion, 2 );
var idstrokeEnabled = stringIDToTypeID( "strokeEnabled" );
desc602.putBoolean( idstrokeEnabled, true );
var idfillEnabled = stringIDToTypeID( "fillEnabled" );
desc602.putBoolean( idfillEnabled, true );
var idstrokeStyleLineWidth = stringIDToTypeID( "strokeStyleLineWidth" );
var idPxl = charIDToTypeID( "#Pxl" );
desc602.putUnitDouble( idstrokeStyleLineWidth, idPxl, 1.000000 );
var idstrokeStyleLineDashOffset = stringIDToTypeID( "strokeStyleLineDashOffset" );
var idPnt = charIDToTypeID( "#Pnt" );
desc602.putUnitDouble( idstrokeStyleLineDashOffset, idPnt, 0.000000 );
var idstrokeStyleMiterLimit = stringIDToTypeID( "strokeStyleMiterLimit" );
desc602.putDouble( idstrokeStyleMiterLimit, 100.000000 );
var idstrokeStyleLineCapType = stringIDToTypeID( "strokeStyleLineCapType" );
var idstrokeStyleLineCapType = stringIDToTypeID( "strokeStyleLineCapType" );
var idstrokeStyleButtCap = stringIDToTypeID( "strokeStyleButtCap" );
desc602.putEnumerated( idstrokeStyleLineCapType, idstrokeStyleLineCapType, idstrokeStyleButtCap );
var idstrokeStyleLineJoinType = stringIDToTypeID( "strokeStyleLineJoinType" );
var idstrokeStyleLineJoinType = stringIDToTypeID( "strokeStyleLineJoinType" );
var idstrokeStyleMiterJoin = stringIDToTypeID( "strokeStyleMiterJoin" );
desc602.putEnumerated( idstrokeStyleLineJoinType, idstrokeStyleLineJoinType, idstrokeStyleMiterJoin );
var idstrokeStyleLineAlignment = stringIDToTypeID( "strokeStyleLineAlignment" );
var idstrokeStyleLineAlignment = stringIDToTypeID( "strokeStyleLineAlignment" );
var idstrokeStyleAlignInside = stringIDToTypeID( "strokeStyleAlignInside" );
desc602.putEnumerated( idstrokeStyleLineAlignment, idstrokeStyleLineAlignment, idstrokeStyleAlignInside );
var idstrokeStyleScaleLock = stringIDToTypeID( "strokeStyleScaleLock" );
desc602.putBoolean( idstrokeStyleScaleLock, false );
var idstrokeStyleStrokeAdjust = stringIDToTypeID( "strokeStyleStrokeAdjust" );
desc602.putBoolean( idstrokeStyleStrokeAdjust, false );
var idstrokeStyleLineDashSet = stringIDToTypeID( "strokeStyleLineDashSet" );
var list98 = new ActionList();
desc602.putList( idstrokeStyleLineDashSet, list98 );
var idstrokeStyleBlendMode = stringIDToTypeID( "strokeStyleBlendMode" );
var idBlnM = charIDToTypeID( "BlnM" );
var idNrml = charIDToTypeID( "Nrml" );
desc602.putEnumerated( idstrokeStyleBlendMode, idBlnM, idNrml );
var idstrokeStyleOpacity = stringIDToTypeID( "strokeStyleOpacity" );
var idPrc = charIDToTypeID( "#Prc" );
desc602.putUnitDouble( idstrokeStyleOpacity, idPrc, 100.000000 );
var idstrokeStyleContent = stringIDToTypeID( "strokeStyleContent" );
var desc603 = new ActionDescriptor();
var idClr = charIDToTypeID( "Clr " );
var desc604 = new ActionDescriptor();
var idRd = charIDToTypeID( "Rd  " );
desc604.putDouble( idRd, 157.000006 );
var idGrn = charIDToTypeID( "Grn " );
desc604.putDouble( idGrn, 157.000006 );
var idBl = charIDToTypeID( "Bl  " );
desc604.putDouble( idBl, 157.000006 );
var idRGBC = charIDToTypeID( "RGBC" );
desc603.putObject( idClr, idRGBC, desc604 );
var idsolidColorLayer = stringIDToTypeID( "solidColorLayer" );
desc602.putObject( idstrokeStyleContent, idsolidColorLayer, desc603 );
var idstrokeStyleResolution = stringIDToTypeID( "strokeStyleResolution" );
desc602.putDouble( idstrokeStyleResolution, 72.000000 );
var idstrokeStyle = stringIDToTypeID( "strokeStyle" );
desc598.putObject( idstrokeStyle, idstrokeStyle, desc602 );
var idcontentLayer = stringIDToTypeID( "contentLayer" );
desc597.putObject( idUsng, idcontentLayer, desc598 );
var idLyrI = charIDToTypeID( "LyrI" );
desc597.putInteger( idLyrI, 6 );



 // obo_ad(desc597);



var ob = mu.actionDescriptorToObject(desc597);
var ad = mu.objectToActionDescriptor(ob);

executeAction( idMk, ad, DialogModes.NO );















// task -------------------------------------
function task_objectToActionReference()
{
    var ref50 = new ActionReference();
    var idPrpr = charIDToTypeID("Prpr");
    var idLefx = charIDToTypeID("Lefx");
    ref50.putProperty(idPrpr, idLefx);
    var idLyr = charIDToTypeID("Lyr ");
    var idOrdn = charIDToTypeID("Ordn");
    var idTrgt = charIDToTypeID("Trgt");
    ref50.putEnumerated(idLyr, idOrdn, idTrgt);
    obo_af(ref50)

    var ref50  = new ActionReference();
    var idLyr = charIDToTypeID( "Lyr " );
    ref50 .putName( idLyr, "图层 2" );
    obo_af(ref50)

}






function task_objectToActionDescriptor()
{
    var desc495 = new ActionDescriptor();
    var idHrzn = charIDToTypeID( "Hrzn" );
    var idPxl = charIDToTypeID( "#Pxl" );
    desc495.putUnitDouble( idHrzn, idPxl, 398.000000 );
    var idVrtc = charIDToTypeID( "Vrtc" );
    var idPxl = charIDToTypeID( "#Pxl" );
    desc495.putUnitDouble( idVrtc, idPxl, 217.000000 );

    obo_ad(desc495);



    // var idMk = charIDToTypeID( "Mk  " );
    // var desc597 = new ActionDescriptor();
    // var idnull = charIDToTypeID( "null" );
    // var ref153 = new ActionReference();
    // var idcontentLayer = stringIDToTypeID( "contentLayer" );
    // ref153.putClass( idcontentLayer );
    // desc597.putReference( idnull, ref153 );
    // var idUsng = charIDToTypeID( "Usng" );
    // var desc598 = new ActionDescriptor();
    // var idType = charIDToTypeID( "Type" );
    // var desc599 = new ActionDescriptor();
    // var idClr = charIDToTypeID( "Clr " );
    // var desc600 = new ActionDescriptor();
    // var idRd = charIDToTypeID( "Rd  " );
    // desc600.putDouble( idRd, 68.392105 );
    // var idGrn = charIDToTypeID( "Grn " );
    // desc600.putDouble( idGrn, 137.781245 );
    // var idBl = charIDToTypeID( "Bl  " );
    // desc600.putDouble( idBl, 201.557221 );
    // var idRGBC = charIDToTypeID( "RGBC" );
    // desc599.putObject( idClr, idRGBC, desc600 );
    // var idsolidColorLayer = stringIDToTypeID( "solidColorLayer" );
    // desc598.putObject( idType, idsolidColorLayer, desc599 );
    // var idShp = charIDToTypeID( "Shp " );
    // var desc601 = new ActionDescriptor();
    // var idunitValueQuadVersion = stringIDToTypeID( "unitValueQuadVersion" );
    // desc601.putInteger( idunitValueQuadVersion, 1 );
    // var idTop = charIDToTypeID( "Top " );
    // var idPxl = charIDToTypeID( "#Pxl" );
    // desc601.putUnitDouble( idTop, idPxl, 124.000000 );
    // var idLeft = charIDToTypeID( "Left" );
    // var idPxl = charIDToTypeID( "#Pxl" );
    // desc601.putUnitDouble( idLeft, idPxl, 154.000000 );
    // var idBtom = charIDToTypeID( "Btom" );
    // var idPxl = charIDToTypeID( "#Pxl" );
    // desc601.putUnitDouble( idBtom, idPxl, 544.000000 );
    // var idRght = charIDToTypeID( "Rght" );
    // var idPxl = charIDToTypeID( "#Pxl" );
    // desc601.putUnitDouble( idRght, idPxl, 882.000000 );
    // var idtopRight = stringIDToTypeID( "topRight" );
    // var idPxl = charIDToTypeID( "#Pxl" );
    // desc601.putUnitDouble( idtopRight, idPxl, 0.000000 );
    // var idtopLeft = stringIDToTypeID( "topLeft" );
    // var idPxl = charIDToTypeID( "#Pxl" );
    // desc601.putUnitDouble( idtopLeft, idPxl, 0.000000 );
    // var idbottomLeft = stringIDToTypeID( "bottomLeft" );
    // var idPxl = charIDToTypeID( "#Pxl" );
    // desc601.putUnitDouble( idbottomLeft, idPxl, 0.000000 );
    // var idbottomRight = stringIDToTypeID( "bottomRight" );
    // var idPxl = charIDToTypeID( "#Pxl" );
    // desc601.putUnitDouble( idbottomRight, idPxl, 0.000000 );
    // var idRctn = charIDToTypeID( "Rctn" );
    // desc598.putObject( idShp, idRctn, desc601 );
    // var idstrokeStyle = stringIDToTypeID( "strokeStyle" );
    // var desc602 = new ActionDescriptor();
    // var idstrokeStyleVersion = stringIDToTypeID( "strokeStyleVersion" );
    // desc602.putInteger( idstrokeStyleVersion, 2 );
    // var idstrokeEnabled = stringIDToTypeID( "strokeEnabled" );
    // desc602.putBoolean( idstrokeEnabled, true );
    // var idfillEnabled = stringIDToTypeID( "fillEnabled" );
    // desc602.putBoolean( idfillEnabled, true );
    // var idstrokeStyleLineWidth = stringIDToTypeID( "strokeStyleLineWidth" );
    // var idPxl = charIDToTypeID( "#Pxl" );
    // desc602.putUnitDouble( idstrokeStyleLineWidth, idPxl, 1.000000 );
    // var idstrokeStyleLineDashOffset = stringIDToTypeID( "strokeStyleLineDashOffset" );
    // var idPnt = charIDToTypeID( "#Pnt" );
    // desc602.putUnitDouble( idstrokeStyleLineDashOffset, idPnt, 0.000000 );
    // var idstrokeStyleMiterLimit = stringIDToTypeID( "strokeStyleMiterLimit" );
    // desc602.putDouble( idstrokeStyleMiterLimit, 100.000000 );
    // var idstrokeStyleLineCapType = stringIDToTypeID( "strokeStyleLineCapType" );
    // var idstrokeStyleLineCapType = stringIDToTypeID( "strokeStyleLineCapType" );
    // var idstrokeStyleButtCap = stringIDToTypeID( "strokeStyleButtCap" );
    // desc602.putEnumerated( idstrokeStyleLineCapType, idstrokeStyleLineCapType, idstrokeStyleButtCap );
    // var idstrokeStyleLineJoinType = stringIDToTypeID( "strokeStyleLineJoinType" );
    // var idstrokeStyleLineJoinType = stringIDToTypeID( "strokeStyleLineJoinType" );
    // var idstrokeStyleMiterJoin = stringIDToTypeID( "strokeStyleMiterJoin" );
    // desc602.putEnumerated( idstrokeStyleLineJoinType, idstrokeStyleLineJoinType, idstrokeStyleMiterJoin );
    // var idstrokeStyleLineAlignment = stringIDToTypeID( "strokeStyleLineAlignment" );
    // var idstrokeStyleLineAlignment = stringIDToTypeID( "strokeStyleLineAlignment" );
    // var idstrokeStyleAlignInside = stringIDToTypeID( "strokeStyleAlignInside" );
    // desc602.putEnumerated( idstrokeStyleLineAlignment, idstrokeStyleLineAlignment, idstrokeStyleAlignInside );
    // var idstrokeStyleScaleLock = stringIDToTypeID( "strokeStyleScaleLock" );
    // desc602.putBoolean( idstrokeStyleScaleLock, false );
    // var idstrokeStyleStrokeAdjust = stringIDToTypeID( "strokeStyleStrokeAdjust" );
    // desc602.putBoolean( idstrokeStyleStrokeAdjust, false );
    // var idstrokeStyleLineDashSet = stringIDToTypeID( "strokeStyleLineDashSet" );
    // var list98 = new ActionList();
    // desc602.putList( idstrokeStyleLineDashSet, list98 );
    // var idstrokeStyleBlendMode = stringIDToTypeID( "strokeStyleBlendMode" );
    // var idBlnM = charIDToTypeID( "BlnM" );
    // var idNrml = charIDToTypeID( "Nrml" );
    // desc602.putEnumerated( idstrokeStyleBlendMode, idBlnM, idNrml );
    // var idstrokeStyleOpacity = stringIDToTypeID( "strokeStyleOpacity" );
    // var idPrc = charIDToTypeID( "#Prc" );
    // desc602.putUnitDouble( idstrokeStyleOpacity, idPrc, 100.000000 );
    // var idstrokeStyleContent = stringIDToTypeID( "strokeStyleContent" );
    // var desc603 = new ActionDescriptor();
    // var idClr = charIDToTypeID( "Clr " );
    // var desc604 = new ActionDescriptor();
    // var idRd = charIDToTypeID( "Rd  " );
    // desc604.putDouble( idRd, 157.000006 );
    // var idGrn = charIDToTypeID( "Grn " );
    // desc604.putDouble( idGrn, 157.000006 );
    // var idBl = charIDToTypeID( "Bl  " );
    // desc604.putDouble( idBl, 157.000006 );
    // var idRGBC = charIDToTypeID( "RGBC" );
    // desc603.putObject( idClr, idRGBC, desc604 );
    // var idsolidColorLayer = stringIDToTypeID( "solidColorLayer" );
    // desc602.putObject( idstrokeStyleContent, idsolidColorLayer, desc603 );
    // var idstrokeStyleResolution = stringIDToTypeID( "strokeStyleResolution" );
    // desc602.putDouble( idstrokeStyleResolution, 72.000000 );
    // var idstrokeStyle = stringIDToTypeID( "strokeStyle" );
    // desc598.putObject( idstrokeStyle, idstrokeStyle, desc602 );
    // var idcontentLayer = stringIDToTypeID( "contentLayer" );
    // desc597.putObject( idUsng, idcontentLayer, desc598 );
    // var idLyrI = charIDToTypeID( "LyrI" );
    // desc597.putInteger( idLyrI, 6 );
    // obo_ad(desc597);
    // var ob = mu.actionDescriptorToObject(desc597);
    // var ad = mu.objectToActionDescriptor(ob);
    //
    // executeAction( idMk, ad, DialogModes.NO );






    //
    // var desc50 = new ActionDescriptor();
    // var idClr = charIDToTypeID( "Clr " );
    // var desc51 = new ActionDescriptor();
    // var idRd = charIDToTypeID( "Rd  " );
    // desc51.putDouble( idRd, 185.997162 );
    // var idGrn = charIDToTypeID( "Grn " );
    // desc51.putDouble( idGrn, 187.997131 );
    // var idBl = charIDToTypeID( "Bl  " );
    // desc51.putDouble( idBl, 191.000977 );
    // var idRGBC = charIDToTypeID( "RGBC" );
    // desc50.putObject( idClr, idRGBC, desc51 );
    // obo_ad(desc50);











}

// base --------------------------------------------

function  obo_af(in_af)
{
    var ob = mu.actionReferenceToObject(in_af);
    var af = mu.objectToActionReference(ob);

    if(mu.actionReferenceToJSON(in_af)!=mu.actionReferenceToJSON(af))
    {
        $.writeln("// ERR--------------------");
    }

    $.writeln(mu.actionReferenceToJSON(in_af));
    $.writeln(mu.actionReferenceToJSON(af));

}

function  obo_ad(in_af)
{
    var ob = mu.actionDescriptorToObject(in_af);
    var ad = mu.objectToActionDescriptor(ob);
    $.writeln("//===============================");
    if(mu.actionDescriptorToJSON(in_af)!=mu.actionDescriptorToJSON(ad))
    {
        $.writeln("//ERR--------------------");
    }

    $.writeln(mu.actionDescriptorToJSON(in_af));
    $.writeln("//------");
    $.writeln(mu.actionDescriptorToJSON(ad));

}


function see(ob)
{

    var str="\n"
    for (var i  in ob)
    {
        try
        {
            str+=i +":" +ob[i]+"\n";
        } catch (e)
        {
        }

    }

    alert(str)

}

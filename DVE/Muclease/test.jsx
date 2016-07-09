$.evalFile(File($.fileName).path + "/Muclease_lib.jsx")
mu = new Muclease();



//$.writeln(mu.actionDescriptorToJSON(desc207));
//mu.actionReferenceToJSON(ref50)
//$.writeln(mu.actionReferenceToJSON(ref50));


// do ----------------------------------------

// task_objectToActionReference()

task_objectToActionDescriptor()





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




    var desc48 = new ActionDescriptor();
    var idnull = charIDToTypeID( "null" );
    var ref20 = new ActionReference();
    var idcontentLayer = stringIDToTypeID( "contentLayer" );
    ref20.putClass( idcontentLayer );
    desc48.putReference( idnull, ref20 );
    var idUsng = charIDToTypeID( "Usng" );
    var desc49 = new ActionDescriptor();
    var idType = charIDToTypeID( "Type" );
    var desc50 = new ActionDescriptor();
    var idClr = charIDToTypeID( "Clr " );
    var desc51 = new ActionDescriptor();
    var idRd = charIDToTypeID( "Rd  " );
    desc51.putDouble( idRd, 185.997162 );
    var idGrn = charIDToTypeID( "Grn " );
    desc51.putDouble( idGrn, 187.997131 );
    var idBl = charIDToTypeID( "Bl  " );
    desc51.putDouble( idBl, 191.000977 );
    var idRGBC = charIDToTypeID( "RGBC" );
    desc50.putObject( idClr, idRGBC, desc51 );
    var idsolidColorLayer = stringIDToTypeID( "solidColorLayer" );
    desc49.putObject( idType, idsolidColorLayer, desc50 );
    var idShp = charIDToTypeID( "Shp " );
    var desc52 = new ActionDescriptor();
    var idunitValueQuadVersion = stringIDToTypeID( "unitValueQuadVersion" );
    desc52.putInteger( idunitValueQuadVersion, 1 );
    var idTop = charIDToTypeID( "Top " );
    var idPxl = charIDToTypeID( "#Pxl" );
    desc52.putUnitDouble( idTop, idPxl, 136.000000 );
    var idLeft = charIDToTypeID( "Left" );
    var idPxl = charIDToTypeID( "#Pxl" );
    desc52.putUnitDouble( idLeft, idPxl, 224.000000 );
    var idBtom = charIDToTypeID( "Btom" );
    var idPxl = charIDToTypeID( "#Pxl" );
    desc52.putUnitDouble( idBtom, idPxl, 682.000000 );
    var idRght = charIDToTypeID( "Rght" );
    var idPxl = charIDToTypeID( "#Pxl" );
    desc52.putUnitDouble( idRght, idPxl, 1042.000000 );
    var idtopRight = stringIDToTypeID( "topRight" );
    var idPxl = charIDToTypeID( "#Pxl" );
    desc52.putUnitDouble( idtopRight, idPxl, 0.000000 );
    var idtopLeft = stringIDToTypeID( "topLeft" );
    var idPxl = charIDToTypeID( "#Pxl" );
    desc52.putUnitDouble( idtopLeft, idPxl, 0.000000 );
    var idbottomLeft = stringIDToTypeID( "bottomLeft" );
    var idPxl = charIDToTypeID( "#Pxl" );
    desc52.putUnitDouble( idbottomLeft, idPxl, 0.000000 );
    var idbottomRight = stringIDToTypeID( "bottomRight" );
    var idPxl = charIDToTypeID( "#Pxl" );
    desc52.putUnitDouble( idbottomRight, idPxl, 0.000000 );
    var idRctn = charIDToTypeID( "Rctn" );
    desc49.putObject( idShp, idRctn, desc52 );
    var idstrokeStyle = stringIDToTypeID( "strokeStyle" );
    var desc53 = new ActionDescriptor();
    var idstrokeStyleVersion = stringIDToTypeID( "strokeStyleVersion" );
    desc53.putInteger( idstrokeStyleVersion, 2 );
    var idstrokeEnabled = stringIDToTypeID( "strokeEnabled" );
    desc53.putBoolean( idstrokeEnabled, true );
    var idfillEnabled = stringIDToTypeID( "fillEnabled" );
    desc53.putBoolean( idfillEnabled, true );
    var idstrokeStyleLineWidth = stringIDToTypeID( "strokeStyleLineWidth" );
    var idPxl = charIDToTypeID( "#Pxl" );
    desc53.putUnitDouble( idstrokeStyleLineWidth, idPxl, 1.000000 );
    var idstrokeStyleLineDashOffset = stringIDToTypeID( "strokeStyleLineDashOffset" );
    var idPnt = charIDToTypeID( "#Pnt" );
    desc53.putUnitDouble( idstrokeStyleLineDashOffset, idPnt, 0.000000 );
    var idstrokeStyleMiterLimit = stringIDToTypeID( "strokeStyleMiterLimit" );
    desc53.putDouble( idstrokeStyleMiterLimit, 100.000000 );
    var idstrokeStyleLineCapType = stringIDToTypeID( "strokeStyleLineCapType" );
    var idstrokeStyleLineCapType = stringIDToTypeID( "strokeStyleLineCapType" );
    var idstrokeStyleButtCap = stringIDToTypeID( "strokeStyleButtCap" );
    desc53.putEnumerated( idstrokeStyleLineCapType, idstrokeStyleLineCapType, idstrokeStyleButtCap );
    var idstrokeStyleLineJoinType = stringIDToTypeID( "strokeStyleLineJoinType" );
    var idstrokeStyleLineJoinType = stringIDToTypeID( "strokeStyleLineJoinType" );
    var idstrokeStyleMiterJoin = stringIDToTypeID( "strokeStyleMiterJoin" );
    desc53.putEnumerated( idstrokeStyleLineJoinType, idstrokeStyleLineJoinType, idstrokeStyleMiterJoin );
    var idstrokeStyleLineAlignment = stringIDToTypeID( "strokeStyleLineAlignment" );
    var idstrokeStyleLineAlignment = stringIDToTypeID( "strokeStyleLineAlignment" );
    var idstrokeStyleAlignInside = stringIDToTypeID( "strokeStyleAlignInside" );
    desc53.putEnumerated( idstrokeStyleLineAlignment, idstrokeStyleLineAlignment, idstrokeStyleAlignInside );
    var idstrokeStyleScaleLock = stringIDToTypeID( "strokeStyleScaleLock" );
    desc53.putBoolean( idstrokeStyleScaleLock, false );
    var idstrokeStyleStrokeAdjust = stringIDToTypeID( "strokeStyleStrokeAdjust" );
    desc53.putBoolean( idstrokeStyleStrokeAdjust, false );
    var idstrokeStyleLineDashSet = stringIDToTypeID( "strokeStyleLineDashSet" );
    var list10 = new ActionList();
    desc53.putList( idstrokeStyleLineDashSet, list10 );
    var idstrokeStyleBlendMode = stringIDToTypeID( "strokeStyleBlendMode" );
    var idBlnM = charIDToTypeID( "BlnM" );
    var idNrml = charIDToTypeID( "Nrml" );
    desc53.putEnumerated( idstrokeStyleBlendMode, idBlnM, idNrml );
    var idstrokeStyleOpacity = stringIDToTypeID( "strokeStyleOpacity" );
    var idPrc = charIDToTypeID( "#Prc" );
    desc53.putUnitDouble( idstrokeStyleOpacity, idPrc, 100.000000 );
    var idstrokeStyleContent = stringIDToTypeID( "strokeStyleContent" );
    var desc54 = new ActionDescriptor();
    var idClr = charIDToTypeID( "Clr " );
    var desc55 = new ActionDescriptor();
    var idRd = charIDToTypeID( "Rd  " );
    desc55.putDouble( idRd, 157.000006 );
    var idGrn = charIDToTypeID( "Grn " );
    desc55.putDouble( idGrn, 157.000006 );
    var idBl = charIDToTypeID( "Bl  " );
    desc55.putDouble( idBl, 157.000006 );
    var idRGBC = charIDToTypeID( "RGBC" );
    desc54.putObject( idClr, idRGBC, desc55 );
    var idsolidColorLayer = stringIDToTypeID( "solidColorLayer" );
    desc53.putObject( idstrokeStyleContent, idsolidColorLayer, desc54 );
    var idstrokeStyleResolution = stringIDToTypeID( "strokeStyleResolution" );
    desc53.putDouble( idstrokeStyleResolution, 72.000000 );
    var idstrokeStyle = stringIDToTypeID( "strokeStyle" );
    desc49.putObject( idstrokeStyle, idstrokeStyle, desc53 );
    var idcontentLayer = stringIDToTypeID( "contentLayer" );
    desc48.putObject( idUsng, idcontentLayer, desc49 );
    var idLyrI = charIDToTypeID( "LyrI" );
    desc48.putInteger( idLyrI, 10 );

    obo_ad(desc48);







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

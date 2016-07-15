$.evalFile("E:/Work/GitHub/UI-DNA/DVE/Enzymes/test/test.jsx")
    var desc490 = new ActionDescriptor();
    var idnull = charIDToTypeID( "null" );
        var ref145 = new ActionReference();
        var idcontentLayer = stringIDToTypeID( "contentLayer" );
        var idOrdn = charIDToTypeID( "Ordn" );
        var idTrgt = charIDToTypeID( "Trgt" );
        ref145.putEnumerated( idcontentLayer, idOrdn, idTrgt );
    desc490.putReference( idnull, ref145 );
    var idT = charIDToTypeID( "T   " );
        var desc491 = new ActionDescriptor();
        var idstrokeStyle = stringIDToTypeID( "strokeStyle" );
            var desc492 = new ActionDescriptor();
            var idstrokeStyleLineJoinType = stringIDToTypeID( "strokeStyleLineJoinType" );
            var idstrokeStyleLineJoinType = stringIDToTypeID( "strokeStyleLineJoinType" );
            var idstrokeStyleRoundJoin = stringIDToTypeID( "strokeStyleRoundJoin" );
            desc492.putEnumerated( idstrokeStyleLineJoinType, idstrokeStyleLineJoinType, idstrokeStyleRoundJoin );
            var idstrokeStyleVersion = stringIDToTypeID( "strokeStyleVersion" );
            desc492.putInteger( idstrokeStyleVersion, 2 );
            var idstrokeEnabled = stringIDToTypeID( "strokeEnabled" );
            desc492.putBoolean( idstrokeEnabled, true );
        var idstrokeStyle = stringIDToTypeID( "strokeStyle" );
        desc491.putObject( idstrokeStyle, idstrokeStyle, desc492 );
    var idshapeStyle = stringIDToTypeID( "shapeStyle" );
    desc490.putObject( idT, idshapeStyle, desc491 );
json( mu.actionDescriptorToObject(desc490))
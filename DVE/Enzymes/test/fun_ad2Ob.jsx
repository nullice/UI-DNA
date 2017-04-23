$.evalFile("C:/Users/nullice/MyProject/UI-DNA/DVE/bin/JSX/json3.js")
$.evalFile("C:/Users/nullice/MyProject/UI-DNA/DVE/Enzymes/test/test.jsx")



    var desc1115 = new ActionDescriptor();
    var idnull = charIDToTypeID( "null" );
        var ref185 = new ActionReference();
        var idPrpr = charIDToTypeID( "Prpr" );
        var idTxtS = charIDToTypeID( "TxtS" );
        ref185.putProperty( idPrpr, idTxtS );
        var idTxLr = charIDToTypeID( "TxLr" );
        var idOrdn = charIDToTypeID( "Ordn" );
        var idTrgt = charIDToTypeID( "Trgt" );
        ref185.putEnumerated( idTxLr, idOrdn, idTrgt );
    desc1115.putReference( idnull, ref185 );
    var idT = charIDToTypeID( "T   " );
        var desc1116 = new ActionDescriptor();
        var idtextOverrideFeatureName = stringIDToTypeID( "textOverrideFeatureName" );
        desc1116.putInteger( idtextOverrideFeatureName, 808465459 );
        var idtypeStyleOperationType = stringIDToTypeID( "typeStyleOperationType" );
        desc1116.putInteger( idtypeStyleOperationType, 3 );
        var idsyntheticBold = stringIDToTypeID( "syntheticBold" );
        desc1116.putBoolean( idsyntheticBold, true );
    var idTxtS = charIDToTypeID( "TxtS" );
    desc1115.putObject( idT, idTxtS, desc1116 );
json( mu.actionDescriptorToObject(desc1115))
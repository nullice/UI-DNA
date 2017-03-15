$.evalFile("E:/Work/GitHub/UI-DNA/DVE/bin/JSX/json3.js")
$.evalFile("E:/Work/GitHub/UI-DNA/DVE/Enzymes/test/test.jsx")


var idDplc = charIDToTypeID( "Dplc" );
    var desc65 = new ActionDescriptor();
    var idnull = charIDToTypeID( "null" );
        var ref18 = new ActionReference();
        var idLyr = charIDToTypeID( "Lyr " );
        var idOrdn = charIDToTypeID( "Ordn" );
        var idTrgt = charIDToTypeID( "Trgt" );
        ref18.putEnumerated( idLyr, idOrdn, idTrgt );
    desc65.putReference( idnull, ref18 );
    var idVrsn = charIDToTypeID( "Vrsn" );
    desc65.putInteger( idVrsn, 5 );
executeAction( idDplc, desc65, DialogModes.NO );
json( mu.actionDescriptorToObject(desc65))
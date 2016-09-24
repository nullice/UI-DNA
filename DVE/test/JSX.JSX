$.evalFile("E:/Work/GitHub/UI-DNA/DVE/Enzymes/test/test.jsx")
$.evalFile("E:/Work/GitHub/UI-DNA/DVE/bin/JSX/json3.js")
$.evalFile("E:/Work/GitHub/UI-DNA/DVE/bin/JSX/Enzymes_lib.jsx")



//EnzJSX.deletLayer(321);
//EnzJSX.selectLoad([299,300])
//EnzJSX.writeJSON("name", "jjjjjjj")


var idMk = charIDToTypeID( "Mk  " );
    var desc714 = new ActionDescriptor();
    var idnull = charIDToTypeID( "null" );
        var ref385 = new ActionReference();
        var idlayerSection = stringIDToTypeID( "layerSection" );
        ref385.putClass( idlayerSection );
    desc714.putReference( idnull, ref385 );
    var idlayerSectionStart = stringIDToTypeID( "layerSectionStart" );
    desc714.putInteger( idlayerSectionStart, 400 );
    var idlayerSectionEnd = stringIDToTypeID( "layerSectionEnd" );
    desc714.putInteger( idlayerSectionEnd, 401 );
    var idNm = charIDToTypeID( "Nm  " );
    desc714.putString( idNm, """组 8""" );
executeAction( idMk, desc714, DialogModes.NO );

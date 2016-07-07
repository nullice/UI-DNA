 $.evalFile( File($.fileName).path +"/Muclease_lib.jsx")
 
mu=new Muclease();
 
 

var idsetd = charIDToTypeID( "setd" );
    var desc207 = new ActionDescriptor();
    var idnull = charIDToTypeID( "null" );
        var ref50 = new ActionReference();
        var idPrpr = charIDToTypeID( "Prpr" );
        var idLefx = charIDToTypeID( "Lefx" );
        ref50.putProperty( idPrpr, idLefx );
        var idLyr = charIDToTypeID( "Lyr " );
        var idOrdn = charIDToTypeID( "Ordn" );
        var idTrgt = charIDToTypeID( "Trgt" );
        ref50.putEnumerated( idLyr, idOrdn, idTrgt );
    desc207.putReference( idnull, ref50 );
    var idT = charIDToTypeID( "T   " );
        var desc208 = new ActionDescriptor();
        var idScl = charIDToTypeID( "Scl " );
        var idPrc = charIDToTypeID( "#Prc" );
        desc208.putUnitDouble( idScl, idPrc, 100.000000 );
        var idDrSh = charIDToTypeID( "DrSh" );
            var desc209 = new ActionDescriptor();
            var idenab = charIDToTypeID( "enab" );
            desc209.putBoolean( idenab, true );
            var idpresent = stringIDToTypeID( "present" );
            desc209.putBoolean( idpresent, true );
            var idshowInDialog = stringIDToTypeID( "showInDialog" );
            desc209.putBoolean( idshowInDialog, true );
            var idMd = charIDToTypeID( "Md  " );
            var idBlnM = charIDToTypeID( "BlnM" );
            var idNrml = charIDToTypeID( "Nrml" );
            desc209.putEnumerated( idMd, idBlnM, idNrml );
            var idClr = charIDToTypeID( "Clr " );
                var desc210 = new ActionDescriptor();
                var idRd = charIDToTypeID( "Rd  " );
                desc210.putDouble( idRd, 73.000003 );
                var idGrn = charIDToTypeID( "Grn " );
                desc210.putDouble( idGrn, 73.000003 );
                var idBl = charIDToTypeID( "Bl  " );
                desc210.putDouble( idBl, 73.000003 );
            var idRGBC = charIDToTypeID( "RGBC" );
            desc209.putObject( idClr, idRGBC, desc210 );
            var idOpct = charIDToTypeID( "Opct" );
            var idPrc = charIDToTypeID( "#Prc" );
            desc209.putUnitDouble( idOpct, idPrc, 68.000000 );
            var iduglg = charIDToTypeID( "uglg" );
            desc209.putBoolean( iduglg, false );
            var idlagl = charIDToTypeID( "lagl" );
            var idAng = charIDToTypeID( "#Ang" );
            desc209.putUnitDouble( idlagl, idAng, 90.000000 );
            var idDstn = charIDToTypeID( "Dstn" );
            var idPxl = charIDToTypeID( "#Pxl" );
            desc209.putUnitDouble( idDstn, idPxl, 13.000000 );
            var idCkmt = charIDToTypeID( "Ckmt" );
            var idPxl = charIDToTypeID( "#Pxl" );
            desc209.putUnitDouble( idCkmt, idPxl, 1.000000 );
            var idblur = charIDToTypeID( "blur" );
            var idPxl = charIDToTypeID( "#Pxl" );
            desc209.putUnitDouble( idblur, idPxl, 10.000000 );
            var idNose = charIDToTypeID( "Nose" );
            var idPrc = charIDToTypeID( "#Prc" );
            desc209.putUnitDouble( idNose, idPrc, 0.000000 );
            var idAntA = charIDToTypeID( "AntA" );
            desc209.putBoolean( idAntA, false );
            var idTrnS = charIDToTypeID( "TrnS" );
                var desc211 = new ActionDescriptor();
                var idNm = charIDToTypeID( "Nm  " );
                desc211.putString( idNm, """线性""" );
            var idShpC = charIDToTypeID( "ShpC" );
            desc209.putObject( idTrnS, idShpC, desc211 );
            var idlayerConceals = stringIDToTypeID( "layerConceals" );
            desc209.putBoolean( idlayerConceals, true );
        var idDrSh = charIDToTypeID( "DrSh" );
        desc208.putObject( idDrSh, idDrSh, desc209 );
    var idLefx = charIDToTypeID( "Lefx" );
    desc207.putObject( idT, idLefx, desc208 );
    
    

$.writeln(mu.actionDescriptorToJSON(desc207));
    
    
   
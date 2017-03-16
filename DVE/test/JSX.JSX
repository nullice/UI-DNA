$.evalFile("E:/Work/GitHub/UI-DNA/DVE/bin/JSX/json3.js")
$.evalFile("E:/Work/GitHub/UI-DNA/DVE/Enzymes/test/test.jsx")
$.evalFile("E:/Work/GitHub/UI-DNA/DVE/Enzymes/Enzymes_lib.jsx")
$.evalFile("E:/Work/GitHub/UI-DNA/DVE/Proteins/Proteins_lib.jsx")
Proteins.evalJsxFolder("E:/Work/GitHub/UI-DNA/DVE/Proteins/libs")

//--------------------------
Libs.quick_derive_matrix({
     col:2, //列数
     row:2, //行数
     dX:50, //x 间距
     dY:20, //y 间距
     rename:2
})

//Kinase.layer.creatNewShapeLayerSquarenss_ByActive("2122121",{fillColor:{r:255,g:0,b:12},w:60, h:100,lineWidth: 10})
    app.activeDocument.suspendHistory("sss", "longS()");
    function longS()
    {
        function copyNow()
        {
            var idDplc = charIDToTypeID("Dplc");
            var desc130 = new ActionDescriptor();
            var idnull = charIDToTypeID("null");
            var ref32 = new ActionReference();
            var idLyr = charIDToTypeID("Lyr ");
            var idOrdn = charIDToTypeID("Ordn");
            var idTrgt = charIDToTypeID("Trgt");
            ref32.putEnumerated(idLyr, idOrdn, idTrgt);
            desc130.putReference(idnull, ref32);
            var idVrsn = charIDToTypeID("Vrsn");
            desc130.putInteger(idVrsn, 5);
            var idIdnt = charIDToTypeID("Idnt");
            executeAction(idDplc, desc130, DialogModes.NO);
        }

        for (var i = 0; i <10; i++)
        {
            copyNow()

            var bounds = Kinase.layer.getLayerBounds(Kinase.REF_ActiveLayer, null)
            Kinase.layer.setLayerBounds_byActive({x: bounds.x + 1,y:bounds.y +1
            })
        
       //  Kinase.layer.setAppearance_byActive({opacity:100*(10-i/10)})

        }
    }
//Proteins.exec( "quick_shape_advance_copyShapeSVG" )
 


//EnzJSX.setLayerInfo_shape_byId  ({"lineWidth":"10"}, 417)
//EnzJSX.setLayerInfo_shape_byId  ({"fillColorEnabled":false}, 390)
//var ob = Kinase.layer.getLayerInfoObject_byActiveLayer()
 //var ob =Kinase.layer.getLayerEffectsObject(Kinase.REF_ActiveLayer, null)
  //    var ob = Kinase.layer.get_XXX_Objcet(Kinase.REF_ActiveLayer, null, "layerEffects")

//var ob = Kinase.layer.getLayerInfoObject_byActiveLayer ()



//EnzJSX.setLayerInfo_more_byId({"visible":false} ,420 )

///  ob=Kinase.layer.getEffectsList_universal (ob,"dropShadow")
//EnzJSX.setLayerInfo_quickEffect_byId({"dropShadow":{"color":{"r":79,"g":219,"b":95}}} ,423 )
 //typeof EnzJSX.getSelectLayerArray

//log(json(ob))


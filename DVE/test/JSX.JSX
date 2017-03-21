$.evalFile("E:/Work/GitHub/UI-DNA/DVE/bin/JSX/json3.js")
$.evalFile("E:/Work/GitHub/UI-DNA/DVE/Enzymes/test/test.jsx")
$.evalFile("E:/Work/GitHub/UI-DNA/DVE/Enzymes/Enzymes_lib.jsx")
$.evalFile("E:/Work/GitHub/UI-DNA/DVE/Proteins/Proteins_lib.jsx")
Proteins.evalJsxFolder("E:/Work/GitHub/UI-DNA/DVE/Proteins/libs")

//Libs.quick_permute_calcLayersGrid("onlyTextLayer")
//EnzJSX.setLayerInfo_shape_byId  ({"lineWidth":"10"}, 417)
//EnzJSX.setLayerInfo_shape_byId  ({"fillColorEnabled":false}, 390)
//var ob = Kinase.layer.getLayerInfoObject_byActiveLayer()
 //var ob =Kinase.layer.getLayerEffectsObject(Kinase.REF_ActiveLayer, null)
  //    var ob = Kinase.layer.get_XXX_Objcet(Kinase.REF_ActiveLayer, null, "layerEffects")

//var ob = Kinase.layer.getLayerInfoObject_byActiveLayer ()

var a = "啥地方\n111\n\c23"
Kinase.layer.setLayerText_Quick(a, Kinase.REF_ActiveLayer, null)
textLR2CR = function (text)
{
    if (text != undefined)
    {
    var reg = /\n(\r){0,1}/
        if (text.replace != undefined)
        {
            text = text.replace(reg, '\r')
        }
    }
    return text
}

var ob = textLR2CR(a)
//EnzJSX.setLayerInfo_more_byId({"visible":false} ,420 )

///  ob=Kinase.layer.getEffectsList_universal (ob,"dropShadow")
//EnzJSX.setLayerInfo_quickEffect_byId({"dropShadow":{"color":{"r":79,"g":219,"b":95}}} ,423 )
 //typeof EnzJSX.getSelectLayerArray

log(json(ob))


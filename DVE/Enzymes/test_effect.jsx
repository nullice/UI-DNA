/**
 * Created by bgllj on 2016/7/10.
 */
$.evalFile(File($.fileName).path + "/test.jsx")


var i = 3


//复制图层 index #i 的阴影到当前图层----------------------------------------------
/*log(ki.layer.getLayerName_byItemIndex(i))
 var eOb1 = ki.layer.getLayerEffectsObject(Kinase.REF_ItemIndex, i)
 var list1 = ki.layer.getEffectsList_dropShadow(eOb1, true)
 Kinase.prototype.layer.setLayerEffects_ByList(ki.layer.putEffectsList_dropShadow, list1, Kinase.REF_ActiveLayer, null)*/
//----------------------------------------------


log(ki.layer.getLayerName_byItemIndex(i))
var eOb1 = ki.layer.getLayerEffectsObject(Kinase.REF_ItemIndex, i)
// var list1 = ki.layer.getEffectsList_universal(eOb1, "frameFX", true)
//
// Kinase.prototype.layer.setLayerEffects_ByList(ki.layer.putEffectsList_universal, list1, Kinase.REF_ActiveLayer, null, "frameFX")



// 复制所有效果
var names = ["bevelEmboss", "chromeFX", "dropShadow", "frameFX", "gradientFill", "innerGlow", "innerShadow", "outerGlow", "patternFill", "solidFill"]
for (var z = 0; z < names.length; z++)
{
    var list1 = ki.layer.getEffectsList_universal(eOb1, names[z], true)
    Kinase.prototype.layer.setLayerEffects_ByList(ki.layer.putEffectsList_universal, list1, Kinase.REF_ActiveLayer, null, names[z])
}


//
// var eOb1 = ki.layer.getLayerEffectsObject( Kinase.REF_ActiveLayer, null)
// var list = ki.layer.getEffectsList_universal(eOb1,"innerShadow",true)

// log(json(list))


// /*
// log(ki.layer.getLayerName_byItemIndex(i))
// ki.layer.setLayerEffectsObject(e, Kinase.REF_ItemIndex, i)
// */

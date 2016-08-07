/**
 * Created by bgllj on 2016/7/10.
 */
$.evalFile(File($.fileName).path + "/test.jsx")


var i = 3
log(ki.layer.getLayerName_byItemIndex(i))
var eOb1 = ki.layer.getLayerEffectsObject(Kinase.REF_ItemIndex, i)
var list1 = ki.layer.getEffectsList_dropShadow(eOb1, true)


Kinase.prototype.layer.setLayerEffects_ByList(ki.layer.putEffectsList_dropShadow, list1, Kinase.REF_ActiveLayer, null)





// /*
// log(ki.layer.getLayerName_byItemIndex(i))
// ki.layer.setLayerEffectsObject(e, Kinase.REF_ItemIndex, i)
// */

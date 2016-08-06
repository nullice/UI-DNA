/**
 * Created by bgllj on 2016/7/10.
 */
$.evalFile(File($.fileName).path + "/test.jsx")


var i = 3
var e = ki.layer.getLayerEffects(Kinase.REF_ActiveLayer)
log(ki.layer.getLayerName_byItemIndex(i))

ki.layer.setLayerEffects(e, Kinase.REF_ItemIndex,i)

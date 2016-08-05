/**
 * Created by bgllj on 2016/7/10.
 */
$.evalFile(File($.fileName).path + "/test.jsx")


var i =3
// log(json(ki.layer.getLayerTextInfo(Kinase.REF_ItemIndex,i)))
// log(json(ki.layer.getLayerBounds(Kinase.REF_ItemIndex,i)))

// var i =3
// Kinase.prototype.layer.setLayerText_Quick("sdfsadf",Kinase.REF_ItemIndex,i)

// log(ki.layer.getAllLayersItemIndex())
// var i =3
// log(json(ki.layer.getLayerTextInfo(Kinase.REF_ItemIndex,i)))
var old = ki.layer.getLayerTextInfo(Kinase.REF_ItemIndex,i)

ki.layer.setLayerTextInfo({text:"ggsmd",bounds:old.boundingBox, color:{r:255,g:0,b:0}},Kinase.REF_ItemIndex,i)


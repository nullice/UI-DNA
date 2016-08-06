/**
 * Created by bgllj on 2016/7/10.
 */
$.evalFile(File($.fileName).path + "/test.jsx")


var i = 3
// log(json(ki.layer.getLayerTextInfo(Kinase.REF_ItemIndex,i)))
// log(json(ki.layer.getLayerBounds(Kinase.REF_ItemIndex,i)))

// var i =3
// Kinase.prototype.layer.setLayerText_Quick("sdfsadf",Kinase.REF_ItemIndex,i)

// log(ki.layer.getAllLayersItemIndex())
// var i =3
// log(json(ki.layer.getLayerTextInfo(Kinase.REF_ItemIndex,i)))


// ki.layer.setLayerTextInfo({
//     baselineShift:12,
//     horizontalScale:122,
//     tracking:22,
//     leading:"auto",
//     justification:"center",
//     underline: "underlineOnLeftInVertical",
//     bold: true,
//     italic: true,
//     text: "ggsmd撒打发士大夫撒",
//     antiAlias: "antiAliasSharp",
//     size: 12,
//     fontPostScriptName: "BDZYJT--GB1-0",
//     bounds: {x:0,y:0,w:250, h:200},
//     color: {r: 255, g: 0, b: 0}
// }, Kinase.REF_ItemIndex, i)
var old = ki.layer.getLayerTextInfo(Kinase.REF_ItemIndex, i)

log("old:bounds:" + json(old.bounds) )
log("old:boundingBox:" + json(old.boundingBox) )
ki.layer.setLayerTextMinBounds_Quick(Kinase.REF_ItemIndex, i)

var newd = ki.layer.getLayerTextInfo(Kinase.REF_ItemIndex, i)

log("newd:bounds:" + json(newd.bounds) )
log("newd:boundingBox:" + json(newd.boundingBox) )
/**
 * Created by bgllj on 2016/7/12.
 */
$.evalFile(File($.fileName).path + "/test.jsx")



ki.layer.setLayerBounds({x:0,y:0})
var arr = ki.layer.getLayerBounds(Kinase.REF_ActiveLayer,null)

log(json(arr))


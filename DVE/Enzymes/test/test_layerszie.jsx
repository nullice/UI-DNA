/**
 * Created by bgllj on 2016/7/12.
 */
$.evalFile(File($.fileName).path + "/test.jsx")


var arr = ki.layer.getLayerRadian(Kinase.REF_ActiveLayer,null)

log(json(arr))

ki.layer.setLayerRadian_byActive({topLeft:20})
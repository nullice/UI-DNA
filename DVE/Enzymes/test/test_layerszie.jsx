/**
 * Created by bgllj on 2016/7/12.
 */
$.evalFile(File($.fileName).path + "/test.jsx")


var arr = ki.layer.getAllLayersItemIndex()
 arr = ki.layer.itemIndexArray_ToLayerIdArray(arr);

log("arr"+arr)

ki.layer.selctMultLayers_byID(arr)
//ki.layer.selctMultLayers_byID(arr)


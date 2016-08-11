/**
 * Created by bgllj on 2016/7/10.
 */
$.evalFile(File($.fileName).path + "/test.jsx")


var i = 3


var　ob = ki.layer.getLayerEditInfo( Kinase.REF_ActiveLayer, null);

// ki.layer.setLayerEditInfo( {visible:false},Kinase.REF_ActiveLayer, null);

ki.layer.setLayerEditInfo( {visible:true, color:"none"},Kinase.REF_ItemIndex, 2);
log(json(ob))

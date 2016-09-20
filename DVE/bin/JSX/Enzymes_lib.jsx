// $.evalFile(File($.fileName).path + "/Muclease_lib.jsx");
// $.evalFile(File($.fileName).path + "/Kinase_lib.jsx");


function initEnzymes(mucleasePath, KinasePath)
{
    $.evalFile(mucleasePath);
    $.evalFile(KinasePath);

    var mu = new Muclease();
    var ki = new Kinase();
}


var EnzJSX = {};


EnzJSX.creatLayer = function (layerName)
{
    alert("creatLayer")
   w
    if (layerName !== undefined)
    {
        ki.layer.setLayerName_byActive(layerName)
    }
    return ki.layer.getLayerIdByActive()
}




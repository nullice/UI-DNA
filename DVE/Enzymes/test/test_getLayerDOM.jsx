$.evalFile("C:/Users/nullice/MyProject/UI-DNA/DVE/bin/JSX/json3.js")
$.evalFile("C:/Users/nullice/MyProject/UI-DNA/DVE/Enzymes/test/test.jsx")
$.evalFile("C:/Users/nullice/MyProject/UI-DNA/DVE/Enzymes/Enzymes_lib.jsx")


var  timeStart = function (text)
{
    return new Date().getTime();
}

var  timeOut = function (startTime)
{
    return ( new Date().getTime() - startTime)+"ms";
}





var startTime =  timeStart()
//var ob = Kinase.layer.getLayerDOMObject_byItemIndex (Kinase.layer.getItemIndexBylayerID(19794 ))

var z = 0;
scanAll(activeDocument.layers)
    function scanAll(layers)
    {
        for (var i = 0; i < layers.length; i++)
        {
               log(">"+layers[i]+"  ii:"+layers[i].itemIndex)
            var layer = Kinase.layer.getLayerDOMObject_byItemIndex(layers[i].itemIndex)
            z++;
           
            if (layer.itemIndex != layers[i].itemIndex)
            {
                alert("err:" + layers[i].itemIndex + "!=" + layer.itemIndex)
            }
    

            if ((layers[i].typename == "LayerSet"))
            {
                    log(">>>LayerSet"+layers[i] +"  ii:"+layers[i].itemIndex)
                scanAll(layers[i].layers)
            }
        }
    }

log(timeOut(startTime))
log(z)

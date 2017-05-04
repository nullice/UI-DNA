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


log(timeOut(startTime))
log(z)

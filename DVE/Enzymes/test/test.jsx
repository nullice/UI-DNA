$.evalFile(File($.fileName).path + "/../Muclease_lib.jsx");
$.evalFile(File($.fileName).path + "/../Kinase_lib.jsx");
var mu = new Muclease();
var ki =  Kinase;
// task -------------------------------------


// base ----------------------------------------

var debug_log = "";

//输出信息到控制台并记录到日志，以供使用 logSave() 输出到文件
function log(info)
{
    $.writeln(info);
    debug_log = debug_log + info + "\n";
}


function logSave()
{
    var f = new File(File($.fileName).path + "/debug.log");
    f.open("w");
    f.write(debug_log);
}


function obo_af(in_af)
{
    var ob = mu.actionReferenceToObject(in_af);
    var af = mu.objectToActionReference(ob);

    if (mu.actionReferenceToJSON(in_af) != mu.actionReferenceToJSON(af))
    {
        log("// ERR--------------------");
    }

    log(mu.actionReferenceToJSON(in_af));
    log(mu.actionReferenceToJSON(af));

}

function obo_ad(in_af)
{
    var ob = mu.actionDescriptorToObject(in_af);
    var ad = mu.objectToActionDescriptor(ob);
    log("//===============================");
    if (mu.actionDescriptorToJSON(in_af) != mu.actionDescriptorToJSON(ad))
    {
        log("//ERR--------------------");
    }

    log(mu.actionDescriptorToJSON(in_af));
    log("//------");
    log(mu.actionDescriptorToJSON(ad));

}


function see(ob)
{

    var str = "\n"
    for (var i  in ob)
    {
        try
        {
            str += i + ":" + ob[i] + "\n";
        } catch (e)
        {
        }

    }

    alert(str)

}

function json(ob)
{
    return JSON.stringify(ob);
}


function seeLayers_byID(arr)
{
    log("seeLayers_byID" + arr)
    for (var i = 0; i < arr.length; i++)
    {
        log(arr[i] + ":" + "(" + ki.layer.getItemIndexBylayerID(arr[i]) +
            ")" + ki.layer.getLayerName_byID(arr[i]));
    }
}

function seeLayers_byItemIndex(arr)
{
    log("seeLayers_byItemIndex" + arr)
    for (var i = 0; i < arr.length; i++)
    {
        try
        {
            log("#"+ki.layer.getLayerIdByItemIndex(arr[i]) + ":" + "(" + arr[i] +
                ")" + ki.layer.getLayerName_byItemIndex(arr[i]));
        } catch (e)
        {
            log(i + "=" + arr[i] + ":err")
        }

    }
}







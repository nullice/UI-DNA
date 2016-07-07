$.evalFile(File($.fileName).path + "/Muclease_lib.jsx")

mu = new Muclease();


var ref50 = new ActionReference();
var idPrpr = charIDToTypeID("Prpr");
var idLefx = charIDToTypeID("Lefx");
ref50.putProperty(idPrpr, idLefx);

// var idLyr = charIDToTypeID("Lyr ");
// var idOrdn = charIDToTypeID("Ordn");
// var idTrgt = charIDToTypeID("Trgt");
// ref50.putEnumerated(idLyr, idOrdn, idTrgt);




//$.writeln(mu.actionDescriptorToJSON(desc207));

//mu.actionReferenceToJSON(ref50)

//$.writeln(mu.actionReferenceToJSON(ref50));


var ob = mu.actionReferenceToObject(ref50);


var af = mu.objectToActionReference(ob);


$.writeln(mu.actionReferenceToJSON(ref50));
$.writeln(mu.actionReferenceToJSON(af));


function see(ob)
{

    var str="\n"
    for (var i  in ob)
    {
        try
        {
            str+=i +":" +ob[i]+"\n";
        } catch (e)
        {
        }

    }

    alert(str)

}


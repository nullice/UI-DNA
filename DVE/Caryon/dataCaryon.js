/**
 * Created by bgllj on 2016/9/7.
 */



var DataCaryon = function ()
{
    this.layers = {999: DataCaryon.prototype.layerSample};//{id:{...}...}
    this.selectLayers = [];
    return this;
}


DataCaryon.prototype.layerSample = {
    name: "图层名",
    id: 2,
    index: 1,
    position: {x: 0, y: 0, w: 0, h: 0, assignment: {x: "100+y", y: "dddd"}, enableAssigns: {x: false}},

}


DataCaryon.prototype.addLayer = function (layerListItem)
{
    this.layers[layerListItem.id] = {
        name: layerListItem.name,
        id: layerListItem.id,
        index: layerListItem.index
    }
}


DataCaryon.prototype.save = async function ()
{
    await  enzymes.writeJSON("__UI-DNA__", "_DNA_DATA_", JSON.stringify(this.layers));
}


DataCaryon.prototype.load = async function ()
{
    // await  enzymes.writeJSON("__UI-DNA__", "_DNA_DATA_", JSON.stringify(this.layers));
   var dataJson = await enzymes.readJSON("__UI-DNA__", "_DNA_DATA_")

    this.layers = JSON.parse(dataJson)

}



var Layer = function (layerListItem)
{
    this.name = null;
    this.id = null;
    this.index = null;
    this.position = {
        x: null, y: null, w: null, h: null,
        assignment: {x: null, y: null, w: null, h: null},
        enableAssigns: {x: false, y: false, w: false, h: false}
    }


    // Object.defineProperty(this, "id", { get: function () { return 1 + 1; } });

    return this;
}

//----------------------------------------

export default DataCaryon;

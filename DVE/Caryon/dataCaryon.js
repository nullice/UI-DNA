/**
 * Created by bgllj on 2016/9/7.
 */

import OBJ from "./Richang_JSEX/objectOBJ"

var DataCaryon = function ()
{

    this._layers = {
        // "test": {999: DataCaryon.prototype.layerSample}
    }

    this.layers = null;
    this._nowDoucmentId = null;
    Object.defineProperty(this, "nowDoucmentId",
        {
            set: function (x)
            {
                if (x != undefined)
                {
                    if (this._layers[x] == undefined)
                    {
                        this._layers[x] = {}
                        this.layers = this._layers[x];

                    } else
                    {
                        this.layers = this._layers[x];
                    }
                }
                this._nowDoucmentId = x;

            },
            get: function ()
            {
                return this._nowDoucmentId;
            }
        }
    );


    this.selectLayers = [];

    this.info = {};
    this.info._status = {_default: {saved: false, saving: false, _id: "default"}};
    this.info.status = this.info._status._default;


    this.switchDocment()
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
    this.info.status.saving = true;
    await  enzymes.writeJSON("__UI-DNA__", "_DNA_DATA_", JSON.stringify(this.layers));


    this.info.status.saved = true;
    this.info.status.saving = false;
}


DataCaryon.prototype.load = async function ()
{
    // await  enzymes.writeJSON("__UI-DNA__", "_DNA_DATA_", JSON.stringify(this.layers));
    var dataJson = await enzymes.readJSON("__UI-DNA__", "_DNA_DATA_")
    console.log("【DataCaryon.load】", dataJson)
    this.layers = JSON.parse(dataJson)

}

DataCaryon.prototype.switchDocment = async function ()
{

    // await  enzymes.writeJSON("__UI-DNA__", "_DNA_DATA_", JSON.stringify(this.layers));
    var docId = await enzymes.getActiveDocumentId()


    if (docId != undefined)
    {
        console.log("【switchDocment】：" + docId)
        this.nowDoucmentId = docId; //切换当前 layers


        console.log(this.layers)
        if (this.layers == undefined || OBJ.isEmptyObject(this.layers))
        {
            console.log("load");
            this.load();
        }


        if (this.info._status[docId] == undefined)
        {

            Vue.set(this.info._status, docId, {saved: false, saving: false, _id: docId})
            console.log({saved: false, saving: false}, docId, this.info._status[docId])

            this.info.status = this.info._status[docId];

        } else
        {
            this.info.status = this.info._status[docId];
        }


    }
    Gob.updateSelect();
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

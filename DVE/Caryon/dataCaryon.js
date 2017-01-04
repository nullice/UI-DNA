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

    var ob = JSON.parse(dataJson);
    if (ob != undefined)
    {
        this.layers = ob;
        this.info.status.saved = true;
    }


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
        x: null, y: null, w: null, h: null, $anchor: null,
        assignment: {x: null, y: null, w: null, h: null},
        enableAssigns: {x: false, y: false, w: false, h: false}
    }
    this.text = {
        text: null,
        color: {r: null, g: null, b: null},
        size:null, /*字体尺寸*/
        fontPostScriptName:null, /*字体*/
        bold:null,/*仿粗体*/
        italic:null,/*仿斜体*/
        antiAlias:null,/*消除锯齿方式*/
        underline:null,/*下划线类型*/
        justification:null,/*段落对齐方式*/
        leading:null,/*行距*/
        tracking:null,/*字符间距*/
        baselineShift: null, /*基线偏移*/
        horizontalScale:null,/*水平缩放*/
        verticalScale: null, /*垂直缩放*/
        $enableFormula: null,
        assignment: {
            text: null, 
            color: null,
            size:null, /*字体尺寸*/
            fontPostScriptName:null, /*字体*/
            bold:null,/*仿粗体*/
            italic:null,/*仿斜体*/
            antiAlias:null,/*消除锯齿方式*/
            underline:null,/*下划线类型*/
            justification:null,/*段落对齐方式*/
            leading:null,/*行距*/
            tracking:null,/*字符间距*/
            baselineShift: null, /*基线偏移*/
            horizontalScale:null,/*水平缩放*/
            verticalScale: null, /*垂直缩放*/
            $enableFormula: null,
        },
        enableAssigns: {
            text: false,
            color: false,
            size:false, /*字体尺寸*/
            fontPostScriptName:false, /*字体*/
            bold:false,/*仿粗体*/
            italic:false,/*仿斜体*/
            antiAlias:false,/*消除锯齿方式*/
            underline:false,/*下划线类型*/
            justification:false,/*段落对齐方式*/
            leading:false,/*行距*/
            tracking:false,/*字符间距*/
            baselineShift: false, /*基线偏移*/
            horizontalScale:false,/*水平缩放*/
            verticalScale: false, /*垂直缩放*/
            $enableFormula: false,
        }
    }

    this.shape =
    {
        strokeColor: {r: null, g: null, b: null}, /*描边颜色*/
        strokeColorEnabled: null, /*启用描边*/
        fillColor: {r: null, g: null, b: null}, /*填充颜色*/
        fillColorEnabled: null, /*启用填充*/
        lineWidth: null, /*边线宽度*/
        dashSet: null, /*虚线设置*/
        lineAlignment: null, /*描边选项-对齐*/
        lineCapType: null, /*描边选项-端点*/
        lineJoinType: null, /*描边选项-角点*/
        // shapeSize: {x: null, y: null, h: null, w: null}, /*形状尺寸*/
        // radian: {
        //     /*圆角*/
        //     topRight: null,
        //     topLeft: null,
        //     bottomRight: null,
        //     bottomLeft: null,
        // },
        assignment: {
            strokeColor: null,
            strokeColorEnabled: null,
            fillColor: null,
            fillColorEnabled: null, /*启用填充*/
            lineWidth: null, /*边线宽度*/
            dashSet: null, /*虚线设置*/
            lineAlignment: null, /*描边选项-对齐*/
            lineCapType: null, /*描边选项-端点*/
            lineJoinType: null, /*描边选项-角点*/
            shapeSize: {x: null, y: null, h: null, w: null},
            radian: {
                /*圆角*/
                topRight: null,
                topLeft: null,
                bottomRight: null,
                bottomLeft: null,
            }
        },
        enableAssigns: {
            strokeColor: false,
            strokeColorEnabled: false,
            fillColor: false,
            fillColorEnabled: false, /*启用填充*/
            lineWidth: false, /*边线宽度*/
            dashSet: false, /*虚线设置*/
            lineAlignment: false, /*描边选项-对齐*/
            lineCapType: false, /*描边选项-端点*/
            lineJoinType: false, /*描边选项-角点*/
            shapeSize: {x: false, y: false, h: false, w: false},
            radian: {
                /*圆角*/
                topRight: false,
                topLeft: false,
                bottomRight: false,
                bottomLeft: false,
            }
        }
    }

    // Object.defineProperty(this, "id", { get: function () { return 1 + 1; } });
    return this;
}

//----------------------------------------

export default DataCaryon;

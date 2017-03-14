/**
 * Created by bgllj on 2016/9/7.
 */

import OBJ from "./Richang_JSEX/objectOBJ"


/**
 * 数据存储核心
 * dataCaryon.layers 图层数据
 * dataCaryon.doc 文档数据
 * @returns {DataCaryon}
 * @constructor
 */
var DataCaryon = function ()
{


    //实际存储属性
    this._layers = {}
    this._doc = {}

    //直接获取属性，文档切换时，通过 this.switchDocment() ，映射到不同的实际存储
    this.layers = null;
    this.doc = null;
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


                    if (this._doc[x] == undefined)
                    {
                        this._doc[x] = {}
                        this.doc = this._doc[x];

                    } else
                    {
                        this.doc = this._doc[x];
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


    var dataOb = {
        layers: this.layers,
        doc: this.doc,
        vars: varSystem.vars
    }

    await  enzymes.writeJSON("__UI-DNA__", "_DNA_DATA_", JSON.stringify(dataOb));


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
        if (ob.layers != undefined)
        {
            this.layers = ob.layers;
        }

        if (ob.doc != undefined)
        {
            this.doc = ob.doc;
        }

        if (ob.vars != undefined)
        {
            varSystem.loadVarsFromObject(ob.vars)
        }

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
        color: {r: null, g: null, b: null, $hex: null},
        size: null, /*字体尺寸*/
        fontPostScriptName: null, /*字体*/
        bold: null, /*仿粗体*/
        italic: null, /*仿斜体*/
        antiAlias: null, /*消除锯齿方式*/
        underline: null, /*下划线类型*/
        justification: null, /*段落对齐方式*/
        leading: null, /*行距*/
        tracking: null, /*字符间距*/
        baselineShift: null, /*基线偏移*/
        horizontalScale: null, /*水平缩放*/
        verticalScale: null, /*垂直缩放*/
        $enableTextFormula: null,
        assignment: {
            text: null,
            color: null,
            size: null, /*字体尺寸*/
            fontPostScriptName: null, /*字体*/
            bold: null, /*仿粗体*/
            italic: null, /*仿斜体*/
            antiAlias: null, /*消除锯齿方式*/
            underline: null, /*下划线类型*/
            justification: null, /*段落对齐方式*/
            leading: null, /*行距*/
            tracking: null, /*字符间距*/
            baselineShift: null, /*基线偏移*/
            horizontalScale: null, /*水平缩放*/
            verticalScale: null, /*垂直缩放*/
            $enableTextFormula: null,
        },
        enableAssigns: {
            text: false,
            color: false,
            size: false, /*字体尺寸*/
            fontPostScriptName: false, /*字体*/
            bold: false, /*仿粗体*/
            italic: false, /*仿斜体*/
            antiAlias: false, /*消除锯齿方式*/
            underline: false, /*下划线类型*/
            justification: false, /*段落对齐方式*/
            leading: false, /*行距*/
            tracking: false, /*字符间距*/
            baselineShift: false, /*基线偏移*/
            horizontalScale: false, /*水平缩放*/
            verticalScale: false, /*垂直缩放*/
            $enableTextFormula: false,
        }
    }

    this.shape =
        {
            strokeColor: {r: null, g: null, b: null, $hex: null}, /*描边颜色*/
            strokeColorEnabled: null, /*启用描边*/
            fillColor: {r: null, g: null, b: null, $hex: null}, /*填充颜色*/
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

    this.smartObject =
        {
            linked: null, /*是否为链接对象*/
            link: null, /*链接地址*/
            fileReference: null, /*链接文件名*/
            assignment: {linked: null, link: null, fileReference: null},
            enableAssigns: {linked: false, link: false, fileReference: false}
        }

    this.quickEffect =
        {
            dropShadow: {
                enable: null,
                color: {r: null, g: null, b: null, $hex: null}, /*填充颜色*/
                opacity: null, /*透明度*/
                x: null,
                y: null,
                blur: null, /*大小*/
                spread: null, /*扩展*/
            },
            copyEffect_All: null,
            copyEffect_dropShadow: null, /*阴影*/
            copyEffect_innerShadow: null, /*内阴影*/
            copyEffect_chromeFX: null, /*等高线*/
            copyEffect_frameFX: null, /*纹理*/
            copyEffect_bevelEmboss: null, /*斜面与浮雕*/
            copyEffect_innerGlow: null, /*内发光*/
            copyEffect_outerGlow: null, /*外发光*/
            copyEffect_patternFill: null, /*内部填充*/
            copyEffect_solidFill: null, /*描边*/
            copyEffect_gradientFill: null, /*渐变*/


            assignment: {
                dropShadow: {
                    enable: null,
                    color: null, /*填充颜色*/
                    opacity: null, /*透明度*/
                    x: null,
                    y: null,
                    blur: null, /*大小*/
                    spread: null, /*扩展*/
                },
                copyEffect_All: null,
                copyEffect_dropShadow: null, /*阴影*/
                copyEffect_innerShadow: null, /*内阴影*/
                copyEffect_chromeFX: null, /*等高线*/
                copyEffect_frameFX: null, /*纹理*/
                copyEffect_bevelEmboss: null, /*斜面与浮雕*/
                copyEffect_innerGlow: null, /*内发光*/
                copyEffect_outerGlow: null, /*外发光*/
                copyEffect_patternFill: null, /*内部填充*/
                copyEffect_solidFill: null, /*描边*/
                copyEffect_gradientFill: null, /*渐变*/
            },
            enableAssigns: {
                dropShadow: {
                    enable: false,
                    color: false, /*填充颜色*/
                    opacity: false, /*透明度*/
                    x: false,
                    y: false,
                    blur: false, /*大小*/
                    spread: false, /*扩展*/
                },
                copyEffect_All: false,
                copyEffect_dropShadow: false, /*阴影*/
                copyEffect_innerShadow: false, /*内阴影*/
                copyEffect_chromeFX: false, /*等高线*/
                copyEffect_frameFX: false, /*纹理*/
                copyEffect_bevelEmboss: false, /*斜面与浮雕*/
                copyEffect_innerGlow: false, /*内发光*/
                copyEffect_outerGlow: false, /*外发光*/
                copyEffect_patternFill: false, /*内部填充*/
                copyEffect_solidFill: false, /*描边*/
                copyEffect_gradientFill: false, /*渐变*/
            }
        }

    this.more =
        {
            layerName: null, /*图层名*/
            $alias: null, /*别名*/
            $nameGroup0: null, /*名称组*/
            $nameGroup1: null,
            $nameGroup2: null,
            $nameGroup3: null,
            $nameGroup4: null,
            $nameGroup5: null,
            $nameGroup6: null,
            $nameGroup7: null,
            $nameGroup8: null,
            $nameGroup9: null,
            $class: null, /*图层类*/
            $tags: null, /*标签*/
            $note1: null, /*图层备注1*/
            $note2: null, /*图层备注1*/
            $note3: null, /*图层备注1*/
            visible: null, /*图层可视性*/
            layerColor: null, /*图层备注颜色*/
            mode: null, /*混合模式*/
            opacity: null, /*不透明度*/
            fillOpacity: null, /*填充不透明度*/

            assignment: {
                layerName: null, /*图层名*/
                $alias: null, /*别名*/
                $nameGroup0: null, /*名称组*/
                $nameGroup1: null,
                $nameGroup2: null,
                $nameGroup3: null,
                $nameGroup4: null,
                $nameGroup5: null,
                $nameGroup6: null,
                $nameGroup7: null,
                $nameGroup8: null,
                $nameGroup9: null,
                $class: null, /*图层类*/
                $tags: null, /*标签*/
                $note1: null, /*图层备注1*/
                $note2: null, /*图层备注1*/
                $note3: null, /*图层备注1*/
                visible: null, /*图层可视性*/
                layerColor: null, /*图层备注颜色*/
                mode: null, /*混合模式*/
                opacity: null, /*不透明度*/
                fillOpacity: null, /*填充不透明度*/
            },

            enableAssigns: {
                layerName: false, /*图层名*/
                $alias: false, /*别名*/
                $nameGroup0: false, /*名称组*/
                $nameGroup1: false,
                $nameGroup2: false,
                $nameGroup3: false,
                $nameGroup4: false,
                $nameGroup5: false,
                $nameGroup6: false,
                $nameGroup7: false,
                $nameGroup8: false,
                $nameGroup9: false,
                $class: false, /*图层类*/
                $tags: false, /*标签*/
                $note1: false, /*图层备注1*/
                $note2: false, /*图层备注1*/
                $note3: false, /*图层备注1*/
                visible: false, /*图层可视性*/
                layerColor: false, /*图层备注颜色*/
                mode: false, /*混合模式*/
                opacity: false, /*不透明度*/
                fillOpacity: false, /*填充不透明度*/
            }
        }


    // Object.defineProperty(this, "id", { get: function () { return 1 + 1; } });
    return this;
}

/**
 * 以数组形式获取一个图层在 DataCaryon 里的 tags
 * @param layerId
 * @returns {*}
 */
DataCaryon.prototype.layerTags_getArray = function (layerId)
{
    if (this.layers[layerId] == undefined || this.layers[layerId].more == undefined || this.layers[layerId].more.$tags == undefined)
    {
        return null
    }


    var tagsText = this.layers[layerId].more.$tags
    if (tagsText != undefined)
    {
        var arr = tagsText.split(/[,，]/)
        return arr
    } else
    {
        return null
    }
}

/**
 * 为一个在存在 DataCaryon 中的图层，检查 tag 是否存在
 * @param layerId
 * @param tag
 * @returns {*}
 */
DataCaryon.prototype.layerTags_hasTag = function (layerId, tag)
{
    if (this.layers[layerId] == undefined || this.layers[layerId].more == undefined || this.layers[layerId].more.$tags == undefined)
    {
        return null
    }

    var arr = this.layerTags_getArray(layerId)
    if (arr == undefined)
    {
        return false
    }

    for (var i = 0; i < arr.length; i++)
    {

        if (arr[i] == tag)
        {
            return true
        }
    }
    return false
}

/**
 * 为一个在存在 DataCaryon 中的图层，添加一个 tags 条目
 * @param layerId
 * @returns {null}
 */
DataCaryon.prototype.layerTags_addTags = function (layerId, tag)
{
    if (this.layers[layerId] == undefined)
    {
        return null
    }

    if (this.layers[layerId].more == undefined)
    {
        this.layers[layerId].more = {}
    }

    if (this.layers[layerId].more.$tags == undefined)
    {
        this.layers[layerId].more.$tags = ""
    }


    if(this.layerTags_hasTag(layerId, tag))
    {
        return null /*已存在*/
    }

    var tagsText = this.layers[layerId].more.$tags
    if (tagsText == undefined || tagsText == "")
    {
        this.layers[layerId].more.$tags = tag
    } else
    {
        this.layers[layerId].more.$tags = tagsText + ", " + tag
    }
}


/**
 * 为一个在存在 DataCaryon 中的图层，删除一个 tags 条目
 * @param layerId
 * @param tag
 * @returns {null}
 */
DataCaryon.prototype.layerTags_deleteTags = function (layerId, tag)
{
    if (this.layers[layerId] == undefined || this.layers[layerId].more == undefined || this.layers[layerId].more.$tags == undefined)
    {
        return null
    }

    var arr = this.layerTags_getArray(layerId)
    var newText = ""
    for (var i = 0; i < arr.length; i++)
    {
        if (arr[i] != tag)
        {
            newText = newText + arr[i]
            if (i < arr.length - 1)
            {
                newText = newText + ", "
            }
        }
    }
    this.layers[layerId].more.$tags = newText
}


//----------------------------------------

export default DataCaryon;

/**
 * Created by bgllj on 2016/10/9.
 */


import ARR from "./Richang_JSEX/arrayARR.js"
import TYP from "./Richang_JSEX/typeTYP.js"

var RenderCaryon = function ()
{

    this.status = {
        rendering: false,
    }

    this._temp = {colorTemp: {}};

    return this;
}


RenderCaryon.prototype.test = async function (x)
{
    await enzymes.selectLayer_byID(5);
    await enzymes.setLayerInfo_position_byId({h: x}, 5)
    await enzymes.selectLayer_byID(6);
    await enzymes.setLayerInfo_position_byId({h: x}, 6)
    await enzymes.selectLayer_byID(7);
    await enzymes.setLayerInfo_position_byId({h: x}, 7)
}


/**
 * 局部渲染，渲染指定图层 ID 的指定属性组
 * @param layerId
 * @param names 属性组名称，如'position'
 * @param value
 * @param indepenSelect
 */
RenderCaryon.prototype.renderPatch = async function (layerId, names, value, indepenSelect)
{
    logger.group(`renderPatch: ", layerId:${layerId}, names:[${names}], value:${value}`)
    this.status.rendering = true;// 标记渲染状态，会触发渲染按钮动画

    var item = names[names.length - 1];
    var _lastButOneName = names[names.length - 2] //最终属性前一个属性名称（倒数第二个属性名）
    var namesLen = names.length;

    //-------------------------------------------------
    var ignore = false // 是否忽略本次渲染

    if (_lastButOneName == "color")//忽略 color.r/g/b 的渲染，使用 $hex 来触发渲染
    {
        if (item != "$hex")
        {
            ignore = true;
        }
    }

    if (_inArray(item, ["assignment", "$enableFormula", "enableAssigns"]))//忽略 color.r/g/b
    {
        ignore = true;
    }


    //-------------------------------------------------


    if (ignore) //忽略本次渲染
    {
        console.log("----[ignore: renderPatch]----")
    }
    else //执行本次渲染
    {
        if (names[0] === "position")
        {
            logger.pin("renderPatch", "RenderCaryon.prototype.renderPatch ", "----[start:RenderCaryon：position:" + layerId + "]---")
            if ((namesLen == 2 ) && _inArray(item, ["x", "y", "w", "h"]))
            {
                var ob = {};
                ob[item] = value;

                Gob.stopSelectEvent = true;//渲染开始，关闭图层选中事件监听
                await enzymes.selectLayer_byID(layerId);
                logger.pin("enzymes", "RenderCaryon.prototype.renderPatch ", `enzymes.setLayerInfo_position_byId(${JSON.stringify(ob)}, ${layerId})`)
                /*****************************************************/
                await enzymes.setLayerInfo_position_byId(ob, layerId)
                /*****************************************************/
                Gob.stopSelectEvent = false;//渲染结束，关闭图层选中事件监听

            }
        }
        if (names[0] === "text")
        {
            console.log("----[start:RenderCaryon：text:" + layerId + "]---")
            if (namesLen == 2)
            {
                var ob = {};

                if (item == "bold" || item == "italic")
                {
                    value = (value == "true")
                }
                ob[item] = value;
            }

            if (namesLen == 3)
            {
                if (_lastButOneName = "color")
                {
                    var ob = hexToColorOb(value);
                }

            }

            Gob.disableSelectEvent = true;//渲染开始，关闭图层选中事件监听
            await enzymes.selectLayer_byID(layerId);
            console.log(`enzymes.setLayerInfo_text_byId(${JSON.stringify(ob)}, ${layerId})`)
            /************************************************/
            await enzymes.setLayerInfo_text_byId(ob, layerId)
            /************************************************/
            Gob.disableSelectEvent = false;//渲染结束，关闭图层选中事件监听


        }
        if (names[0] === "shape")
        {
            console.log("----[start:RenderCaryon：shape:" + layerId + "]---")
            if (names.length == 2)
            {
                var ob = {};
                ob[item] = value;
            }

            if (namesLen == 3)
            {
                if (_lastButOneName == "color")
                {
                    var ob = hexToColorOb(value);
                } else
                {
                    var ob = {}
                    ob[_lastButOneName] = {}
                    ob[_lastButOneName][item] = value;
                }
            }

            Gob.disableSelectEvent = true;//渲染开始，关闭图层选中事件监听
            await enzymes.selectLayer_byID(layerId);
            console.log(`enzymes.setLayerInfo_shape_byId(${JSON.stringify(ob)}, ${layerId})`)
            /************************************************/
            await enzymes.setLayerInfo_shape_byId(ob, layerId)
            /************************************************/
            Gob.disableSelectEvent = false;//渲染结束，关闭图层选中事件监听


        }
        if (names[0] === "smartObject")
        {
            console.log("----[start:RenderCaryon：smartObject:" + layerId + "]---")
            if (names.length == 2)
            {
                var ob = {};
                ob[item] = value;
            }

            if(item=="link")
            {
                ob.linked = true
            }

            Gob.disableSelectEvent = true;//渲染开始，关闭图层选中事件监听
            await enzymes.selectLayer_byID(layerId);
            console.log(`enzymes.setLayerInfo_smartObject_byId(${JSON.stringify(ob)}, ${layerId})`)
            /************************************************/
            await enzymes.setLayerInfo_smartObject_byId(ob, layerId)
            /************************************************/
            Gob.disableSelectEvent = false;//渲染结束，关闭图层选中事件监听

            Gob.updateGob(true);

        }

        logger.pin("renderPatch", "RenderCaryon.prototype.renderPatch ", "----[end：RenderCaryon：" + layerId + "]---")
    }





    this.status.rendering = false;// 标记渲染状态结束，停止渲染按钮动画

    logger.groupEnd();

//END-------------------
    function hexToColorOb(hex)
    {
        ichiColor.set(hex);
        var ob = {color: {"r": ichiColor.r, "g": ichiColor.g, "b": ichiColor.b}}
        return ob
    }
}


/**
 * renderDocument() 变量赋值阶段使用的图层查询·缓存
 * @type {{rootName: null, layerId: null, cache: null}}
 * @private
 */
RenderCaryon.prototype.__getLayerData_cache = {rootName: null, layerId: null, cache: null}

RenderCaryon.prototype._getLayerData = async function (rootName, name, layerId)
{

    console.log("_getLayerData:", rootName, name, layerId)
    //调用缓存：
    if ((this.__getLayerData_cache.rootName == rootName) && (this.__getLayerData_cache.layerId == layerId))
    {
        return this.__getLayerData_cache.cache[name];
    }


    if (rootName == "position")
    {
        console.log("_getLayerData:getLayerInfo_position_byId")
        var position = await enzymes.getLayerInfo_position_byId(layerId)

        this.__getLayerData_cache.rootName = rootName;
        this.__getLayerData_cache.layerId = layerId;
        this.__getLayerData_cache.cache = position;

        return position[name];
    }

}


/**
 * 渲染当前文档
 */
RenderCaryon.prototype.renderDocument = async function (varUpdateMode, varUpdateList)
{
    this.status.rendering = true;
    var _this = this;

    console.log("START【renderDocument】----------------")
//  1、变量赋值-------------------------------------------------------------------
    console.log("1、变量赋值------------:")
    this.__getLayerData_cache.layerId = null;

    for (var layerId in dataCaryon.layers)
    {
        if (dataCaryon.layers[layerId].position != undefined)
        {
            await _doAssign(dataCaryon.layers[layerId], "position")
            await _doAssign(dataCaryon.layers[layerId], "text")
        }
    }

    console.log(varSystem.vars)

    async function _doAssign(layer, propertyName)
    {
        if (layer[propertyName].assignment != undefined)
        {
            console.log("_doAssign: assignment：", layer[propertyName].assignment)
            for (var n in layer[propertyName].assignment)
            {
                if ((layer[propertyName].enableAssigns != undefined ) && (layer[propertyName].enableAssigns[n] == true))
                {
                    if (layer[propertyName][n] != undefined)
                    {
                        if (varSystem.isFormula(layer[propertyName][n]))
                        {
                            var getValue = await varSystem.evalVar(layer[propertyName][n]);
                        } else
                        {
                            var getValue = layer[propertyName][n];
                        }
                    } else
                    {
                        var getValue = await _this._getLayerData(propertyName, n, layer.id);
                    }
                    var _varNames = layer[propertyName].assignment[n].split((/[,，]/));//-----多个赋值："xx,ddd，cc"
                    for (var i = 0; i < _varNames.length; i++)
                    {
                        if (varSystem.vars[_varNames[i]] != undefined)
                        {
                            console.log("_doAssign: setVarr:" + _varNames[i] + "=" + getValue)
                            varSystem.vars[_varNames[i]].value = getValue;
                        }

                    }

                }
            }

        }
    }


//  2、表达式解析-------------------------------------------------------------------
    console.log("2、表达式解析------------:")
    var mRNA_DataLayers = {}


    var lastId = null;

    for (var layerId in dataCaryon.layers)
    {
        console.info("start _ id" + layerId)
        mRNA_DataLayers[layerId] = {};
        var temp = await _copyValue(dataCaryon.layers[layerId], layerId, mRNA_DataLayers[layerId]);
        console.info("end _ id" + layerId)
    }


    /**
     * 拷贝对象指定属性属性到另一个对象
     * @param object
     * @param layerId
     * @param toObject
     * @private
     */
    async function _copyValue(object, layerId, toObject)
    {
        // console.log("_copyValue:", object, layerId, toObject)
        for (var x in object)
        {
            if (ARR.hasMember(["assignment", "enableAssigns"], x) === false)
            {
                if (ARR.hasMember(["name", "id", "index"], x))
                {
                    toObject[x] = object[x];
                } else
                {
                    if (TYP.type(object[x]) === "object")
                    {
                        toObject[x] = {};
                        // console.log(`_copyValue(${object[x]}, ${layerId}, ${toObject[x]})`)
                        await _copyValue(object[x], layerId, toObject[x])

                    }
                    else
                    {
                        if (x === "text")
                        {
                            if (object["$enableFormula"])
                            {
                                var enableFormulaEval = true;
                            }
                        }
                        else
                        {
                            var enableFormulaEval = varSystem.isFormula(object[x]);
                        }
                        if (enableFormulaEval)
                        {
                            toObject[x] = await varSystem.evalVar(object[x]);
                        } else
                        {
                            toObject[x] = object[x];
                        }
                    }
                }
            }
        }
        //
        // // console.log("mRNA_DataLayers:", mRNA_DataLayers)
        // // console.log("toObject:", toObject)
        // return;
    }

    console.log("mRNA_DataLayers", mRNA_DataLayers)

//  3、ExtendScript 端渲染-------------------------------------------------------------------
    console.log("3、ExtendScript 端渲染")
    await enzymes.DNAExpress(mRNA_DataLayers, varSystem.vars)
    this.status.rendering = false;
}


/**
 * 值是否出现在数组中
 * @param name
 * @param array
 * @returns {boolean}
 * @private
 */
function _inArray(name, array)
{
    for (var x in array)
    {
        if (name == array[x])
        {
            return true;
        }
    }
    return false;
}
//--------------------------------
export default RenderCaryon;

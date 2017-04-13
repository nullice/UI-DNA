/**
 * Created by bgllj on 2016/10/9.
 */


import ARR from "./Richang_JSEX/arrayARR.js"
import TYP from "./Richang_JSEX/typeTYP.js"
import OBJ from "./Richang_JSEX/objectOBJ.js"


var RenderCaryon = function ()
{

    this.status = {
        rendering: false,
    }

    this._temp = {colorTemp: {}};
    this.stopRenderPatch = false;
    /*暂停局部渲染 flag*/
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
RenderCaryon.prototype.renderPatch = async function (layerId, names, value, notSelectLayer, activeLayer)
{
    if (Gob._unripe)
    {
        logger.info("[未准备好的渲染触发]", `renderPatch: ", layerId:${layerId}, names:[${names}], value:${value}`)
        return
    }

    if (this.stopRenderPatch)
    {
        return;
    }


    logger.group(`renderPatch: ", layerId:${layerId}, names:[${names}], value:${value}`)
    this.status.rendering = true;// 标记渲染状态，会触发渲染按钮动画

    var item = names[names.length - 1];
    var _lastButOneName = names[names.length - 2] //最终属性前一个属性名称（倒数第二个属性名）
    var namesLen = names.length;

    //-------------------------------------------------
    var ignore = false // 是否忽略本次渲染

    if (ARR.hasMember(["color", "fillColor", "strokeColor"], _lastButOneName))//忽略 color.r/g/b 的渲染，使用 $hex 来触发渲染
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
        Gob.stopSelectEvent = true;//渲染开始，关闭图层选中事件监听
        Gob.disableSelectEvent = true
        if (notSelectLayer)
        {

        } else
        {
            await enzymes.selectLayer_byID(layerId);
        }

        if (names[0] === "position")
        {
            logger.pin("renderPatch", "RenderCaryon.prototype.renderPatch ", "----[start:RenderCaryon：position:" + layerId + "]---")
            if ((namesLen == 2 ) && _inArray(item, ["x", "y", "w", "h"]))
            {
                var ob = {};
                ob[item] = value;


                if (Gob.position.$anchor != Gob.MULT)
                {
                    ob.centerState = Gob.position.$anchor
                }


                logger.pin("enzymes", "RenderCaryon.prototype.renderPatch ", `enzymes.setLayerInfo_position_byId(${JSON.stringify(ob)}, ${layerId})`)
                /*****************************************************/
                await enzymes.setLayerInfo_position_byId(ob, layerId)
                /*****************************************************/
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

            console.log(`enzymes.setLayerInfo_text_byId(${JSON.stringify(ob)}, ${layerId})`)
            /************************************************/
            await enzymes.setLayerInfo_text_byId(ob, layerId)
            /************************************************/

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
                if (ARR.hasMember(["color", "fillColor", "strokeColor"], _lastButOneName))
                {

                    var ob = hexToColorOb(value, _lastButOneName);
                } else
                {
                    var ob = {}
                    ob[_lastButOneName] = {}
                    ob[_lastButOneName][item] = value;
                }
            }

            console.log(`enzymes.setLayerInfo_shape_byId(${JSON.stringify(ob)}, ${layerId})`)
            /************************************************/
            await enzymes.setLayerInfo_shape_byId(ob, layerId)
            /************************************************/

        }
        if (names[0] === "smartObject")
        {
            console.log("----[start:RenderCaryon：smartObject:" + layerId + "]---")
            if (names.length == 2)
            {
                var ob = {};
                ob[item] = value;
            }

            if (item == "link")
            {
                ob.linked = true
            }

            console.log(`enzymes.setLayerInfo_smartObject_byId(${JSON.stringify(ob)}, ${layerId})`)
            /************************************************/
            var newId = await enzymes.setLayerInfo_smartObject_byId(ob, layerId, true)
            /************************************************/
            // Gob.updateGob(true);
            var needUpdateGob = true


        }
        if (names[0] === "quickEffect")
        {
            console.log("----[start:RenderCaryon：quickEffect:" + layerId + "]---")
            if (names.length > 2)
            {
                var ob = {};
                ob[names[1]] = {}
                ob[names[1]][item] = value;

                if (namesLen > 3)
                {
                    if (_lastButOneName == "color")
                    {
                        ob[names[1]] = hexToColorOb(value);
                    }
                }

            } else
            {
                var ob = {};
                ob[item] = value;
            }

            console.log(`enzymes.setLayerInfo_quickEffect_byId(${JSON.stringify(ob)}, ${layerId})`)
            /************************************************/
            await enzymes.setLayerInfo_quickEffect_byId(ob, layerId)
            /************************************************/
        }
        if (names[0] === "more")
        {
            console.log("----[start:RenderCaryon：more:" + layerId + "]---")
            if (namesLen == 2)
            {
                var ob = {};
                ob[item] = value;
            }

            console.log(`enzymes.setLayerInfo_more_byId(${JSON.stringify(ob)}, ${layerId})`)
            /************************************************/
            await enzymes.setLayerInfo_more_byId(ob, layerId)
            /************************************************/


        }


        Gob.disableSelectEvent = false;//渲染结束，关闭图层选中事件监听
        Gob.stopSelectEvent = false
        logger.pin("renderPatch", "RenderCaryon.prototype.renderPatch ", "----[end：RenderCaryon：" + layerId + "]---")
    }


    this.status.rendering = false;// 标记渲染状态结束，停止渲染按钮动画

    logger.groupEnd();


    var re = {
        needUpdateGob: needUpdateGob,
        newId: newId
    }
    return re

//END-------------------
    function hexToColorOb(hex, colorObjectName)
    {
        ichiColor.set(hex);

        if (colorObjectName != undefined)
        {
            var ob = {}
            ob[colorObjectName] = {"r": ichiColor.r, "g": ichiColor.g, "b": ichiColor.b};

        }
        else
        {
            var ob = {color: {"r": ichiColor.r, "g": ichiColor.g, "b": ichiColor.b}}

        }

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

RenderCaryon.prototype._getLayerDataByNamse = async function (rootName, names, layerId)
{
    var self = this;

    console.log("_getLayerData:", rootName, "[" + names + "]", layerId)
    //调用缓存：
    if ((this.__getLayerData_cache.rootName == rootName) && (this.__getLayerData_cache.layerId == layerId))
    {
        return _returnFilter(OBJ.getObjectValueByNames(this.__getLayerData_cache.cache, names));
    }


    if (rootName == "position")
    {
        console.log("_getLayerData:getLayerInfo_position_byId")
        var position = await Gob.getLayerInfoObejct_position(layerId);

        _saveCache(position)
        return OBJ.getObjectValueByNames(position, names)
    }

    if (rootName == "text")
    {
        console.log("_getLayerData:getLayerInfo_text_byId")
        var text = await Gob.getLayerInfoObejct_text(layerId);

        _saveCache(text)
        return _returnFilter(OBJ.getObjectValueByNames(text, names))
    }

    if (rootName == "shape")
    {
        console.log("_getLayerData:getLayerInfo_shape_byId")
        var shape = await Gob.getLayerInfoObejct_shape(layerId);

        _saveCache(shape)
        return _returnFilter(OBJ.getObjectValueByNames(shape, names))
    }

    if (rootName == "smartObject")
    {
        console.log("_getLayerData:getLayerInfo_smartObject_byId")
        var smartObject = await Gob.getLayerInfoObejct_smartObject(layerId);
        _saveCache(smartObject)
        return _returnFilter(OBJ.getObjectValueByNames(smartObject, names))
    }

    if (rootName == "quickEffect")
    {
        console.log("_getLayerData:getLayerInfo_quickEffect_byId")
        var quickEffect = await Gob.getLayerInfoObejct_quickEffect(layerId, true);

        _saveCache(quickEffect)
        return _returnFilter(OBJ.getObjectValueByNames(quickEffect, names))
    }

    if (rootName == "more")
    {
        console.log("_getLayerData:getLayerInfo_more_byId")
        var more = await Gob.getLayerInfoObejct_more(layerId);

        _saveCache(more)
        return _returnFilter(OBJ.getObjectValueByNames(more, names))
    }


    function _saveCache(info)
    {
        self.__getLayerData_cache.rootName = rootName;
        self.__getLayerData_cache.layerId = layerId;
        self.__getLayerData_cache.cache = info;

    }

    function _returnFilter(value)
    {
        if (TYP.type(value) == "object")
        {
            if (value.$hex != undefined)
            {
                return value.$hex
            }
        }
        else
        {
            return value
        }

    }

}


/**
 * 渲染当前文档
 */
RenderCaryon.prototype.renderDocument = async function (varUpdateMode, varUpdateList)
{
    this.status.rendering = true;
    var _this = this;

    logger.group("----------------START【renderDocument】----------------")
    console.time("渲染文档耗时")

//  1、变量赋值-------------------------------------------------------------------
    /*把有 Assign 的图层属性赋值到 varSystem */
    console.group("1、变量赋值------------:")
    console.time("Assign_变量赋值耗时")
    this.__getLayerData_cache.layerId = null;
    varSystem.$count = 0;
    varSystem.$layerCount = 0;

    var allLayerArray = await  enzymes.getAllLayerArray()

    for (var layerId in dataCaryon.layers)
    {

        if (ARR.getByKey(allLayerArray, "id", layerId) == undefined)
        {
            console.log("layer - doAssign: skip deleted layer:", layerId)
            continue
        }


        console.group("layer:", dataCaryon.layers[layerId].name, dataCaryon.layers[layerId].id)
        var propertyNames = ["position", "text", "shape", "smartObject", "quickEffect", "more"]
        for (var i = 0; i < propertyNames.length; i++)
        {
            if (dataCaryon.layers[layerId][propertyNames[i]] != undefined)
            {
                // await _doAssign(dataCaryon.layers[layerId], propertyNames[i]);
                await _doAssignNames(dataCaryon.layers[layerId], propertyNames[i]);

            }
        }
        console.groupEnd()
    }

    console.log("varSystem.vars", varSystem.vars)
    console.timeEnd("Assign_变量赋值耗时")
    console.groupEnd()

    // /**
    //  * 执行分派变量
    //  * @param layer
    //  * @param propertyName
    //  * @returns {Promise.<void>}
    //  * @private
    //  */
    // async function _doAssign(layer, propertyName)
    // {
    //     if (layer[propertyName].assignment != undefined)
    //     {
    //         if (OBJ.isEmptyObject(layer[propertyName].assignment) != true)
    //         {
    //             console.log("_doAssign: assignment：", propertyName, layer[propertyName].assignment)
    //             for (var n in layer[propertyName].assignment)
    //             {
    //                 if ((layer[propertyName].enableAssigns != undefined ) && (layer[propertyName].enableAssigns[n] == true))
    //                 {
    //                     if (layer[propertyName][n] != undefined)
    //                     {
    //                         if (varSystem.isFormula(layer[propertyName][n]))
    //                         {
    //                             var getValue = await varSystem.evalVar(layer[propertyName][n]);
    //                         } else
    //                         {
    //                             var getValue = layer[propertyName][n];
    //                         }
    //                     } else
    //                     {
    //                         var getValue = await _this._getLayerData(propertyName, n, layer.id);
    //                     }
    //
    //                     var _varNames = layer[propertyName].assignment[n].split((/[,，]/));//-----多个赋值："xx,ddd，cc"
    //                     for (var i = 0; i < _varNames.length; i++)
    //                     {
    //                         if (varSystem.vars[_varNames[i]] != undefined)
    //                         {
    //                             console.log("_doAssign: setVarr:" + _varNames[i] + "=" + getValue)
    //                             varSystem.vars[_varNames[i]].value = getValue;
    //                         }
    //
    //                     }
    //
    //                 }
    //             }
    //
    //         }
    //
    //     }
    // }

    /**
     * 执行分派变量
     * @param layer
     * @param rootName
     * @returns {Promise.<void>}
     * @private
     */
    async function _doAssignNames(layer, rootName)
    {
        var undefinedAssign = (layer[rootName].assignment == undefined)
        var emptyAssign = OBJ.isEmptyObject(layer[rootName].assignment)
        var assignment = layer[rootName].assignment
        var enableAssigns = layer[rootName].enableAssigns


        if (!undefinedAssign && !emptyAssign)
        {
            for (var x in assignment)
            {
                await _asDo(assignment, [x])
            }

            async function _asDo(object, names)
            {
                console.info("_asDo4 - names:", names, object)
                var assignmentValue = OBJ.getObjectValueByNames(object, names);
                console.info("assignmentValue:", assignmentValue)

                try
                {
                    if (TYP.type(assignmentValue) == "object")
                    {
                        if ((OBJ.isEmptyObject(assignmentValue) != true))
                        {
                            for (var _x in assignmentValue)
                            {
                                await _asDo(object, names.concat(_x))
                            }
                        }

                    } else
                    {
                        var enable = OBJ.getObjectValueByNames(enableAssigns, names);
                        if (enable)
                        {
                            var dataCaryonValue = OBJ.getObjectValueByNames(layer[rootName], names);
                            console.info("dataCaryonValue", dataCaryonValue)
                            if (dataCaryonValue != undefined && (OBJ.isEmptyObject(dataCaryonValue) != true))
                            {
                                if (varSystem.isFormula(dataCaryonValue))
                                {
                                    var getValue = await varSystem.evalVar(dataCaryonValue, layer.id, names);
                                } else
                                {
                                    var getValue = dataCaryonValue;
                                }
                            } else
                            {
                                var getValue = await _this._getLayerDataByNamse(rootName, names, layer.id);
                                console.info("getValue", getValue)
                            }

                            if (getValue != undefined)
                            {
                                var _varNames = assignmentValue.split((/[,，]/));//-----多个赋值："xx,ddd，cc"
                                for (var i = 0; i < _varNames.length; i++)
                                {
                                    if (varSystem.vars[_varNames[i]] == undefined)//变量不存在时尝试创建
                                    {
                                        varSystem.addVar(_varNames[i], "")
                                    }

                                    if (varSystem.vars[_varNames[i]] != undefined)
                                    {
                                        console.log("_doAssign: setVarr:" + _varNames[i] + "=" + getValue)

                                        if (_varNames[i][0] == "@")
                                        {
                                            var fullnames = names.slice(0)
                                            fullnames.unshift(rootName)
                                            varSystem.vars[_varNames[i]].setObject(fullnames, getValue)
                                        } else
                                        {
                                            varSystem.vars[_varNames[i]].value = getValue;
                                        }

                                    }
                                }
                            }

                        }
                    }

                }
                catch (e)
                {
                    console.error(e)
                }

            }
        }
    }


//  2、表达式解析 ，并把 dataCaryon 复制一份到 mRNA  -------------------------------------------------------------------
    console.log("2、表达式解析------------:")
    var mRNA_DataLayers = {}

    var lastId = null;

    for (var layerId in dataCaryon.layers)
    {

        if (ARR.getByKey(allLayerArray, "id", layerId) == undefined)
        {
            console.log("layer - _copyValue: skip deleted layer:", layerId)
            continue
        }

        console.group("_copyValue", "layerId:", layerId)
        mRNA_DataLayers[layerId] = {};

        var temp = await _copyValue(dataCaryon.layers[layerId], layerId, mRNA_DataLayers[layerId], []);
        varSystem.$layerCount++;
        console.groupEnd()
    }

    function isNeedRenderLayer(layer) //判断 mRNA 中图层是否是需要渲染的图层，不是则裁剪
    {

        for (var x in layer)
        {
            if (ARR.hasMember(["name", "id"], x) == false)
            {

                if (x = "position")
                {
                    if (typeof  layer[x] == "object")
                    {
                        if (Object.keys(layer[x]).length > 1)
                        {
                            return true
                        }

                    }

                } else
                {
                    if (typeof  layer[x] == "object")
                    {
                        if (OBJ.isEmptyObject(layer[x]) != true)
                        {
                            return true
                        }
                    }
                }

            }
        }
        return false
    }


    for (var x in mRNA_DataLayers)
    {
        if (isNeedRenderLayer(mRNA_DataLayers[x]) != true)
        {
            delete mRNA_DataLayers[x]
            console.log("layer - _copyValue: delete notNeed mRNA", x)
        }
    }

    console.log("isNeedRenderLayer", isNeedRenderLayer(dataCaryon.layers[layerId]), dataCaryon.layers[layerId])


    /**
     * 拷贝对象指定属性属性到另一个对象
     * @param object
     * @param layerId
     * @param toObject
     * @private
     */
    async function _copyValue(object, layerId, toObject, names)
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
                        if (OBJ.isEmptyObject(object[x]) != true)
                        {
                            if (ARR.hasMember(["color", "fillColor", "strokeColor"], x))
                            {
                                toObject[x] = {};
                                if (object[x].$hex != undefined)
                                {
                                    var enableFormulaEval = varSystem.isFormula(object[x].$hex);

                                    if (enableFormulaEval)
                                    {
                                        var newNames = names.slice(0)
                                        newNames.push(x)
                                        var hex = await varSystem.evalVar(object[x].$hex, layerId, newNames);
                                    } else
                                    {
                                        var hex = object[x].$hex
                                    }
                                    ichiColor.hex = hex
                                    toObject[x].r = ichiColor.r;
                                    toObject[x].g = ichiColor.g;
                                    toObject[x].b = ichiColor.b;
                                }

                            } else
                            {
                                toObject[x] = {};
                                // console.log(`object:`,x)
                                var newNames = names.slice(0)
                                newNames.push(x)
                                await _copyValue(object[x], layerId, toObject[x], newNames)
                            }
                        }
                    }
                    else
                    {
                        if (x == "text")
                        {
                            if (object["$enableTextFormula"])
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
                            // console.log(`enableFormulaEval`,x,object[x],layerId)
                            var newNames = names.slice(0)
                            newNames.push(x)
                            if (x === "text")
                            {
                                toObject[x] = await varSystem.evalFormulasInText(object[x], layerId, newNames);
                            } else
                            {
                                toObject[x] = await varSystem.evalVar(object[x], layerId, newNames);
                            }


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
    console.log("DNAExpress:", mRNA_DataLayers)

    await enzymes.DNAExpress(mRNA_DataLayers)
    this.status.rendering = false;


    console.timeEnd("渲染文档耗时")
    logger.groupEnd("----------------START【renderDocument】----------------")
}


// EnzJSX.DNAExpress({
//     "1": {"name": "背景", "id": 1, "position": {"$anchor": "0"}},
//     "123": {"name": "矩形 1", "id": 123, "position": {"$anchor": "0"}, "shape": {}},
//     "124": {"name": "矩形 2", "id": 124, "position": {"$anchor": "0", "w": "243", "h": "232"}, "shape": {}}
// })

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

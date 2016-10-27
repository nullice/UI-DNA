/**
 * Created by bgllj on 2016/10/9.
 */


import ARR from "./Richang_JSEX/arrayARR.js"


var RenderCaryon = function ()
{
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
    var item = names[names.length - 1];
    if (names[0] === "position")
    {
        if ((names.length == 2 ) && _inArray(item, ["x", "y", "w", "h"]))
        {
            var ob = {};
            ob[item] = value;

            Gob.disableSelectEvent = true;
            console.log("----[start" + layerId + "]---")

            await enzymes.selectLayer_byID(layerId);

            console.log(`enzymes.setLayerInfo_position_byId(${JSON.stringify(ob)}, ${layerId})`)
            await enzymes.setLayerInfo_position_byId(ob, layerId)

            console.log("----[end" + layerId + "]---")
            Gob.disableSelectEvent = false;


        }
    }


}


/**
 * 渲染当前文档
 */
RenderCaryon.prototype.renderDocument = async function ()
{
//  1、变量赋值-------------------------------------------------------------------
    for (var x in dataCaryon.layers)
    {
        if (dataCaryon.layers[x].position != undefined)
        {
            _doAssign(dataCaryon.layers[x], "position")
        }
    }

    function _doAssign(layer, propertyName)
    {
        if (layer[propertyName].assignment != undefined)
        {
            for (var n in layer[propertyName].assignment)
            {
                if (layer[propertyName][n] != undefined)
                {
                    if (varSystem.isFormula(layer[propertyName][n]))
                    {
                        var getValue = varSystem.evalVar(layer[propertyName][n]);
                    } else
                    {
                        var getValue = layer[propertyName][n];
                    }

                    var _varNames = layer[propertyName].assignment[n].split((/[,，]/));//-----多个赋值："xx,ddd，cc"
                    for (var i = 0; i < _varNames.length; i++)
                    {
                        if (varSystem.vars[_varNames[i]] != undefined)
                        {
                            varSystem.vars[_varNames[i]] = getValue;
                        }

                    }
                }

            }

        }
    }

//  2、表达式解析-------------------------------------------------------------------
    var mRNA_DataLayers = {}


    var lastId = null;

    for (var layerId in dataCaryon.layers)
    {
        mRNA_DataLayers[layerId] = {};
        await  _copyValue(dataCaryon.layers[layerId], layerId, mRNA_DataLayers[layerId]);
    }

    async function _copyValue(object, layerId, toObject)
    {
        for (var x in object)
        {
            if (ARR.hasMember(["assignment", "enableAssigns"], x) === false)
            {
                if (ARR.hasMember(["name", "id", "index"], x))
                {
                    toObject[x] = object[x];
                } else
                {
                    if (object[x].constructor === Object)
                    {
                        toObject[x] = {};
                        await _copyValue(object[x], layerId, toObject[x]);
                    }
                    else
                    {

                        if (varSystem.isFormula(object[x]))
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


    }
    

//  3、ExtendScript 端渲染-------------------------------------------------------------------

    await enzymes.DNAExpress(dataCaryon.layers, varSystem.vars)


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

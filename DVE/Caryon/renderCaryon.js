/**
 * Created by bgllj on 2016/10/9.
 */



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
//  1、变量赋值
    for (var x in dataCaryon.layers)
    {
        if (dataCaryon.layers[x].position != undefined)
        {
            _doAssign(dataCaryon.layers[x], "position")
        }


    }

    function _doAssign(layer, propertyName)
    {
        if (layer[position].assignment != undefined)
        {
            for (var n in layer[position].assignment)
            {
                if(varSystem.vars[layer[position].assignment[n]] != undefined)

                    if( layer[position][n] != undefined)
                    {


                    }

            }

        }

    }


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

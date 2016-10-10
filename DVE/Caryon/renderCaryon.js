/**
 * Created by bgllj on 2016/10/9.
 */



var RenderCaryon = function ()
{
    return this;
}


RenderCaryon.prototype.renderPatch = async function (layerId, names, value)
{
    var item = names[names.length - 1];
    if (names[0] === "position")
    {
        if (_inArray(item, ["x", "y", "w", "h"]))
        {
            var ob = {};
            ob[item] = value;
            await enzymes.setLayerInfo_position_byId(ob, layerId)
        }
    }


}


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

/**
 * Created by bgllj on 2016/9/25.
 */
/**
 * Created by bgllj on 2016/9/7.
 */



var GobCaryon = function ()
{
    this.selectList = [{id: 999}];
    this.position = {
        x: 2,
        y: 3,
        w: 4,
        h: 5,
        assignment: {x: null, y: null, w: null, h: null},
        enableAssigns: {x: false, y: false, w: false, h: false}
    };

    var root = this;
    giveSetter(this.position, ["position"], 1);


    function giveSetter(object, names, index)
    {
        // alert("giveSetter" + index +"\n" +names +"\n"+names[index])
        for (var z in object)
        {
            if (z[0] == "_")
            {
                continue;
            }
            // alert(":" + z + ":" + JSON.stringify(object[z]))

            var isObject
            if (object[z] == undefined)
            {
                isObject = false;
            } else
            {

                if (object[z].constructor == Object)
                {
                    isObject = true;
                }
                else
                {
                    isObject = false;
                }
            }


            if (isObject)
            {
                giveSetter(object[z], names.concat(z), index + 1);
            } else
            {
                // alert("defineProperty:" + objectName + ":" + z)
                Object.defineProperty(object, z, _doSET(z, names.concat(z), object[z], root));
            }
        }


        function _doSET(objectName, names, value, root)
        {
            _valueToObject(root, names, 0, value, true)//值写入 _XXX
            var s = new Function("x", `Gob._setData(${JSON.stringify(names)} , x )`);
            var g = new Function(` return Gob._getData(${JSON.stringify(names)} )`);
            var ob = {
                set: s,
                get: g
            }
            return ob;
        }


    }

    // setData(dataCaryon.layers[id][objectName], names, 0, x)
    return this;
}

GobCaryon.prototype._setData = function (names, value)
{


    _valueToObject(this, names, 0, value, true)//值写入 _XXX


    if (value === "")//删除
    {

    } else
    {
        if (varSystem.isFormula(value) == false || value == Gob.MULT) //只写入公式变量
        {
            return null;
        }
    }


    for (var i = 0; i < this.selectList.length; i++)
    {
        if (dataCaryon.layers[this.selectList[i].id] == undefined)
        {
            dataCaryon.addLayer(this.selectList[i]);
        }

        _valueToObject(dataCaryon.layers[this.selectList[i].id], names, 0, value)

    }


    // alert("set:" + names + "=" + value)

    // GobCaryon.prototype._valueToObject(dataCaryon.layers[id][names[0]], names, 1, value)
}

function _valueToObject(toObject, objectNames, nameIndex, value, prefix)
{
    var isLastName = nameIndex == objectNames.length - 1

    if (toObject[objectNames[nameIndex]] == undefined && isLastName != true)
    {
        toObject[objectNames[nameIndex]] = {};
    }

    if (isLastName != true)
    {
        _valueToObject(toObject[objectNames[nameIndex]], objectNames, nameIndex + 1, value, prefix)
    } else
    {


        if (prefix)
        {
            toObject["_" + objectNames[nameIndex]] = value;
        } else
        {
            if (value === "")
            {
                if (toObject[objectNames[nameIndex]] != undefined)
                {
                    delete  toObject[objectNames[nameIndex]];
                    Gob.updateGob();
                }

                return;
            }

            toObject[objectNames[nameIndex]] = value;
        }

    }
}


GobCaryon.prototype._getData = function (names)
{

    return _valueFromObject(this, names, 0, true);
    function _valueFromObject(fromObject, names, nameIndex, prefix)
    {
        var isLastName = nameIndex == names.length - 1
        if (isLastName)
        {
            if (prefix)
            {
                return fromObject["_" + names[nameIndex]];
            } else
            {
                return fromObject[names[nameIndex]];
            }
        } else
        {
            return _valueFromObject(fromObject[names[nameIndex]], names, nameIndex + 1, prefix)
        }
    }

}


//
GobCaryon.prototype.updateSelect = async function ()
{

    this.selectList = (await enzymes.getSelectLayerArray()).reverse();
    this.updateGob();


}

GobCaryon.prototype.updateGob = async function ()
{
    var temp = {};
    temp.position = new_position();

    function new_position()
    {
        return {
            x: null,
            y: null,
            w: null,
            h: null,
            assignment: {x: null, y: null, w: null, h: null},
            enableAssigns: {x: null, y: null, w: null, h: null}
        }
    }


    for (var i = 0; i < this.selectList.length; i++)
    {
        //[position]---------------------------------------------------------------
        var item_position = new_position();

        var position = await enzymes.getLayerInfo_position_byId(this.selectList[i].id)
        item_position.x = position.x
        item_position.y = position.y
        item_position.w = position.w
        item_position.h = position.h
        _fromDataCaryon(dataCaryon.layers[this.selectList[i].id], item_position, "position")
        // console.log("temp.item_position", item_position)
        _objectToObject(item_position, temp.position, true, !(i == 0));


        // temp.position.x = _setValue(temp.position.x, )
        // temp.position.y = _setValue(temp.position.y, )
        // temp.position.w = _setValue(temp.position.w, )
        // temp.position.h = _setValue(temp.position.h, )

    }
    // console.log("temp.position", temp.position)
    _objectToObject(temp.position, this.position, false);


    function _setValue(oldValue, value, ignoreNull)
    {

        if (oldValue == undefined)
        {
            if (ignoreNull)
            {

            }
            else
            {
                return value;
            }

        }

        // console.log(oldValue + ":" + value + " MULT " + (oldValue != value))
        if (oldValue == GobCaryon.prototype.MULT || oldValue != value)
        {
            return GobCaryon.prototype.MULT;
        } else
        {
            return value;
        }
    }


    function _fromDataCaryon(layerData, object, objectName)
    {//layerData : dataCaryon.layers[layerId]

        if (layerData == undefined)
        {
            return null
        }

        for (var x in object)
        {
            if (object[x] != undefined && object[x].constructor == Object)
            {
                if (layerData[objectName] != undefined)
                {
                    if (layerData[objectName][x] != undefined)
                    {
                        _fromDataCaryon(layerData[objectName], object[x], x)
                    }
                }

            } else
            {

                if (layerData[objectName] != undefined)
                {
                    if (layerData[objectName][x] != undefined)
                    {

                        if (object[x] != Gob.MULT)
                        {
                            object[x] = layerData[objectName][x];
                        }

                    }
                }
            }
        }

    }


    function _objectToObject(object, sameObject, checkMUTI, ignoreNull)
    {


        for (var x in object)
        {
            if (object[x] != undefined && object[x].constructor == Object)
            {
                _objectToObject(object[x], sameObject[x], checkMUTI, ignoreNull)
            } else
            {
                if (checkMUTI)
                {
                    sameObject[x] = _setValue(sameObject[x], object[x], ignoreNull)
                } else
                {
                    sameObject[x] = object[x]
                }

            }
        }

    }

}

GobCaryon.prototype.MULT = "%$*/Gob-MUTIPLE/*$%";


//----------------------------------------

export default GobCaryon;

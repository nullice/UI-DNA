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
            // console.log(root)
            _valueToObject(root, names, 0, value, true)//值写入 _XXX
            var s = new Function("x", `Gob._setData(${JSON.stringify(names)} , x )`);
            var g = new Function(` return Gob._getData(${JSON.stringify(names)} )`);
            console.log(g)
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

    if (varSystem.isFormula(value) == false) //只写入公式变量
    {
        return null;
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
            return　_valueFromObject(fromObject[names[nameIndex]], names, nameIndex + 1, prefix)
        }
    }

}


//
GobCaryon.prototype.updateSelect = async function ()
{
    console.log("updateSelect")
    this.selectList = await enzymes.getSelectLayerArray();
    console.log(this.selectList)

}

GobCaryon.prototype.updateGob = async function ()
{
    this._position = {
        x: null,
        y: null,
        w: null,
        h: null,
    };

    // this.position = {
    //     x: null,
    //     y: null,
    //     w: null,
    //     h: null,
    //     assignment: {x: null, y: null, w: null, h: null},
    //     enableAssigns: {x: false, y: false, w: false, h: false}
    // };


    for (var i = 0; i < this.selectList.length; i++)
    {
        //[position]---------------------------------------------------------------
        // var position = await enzymes.getLayerInfo_position_byId(this.selectList[i].id)
        // this._position.x = _setValue(this._position.x, position.x)
        // this._position.y = _setValue(this._position.y, position.y)
        // this._position.w = _setValue(this._position.w, position.w)
        // this._position.h = _setValue(this._position.h, position.h)

        _fromDataCaryon(dataCaryon.layers[this.selectList[i].id], this.position, "position")


    }

    function _setValue(oldValue, value)
    {
        if (oldValue == undefined)
        {
            return value;
        }

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
                        object[x] = _setValue(object[x], layerData[objectName][x]);
                    }
                }
            }
        }

    }

}

GobCaryon.prototype.MULT = "%$*/Gob-MUTIPLE/*$%";


//----------------------------------------

export default GobCaryon;

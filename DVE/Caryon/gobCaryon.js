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

    giveSetter(this.position, "position");

    function giveSetter(object, objectName,)
    {
        // alert("giveSetter" + index +"\n" +objectName +"\n"+names)
        for (var z in object)
        {
            // if (object[z] == undefined)
            // {
            //     continue;
            // }
            alert(":" + z + ":" + JSON.stringify(object[z]))

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
                giveSetter(object[z], z);
            } else
            {
                // alert("defineProperty:"+objectName+":"+ z)
                Object.defineProperty(object, z, {
                    set: function (x)
                    {
                        alert("set:" + x)
                    }
                });
            }
        }
    }

    function setData(toObject, objectNames, nameIndex, value)
    {
        var isLastName = nameIndex == objectNames.length - 1

        if (toObject[objectNames[nameIndex]] == undefined && isLastName != true)
        {
            toObject[objectNames[nameIndex]] = {};
        }

        if (isLastName != true)
        {
            setData(toObject[objectNames[nameIndex]], objectNames, nameIndex + 1, value)
        } else
        {
            toObject[objectNames[nameIndex]] = value;
        }
    }


    // setData(dataCaryon.layers[id][objectName], names, 0, x)

    return this;
}

GobCaryon.prototype.updateSelect = async function ()
{
    this.selectList = await enzymes.getSelectLayerArray();


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

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

    this.position = {
        x: null,
        y: null,
        w: null,
        h: null,
        assignment: {x: null, y: null, w: null, h: null},
        enableAssigns: {x: false, y: false, w: false, h: false}
    };


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

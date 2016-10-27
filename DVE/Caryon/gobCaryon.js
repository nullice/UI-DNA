/**
 * Created by bgllj on 2016/9/7.
 */
import ARR from "./Richang_JSEX/arrayARR.js"


var GobCaryon = function ()
{
    this.nowSwitching = false;//是否在切换选中图层中
    this.disableSelectEvent = false;//不触发选择图层事件

    //----异步赋值计数器
    this.__asyncSetCounter = 0;
    this._asyncSetSwitch = false;
    Object.defineProperty(this, "_asyncSetCounter",
        {
            set: function (x)
            {
                if (x < 0)x = 0;
                this.__asyncSetCounter = x;
                if (x == 0 && this._asyncSetSwitch)
                {
                    console.log("【this.nowSwitching = false】")
                    this.nowSwitching = false;
                    this._asyncSetSwitch = false;
                }
            },
            get: function ()
            {
                return this.__asyncSetCounter;
            }
        }
    );


    this.selectList = [{id: 999}];
    this.position = {
        x: null,
        y: null,
        w: null,
        h: null,
        assignment: {x: null, y: null, w: null, h: null},
        enableAssigns: {x: null, y: null, w: null, h: null}
    };

    //------------注册 getter 和 setter
    var root = this;
    giveSetter(this.position, ["position"], 1);
    function giveSetter(object, names, index)
    {
        for (var z in object)
        {
            if (z[0] == "_")
            {
                continue;
            }
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


GobCaryon.prototype._setData = async function (names, value)
{
    // console.log("_setData()----------------")
    // console.log(names, value)


    var isFormula = false;

    //-------- 1. 值写入实际存储的属性 this._XXX;
    var change = _valueToObject(this, names, 0, value, true);


    //-------- 2. 判断是否应该写入 dataCaryon ;
    if (value === "")//删除
    {
        isFormula = true;
    } else
    {
        if (varSystem.isFormula(value) == true && value != Gob.MULT) //只写入公式变量
        {
            isFormula = true;
        }
    }

    //-------- 3. 把值分发到每个选中图层的 dataCaryon ;


    var rendered = false;
    if (this.selectList.length > 1)
    {
        var save = await enzymes.selectSave();
    }


    for (var i = 0; i < this.selectList.length; i++)
    {
        var change_i = false;
        if (isFormula)
        {
            if (dataCaryon.layers[this.selectList[i].id] == undefined)//如果 dataCaryon 图层不存在，就创建
            {
                dataCaryon.addLayer(this.selectList[i]);
            }
            change_i = _valueToObject(dataCaryon.layers[this.selectList[i].id], names, 0, value)
        }
        //即时修改------------
        // console.log("isFormula :" + isFormula+"  change:"+change+"  change_i:"+change_i)

        // console.log(change_i, change, isFormula)

        // console.log("this.nowSwitching =" +this.nowSwitching +"    "+ names + "=>" + value)
        if (this.nowSwitching == false)
        {
            if (value != Gob.MULT)
            {
                if (change_i || ((isFormula == false) & change))
                {
                    console.log("【START】renderPatch--------" + names + "=>" + value)
                    console.log(this.selectList[i].id, names, value)
                    rendered = true;
                    await renderCaryon.renderPatch(this.selectList[i].id, names, value, true)
                    // await  sleep(800)
                    console.log("【END】renderPatch------" + names + "=>" + value)
                }
            }
        }
    }




    if (this.selectList.length > 1)
    {
        if (rendered)
        {
            var save2 = await enzymes.selectSave();
            if (ARR.difference(save, save2).length != 0)
            {
                await enzymes.selectLoad(save);
            }
        }
    }
    // console.log("[--]" + names, "   " + Gob._asyncSetCounter)
    Gob._asyncSetCounter--;



    // alert("set:" + names + "=" + value)

    // GobCaryon.prototype._valueToObject(dataCaryon.layers[id][names[0]], names, 1, value)
}


GobCaryon.prototype._getData = function (names)
{

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

    return _valueFromObject(this, names, 0, true);
}


/**
 * 更新选中图层。会触发 GobCaryon.updateGob()                                                                                                                                                                                                                                                                                                                                                           。
 */
GobCaryon.prototype.updateSelect = async function ()
{
    if (this.disableSelectEvent)
    {
        return;
    }

    this.nowSwitching = true;
    console.log("【this.nowSwitching = true】")
    this.selectList = (await enzymes.getSelectLayerArray()).reverse();
    this.updateGob();

}


/**
 * 更新选中图层对象的数据。
 * 会从实际图层（通过 enzymes）和 DataCaryon 拉取图层数据保存到选中图层对象。
 */
GobCaryon.prototype.updateGob = async function ()
{

    //----------1. 要拉取的数据：
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
    //----------2. 拉取每个选中图层的数据：
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
        _objectToObject(item_position, temp.position, true, !(i == 0));

    }
    // console.log("temp.position", temp.position)
    _objectToObject_asyncSetCounter(temp.position, this.position, false, false, true);
    Gob._asyncSetSwitch = true
    _objectToObject(temp.position, this.position, false, false, true);


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


    /**
     * 从 dataCaryon 拉取数据
     */
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


    function _objectToObject(object, sameObject, checkMUTI, ignoreNull, asyncCounter)
    {
        for (var x in object)
        {
            if (object[x] != undefined && object[x].constructor == Object)
            {
                _objectToObject(object[x], sameObject[x], checkMUTI, ignoreNull)
            } else
            {
                // if (asyncCounter)
                // {
                //     if (sameObject[x] != object[x])
                //     {
                //         Gob._asyncSetCounter++;
                //         console.log("[+]" + x, "   " + Gob._asyncSetCounter)
                //     }
                // }

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

    function _objectToObject_asyncSetCounter(object, sameObject, checkMUTI, ignoreNull, asyncCounter)
    {
        var _temp = 0
        for (var x in object)
        {
            if (object[x] != undefined && object[x].constructor == Object)
            {
                _objectToObject_asyncSetCounter(object[x], sameObject[x], checkMUTI, ignoreNull,asyncCounter)
            } else
            {
                if (asyncCounter)
                {
                    if (sameObject[x] != object[x])
                    {
                        _temp++;
                        // console.log("[+]" + x, "   " +  object[x])
                    }
                }
            }
        }

        if(_temp>0)
        {
            // console.log("[++]" +_temp)
            Gob._asyncSetCounter += _temp;
        }


    }
}


// 代表多值的常量
GobCaryon.prototype.MULT = "%$*/Gob-MUTIPLE/*$%";

/**
 * 把值赋予指定对象指定路径成员
 * @param toObject 欲赋值目标对象
 * @param objectNames 对象成员的路径，即名称数组（数字如 a.b.c 为 ["a","b","c"] ）
 * @param nameIndex 路径起始位置，通常从 0 开始
 * @param value 要设置的值
 * @param prefix 是否设置前缀"_",为真的话，会赋值到带前缀的成员，（如指定路径 a.b.c 会赋值到 a.b._c）
 * @private
 */
function _valueToObject(toObject, objectNames, nameIndex, value, prefix)
{
    var isLastName = nameIndex == objectNames.length - 1

    if (toObject[objectNames[nameIndex]] == undefined && isLastName != true)
    {
        toObject[objectNames[nameIndex]] = {};
    }

    if (isLastName != true)
    {
        return _valueToObject(toObject[objectNames[nameIndex]], objectNames, nameIndex + 1, value, prefix)
    } else
    {


        if (prefix)
        {
            var change = (toObject["_" + objectNames[nameIndex]] != value);
            toObject["_" + objectNames[nameIndex]] = value;

            return change;//返回是否改变原值

        } else
        {
            if (value === "")
            {
                if (toObject[objectNames[nameIndex]] != undefined)
                {
                    delete  toObject[objectNames[nameIndex]];
                    Gob.updateGob();
                }

                return true;
            }
            var change = ( toObject[objectNames[nameIndex]] != value);
            toObject[objectNames[nameIndex]] = value;
            return change;//返回是否改变原值
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
//----------------------------------------

export default GobCaryon;

/**
 * Created by bgllj on 2016/9/7.
 */
import ARR from "./Richang_JSEX/arrayARR.js"
import TYP from "./Richang_JSEX/typeTYP.js"

var GobCaryon = function ()
{
    this.selectRender = false; //选择图层后渲染
    this.selectRenderVarList = false; //渲染改变的变量列表
    this.selectChanged = false;
    this.selectUpdateing = false;
    this.disableRender = false //不渲染


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

                    //----------------更新图层后渲染
                    console.log("this.selectRender:", this.selectRender, " varSystem.autoRender", setSystem.autoRender, " selectChanged:", this.selectChanged,
                        " renderCaryon.status.rendering:", renderCaryon.status.rendering,
                    )
                    console.log("this.selectRenderVarList:", this.selectRenderVarList)
                    if (this.selectRender && setSystem.autoRender && !this.selectChanged && !renderCaryon.status.rendering)
                    {
                        if (this.selectRenderVarList != undefined && this.selectRenderVarList.length > 0)
                        {
                            console.log("更新图层后渲染")
                            renderCaryon.renderDocument(true, this.selectRenderVarList)
                        }
                    }

                }
            },
            get: function ()
            {
                return this.__asyncSetCounter;
            }
        }
    );


    this.selectList = [];

    //属性注册[1/8]
    this.position = GobCaryon.prototype.__new_position();
    this.text = GobCaryon.prototype.__new_text();
    this.shape = GobCaryon.prototype.__new_shape();
    // this.position = {
    //     x: null,
    //     y: null,
    //     w: null,
    //     h: null,
    //     $anchor: null,
    //
    //     assignment: {x: null, y: null, w: null, h: null, $anchor: null},
    //     enableAssigns: {x: null, y: null, w: null, h: null, $anchor: null}
    // };

    //属性注册[2/8]
    //------------注册 getter 和 setter
    var root = this;
    giveSetter(this.position, ["position"], 1);
    giveSetter(this.text, ["text"], 1);
    giveSetter(this.shape, ["shape"], 1);

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

//属性注册[3/8]
GobCaryon.prototype.__new_position = function ()
{
    return {
        x: null,
        y: null,
        w: null,
        h: null,
        $anchor: null,
        assignment: {x: null, y: null, w: null, h: null, $anchor: null},
        enableAssigns: {x: null, y: null, w: null, h: null, $anchor: null}
    }
}
GobCaryon.prototype.__new_text = function ()
{
    return {
        text: null,
        color: {r: null, g: null, b: null, $hex: null},
        size: null, /*字体尺寸*/
        fontPostScriptName: null, /*字体*/
        bold: null, /*仿粗体*/
        italic: null, /*仿斜体*/
        antiAlias: null, /*消除锯齿方式*/
        underline: null, /*下划线类型*/
        justification: null, /*段落对齐方式*/
        leading: null, /*行距*/
        tracking: null, /*字符间距*/
        baselineShift: null, /*基线偏移*/
        horizontalScale: null, /*水平缩放*/
        verticalScale: null, /*垂直缩放*/
        $enableFormula: null,
        assignment: {
            text: null,
            $enableFormula: null,
            color: null,
            size: null, /*字体尺寸*/
            fontPostScriptName: null, /*字体*/
            bold: null, /*仿粗体*/
            italic: null, /*仿斜体*/
            antiAlias: null, /*消除锯齿方式*/
            underline: null, /*下划线类型*/
            justification: null, /*段落对齐方式*/
            leading: null, /*行距*/
            tracking: null, /*字符间距*/
            baselineShift: null, /*基线偏移*/
            horizontalScale: null, /*水平缩放*/
            verticalScale: null, /*垂直缩放*/
            $enableFormula: null,
        },
        enableAssigns: {
            text: null,
            $enableFormula: null,
            color: null, size: null, /*字体尺寸*/
            fontPostScriptName: null, /*字体*/
            bold: null, /*仿粗体*/
            italic: null, /*仿斜体*/
            antiAlias: null, /*消除锯齿方式*/
            underline: null, /*下划线类型*/
            justification: null, /*段落对齐方式*/
            leading: null, /*行距*/
            tracking: null, /*字符间距*/
            baselineShift: null, /*基线偏移*/
            horizontalScale: null, /*水平缩放*/
            verticalScale: null, /*垂直缩放*/
        }
    }
}


GobCaryon.prototype.__new_shape = function ()
{
    return {
        strokeColor: {r: null, g: null, b: null, $hex: null}, /*描边颜色*/
        strokeColorEnabled: null, /*启用描边*/
        fillColor: {r: null, g: null, b: null, $hex: null}, /*填充颜色*/
        fillColorEnabled: null, /*启用填充*/
        lineWidth: null, /*边线宽度*/
        dashSet: null, /*虚线设置*/
        lineAlignment: null, /*描边选项-对齐*/
        lineCapType: null, /*描边选项-端点*/
        lineJoinType: null, /*描边选项-角点*/
        shapeSize: {x: null, y: null, h: null, w: null}, /*形状尺寸*/
        radian: {
            /*圆角*/
            topRight: null,
            topLeft: null,
            bottomRight: null,
            bottomLeft: null,
        },
        assignment: {
            strokeColor: null,
            strokeColorEnabled: null,
            fillColor: null,
            fillColorEnabled: null, /*启用填充*/
            lineWidth: null, /*边线宽度*/
            dashSet: null, /*虚线设置*/
            lineAlignment: null, /*描边选项-对齐*/
            lineCapType: null, /*描边选项-端点*/
            lineJoinType: null, /*描边选项-角点*/
            shapeSize: {x: null, y: null, h: null, w: null},
            radian: {
                /*圆角*/
                topRight: null,
                topLeft: null,
                bottomRight: null,
                bottomLeft: null,
            }
        },
        enableAssigns: {
            strokeColor: null,
            strokeColorEnabled: null,
            fillColor: null,
            fillColorEnabled: null, /*启用填充*/
            lineWidth: null, /*边线宽度*/
            dashSet: null, /*虚线设置*/
            lineAlignment: null, /*描边选项-对齐*/
            lineCapType: null, /*描边选项-端点*/
            lineJoinType: null, /*描边选项-角点*/
            shapeSize: {x: null, y: null, h: null, w: null},
            radian: {
                /*圆角*/
                topRight: null,
                topLeft: null,
                bottomRight: null,
                bottomLeft: null,
            }
        }
    }
}


GobCaryon.prototype._setData = async function (names, value)
{
    console.log(`-------_setData(${names}, ${value})`)

    var isFormula = false;
    var doDocumentRender = false;
    var varUpdatelist = [];


    //-------- 1. 值写入实际存储的属性 this._XXX;

    var change = _valueToObject(this, names, 0, value, true);


    // console.log(`-------_setData_【change】：`,change)
    //属性注册[4/8]
    //-------- 2. 判断是否应该写入 dataCaryon ;

    var isVoidValue = false
    var isText = false
    if (value === "")//删除
    {
        isFormula = true;
        isVoidValue = true;
    } else
    {

        if (names[names.length - 1] == "text" && value != Gob.MULT) //写文本
        {
            if (TYP.type(value) == "string")
            {
                isText = true;
                console.log("this.text.$enableFormula", this.text.$enableFormula)
                if (this.text.$enableFormula == true)
                {
                    isFormula = true;
                }
            }

        }
        else if (names[names.length - 1] == "$enableFormula" && value != Gob.MULT)
        {
            var temp = this.text.text;
            this.text.text = " "
            this.text.text = temp
        }
        else
        {
            var finish = false;
            //类型判断-------------------------
            var isBoolean = ARR.hasMember(["bold", "italic"], names[names.length - 1]);
            if (isBoolean)
            {
                if (value == "true" || value == "false")
                {
                    isFormula = false;
                    finish = true;
                }
            }
            //------------------------------------
            var isUnderline = (names[names.length - 1] == "underline")
            if (isUnderline)
            {
                if (value == "underlineOff" || value == "underlineOnLeftInVertical"
                    || value == "underlineOnRightInVertical" || value == "verticalUnderlineLeft"
                    || value == "verticalUnderlineRight"
                )
                {
                    isFormula = false;
                    finish = true;
                }
            }
            //------------------------------------
            var isJustification = (names[names.length - 1] == "justification")
            if (isJustification)
            {
                if (value == "center" || value == "right"
                    || value == "left" || value == "justifyAll"
                    || value == "justifyLeft" || value == "justifyRight"
                )
                {
                    isFormula = false;
                    finish = true;
                }
            }
            //------------------------------------
            var isAntiAlias = (names[names.length - 1] == "antiAlias")
            if (isAntiAlias)
            {
                if (value.slice(0, 9) == "antiAlias")
                {
                    isFormula = false;
                    finish = true;
                }
            }
            // //------------------------------------
            // var isLineAlignment = (names[names.length - 1] == "lineAlignment")
            // if (isLineAlignment)
            // {
            //     if (value == "strokeStyleAlignInside" || value == "strokeStyleAlignCenter"
            //         || value == "strokeStyleAlignOutside"
            //     )
            //     {
            //         isFormula = false;
            //         finish = true;
            //     }
            // }
            // //------------------------------------
            // var isLineCapType = (names[names.length - 1] == "lineCapType")
            // if (isLineCapType)
            // {
            //     if (value == "strokeStyleButtCap" || value == "strokeStyleRoundCap"
            //         || value == "strokeStyleSquareCap"
            //     )
            //     {
            //         isFormula = false;
            //         finish = true;
            //     }
            // }
            // //------------------------------------
            // var isLineJoinType = (names[names.length - 1] == "lineJoinType")
            // if (isLineJoinType)
            // {
            //     if (value == "strokeStyleMiterJoin" || value == "strokeStyleRoundJoin"
            //         || value == "strokeStyleBevelJoin"
            //     )
            //     {
            //         isFormula = false;
            //         finish = true;
            //     }
            // }


            if (!finish)
            {
                if (varSystem.isFormula(value) == true && value != Gob.MULT) //只写入公式变量
                {
                    isFormula = true;
                }
            }

        }

    }
    if (names[names.length - 2] == "assignment" && names[names.length - 2] == "enableAssigns")
    {
        isExvar = true;
    }

    var isExvar = ((names[names.length - 1][0] == "$") && (value != Gob.MULT));// $开头的属性一定写入 dataCaryon


    // console.log(names[names.length - 1], names[names.length - 1], isExvar, value)

    //-------- 3. 把值分发到每个选中图层的 dataCaryon ;
    var rendered = false;
    if (this.selectList.length > 1)
    {
        var save = await enzymes.selectSave();
    }


    for (var i = 0; i < this.selectList.length; i++)
    {
        dataCaryon.info.status.saved = false;

        var change_i = false;
        if (isFormula || isExvar)
        {
            if (dataCaryon.layers[this.selectList[i].id] == undefined)//如果 dataCaryon 图层不存在，就创建
            {
                dataCaryon.addLayer(this.selectList[i]);
            }
            // console.log("_valueToObject:",this.selectList[i].id,">",dataCaryon.layers[this.selectList[i].id], names, 0, value)
            change_i = _valueToObject(dataCaryon.layers[this.selectList[i].id], names, 0, value)
        }
        // 即时修改-------------------------------------------------------------------------------------------
        console.log("isFormula :" + isFormula + "  change:" + change + "  change_i:" + change_i)
        console.log(change_i, change, isFormula)
        console.log("this.nowSwitching =" + this.nowSwitching + "    " + names + "=>" + value)


        if (this.nowSwitching == false)
        {
            if (value != Gob.MULT)
            {
                if (change_i || (change))
                {
                    doDocumentRender = true;
                    if (names[1] != "enableAssigns" && names[1] != "assignment" && isVoidValue != true && this.disableRender != true)
                    {
                        console.log("【START】renderPatch--------" + names + "=>" + value)
                        console.log(this.selectList[i].id, names, value)
                        rendered = true;


                        if (isFormula)
                        {
                            var finValue = await varSystem.evalVar(value, this.selectList[i].id)
                        } else
                        {
                            var finValue = value;
                        }

                        console.log(`renderCaryon.renderPatch(${this.selectList[i].id}, ${names}, ${finValue}, ${true})`)
                        await renderCaryon.renderPatch(this.selectList[i].id, names, finValue, true)

                        // await  sleep(800)
                        console.log("【END】renderPatch------" + names + "=>" + finValue)
                    } else
                    {
                        if (names[1] != "assignment")
                        {

                        }
                    }


                }
            }
        }

    }

    if (setSystem.autoRender && this.disableRender != true)
    {
        if (this[names[0]]["enableAssigns"][names[names.length - 1]])
        {
            console.log("autoRender", (change_i || change), this[names[0]]["enableAssigns"][names[names.length - 1]], names)
            if (value != Gob.MULT && (change_i || change))
            {
                var _assign = this[names[0]]["assignment"][names[names.length - 1]];

                console.log("_assign:", _assign)
                if (_assign != undefined)
                {
                    varUpdatelist = _assign.split((/[,，]/));
                    console.log("varUpdatelist", varUpdatelist)
                    if (varUpdatelist.length > 0)
                    {
                        if (doDocumentRender)
                        {
                            renderCaryon.renderDocument(true, varUpdatelist)
                        } else
                        {
                            this.selectRender = true;
                            this.selectRenderVarList = this.selectRenderVarList.concat(varUpdatelist);

                        }
                    }
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

    if (this.selectUpdateing)
    {
        return;
    }

    this.selectUpdateing = true;


    this.nowSwitching = true;
    this.selectRender = false;
    this.selectRenderVarList = [];
    console.log("【this.nowSwitching = true】")

    var newList = (await enzymes.getSelectLayerArray()).reverse();
    this.selectChanged = ((ARR.symDifference_ObjectArray(newList, this.selectList, "id")).length > 0);
    console.log("selectChanged:", this.selectChanged);

    this.selectList = newList;
    await this.updateGob();

    this.selectUpdateing = false;
    console.log("selectUpdateing = END")
}


/**
 * 更新选中图层对象的数据。
 * 会从实际图层（通过 enzymes）和 DataCaryon 拉取图层数据保存到选中图层对象。
 */
GobCaryon.prototype.updateGob = async function (disableRender)
{

    console.log("this.disableRender = ", disableRender)
    this.disableRender = disableRender || false;
    //----------1. 要拉取的数据：
    var temp = {};

    //属性注册[5/8`]
    var new_position = GobCaryon.prototype.__new_position;
    var new_text = GobCaryon.prototype.__new_text;
    var new_shape = GobCaryon.prototype.__new_shape;

    //属性注册[6/8]
    temp.position = new_position();
    temp.text = new_text();
    temp.shape = new_shape();


    //----------2. 拉取每个选中图层的数据：
    for (var i = 0; i < this.selectList.length; i++)
    {
        //属性注册[7/8]
        //[position]---------------------------------------------------------------
        var item_position = new_position();
        var position = await enzymes.getLayerInfo_position_byId(this.selectList[i].id)
        item_position.x = position.x
        item_position.y = position.y
        item_position.w = position.w
        item_position.h = position.h
        _fromDataCaryon(dataCaryon.layers[this.selectList[i].id], item_position, "position")
        _objectToObject(item_position, temp.position, true, !(i == 0));

        //[text]---------------------------------------------------------------
        var item_text = new_text();
        var text = await enzymes.getLayerInfo_text_byId(this.selectList[i].id);
        item_text.text = text.text;
        _setTypeColor(item_text.color, text.color)
        item_text.size = text.size;
        item_text.fontPostScriptName = text.fontPostScriptName;
        item_text.bold = text.bold;
        item_text.italic = text.italic;
        item_text.antiAlias = text.antiAlias;
        item_text.underline = text.underline;
        item_text.justification = text.justification;
        item_text.leading = text.leading;
        item_text.tracking = text.tracking;
        item_text.baselineShift = text.baselineShift;
        item_text.horizontalScale = text.horizontalScale;
        item_text.verticalScale = text.verticalScale;
        _fromDataCaryon(dataCaryon.layers[this.selectList[i].id], item_text, "text")
        _objectToObject(item_text, temp.text, true, !(i == 0));

        // [shape]---------------------------------------------------------------
        var item_shape = new_shape();
        var shape = await enzymes.getLayerInfo_shape_byId(this.selectList[i].id);
        console.info("getLayerInfo_shape_byId(" + this.selectList[i].id + ")", shape);
        _setTypeColor(item_shape.strokeColor, shape.strokeColor);
        item_shape.strokeColorEnabled = shape.strokeColorEnabled;
        _setTypeColor(item_shape.fillColor, shape.fillColor);
        item_shape.fillColorEnabled = shape.fillColorEnabled;
        item_shape.lineWidth = shape.lineWidth;
        item_shape.dashSet = shape.dashSet;
        item_shape.lineAlignment = shape.lineAlignment;
        item_shape.lineCapType = shape.lineCapType;
        item_shape.lineJoinType = shape.lineJoinType;
        item_shape.shapeSize = shape.shapeSize;
        item_shape.radian = shape.radian;
        _fromDataCaryon(dataCaryon.layers[this.selectList[i].id], item_shape, "shape")
        _objectToObject(item_shape, temp.shape, true, !(i == 0));
    }

    //属性注册[8/8]
    // console.log("temp.position", temp.position)
    _objectToObject_asyncSetCounter(temp.position, this.position, false, false, true);
    _objectToObject_asyncSetCounter(temp.text, this.text, false, false, true);
    _objectToObject_asyncSetCounter(temp.shape, this.shape, false, false, true);
    Gob._asyncSetSwitch = true
    _objectToObject(temp.position, this.position, false, false, true);
    _objectToObject(temp.text, this.text, false, false, true);
    _objectToObject(temp.shape, this.shape, false, false, true);


    function _setTypeColor(color, typeColor)
    {
        typeColor.r = color.r
        typeColor.g = color.g
        typeColor.b = color.b

        ichiColor.set(color);
        typeColor.$hex = ichiColor.hex;

    }

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
            // console.log(" x in object：", x)
            if ((object[x] != undefined) && (object[x].constructor == Object))
            {
                if (sameObject[x] == undefined)
                {
                    sameObject[x] = {};
                }

                // console.log(
                //     "【_objectToObject-2】:", object[x], sameObject[x], {
                //         x: x,
                //         "object[x]": object[x],
                //         "sameObject[x]": sameObject[x]
                //     }
                // )
                _objectToObject(object[x], sameObject[x], checkMUTI, ignoreNull, asyncCounter)
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
                if (sameObject[x] == undefined)
                {
                    sameObject[x] = {};
                }
                _objectToObject_asyncSetCounter(object[x], sameObject[x], checkMUTI, ignoreNull, asyncCounter)
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

        if (_temp > 0)
        {
            // console.log("[++]" +_temp)
            Gob._asyncSetCounter += _temp;
        }


    }

    this.disableRender = false;
    console.log("this.disableRender = ", false)
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

                    console.log("delete to Gob.updateGob")
                    Gob.updateGob(true);
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

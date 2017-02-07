/**
 * Created by bgllj on 2016/9/7.
 */
import ARR from "./Richang_JSEX/arrayARR.js"
import TYP from "./Richang_JSEX/typeTYP.js"


/**
 * Gob，选中图层。接管对选中图层的操作，把对 Gob 的操作分发给每个选中图层
 * 每当有选中图层方式变化，会执行 Gob.updateSelect
 *
 * @returns {GobCaryon}
 * @constructor
 */
var GobCaryon = function ()
{
    this.selectList = [];



    this._neverUpdate =true;//未更新过
    this.selectRender = false; //选择图层后渲染
    this.selectRenderVarList = false; //渲染改变的变量列表
    this.selectChanged = false;
    this.selectUpdateing = false;
    this.disableRender = false //不渲染


    this.nowSwitching = false;//是否在切换选中图层中
    this.stopSelectEvent = false;//不触发选择图层事件

    //----异步赋值计数器
    this.__asyncSetCounter = 0;
    this._asyncSetSwitch = false;
    Object.defineProperty(this, "_asyncSetCounter",
        {
            set: function (x)
            {
                if (x < 0) x = 0;
                this.__asyncSetCounter = x;
                if (x == 0 && this._asyncSetSwitch)
                {
                    console.group("__asyncSetCounter")
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
                            // renderCaryon.renderDocument(true, this.selectRenderVarList)
                        }
                    }
                    console.groupEnd();
                }
            },
            get: function ()
            {
                return this.__asyncSetCounter;
            }
        }
    );


    //属性注册[1/8]
    this.position = this.__new_position();
    this.text = this.__new_text();
    this.shape = this.__new_shape();

    //属性注册[2/8]
    //------------注册 getter 和 setter
    var root = this;
    giveSetter(this.position, ["position"], 1);
    giveSetter(this.text, ["text"], 1);
    giveSetter(this.shape, ["shape"], 1);
    return this;


    // END
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
        $enableTextFormula: null,
        assignment: {
            text: null,
            $enableTextFormula: null,
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
            $enableTextFormula: null,
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


/** setter , 设置 Gob 属性值
 *
 * @param names 属性名路径列表，如 [position,enableAssigns,y]
 * @param value 要设置的值
 * @returns {Promise.<void>}
 * @private
 */
GobCaryon.prototype._setData = async function (names, value)
{

    console.log(`_setData(${names}, ${value}):`)

    var isFormula = false;
    var doDocumentRender = false;
    var varUpdatelist = [];


    //-------- 【1】. 值写入实际存储的属性 this._XXX;
    var changeValue_Gob = _valueToObject(this, names, 0, value, true);


    //属性注册[4/8]

    //-------- 2. 判断是否应该写入 dataCaryon ; 变量、表达式、自定义属性将写入dataCaryon
    /* 写入 dataCaryon 的情况：
     *  1. 属性值含有表达式
     *  2. 内置属性（$开头的属性）
     * */


    var flag_writeDataCaryon = false;//是否应该写入 dataCaryon
    var isVoidValue = false//是否是空值
    var isTypeText = false//是否是类型文本
    var isAssignment = false// 是否是“变量赋值命令”属性


    var _typeText_typeName = null//类型文本的类型

    var isText = false//是否是文本类型的值
    var _lastName = names[names.length - 1] //最终要设置的属性名称
    var _lastButOneName = names[names.length - 2] //最终属性前一个属性名称（倒数第二个属性名）

    if (value === "") //判断是否是空值
    {
        isVoidValue = true;
    } else
    {
        if (value != Gob.MULT)
        {
            //0. 变量赋值属性
            if (_lastButOneName == "assignment" && _lastButOneName == "enableAssigns")
            {
                isAssignment = true;
                /************************/
                flag_writeDataCaryon = true;
                /************************/
            }


            //1. 文本值-------------------------------------------------
            if (_lastName == "text") //文本
            {
                if (TYP.type(value) == "string")
                {

                    if (_getObjectValueByNames(this, names, 1).$enableTextFormula)//检查是否启用了文本表达式
                    {
                        var _enableTextFormula = true
                    } else
                    {
                        var _enableTextFormula = false
                    }

                    if (_enableTextFormula)//文本表达式
                    {
                        /************************/
                        flag_writeDataCaryon = true;
                        /************************/
                    }
                }
            }
            //2. 内置属性------------------------------------------------
            else if (_lastName[0] === "$")
            {
                if (_lastName == "$enableTextFormula")
                {
                    var temp = this.text.text;
                    this.text.text = " "
                    this.text.text = temp
                }
            }
            else
            {
                //3. 类型文本------------------------------------------------
                __checkTypeText(_typeDefine)

                //  -------------定义数据和方法：
                var _typeDefine = {
                    boolean: {
                        type: "boolean",//属性名称
                        nameList: ["bold", "italic"], //这些名字的属性使用这一类型
                        valueEnum: ["true", "false"], //当值为这些时被判定为类型文本
                        judgementFunc: null //自定义判断函数，不指定 valueEnum ，使用一个函数判断 value 是否是一个类型文本
                    },
                    underline: {
                        type: "underline",
                        nameList: ["underline"],
                        valueEnum: ["underlineOff", "underlineOnLeftInVertical", "underlineOnRightInVertical",
                            "verticalUnderlineLeft", "verticalUnderlineRight"]
                    },
                    justification: {
                        type: "justification",
                        nameList: ["justification"],
                        valueEnum: ["center", "right", "left",
                            "justifyAll", "justifyLeft", "justifyRight"]
                    },
                    antiAlias: {
                        type: "antiAlias",
                        nameList: ["antiAlias"],
                        valueEnum: null,
                        judgementFunc: function (value)
                        {
                            if (value.slice(0, 9) == "antiAlias")
                            {
                                return true;
                            } else
                            {
                                return false;
                            }
                        }
                    }
                }

                function __checkTypeText(_typeDefine)
                {
                    for (var i in _typeDefine)
                    {
                        var isType = ARR.hasMember(_typeDefine[i].nameList, _lastName);
                        if (isType)
                        {
                            isTypeText = true;
                            _typeText_typeName = _typeDefine[i].type
                        }
                    }
                }

                //  END类型文本-------------------------------------------------

                //4. 变量表达式------------------------------------------------
                if (isTypeText == false)
                {
                    if (varSystem.isFormula(value)) //只写入公式变量
                    {
                        isFormula = true;
                        /************************/
                        flag_writeDataCaryon = true;
                        /************************/
                    }
                }
                //5. 值------------------------------------------------
                /**/


            }
        }

    }


    //-------- 【3】. 把值分发到每个选中图层的 dataCaryon ，;
    var rendered = false;


    //1.保存选中图层状态
    if (this.selectList.length > 1)
    {
        var save = await enzymes.selectSave();
    }

    //2.每个图层执行一次分发操作：
    for (var i = 0; i < this.selectList.length; i++)
    {
        dataCaryon.info.status.saved = false;

        var changeValue_dataCaryon = false;// 是否改变了 dataCaryon 里原有的值
        //写入 dataCaryon
        if (flag_writeDataCaryon)
        {
            if (dataCaryon.layers[this.selectList[i].id] == undefined)//如果 dataCaryon 图层不存在，就创建
            {
                dataCaryon.addLayer(this.selectList[i]);
            }
            changeValue_dataCaryon = _valueToObject(dataCaryon.layers[this.selectList[i].id], names, 0, value)
        }


        // 即时修改-------------------------------------------------------------------------------------------
        // console.log("isFormula :" + isFormula + "  change:" + changeValue_Gob + "  change_i:" + changeValue_dataCaryon)
        // console.log(changeValue_dataCaryon, changeValue_Gob, isFormula)
        // console.log("this.nowSwitching =" + this.nowSwitching + "    " + names + "=>" + value)


        if ((this.nowSwitching == false) && (this.disableRender != true) && (value != Gob.MULT))
        {
            if (changeValue_dataCaryon || changeValue_Gob)
            {
                doDocumentRender = true;
                if ((isAssignment != true) && (isVoidValue != true))
                {
                    console.log("【START】renderPatch--------" + names + "=>" + value)
                    console.log(this.selectList[i].id, names, value)

                    rendered = true;

                    if (isFormula) //如果是变量表达式先解析"普通变量"
                    {
                        var finValue = await varSystem.evalVar(value, this.selectList[i].id)
                    } else
                    {
                        var finValue = value;
                    }

                    console.log(`renderCaryon.renderPatch(${this.selectList[i].id}, ${names}, ${finValue}, ${true})`)
                    await renderCaryon.renderPatch(this.selectList[i].id, names, finValue, true)

                    console.log("【END】renderPatch------" + names + "=>" + finValue)
                }

            }
        }
    }


//3.自动渲染文档:
    if (setSystem.autoRender && this.disableRender != true)
    {
        if (this[names[0]]["enableAssigns"][names[names.length - 1]])
        {
            console.log("autoRender", (changeValue_dataCaryon || changeValue_Gob), this[names[0]]["enableAssigns"][names[names.length - 1]], names)
            if (value != Gob.MULT && (changeValue_dataCaryon || changeValue_Gob))
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


//4.恢复选中图层状态
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
    Gob._asyncSetCounter--;
}


/**
 *  getter ，获取 Gob 属性值
 * @param names
 * @returns {*}
 * @private
 */
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

    if (this.stopSelectEvent)// 如果设置了停止选择更新开关则返回
    {
        return;
    }

    if (this.selectUpdateing)// 如果另外的更新未结束则返回。
    {
        return;
    }


    logger.pin("Gob", "GobCaryon.prototype.updateSelect", "【开始】选中图层周期 [updateSelect]--------------------")
    logger.group("%c[updateSelect]", "color:#09ae9d;")


    this.selectUpdateing = true; //标志正在更新选中图层
    this.nowSwitching = true;     //标志切换
    this.selectRender = false;
    this.selectRenderVarList = [];
    console.log("【this.nowSwitching = true】")

    //判断选中图层是否有改变
    var newList = (await enzymes.getSelectLayerArray()).reverse();
    this.selectChanged = ((ARR.symDifference_ObjectArray(newList, this.selectList, "id")).length > 0);
    logger.pin("Gob", "GobCaryon.prototype.updateSelect", "selectChanged:", this.selectChanged)

    this.selectList = newList;
    //******************
    await this.updateGob();
    //******************
    this.selectUpdateing = false;
    console.log("selectUpdateing:false")
    logger.pin("Gob", "GobCaryon.prototype.updateSelect", "【结束】选中图层周期 [updateSelect]--------------------")
    console.groupEnd()
}


/**
 * 更新选中图层对象的数据。会从“实际图层”和 DataCaryon 拉取图层数据到 Gob。
 * 默认情况下会触发渲染
 * @param disableRender 禁止 Gob 更新期间渲染图层
 * @returns {Promise.<void>}
 */
GobCaryon.prototype.updateGob = async function (disableRender)
{
    logger.group("[updateGob]")

    this.disableRender = disableRender || false;
    logger.pin("Gob", "GobCaryon.prototype.updateGo",
        `updateGob [START]`, "disableRender:" + this.disableRender)

    //----------1. 要拉取的数据：
    var temp = {};

    //属性注册[5/8`]
    var new_position = this.__new_position;
    var new_text = this.__new_text;
    var new_shape = this.__new_shape;

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
    _objectToObject_asyncSetCounter(temp.position, this.position, false, false, true);
    _objectToObject_asyncSetCounter(temp.text, this.text, false, false, true);
    _objectToObject_asyncSetCounter(temp.shape, this.shape, false, false, true);
    Gob._asyncSetSwitch = true
    _objectToObject(temp.position, this.position, false, false, true);
    _objectToObject(temp.text, this.text, false, false, true);
    _objectToObject(temp.shape, this.shape, false, false, true);


    this.disableRender = false;//恢复默认值；
    logger.groupEnd()
    //[END]-----------------
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
                    }
                }
            }
        }

        if (_temp > 0)
        {
            Gob._asyncSetCounter += _temp;
        }
    }


}


// 代表多值的常量
GobCaryon.prototype.MULT = "%$*/Gob-MUTIPLE/*$%";

/**
 * 把值赋予指定对象指定路径成员
 *
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

                    console.log("delete to Gob.updateGob.")
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


/**
 * 根据属性名路径列表（names）获取对象属性的值
 * @param object 对象
 * @param names 属性名路径列表，如 [position,enableAssigns,y]
 * @param aheadEndTime 提取结束个数，如设置为 1 则是获取倒数第 2 个属性的值，
 * @returns {*}
 * @private
 */
function _getObjectValueByNames(object, names, aheadEndTime)
{
    var nowValue;
    for (var i = 0; i < (names.length - (aheadEndTime || 0)); i++)
    {

        if (i == 0)
        {
            nowValue = object[names[i]];
        } else
        {
            nowValue = nowValue[names[i]];
        }

    }

    return nowValue
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

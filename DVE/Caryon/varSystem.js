/**
 * Created by bgllj on 2016/9/8.
 */

import ARR from "./Richang_JSEX/arrayARR.js"
import STR from "./Richang_JSEX/stringSTR.js"
import TYP from "./Richang_JSEX/typeTYP.js"
import OBJ from "./Richang_JSEX/objectOBJ.js"
/**
 * 变量基本数据类型，主要封装 evalVar()
 * @param value
 * @param type
 * @param isFormula
 * @param relatives
 * @returns {VarType}
 * @constructor
 */
var VarType = function (value, name, type, isFormula, relatives)
{       //----赋予 value getter，用来在设置值时可以更新依赖表 relatives
    this._value = null;
    this.value = null;
    Object.defineProperty(this, "value",
        {
            get: function ()
            {
                return this._value;
            },
            set: function (x)
            {
                this.updateRelatives(x);
                this._value = x;
                this.isFormula = VarSystem.prototype.isFormula(x);
            }

        });


    if (value instanceof Object && arguments.length == 1)
    {
        this.name = value.name;
        this.value = value.value;
        this.type = value.type;
        this.isFormula = value.isFormula;
        this.relatives = value.relatives;

    } else
    {
        this.name = name;
        this.value = value;
        this.type = type;
        this.isFormula = isFormula;
        this.relatives = relatives;
    }

    return this;
}


VarType.prototype.setObject = function (names, value)
{
    console.info("@varSetObject@:", names, value)
    if (TYP.type(this._value) != "object")
    {
        this._value = {};
    }
    OBJ.setObjectValueByNames(this._value, names, value)
    this.updateRelatives(value);
    this.isFormula = VarSystem.prototype.isFormula(value);
}


/**
 * 更新依赖表
 * @param newFormula
 */
VarType.prototype.updateRelatives = function (newFormula)
{
    var oldRelatives = VarSystem.prototype.scanVarsInFormula(this._value, true);
    var newRelatives = VarSystem.prototype.scanVarsInFormula(newFormula, true);

    if (window.varSystem != undefined)
    {
        try
        {
            var removeArr = ARR.difference(oldRelatives, newRelatives);
            for (var i = 0; i < removeArr.length; i++)
            {
                if (varSystem.vars[removeArr[i]] != undefined)
                {
                    ARR.remove(varSystem.vars[removeArr[i]].relatives, this.name, true)
                }

            }

            var addArr = ARR.difference(newRelatives, oldRelatives);
            for (var i = 0; i < addArr.length; i++)
            {
                if (varSystem.vars[addArr[i]] != undefined)
                {
                    varSystem.vars[addArr[i]].relatives.push(this.name)
                }
            }
        }
        catch (e)
        {
            console.error(e)
        }

    }
}


/**
 * 解析变量。计算变量把变量变成具体值。*异步*
 */
VarType.prototype.evalVar = async function ()
{
    return await VarSystem.prototype.evalVar(this.value)
}


VarType.prototype.clone = function ()
{
    return new VarType(this.value, this.name, this.type, this.isFormula, this.relatives)
}


//-------------------------------------------------------------


/**
 * 变量存储系统
 * @returns {VarSystem}
 * @constructor
 */
var VarSystem = function ()
{
    // relatives 是记录引用这个变量的其他变量，当删除变量前可以给出依赖提示。

    //变量存储对象：
    this.vars = {
        'zero': new VarType({name: 'zero', value: "10-10", type: null, isFormula: true, relatives: []}),
        // 'a': new VarType({name: 'a', value: 123, type: null, isFormula: false, relatives: ['x']}),
        // 'b': new VarType({name: 'b', value: 1000, type: null, isFormula: false, relatives: ['x']}),
        // 'x': new VarType({name: 'x', value: "a*b", type: null, isFormula: true, relatives: []}),
        // 't': new VarType({name: 't', value: "true", type: null, isFormula: true, relatives: []}),
        // 'cc': new VarType({name: 'cc', value: "#f01", type: null, isFormula: true, relatives: []}),
    };


    /*变量可执行方法：*/
    this.varFunctions = {
        rgb: function (value, self)
        {
            ichiColor.set(value)
            return ichiColor.rgb;
        },
        hsl: function (value, self)
        {
            ichiColor.set(value)
            var c = ichiColor.hsl;
            return `hsl(${c.h}, ${c.s}, ${c.l})`;
        },
        hsv: function (value, self)
        {
            ichiColor.set(value)
            var c = ichiColor.hsv
            return `hsv(${c.h}, ${c.s}, ${c.v})`;
        },
        cmyk: async function (value, self)
        {
            ichiColor.set(value)
            var cmyk = await  enzymes.colorHexToPsCMYK(ichiColor.hex)
            return `cmyk(${cmyk.c}, ${cmyk.m}, ${cmyk.y}, ${cmyk.k})`;
        },
        lab: function (value, self)
        {
            ichiColor.set(value)
            var c = ichiColor.ex.labPs
            return `lab(${c.l}, ${c.a}, ${c.b})`;
        },

        right: async function (value, self, thisId, names, orgVar)
        {
            async function getThisWidth()
            {
                if (dataCaryon.layers[thisId] != undefined)
                {
                    if (dataCaryon.layers[thisId].position != undefined && dataCaryon.layers[thisId].position.w != undefined)
                    {
                        return await self.evalVar(dataCaryon.layers[thisId].position.w, thisId, ["position", "w"])
                    }
                }
                var staic_position = await  enzymes.getLayerInfo_position_byId(thisId)
                return staic_position["w"]
            }

            var reg = /[@$￥][\u4E00-\u9FA5\u3400-\u4DB5\u3040-\u309F\u30A0-\u30FF\u1100-\u11FF\uAC00-\uD7AF_a-zA-Z0-9\.]+/

            var left = orgVar.replace(reg, "$&.x + $&.w")

            var w = await  getThisWidth()
            var leftValue = await self.evalVar(left, thisId, names)
            // console.log({value, self, thisId, names, orgVar})

            var done = +leftValue - +w
            // alert("leftValue = " + leftValue + ", w:" + w+" d:"+done)
            return done;
        },


        bottom: async function (value, self, thisId, names, orgVar)
        {
            async function getThisHeigth()
            {
                if (dataCaryon.layers[thisId] != undefined)
                {
                    if (dataCaryon.layers[thisId].position != undefined && dataCaryon.layers[thisId].position.h != undefined)
                    {
                        return await self.evalVar(dataCaryon.layers[thisId].position.h, thisId, ["position", "h"])
                    }
                }
                var staic_position = await  enzymes.getLayerInfo_position_byId(thisId)
                return staic_position["h"]
            }

            var reg = /[@$￥][\u4E00-\u9FA5\u3400-\u4DB5\u3040-\u309F\u30A0-\u30FF\u1100-\u11FF\uAC00-\uD7AF_a-zA-Z0-9\.]+/
            var bottom = orgVar.replace(reg, "$&.y + $&.h")

            var h = await  getThisHeigth()
            var bottomValue = await self.evalVar(bottom, thisId, names)

            var done = +bottomValue - +h
            // alert("leftValue = " + leftValue + ", w:" + w+" d:"+done)
            return done;
        },

        center: async function (value, self, thisId, names, orgVar)
        {

            var values = orgVar.split(/[,，]/)

            if (values.length == 1)
            {
                var scalc = 1 / 2
                var targetValue = values[0]
            } else if (values.length == 2)
            {
                var scalc = await self.evalVar(values[0], thisId, names)
                var targetValue = values[1]
            }

            var reg = /[@$￥][\u4E00-\u9FA5\u3400-\u4DB5\u3040-\u309F\u30A0-\u30FF\u1100-\u11FF\uAC00-\uD7AF_a-zA-Z0-9\.]+/
            if (names[names.length - 1] == "x")
            {
                var center = targetValue.replace(reg, "$&.x + ($&.w)*(" + scalc + ")")
                var centerValue = await self.evalVar(center, thisId, names)
                var w = await  getThisWidth()
                var done = Math.round((+centerValue - (+w / 2)))
                return done;


            } else if (names[names.length - 1] == "y")
            {

                var center = targetValue.replace(reg, "$&.y + ($&.h)*(" + scalc + ")")
                var centerValue = await self.evalVar(center, thisId, names)
                var h = await  getThisHeigth()
                var done = Math.round((+centerValue - (+h / 2)))
                return done;


            }
            return value

            async function getThisWidth()
            {
                if (dataCaryon.layers[thisId] != undefined)
                {
                    if (dataCaryon.layers[thisId].position != undefined && dataCaryon.layers[thisId].position.w != undefined)
                    {
                        return await self.evalVar(dataCaryon.layers[thisId].position.w, thisId, ["position", "w"])
                    }
                }
                var staic_position = await  enzymes.getLayerInfo_position_byId(thisId)
                return staic_position["w"]
            }

            async function getThisHeigth()
            {
                if (dataCaryon.layers[thisId] != undefined)
                {
                    if (dataCaryon.layers[thisId].position != undefined && dataCaryon.layers[thisId].position.h != undefined)
                    {
                        return await self.evalVar(dataCaryon.layers[thisId].position.h, thisId, ["position", "h"])
                    }
                }
                var staic_position = await  enzymes.getLayerInfo_position_byId(thisId)
                return staic_position["h"]
            }

        }
    }


    /*计数*/
    this.$count = 1;
    this.$layerount = 1;
    this.$userCounts = {};

    this.inintVarNameList()
    return this;
}


/**
 * 载入变量表。从 json 反序列化过的 object 中载入变量表。
 * @param object
 */
VarSystem.prototype.loadVarsFromObject = function (object)
{
    /*清空原变量表*/
    for (var x in this.vars)
    {
        this.removeVar(x)
    }

    /*新建变量*/
    for (var z in object)
    {
        this.addVar(object[z].name, object[z].value, object[z].type, object[z].isFormula, object[z].relatives)
    }
}


/**
 * 导入变量表，从 json 反序列化过的 object 中载入变量表，已有重复的变量将被新值覆盖，不会清空原变量表，
 * @param object
 */
VarSystem.prototype.importVarsFromObject = function (object)
{
    /*新建变量*/

    for (var z in object)
    {


        if (z != undefined && object[z] != undefined)
        {
            if (this.vars[z] == undefined)
            {
                // console.log("add:",z, object[z])
                this.addVar(object[z].name, object[z].value, object[z].type, object[z].isFormula, object[z].relatives)
            } else
            {
                // console.log("set:",z, object[z])
                this.setVar(object[z].name, object[z].value, object[z].type, object[z].isFormula)
            }
        }


    }
}


/**
 * 初始化变量名称列表，为了自动补全功能
 * @param object
 */
VarSystem.prototype.inintVarNameList = function ()
{
    window.autocomplete_var = [
        {value: "sss123"}
    ];
    window.autocomplete_var_hash = {}


    window.autocomplete_var.splice(0, window.autocomplete_var.length)
    for (var x in this.vars)
    {
        window.autocomplete_var.push({value: x})
        window.autocomplete_var_hash[x] = true;
    }

    var defaultWord = ["$i", "$z", "$i_name", "$parent",
        "$pad", "$up1", "$low1", "$colorSampler1","$nth1", ,"￥色彩取样器1","￥父", "￥底", "￥上1"
        , "￥下1", "￥第1"]


    for (var x in defaultWord)
    {
        window.autocomplete_var_hash[defaultWord[x]] = true;
        window.autocomplete_var.push({value: defaultWord[x]})
    }

}

/**
 * 清理初始化名称列表
 */
VarSystem.prototype.cleanVarNameList = function ()
{

    for (var i = 0; i < window.autocomplete_var.length; i++)
    {

        if (this.vars[window.autocomplete_var[i].value] == undefined)
        {
            window.autocomplete_var.splice(i, 1)
            i--;
        }
    }

}


/**
 添加变量
 */
VarSystem.prototype.addVar = function (name, value, type, isFormula, relatives)
{

    if (this.vars[name] !== undefined)
    {
        return {err: "err: Variable already exists"}
    }

    if (isFormula == undefined)
    {
        var isFormula = VarSystem.prototype.isFormula(value);
    }
    // this.vars[name] = new VarType({value: value, name: name, type: type || null, isFormula: isFormula || false})
    Vue.set(this.vars, name, new VarType({
        value: value,
        name: name,
        type: type || null,
        isFormula: isFormula || false,
        relatives: relatives || []
    }))


    if (name != undefined)
    {
        if (window.autocomplete_var_hash[name] != true)
        {
            window.autocomplete_var.push({value: name})//为自动补全
            window.autocomplete_var_hash[name] = true;
        }
    }
}

//删除变量
VarSystem.prototype.removeVar = function (name)
{
    var relatives = this.vars[name].relatives;
    // delete this.vars[name];
    Vue.delete(this.vars, name)

    ARR.deleteByKey(window.autocomplete_var, "value", name)
    window.autocomplete_var_hash[name] = null;
    return relatives;
}

//设置变量
VarSystem.prototype.setVar = function (name, value, type, isFormula)
{

    if (name != undefined && name != "")
    {
        if (this.vars[name] != undefined)
        {
            this.vars[name].value = value;

            if (isFormula != undefined)
            {
                this.vars[name].isFormula = isFormula
            }
            if (type != undefined)
            {
                this.vars[name].type = type
            }
        }

    }

}
/**
 * 验证变量名称是否可用
 * @param newName
 * @returns {*}
 */
VarSystem.prototype.varifyName = function (newName)
{
    if (this.vars[newName] != undefined)
    {
        return {pass: false, err: "repe"};//存在重复的名称
    }

    if (VarSystem.prototype.scanVarsInFormula(newName).length <= 0)
    {
        return {pass: false, err: "Illegal_name"};//名称非法
    }

    return {pass: true, err: null};
}


//重命名变量
VarSystem.prototype.renameVar = function (name, newName)
{
    if (this.vars[newName] != undefined)
    {
        return {name: name, err: "repe"};//存在重复的名称
    }

    if (VarSystem.prototype.scanVarsInFormula(newName).length <= 0)
    {
        return {name: name, err: "Illegal_name"};//名称非法
    }


    this.vars[newName] = this.vars[name].clone();
    delete this.vars[name];


    return {name: newName, err: null};
}


VarSystem.prototype.layerSample = {
    name: "图层名",
    id: 2,
    index: 1,
    position: {x: 0, y: 0, w: 0, h: 0, assignment: {}},
}


/**
 *  解析变量。计算变量把变量变成具体值。
 * @param varValue
 * @param thisId
 * @returns {Promise.<*>}
 */
VarSystem.prototype.evalVar = async function (varValue, thisId, names)
{
    var self = this

    async function _sbeval(_varStr)
    {
        var reg_sb = /\[[^\[\]]*\]/g

        var varList = []
        var resullt = undefined;
        while ((resullt = reg_sb.exec(_varStr)) !== null)
        {
            varList.push({name: resullt[0], index: resullt.index})
        }
        var increment = 0

        for (var i = 0; i < varList.length; i++)
        {
            var name = varList[i].name.toString()
            var getValue = "." + await  self.evalVar(name.slice(1, name.length - 1))

            _varStr = STR.insert(_varStr,
                varList[i].index + increment,
                name.length,
                getValue
            );
            increment += getValue.toString().length - name.length;
        }

        console.log(_varStr)
        return _varStr
    }


    try
    {
        console.log(`varSystem.evalVar("${varValue}", ${thisId} , ${JSON.stringify(names)})`)


        var result = this._execFunction_satrt(varValue)

        if (result.funcName != undefined)
        {
            var inVar = result.value;
            var orgVar = result.value;
            var hasFunction = true;
        } else
        {
            var inVar = varValue;
            var orgVar = varValue;
            var hasFunction = false;
        }


        var notRecur = false;
        /*不递归*/


        if (inVar[0] == ">")
        {
            inVar = inVar.slice(1);
            notRecur = true
        }

        var varList = [];
        varList = VarSystem.prototype.scanVarsInFormula(inVar);

        // console.info(inVar,varList)
        var increment = 0;
        for (let i = 0; i < varList.length; i++)
        {

            if (varList[i].name[0] == "$" || varList[i].name[0] == "￥")
            {
                var _this_var = await this.evalVarEnhancer(varList[i].name.slice(1), thisId, names)

            } else
            {
                if (varList[i].name[0] == "@")
                {
                    var _varStr = varList[i].name
                    _varStr = await _sbeval(_varStr)


                    var varArr = _varStr.split(".")
                    if (varArr.length > 1)
                    {

                        var resultValue = OBJ.getObjectValueByNames(this.vars[varArr[0]].value, varArr.slice(1))

                        if (resultValue == undefined && varArr.length == 2)
                        {
                            if (ARR.hasMember(["x", "y", "w", "h"], varArr[1]))
                            {
                                resultValue = OBJ.getObjectValueByNames(this.vars[varArr[0]].value, ["position", varArr[1]])
                            }
                        }
                        var _this_var = {value: resultValue};
                    }
                    else
                    {
                        var resultValue = OBJ.getObjectValueByNames(this.vars[varList[i].name].value, names)
                        var _this_var =
                            {value: resultValue};

                    }


                } else
                {
                    var _this_var = this.vars[varList[i].name];
                }

            }


            if (_this_var !== undefined)
            {
                // console.log(varList[i].index + increment + "-" + varList[i].name.length)
                if (_this_var.value[0] == "$" || _this_var.value[0] == "￥") //    --增强子变量
                {

                    var reg = /^i_/
                    console.log("_this_var.value:", _this_var.value)
                    if (ARR.hasMember(["计数", "count", "i"], _this_var.value.slice(1)))
                    {
                        var getValue = this.$count;
                        this.$count++;
                    } else if (ARR.hasMember(["图层计数", "layerCount", "z"], _this_var.value.slice(1)))
                    {
                        var getValue = this.$layerCount;
                    }
                    else if (reg.test(_this_var.value.slice(1)))
                    {
                        var userVar = _this_var.value.slice(2)
                        console.log("$userVar", userVar)
                        if (this.$userCounts[userVar] == undefined)
                        {
                            this.$userCounts[userVar] = 1
                        } else
                        {
                            this.$userCounts[userVar]++
                        }
                        var getValue = this.$userCounts[userVar];
                    }

                    // else
                    // {
                    //     var getValue = await enzymes.evalEnhancer(_this_var.value, thisId);
                    // }
                }
                else
                {
                    if (notRecur)
                    {
                        var getValue = _this_var.value;
                    } else
                    {
                        var getValue = await this.evalVar(_this_var.value, thisId, names);
                    }
                }

                inVar = STR.insert(inVar,
                    varList[i].index + increment,
                    varList[i].name.toString().length,
                    getValue
                );
                increment += getValue.toString().length - varList[i].name.toString().length;
            }
        }


        //修正 JavaScript 精度问题
        try
        {
            if (inVar[0] == "#" || varValue[0] == ">")
            {
                return await
                    retrunFilter(inVar)
            }

            return await
                retrunFilter(math.format(math.eval(inVar), {precision: 14}))
        } catch (e)
        {
            console.error(`math.eval(${inVar})`, e)
            return await
                retrunFilter(inVar)
        }

        async function retrunFilter(value)
        {

            if (hasFunction)
            {
                return await  self._execFunction_end(value, result.funcName, thisId, names, orgVar)
            } else
            {
                return value
            }

        }
    }
    catch (e)
    {
        console.error(e)
        return varValue
    }
}

VarSystem.prototype.evalVarEnhancer = async function (varValue, thisId, names)
{

    var varArr = varValue.split(".")
    var layerId = null

    var reg_nth = /^(nth|第)[0-9_]+/
    var reg_up = /^(up|pre|上|前)[0-9_]*/
    var reg_low = /^(low|next|下|后)[0-9_]*/
    var reg_colorSample = /^(colorSampler|色彩取样器)[0-9_]*/

    if (ARR.hasMember(["parent", "親", "父", "box"], varArr[0]))
    {
        var parentId = await enzymes.getParentLayerId_byLayerId(thisId)
        // console.log("parentId", parentId)
        if (parentId != null)
        {
            layerId = parentId
        }
    }
    else if (ARR.hasMember(["pad", "floor", "底"], varArr[0]))
    {
        var padId = await enzymes.getParentChildLayerId_byLayerId(thisId, -1)
        // console.log("parentId", parentId)
        if (padId != null)
        {
            layerId = padId
        }
    }
    else if (reg_nth.test(varArr[0]))
    {
        var reg_number = /[0-9_]+/
        var numberStr = reg_number.exec(varArr[0])[0]
        if (numberStr[0] === "_")
        {
            var number = -+numberStr.slice(1)
        } else
        {
            var number = +numberStr - 1
        }

        var nthId = await enzymes.getParentChildLayerId_byLayerId(thisId, number)
        // console.log("parentId", parentId)
        if (nthId != null)
        {
            layerId = nthId
        }
    }
    else if (reg_up.test(varArr[0]))
    {
        var reg_number = /[0-9_]+/
        var numberStr = reg_number.exec(varArr[0])
        if (numberStr != undefined)
        {
            numberStr = numberStr[0]
        } else
        {
            numberStr = 1
        }

        if (numberStr[0] === "_")
        {
            var number = -+numberStr.slice(1)
        } else
        {
            var number = +numberStr
        }

        var nthId = await enzymes.getNneighborLayerId_byLayerId(thisId, number)
        if (nthId != null)
        {
            layerId = nthId
        }
    }
    else if (reg_low.test(varArr[0]))
    {
        var reg_number = /[0-9_]+/

        var numberStr = reg_number.exec(varArr[0])
        if (numberStr != undefined)
        {
            numberStr = numberStr[0]
        } else
        {
            numberStr = 1
        }

        if (numberStr[0] === "_")
        {
            var number = -+numberStr.slice(1)
        } else
        {
            var number = +numberStr
        }

        console.log(`enzymes.getNneighborLayerId_byLayerId(${thisId}, ${-number})`)
        var nthId = await enzymes.getNneighborLayerId_byLayerId(thisId, -number)
        if (nthId != null)
        {
            layerId = nthId
        }
    }
    else if (reg_colorSample.test(varArr[0]))
    {
        var reg_number = /[0-9_]+/

        var numberStr = reg_number.exec(varArr[0])
        if (numberStr != undefined)
        {
            numberStr = numberStr[0]
        } else
        {
            numberStr = 1
        }
        var number = +numberStr


        console.log(`enzymes.getColorSamplerColorHex( ${number - 1})`)

        var color = await enzymes.getColorSamplerColorHex(number - 1)
        if (color != undefined)
        {
            return {value: color}
        }


    }


    if (layerId != undefined)
    {

        if (varArr.length === 1)
        {
            var names = names;

        } else if (varArr.length > 1)
        {
            names = varArr.slice(1)
            if (ARR.hasMember(["x", "y", "w", "h"], varArr[1]))
            {
                names.unshift("position")
            }
        }

        var rootName = names[0]
        console.log("rootName:", rootName)
        var resultValue = await renderCaryon._getLayerDataByNamse(rootName, names.slice(1), layerId, true)
        console.log("resultValue:", resultValue)
        return {value: resultValue}
    }
    else
    {
        return {value: "$" + varValue}
    }

}


/**
 * 判断是否是公式变量
 * @param varValue
 */
VarSystem.prototype.isFormula = function (varValue)
{
    if (TYP.type(varValue) == "boolean")
    {
        return false;
    }

    var varList = VarSystem.prototype.scanVarsInFormula(varValue);
    if (varList.length > 0)
    {
        return true;
    }
    return false;
}


VarSystem.prototype._execFunction_satrt = function (varValue)
{

    var re = /^[\w]*\(.+\)$/

    if (re.test(varValue))
    {
        var _a = /^[\w]*\(/
        var result = _a.exec(varValue)

        if (result[0] != undefined)
        {
            var funcName = result[0].slice(0, result[0].length - 1)
            if (this.varFunctions[funcName] != undefined)
            {
                var body = varValue.slice(result[0].length, varValue.length - 1)
                return {value: body, funcName: funcName}
            }
        }
    }
    return {value: varValue, funcName: null}
}


VarSystem.prototype._execFunction_end = async function (value, funcName, thisId, names, orgVar)
{

    console.log(
        `_execFunction_end(${value},${funcName})`
    )
    if (this.varFunctions[funcName] != undefined)
    {
        var func = await this.varFunctions[funcName];
        var result = func(value, this, thisId, names, orgVar)
        return result
    }

    return value
}


/**
 * 判断是否是附带公式变量的文本
 * @param varValue
 */
VarSystem.prototype.isFormulaInText = function (varValue)
{
    var varList = VarSystem.prototype.scanFormulasInText(varValue);
    if (varList.length > 0)
    {
        return true;
    }
    return false;
}


/**
 * 提取公式中的变量，只判断形式
 * @param formula
 */
VarSystem.prototype.scanVarsInFormula = function (formula, flat)
{
    // CJK统一汉字的20902汉字	0x4E00-0x9FA5
    // CJK统一汉字扩充A的6582汉字	0x3400-0x4DB5
    // CJK统一汉字扩充B的42711汉字	0x20000-0x2A6D6
    // 韩文拼音：AC00-D7AF
    // 韩文字母：1100-11FF
    // 日文平假名：3040-309F
    // 日文片假名：30A0-30FF

    var re = /[\u4E00-\u9FA5\u3400-\u4DB5\u3040-\u309F\u30A0-\u30FF\u1100-\u11FF\uAC00-\uD7AF_a-zA-Z\$\@￥][\u4E00-\u9FA5\u3400-\u4DB5\u3040-\u309F\u30A0-\u30FF\u1100-\u11FF\uAC00-\uD7AF\[\]_a-zA-Z0-9\.]*/g;
    var varList = [];
    var resullt;

    if (formula == undefined)
    {
        return [];
    }
    while ((resullt = re.exec(formula)) !== null)
    {
        if (flat == true)
        {
            varList.push(resullt[0]);
        } else
        {
            varList.push({name: resullt[0], index: resullt.index})
        }
    }

    return varList;
}


/**
 * 搜索文本中的变量。使用双括号括包围的 ：{{变量}}
 * @param formula
 * @param flat
 * @returns {Array}
 */
VarSystem.prototype.scanFormulasInText = function (formula, flat)
{
    // var re = /{{\s*[\w\.\(\)\+\-\*\/\ ]+\s*}}/g;
    var re = /{{\s*[\u4E00-\u9FA5\u3400-\u4DB5\u3040-\u309F\u30A0-\u30FF\u1100-\u11FF\uAC00-\uD7AF\[\]_\$\@￥\w\.\(\)\+\-\*\/\ ]+\s*}}/g;

    var varList = [];
    var resullt;

    if (formula == undefined)
    {
        return varList;
    }
    while ((resullt = re.exec(formula)) !== null)
    {
        if (flat == true)
        {
            varList.push(resullt[0]);
        } else
        {
            varList.push({name: resullt[0], index: resullt.index})
        }
    }

    return varList;
}


VarSystem.prototype.evalFormulasInText = async function (varText, thisId, names)
{
    var text = varText;
    var formulasList = [];
    formulasList = VarSystem.prototype.scanFormulasInText(text);
    // formulasList = VarSystem.prototype.scanVarsInFormula(text);
    console.log("formulasList", formulasList)

    var increment = 0;
    for (let i = 0; i < formulasList.length; i++)
    {
        var thisFormulas = formulasList[i].name.slice(2, formulasList[i].name.length - 2);
        var isFormula = this.isFormula(formulasList[i].name);

        if (isFormula)
        {
            var getValue = await this.evalVar(thisFormulas, thisId, names);
            text = STR.insert(text,
                formulasList[i].index + increment,
                formulasList[i].name.toString().length,
                getValue
            );
            increment += getValue.toString().length - formulasList[i].name.toString().length;
        }
    }

    //修正 JavaScript 精度问题
    console.log("evalFormulasInText:", text)

    return text;
}


// //---------------

export default VarSystem;

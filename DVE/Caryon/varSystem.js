/**
 * Created by bgllj on 2016/9/8.
 */

import ARR from "./Richang_JSEX/arrayARR.js"
import STR from "./Richang_JSEX/stringSTR.js"
import TYP from "./Richang_JSEX/typeTYP.js"
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
        'zero': new VarType({name: 'zero', value: 12, type: null, isFormula: false, relatives: []}),
        'a': new VarType({name: 'a', value: 123, type: null, isFormula: false, relatives: ['x']}),
        'b': new VarType({name: 'b', value: 1000, type: null, isFormula: false, relatives: ['x']}),
        'x': new VarType({name: 'x', value: "a*b", type: null, isFormula: true, relatives: []}),
        't': new VarType({name: 't', value: "true", type: null, isFormula: true, relatives: []}),
        'cc': new VarType({name: 'cc', value: "#f01", type: null, isFormula: true, relatives: []}),
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
        cmyk: function (value, self)
        {
            ichiColor.set(value)
            var cmyk = ichiColor.ex.colorRNA.CMYK()
            return `cmyk(${cmyk[0]}, ${cmyk[1]}, ${cmyk[2]}, ${cmyk[3]})`;
        },
        lab: function (value, self)
        {
            ichiColor.set(value)
            var c = ichiColor.ex.labPs
            return `lab(${c.l}, ${c.a}, ${c.b})`;;
        }
    }


    /*计数*/
    this.$count = 0;
    this.$layerount = 0;


    return this;
}

/**
 添加变量
 */
VarSystem.prototype.addVar = function (name, value, type, isFormula)
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
    Vue.set(this.vars, name, new VarType({value: value, name: name, type: type || null, isFormula: isFormula || false}))

}

//删除变量
VarSystem.prototype.removeVar = function (name)
{

    var relatives = this.vars[name].relatives;

    // delete this.vars[name];

    Vue.delete(this.vars, name)

    return relatives;
}

//设置变量
VarSystem.prototype.setVar = function (name, value, type, isFormula)
{

    this.vars[name] = {value: value, type: type || null, isFormula: isFormula || false};

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
VarSystem.prototype.evalVar = async function (varValue, thisId)
{
    console.log("evalVar(" + varValue + ").", thisId)
    var self = this
    var result = this._execFunction_satrt(varValue)

    if (result.funcName != undefined)
    {
        var inVar = result.value;
        var hasFunction = true;
    } else
    {
        var inVar = varValue;
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
            var _this_var = {value: varList[i].name};
        } else
        {
            var _this_var = this.vars[varList[i].name];
        }


        if (_this_var !== undefined)
        {
            // console.log(varList[i].index + increment + "-" + varList[i].name.length)
            if (_this_var.value[0] == "$" || _this_var.value[0] == "￥") //    --增强子变量
            {
                if (ARR.hasMember(["计数", "count", "i"],) , _this_var.value.slice(1))
                {
                    var getValue = this.$count;
                    this.$count++;
                } else if (ARR.hasMember(["图层计数", "layerCount", "z"],) , _this_var.value.slice(1))
                {
                    var getValue = this.$layerCount;
                }
                else
                {
                    var getValue = await enzymes.evalEnhancer(_this_var.value, thisId);
                }


            }
            else
            {
                if (notRecur)
                {
                    var getValue = _this_var.value;
                } else
                {
                    var getValue = await this.evalVar(_this_var.value);
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
            return retrunFilter(inVar)
        }

        return retrunFilter(math.format(math.eval(inVar), {precision: 14}))
    } catch (e)
    {
        console.error(`math.eval(${inVar})`, e)
        return retrunFilter(inVar)
    }

    function retrunFilter(value)
    {

        if (hasFunction)
        {
            return self._execFunction_end(value, result.funcName)
        } else
        {
            return value
        }

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
            var body = varValue.slice(result[0].length, varValue.length - 1)
            return {value: body, funcName: funcName}
        }
    }
    return {value: varValue, funcName: null}
}


VarSystem.prototype._execFunction_end = function (value, funcName)
{

    console.log(`_execFunction_end(${value},${funcName})`)
    if (this.varFunctions[funcName] != undefined)
    {
        var func = this.varFunctions[funcName];
        var result = func(funcName, this)
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

    var re = /[\u4E00-\u9FA5\u3400-\u4DB5\u3040-\u309F\u30A0-\u30FF\u1100-\u11FF\uAC00-\uD7AF_a-zA-Z\$￥][\u4E00-\u9FA5\u3400-\u4DB5\u3040-\u309F\u30A0-\u30FF\u1100-\u11FF\uAC00-\uD7AF_a-zA-Z0-9]*/g;
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
    var re = /{{\s*[\u4E00-\u9FA5\u3400-\u4DB5\u3040-\u309F\u30A0-\u30FF\u1100-\u11FF\uAC00-\uD7AF_\$￥\w\.\(\)\+\-\*\/\ ]+\s*}}/g;

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


VarSystem.prototype.evalFormulasInText = async function (varText, thisId)
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
            var getValue = await this.evalVar(thisFormulas);
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

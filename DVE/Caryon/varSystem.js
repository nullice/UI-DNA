/**
 * Created by bgllj on 2016/9/8.
 */

import ARR from "./arrayARR.js"
import STR from "./stringSTR.js"

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
{
    //----赋予 value getter，用来在设置值时可以更新依赖表 relatives
    this._value = null;
    this.value = null;
    Object.defineProperty(this, value,
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
        this.value = value.value;
        this.type = value.type;
        this.name = value.name;
        this.isFormula = value.isFormula;
        this.relatives = value.relatives;
    } else
    {
        this.value = value;
        this.type = type;
        this.name = name;
        this.isFormula = isFormula;
        this.relatives = relatives;
    }


    return this;
}

VarType.prototype.updateRelatives = function (newFormula)
{
    var oldRelatives = VarSystem.prototype.scanVarsInFormula(this._value);
    var newRelatives = VarSystem.prototype.scanVarsInFormula(newFormula);


    var removeArr = ARR.difference(oldRelatives, newRelatives);

    for (var i = 0; i < removeArr.length; i++)
    {
        ARR.remove(varSystem.vars[removeArr[i]].relatives, this.name, true)
    }

    var addArr = ARR.difference(newRelatives, oldRelatives);

    for (var i = 0; i < addArr.length; i++)
    {
        varSystem.vars[addArr[i]].relatives.push(this.name)
    }
}


/**
 * 解析变量。计算变量把变量变成具体值。
 */
VarType.prototype.evalVar = function ()
{
    return VarSystem.prototype.evalVar(this.value)
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
        'x': new VarType({name: 'x', value: "a*b", type: null, isFormula: true, relatives: []})
    };

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

    this.vars[name] = new VarType({value: value, name: name, type: type || null, isFormula: isFormula || false})

}

//删除变量
VarSystem.prototype.removeVar = function (name)
{

    var relatives = this.vars[name].relatives;

    delete this.vars[name];

    return relatives;
}

//设置变量
VarSystem.prototype.setVar = function (name, value, type, isFormula)
{
    
    this.vars[name] = {value: value, type: type || null, isFormula: isFormula || false};

}

//重命名变量
VarSystem.prototype.renameVar = function (name, newName)
{
    
    
    if(this.vars[newName]!=undefined)
    {
        return name;
    }
    this.vars[newName] = this.vars[name].clone();
    delete this.vars[name];


    return newName;
}


VarSystem.prototype.layerSample = {
    name: "图层名",
    id: 2,
    index: 1,
    position: {x: 0, y: 0, w: 0, h: 0, assignment: {}},
}


/**
 * 解析变量。计算变量把变量变成具体值。
 *
 **/
VarSystem.prototype.evalVar = function (varValue)
{
    var inVar = varValue;
    var varList = [];
    varList = VarSystem.prototype.scanVarsInFormula(varValue);

    var increment = 0;
    for (let i = 0; i < varList.length; i++)
    {
        if (this.vars[varList[i].name] !== undefined)
        {
            // console.log(varList[i].index + increment + "-" + varList[i].name.length)

            var getValue = this.evalVar(this.vars[varList[i].name].value)
            inVar = STR.insert(inVar,
                varList[i].index + increment,
                varList[i].name.toString().length,
                getValue
            );

            increment += getValue.toString().length - varList[i].name.toString().length;
        }
    }


    //修正 JavaScript 精度问题
    return math.format(math.eval(inVar), {precision: 14})
}

/**
 * 判断是否是公式变量
 * @param varValue
 */
VarSystem.prototype.isFormula = function (varValue)
{
    var varList = VarSystem.prototype.scanVarsInFormula(varValue);
    if (varList.length > 0)
    {
        return true;
    }
    return false;
}

/**
 * 提取公式中的变量
 * @param formula
 */
VarSystem.prototype.scanVarsInFormula = function (formula)
{

    // CJK统一汉字的20902汉字	0x4E00-0x9FA5
    // CJK统一汉字扩充A的6582汉字	0x3400-0x4DB5
    // CJK统一汉字扩充B的42711汉字	0x20000-0x2A6D6
    // 韩文拼音：AC00-D7AF
    // 韩文字母：1100-11FF
    // 日文平假名：3040-309F
    // 日文片假名：30A0-30FF


    var re = /[\u4E00-\u9FA5\u3400-\u4DB5\u3040-\u309F\u30A0-\u30FF\u1100-\u11FF\uAC00-\uD7AF_a-zA-Z][\u4E00-\u9FA5\u3400-\u4DB5\u3040-\u309F\u30A0-\u30FF\u1100-\u11FF\uAC00-\uD7AF_a-zA-Z0-9]*/g;
    var varList = [];
    var resullt;
    while ((resullt = re.exec(formula)) !== null)
    {
        varList.push({name: resullt[0], index: resullt.index})
    }

    return varList;

}


// //---------------

export default VarSystem;

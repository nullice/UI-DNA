/**
 * Created by bgllj on 2016/9/8.
 */


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
var VarType = function (value, type, isFormula, relatives)
{
    if (value instanceof Object && arguments.length == 1)
    {
        this.value = value.value;
        this.type = value.type;
        this.isFormula = value.isFormula;
        this.relatives = value.relatives;
    } else
    {
        this.value = value;
        this.type = type;
        this.isFormula = isFormula;
        this.relatives = relatives;
    }

    return this;
}

/**
 * 解析变量。计算变量把变量变成具体值。
 */
VarType.prototype.evalVar = function ()
{
    return VarSystem.prototype.evalVar(this.value)
}

/**
 * 变量存储系统
 * @returns {VarSystem}
 * @constructor
 */
var VarSystem = function ()
{
    //变量存储对象：
    this.vars = {
        'zero': new VarType({value: 12, type: null, isFormula: false, relatives: []}),
        'a':new VarType({value: 123, type: null, isFormula: false, relatives: []}),
        'b':new VarType({value: 1000, type: null, isFormula: false, relatives: []}),
        'x':new VarType({value: "a*b", type: null, isFormula: false, relatives: []}),

    };

    this.selectLayers = [];

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

    this.vars[name] =new VarType( {value: value, type: type || null, isFormula: isFormula || false})

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
    var re = /[_a-zA-Z][_a-zA-Z0-9]*/g;
    var varList = [];
    var resullt;
    while ((resullt = re.exec(inVar)) !== null)
    {
        varList.push({name: resullt[0], index: resullt.index})
    }

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
    var inVar = varValue;
    var re = /[_a-zA-Z][_a-zA-Z0-9]*/g;
    var resullt;
    while ((resullt = re.exec(inVar)) !== null)
    {
        return true;
    }

    return false;
}


// //---------------

export default VarSystem;

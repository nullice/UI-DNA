/**
 * Created by bgllj on 2016/9/8.
 */


import STR from "./stringSTR.js"

var VarSystem = function ()
{
    //变量存储对象：
    this.vars = {
        'zero': {value: 12, type: null, isFormula: false, relatives: []},
        'a': {value: 123, type: null, isFormula: false, relatives: []},
        'b': {value: 1000, type: null, isFormula: false, relatives: []},
        'x': {value: "a*b", type: null, isFormula: false, relatives: []},

    };

    this.selectLayers = [];

    return this;
}

VarSystem.prototype.addVar = function (name, value, type, isFormula)
{

    if (this.vars[name] !== undefined)
    {
        return {err: "err: Variable already exists"}
    }

    this.vars[name] = {value: value, type: type || null, isFormula: isFormula || false}


}

VarSystem.prototype.removeVar = function (name, value, type, isFormula)
{

    var relatives = this.vars[name].relatives;

    delete this.vars[name];

    return relatives;
}


VarSystem.prototype.setVar = function (name, value, type, isFormula)
{
    this.vars[name] = {value: value, type: type || null, isFormula: isFormula || false}
}


VarSystem.prototype.layerSample = {
    name: "图层名",
    id: 2,
    index: 1,
    position: {x: 0, y: 0, w: 0, h: 0, assignment: {}},


}

VarSystem.prototype.evalVar = function (name)
{
    var inVar = name;
    var re = /[_a-zA-Z][_a-zA-Z0-9]*/g;
    var varList = [];
    var resullt;
    while ((resullt = re.exec(inVar)) !== null)
    {
        varList.push({name: resullt[0], index: resullt.index})
    }

    var increment = 0
    for (let i = 0; i < varList.length; i++)
    {

        if (this.vars[varList[i].name] !== undefined)
        {
            console.log(varList[i].index + increment + "-" + varList[i].name.length)

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


//---------------

export default VarSystem;

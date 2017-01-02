/**
 * Created by bgllj on 2016/7/5.
 */

// import Vue from "vue";
import App from "./components/area.vue";
// import vi from "./components/AttributePanel_valueInput.vue";

//
// +---------------+
// |   DOCUMENT    |
// +-------+-------+
//         |
//         |                                   +--------------------------+
//         |                                   |       DNA RENDERER       |
//         |   +-------------------------------+                          +-----+
//         |   |                               |                          |     |
//         |   |                               +------------+-------------+     |
//         |   |                                            |                   |
//         |   |                                            |                   |
//         |   |                               +------------+-------------+     |
// +-------+---v---+                           |         DNA MODEL        |     |
// |    LAYERS     +---------------------------+                          |     |
// +---------------+                           |                          |     |
//                                             +------------+-------------+     |
//                                                          |                   |
//                 +--------------------------+             |   +---------------+-----+
//                 |      SELCET LAYERS       |             |   |     VAR SYSTEM      |
//                 |                          +-------------+   |                     |
//                 |   (selectsMembrane.js)   |                 |   (varSystem.js)    |
//                 +------------+-------------+                 +-----------+---------+
//                              |                                           |
//                              |                                           |
//                 +------------+-------------+                             |
//                 |        EDIT PANEL        |                             |
//                 |                          +-----------------------------+
//                 |                          |
//                 +--------------------------+


//CEP 库-------------------------------------
if (typeof window.__adobe_cep__ !== "undefined")
{
    window.cs = new CSInterface();
} else
{
    console.info("running without CEP!")
}

//PhotoShop 接口库-------------------------------------
import  Enzymes  from "./Enzymes/Enzymes";
if (typeof window.__adobe_cep__ !== "undefined")
{
    var enzymes = new Enzymes();
    window.enzymes = enzymes;
}
//数据结构--------------------------------------------
import  IchiColor_base  from "./Caryon/IchiColor/ichi-color.js";
import  IchiColor_ex  from "./Caryon/IchiColor/ichi-color-extension";
var IchiColor = IchiColor_ex(IchiColor_base);
window.IchiColor = IchiColor;


import  ColorRNA  from "./Caryon/IchiColor/lib/ColorRNA.js";
window.ColorRNA = ColorRNA;


//渲染系统-------------------------------------
import  RenderCaryon  from "./Caryon/renderCaryon";
var renderCaryon = new RenderCaryon();
window.renderCaryon = renderCaryon;

//数据存储系统-------------------------------------
import  DataCaryon  from "./Caryon/dataCaryon";
var dataCaryon = new DataCaryon();
window.dataCaryon = dataCaryon;
// 变量系统-------------------------------------
import  VarSystem  from "./Caryon/varSystem";
var varSystem = new VarSystem();
window.varSystem = varSystem;
//设置系统-------------------------------------
import  SetSystem  from "./Caryon/settingCaryon";
var setSystem = new SetSystem();
window.setSystem = setSystem;
//测试系统-------------------------------------
import  TEST  from "./test/test_core";
var test = new TEST("默认测试");
window.test = test
//选中图层处理-------------------------------------
import  GobCaryon  from "./Caryon/gobCaryon";
var Gob = new GobCaryon("默认测试");
window.Gob = Gob
//Photoshop 事件相关-------------------------------------
import  EventCaryon  from "./Caryon/eventCaryon";
var eventCaryon = new EventCaryon("默认测试");
window.eventCaryon = eventCaryon


//测试相关 -----------------------------------
window.tests = {};
import  test_task_Enzymes from "./test/test_Enzymes_JS";
window.tests.task_Enzymes = test_task_Enzymes;

import  Lang from "./Caryon/lang";
Vue.filter('lang', Lang.fiterFunc);
Lang.currentLANG = Lang.LANG_Chiness2English;
window.Lang = Lang;

Vue.config.debug = true;//开启错误提示

//-------------------------
import {UI_model, UI_action} from "./components/UI_model/UI_model.js"
window.UI_model = UI_model;
window.UI_action = UI_action;


import AttrPanel from "./components/AttributePanel.vue";
import LayerSelectors from "./components/LayerSelectors.vue";
import VarPanel from "./components/VarPanel.vue";
import ExpressionPanel from  "./components/ExpressionPanel.vue"


var mainVue = new Vue({
    el: 'body',
    data: {},
    components: {
        // include the required component
        // in the options
        "attr-panel": AttrPanel,
        "layers-panel": LayerSelectors,
        "var-panel": VarPanel,
        "expression-panel": ExpressionPanel
    }
})

window.mainVue = mainVue


async function doAsync()
{
    return new Promise(function (resolve, reject)
    {
        setTimeout(()=>
        {
            console.log("sleep 2s");
            resolve(444)
        }, 2000)
    })
}

window.sleep = async function (ms)
{
    return new Promise(function (resolve, reject)
    {
        setTimeout(()=>
        {
            resolve()
        }, ms)
    })
}
async function asyncTask()
{

    console.log("ssss1")
    var a = await  doAsync();
    console.log("ssss2" + a)

    return 2016
}


var __result = asyncTask()
console.log("sss_end" + __result)

// if (typeof window.__adobe_cep__ !== "undefined")
// {
//     window.cs = new CSInterface();
//     var gExtensionID = cs.getExtensionID();
//     cs.addEventListener("com.adobe.PhotoshopJSONCallback" + gExtensionID, PhotoshopCallbackUnique);
//
//     function PhotoshopCallbackUnique(csEvent)
//     {
//         console.log(csEvent);
//         alert("xxxxx22")
//     }
//
// }
//  tests.task_Enzymes()

// var data = [
//     {
//         name: "变量名", type: "text", verify: function (x, e)
//     {
//         var result = varSystem.varifyName(x)
//         // console.log(e)
//         if (result.pass == false)
//         {
//             if (result.err == "repe")
//             {
//                 UI_action.show_message_bubble("input_box", "", Lang.from("名称已存在"), "red");
//                 e.srcElement.classList.add("illegal_value")
//             } else if (result.err == "Illegal_name")
//             {
//                 UI_action.show_message_bubble("input_box", "", Lang.from("变量名称不合法"), "red");
//                 e.srcElement.classList.add("illegal_value")
//             }
//         }
//         else
//         {
//             e.srcElement.classList.remove("illegal_value")
//         }
//     }
//     },
//     {name: "变量值", type: "text"},
//     {
//         name: "值", type: "select", options: [
//         {text: 'One', value: 'A'},
//         {text: 'Two', value: 'B'},
//         {text: 'Three2222', value: 'C'}
//     ],
//         select: "B"
//     },
//     {name: "智能变量", type: "checkbox"}]
//
// var func_ = function (x)
// {
//     console.log(x)
// }
//
// UI_action.show_message_input("var_panel", "新建变量", data, func_)


var verifySimpleStigmata = function (uniqueId, droitCode, inDict,successCallback, rejectCallback)
{
    try
    {
        var signCode = getSimpleStigmata(uniqueId,inDict);
        if (signCode == droitCode)
        {
            if (successCallback != undefined)
            {
                successCallback();
            }
            return true;
        } else
        {
            if (rejectCallback != undefined)
            {
                rejectCallback(e);
            }
            return false;
        }
    }


    catch (e)
    {
        if (rejectCallback != undefined)
        {
            rejectCallback(e);
        }
        return false;
    }
}

var getSimpleStigmata = function (uniqueId, inDict)
{

    var idArray = uniqueId.split("");
    var intArray = _mapStrArray(idArray, [3, 2, 22, 11, 7, 22, 10, 20, 5]);

    var dict = inDict||"a2b3c4d4ef5gm0lakjshdfgh6ijkq7we8rtyu8i1opzx9cvbn"

    var signCode = "";


    var step = 0;


    for (var i = 0; i < intArray.length; i++)
    {
        var d = intArray[i] - intArray[intArray.length - i - 1];
        if (d < 0)
        {
            d = -d;
        }
        d = d % 8;

        step = step + d;
        if (step > dict.length)
        {
            step = 0;
        }

        if (i % 2 == 0)
        {
            signCode = signCode + dict[d + step];

        }

    }

    return signCode;


    function _mapStrArray(array, mapIntArray)
    {
        var befor = 0;
        var sum = _sum(array);
        var sumString = sum.toString()
        var z = 0;
        for (var i = 0; i < array.length; i++)
        {
            var num = array[i].charCodeAt();
            var remainder = (num + befor) % 7;
            var offset = mapIntArray[remainder] || 0;
            array[i] = num + offset;
            befor = num + sumString[z];
            z++;
            if (z > (sumString.length - 1))
            {
                z = 0;
            }

        }

        return array;
    }

    function _sum(array)
    {
        var sum = 0;
        for (var i = 0; i < array.length; i++)
        {
            sum += +array[i];
        }
        return sum;
    }
}

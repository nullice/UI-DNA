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

window.mainVue = mainVue;


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


var __result =  asyncTask()
console.log("sss_end" +__result)

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
//                 UI_action.message_bubble("input_box", "", Lang.from("名称已存在"), "red");
//                 e.srcElement.classList.add("illegal_value")
//             } else if (result.err == "Illegal_name")
//             {
//                 UI_action.message_bubble("input_box", "", Lang.from("变量名称不合法"), "red");
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
// UI_action.message_input("var_panel", "新建变量", data, func_)


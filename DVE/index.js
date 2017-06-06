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

//重要信息
var UIDNA = {
    name: "UI-DNA",
    version: "0.0.15",
    verIndex: 15,
    varData: "2017/05/12",
    codename: ["Euglena"][0],
    author: "nullice",
    website: "http://design-enzyme.com/UI-DNA",
    email: "ui@nullice.com"

}


window.UIDNA = UIDNA


if (UIDNA.verIndex > UIDNA_BASE_VERINNDEX)// 判断当前实例是否是动态更新的版本
{
    UIDNA._ON_AUTOUPDATA_ = true;
}


//CEP 库-------------------------------------
if (typeof window.__adobe_cep__ !== "undefined")
{
    window.cs = new CSInterface();
} else
{
    console.info("running without CEP!")
}

//Node 库-------------------------------------
var os = require('os')
window.os = os;
var path = require('path')
window.path = path;
var fs = require('fs')


// javascript 常用库

import ARR from "./Caryon/Richang_JSEX/arrayARR.js"
import OBJ from "./Caryon/Richang_JSEX/objectOBJ.js"
import TYP from "./Caryon/Richang_JSEX/typeTYP"
import STR from "./Caryon/Richang_JSEX/stringSTR"
import FIL from "./Caryon/Richang_JSEX/fileFIL"


window.ARR = ARR
window.OBJ = OBJ
window.TYP = TYP
window.STR = STR
window.FIL = FIL

// 异步封装-------------------------------------

window.svgoAsync = async function (svg)
{
    return new Promise(function (resolve, reject)
    {
        window.svgo.optimize(svg, (r) => {resolve(r)})
    })
}


//日志记录系统 -------------------------------------
import  LoggerCaryon  from "./Caryon/loggerCaryon.js";
var logger = new LoggerCaryon();
window.logger = logger;


logger.info(
    "3,2,1 " + "%c" + UIDNA.name + " v" + UIDNA.version + " -" + UIDNA.codename + "  %cstart!",
    "background-color: #7d7d7d;color: #fff; padding:2px 8px; font-size:12px;border-radius: 4px;",
    (new Date()).toLocaleString(),
    {
        "localeTime": (new Date()).toLocaleString(),
        "UTC": new Date(),
    }
)


//数据结构--------------------------------------------
import  IchiColor_base  from "./Caryon/IchiColor/ichi-color.js";
import  IchiColor_ex  from "./Caryon/IchiColor/ichi-color-extension";
var IchiColor = IchiColor_ex(IchiColor_base);
window.IchiColor = IchiColor;
window.ichiColor = new IchiColor();

import  ColorRNA  from "./Caryon/IchiColor/lib/ColorRNA.js";
window.ColorRNA = ColorRNA;


//设置系统-------------------------------------
import  SetSystem  from "./Caryon/settingCaryon";
var setSystem = new SetSystem();
window.setSystem = setSystem;


//PhotoShop 接口操作库-------------------------------------
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

//测试系统-------------------------------------
import  TEST  from "./test/test_core";
var test = new TEST("默认测试");
window.test = test
//选中图层处理-------------------------------------
import  GobCaryon  from "./Caryon/gobCaryon";
var Gob = new GobCaryon("默认测试");
window.Gob = Gob

//应用功能-------------------------------------
import  AppCaryon  from "./Caryon/appCaryon";
var appCaryon = new AppCaryon();
window.appCaryon = appCaryon

//网络通信相关-------------------------------------
import  NetCaryon  from "./Caryon/netCaryon";
window.netCaryon = new NetCaryon()

//Photoshop 事件相关-------------------------------------
import  EventCaryon  from "./Caryon/eventCaryon";
var eventCaryon = new EventCaryon("默认测试");
window.eventCaryon = eventCaryon

//脚本功能库相关-------------------------------------
import  Proteins  from "./Proteins/Proteins.js";
window.Proteins = Proteins
Proteins.init();


//测试相关 -----------------------------------
window.tests = {};
import  test_task_Enzymes from "./test/test_Enzymes_JS";
window.tests.task_Enzymes = test_task_Enzymes;

//多国语相关 -----------------------
import  Lang from "./Caryon/lang";
Vue.filter('lang', Lang.fiterFunc);
Lang.currentLANG = Lang.LANG_Chiness2English;
window.Lang = Lang;


//UI -------------------------
Vue.config.debug = true;//开启错误提示
Vue.config.devtools = false;

import {UI_model, UI_action} from "./components/UI_model/UI_model.js"
window.UI_model = UI_model;
window.UI_action = UI_action;


//其他 -------------------------

import AttrPanel from "./components/AttributePanel.vue";
import LayerSelectors from "./components/LayerSelectors.vue";
import VarPanel from "./components/VarPanel.vue";
import ExpressionPanel from  "./components/ExpressionPanel.vue"
import QuickPanel from  "./components/QuickPanel.vue"
import SettingPanel from  "./components/SettingPanel.vue"


//初始化-------------------------------------------
setSystem.load()

if (fs.existsSync(path.join(setSystem._path_appDir, "UI-DNA.json")))
{

} else
{//第一次安装
    console.info("[第一次运行] 安装文件...")
    fs.writeFileSync(path.join(setSystem._path_appDir, "UI-DNA.json"), JSON.stringify(UIDNA, null, 4))
    appCaryon.unzipInstallExtra()

}
setTimeout(function ()
{
    setSystem.load()
    setSystem.loadLanguage()
    Lang.currentLANG = setSystem.ui.language
    setSystem.loadUserCss()
    setSystem.loadUserJs()


}, 300)


var mainVue = new Vue({
    el: 'body',
    data: {setSystem: setSystem},
    ready: function ()
    {
        setTimeout(function ()
        {
            setSystem.loadAppState()
        }, 300)


    },
    components: {
        // include the required component
        // in the options
        "attr-panel": AttrPanel,
        "layers-panel": LayerSelectors,
        "var-panel": VarPanel,
        "expression-panel": ExpressionPanel,
        "quick-panel": QuickPanel,
        "setting-panel": SettingPanel,
    }
})

window.mainVue = mainVue

//------------------------

if(os.platform()=="darwin")
{
    $("body").addClass("macos")
}else {
    $("body").addClass("windows")
}


//测试 ----------------------
async function doAsync()
{
    return new Promise(function (resolve, reject)
    {
        setTimeout(() =>
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
        setTimeout(() =>
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



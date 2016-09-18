/**
 * Created by bgllj on 2016/7/5.
 */

// import Vue from "vue";
import App from "./components/area.vue";
// import vi from "./components/AttributePanel_valueInput.vue";

import AttrPanel from "./components/AttributePanel.vue";
import  Lang from "./Caryon/lang";
import  DataCaryon  from "./Caryon/dataCaryon";
var dataCaryon = new DataCaryon();
window.dataCaryon = dataCaryon;


import  VarSystem  from "./Caryon/varSystem";
var varSystem = new VarSystem();
window.varSystem = varSystem;


Vue.filter('lang', Lang.fiterFunc);
Lang.currentLANG = Lang.LANG_Chiness2English;
window.Lang = Lang;

Vue.config.debug = true;//开启错误提示


window.Gob = {};
window.Gob.position = {
    x: 2,
    y: 3,
    w: 4,
    h: 5,
    assignment: {x: null, y: null, w: null, h: null},
    enableAssigns: {x: false, y: false, w: false, h: false}
};


var mainVue = new Vue({
    el: 'body',
    data: {},
    components: {
        // include the required component
        // in the options
        app: AttrPanel,

    }
})

window.mainVue = mainVue;


if (typeof window.__adobe_cep__ !== "undefined")
{
    window.cs = new CSInterface();
    var gExtensionID = cs.getExtensionID();
    cs.addEventListener("com.adobe.PhotoshopJSONCallback" + gExtensionID, PhotoshopCallbackUnique);

    function PhotoshopCallbackUnique(csEvent)
    {
        console.log(csEvent);
        alert("xxxxx")
    }

}


async function doAsync()
{
    return new Promise(function (resolve, reject)
    {
        setTimeout(()=>
        {
            console.log("sleep 2s");
            resolve()
        }, 2000)
    })
}


async function asyncTask()
{

    console.log("ssss1")
    await  doAsync();
    console.log("ssss2")
}


asyncTask()
console.log("sss_end")



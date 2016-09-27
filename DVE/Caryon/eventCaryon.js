/**
 * Created by bgllj on 2016/9/27.
 */



var EventCaryon = function ()
{
    if (cs == undefined) //检查 cs 属性是否存在
    {
        if (typeof window.__adobe_cep__ !== "undefined")
        {
            window.cs = new CSInterface();
        }
        else
        {
            return this;
        }
    }


    EventCaryon.prototype.initEvent();


    return this;
}


EventCaryon.prototype.initEvent = async function ()
{

    //选中事件
    this.ID_slct = await enzymes.getTypeID("slct", "charID");
    //事件发生时要执行的函数列表
    //格式：{func:函数名, inThis:函数的 this 对象, agrs:参数列表数组 }
    this.FUNCS_slct = [{func: Gob.updateSelect, inThis: Gob, agrs: null}]




    console.log("---initEvent------");
    cs.addEventListener("com.adobe.PhotoshopJSONCallback" + cs.getExtensionID(), EventCaryon.prototype.PhotoshopCallbackUnique);


    // var eventMake = 1298866208; // "Mk  "
    // var eventDelete = 1147958304; // "Dlt "
    // var eventClose = 1131180832; // "Cls "
    // var eventSelect =
    // var eventSet = 1936028772; // "setd"

    var registeredEvents = [];
    registeredEvents.push(this.ID_slct);

    var event = new CSEvent("com.adobe.PhotoshopRegisterEvent", "APPLICATION");
    event.extensionId = cs.getExtensionID();
    event.data = registeredEvents.toString();
    console.log(" event.data = " + registeredEvents.toString() + "\n" + await enzymes.getTypeID("slct", "charID"));
    cs.dispatchEvent(event);


}


EventCaryon.prototype.PhotoshopCallbackUnique = function (csEvent)
{
    // console.log("PhotoshopCallbackUnique");
    // console.log(csEvent);


    try
    {
        console.log(typeof csEvent.data === "string")
        if (typeof csEvent.data === "string")
        {
            var eventData = csEvent.data.replace("ver1,{", "{");
            var ob = JSON.parse(eventData);
            if (ob.eventID == eventCaryon.ID_slct)
            {
                _do_FUNCS(eventCaryon.FUNCS_slct)
            }

        }
    } catch (e)
    {
        console.log("PhotoshopCallbackUnique catch:" + e);
    }


    function _do_FUNCS(FUNCS)
    {
        for (var i = 0; i < FUNCS.length; i++)
        {
            FUNCS[i].func.apply(FUNCS[i].inThis, FUNCS[i].agrs);
        }
    }

    // alert(csEvent)
}


function CSEvent(type, scope, appId, extensionId)
{
    this.type = type;
    this.scope = scope;
    this.appId = appId;
    this.extensionId = extensionId;
}


//----------------------

export default EventCaryon;


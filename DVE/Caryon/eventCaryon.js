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

    console.log("---initEvent------");

    cs.addEventListener("com.adobe.PhotoshopJSONCallback" + cs.getExtensionID(), PhotoshopCallbackUnique);


    function PhotoshopCallbackUnique(csEvent)
    {
        console.log("PhotoshopCallbackUnique");
        console.log(csEvent);
        // alert(csEvent)
    }


    // var eventMake = 1298866208; // "Mk  "
    // var eventDelete = 1147958304; // "Dlt "
    // var eventClose = 1131180832; // "Cls "
    // var eventSelect =
    // var eventSet = 1936028772; // "setd"

    var registeredEvents = [];
    registeredEvents.push(await enzymes.getTypeID("slct"))// "slct"


    var event = new CSEvent("com.adobe.PhotoshopRegisterEvent", "APPLICATION");

    event.extensionId = this.EX_ID;
    event.data = registeredEvents.toString();
    cs.dispatchEvent(event);


}

//----------------------


function CSEvent(type, scope, appId, extensionId)
{
    this.type = type;
    this.scope = scope;
    this.appId = appId;
    this.extensionId = extensionId;
}
export default EventCaryon;


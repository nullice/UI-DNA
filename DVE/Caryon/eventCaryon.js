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

    this.EX_ID = cs.getExtensionID();
    EventCaryon.prototype.initEvent();

    return this;
}


EventCaryon.prototype.initEvent = function ()
{

    console.log("---initEvent------");
    cs.addEventListener("com.adobe.PhotoshopJSONCallback" + this.EX_ID, PhotoshopCallbackUnique);

    function PhotoshopCallbackUnique(csEvent)
    {
       
        alert("xxxxx22")
    }

}

//----------------------

export default EventCaryon;


/**
 * Created by bgllj on 2016/9/27.
 */


/** 事件处理核心
 *
 * @returns {EventCaryon}
 * @constructor
 */
var EventCaryon = function ()
{
    if (window.cs == undefined) //检查 cs 属性是否存在
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



/**
 * 初始化事件
 */
EventCaryon.prototype.initEvent = async function ()
{
    function _alertEvent(event)
    {
        // alert(JSON.stringify(event))
    }

    function _eventSelctRef(event)
    {
        return event.eventData["null"]["_ref"]
        // a = {
        //     "eventID": 1936483188,
        //     "eventData": {
        //         "documentID": 283,
        //         "null": {
        //             "_offset": 1,
        //             "_ref": "document"
        //         }
        //     }
        // }
    }

    function _isSelectLayer(event)
    {
        return (_eventSelctRef(event) == "layer")
    }

    function _isSelectDocument(event)
    {
        return (_eventSelctRef(event) == "document")
    }

    function _isMoveTool(event)//判断是移动工具
    {
        if( event.eventData["state"]["_value"] == "exit")//工具使用结束
        {
            if( event.eventData["tool"]["ID"] == "arwT")//工具 ID 是移动工具的 ID
            {
                return true;
            }
        }
        return false
    }



    //1、在这里列出要执行的函数-----------------------------------------------------------------------------
    //          事件发生时要执行的函数列表格式：{func:函数名, inThis:函数的 this 对象, agrs:参数列表数组 , verify: 事件验证函数, sendEvent:是否把 event 当成传入参数}:
    var func_updateSelect = {func: Gob.updateSelect, inThis: Gob, agrs: null, sendEvent: false}
    var func_updateSelect_whenMove = {func: Gob.updateSelect, inThis: Gob, agrs: null, sendEvent: false,verify:_isMoveTool}
    // var func_alertEvent = {func: _alertEvent, inThis: window, agrs: [], sendEvent: true , verify:_isMoveTool}

    var func_SelectDocument = {func: dataCaryon.switchDocment, inThis: dataCaryon, agrs: null, sendEvent: false,verify:_isSelectDocument}


    //2、在这里列出用事件 ID 和执行的函数-----------------------------------------------------------------------------
    //（选中事件）
    this.ID_slct = await enzymes.getTypeID("slct", "charID");
    this.FUNCS_slct = [func_updateSelect,func_SelectDocument]
    //（新建事件）
    this.ID_mk = await enzymes.getTypeID("Mk  ", "charID");
    this.FUNCS_mk = [func_updateSelect]
    //（toolModalStateChanged）
    this.ID_toolModalStateChanged = await enzymes.getTypeID("toolModalStateChanged", "stringID");
    this.FUNCS_toolModalStateChanged = [func_updateSelect_whenMove]




    //3、ID 放入容器----------------------
    this.IDList = [
        {id: this.ID_slct, funcs: this.FUNCS_slct},
        {id: this.ID_mk, funcs: this.FUNCS_mk},
        {id: this.ID_toolModalStateChanged, funcs: this.FUNCS_toolModalStateChanged}

    ]

    var registeredEvents = [];
    for (var i in this.IDList)
    {
        registeredEvents.push(this.IDList[i].id);
    }

    // console.log("---initEvent------");
    cs.addEventListener("com.adobe.PhotoshopJSONCallback" + cs.getExtensionID(), EventCaryon.prototype.PhotoshopCallbackUnique);

    // var eventMake = 1298866208; // "Mk  "
    // var eventDelete = 1147958304; // "Dlt "
    // var eventClose = 1131180832; // "Cls "
    // var eventSet = 1936028772; // "setd"


    var event = new CSEvent("com.adobe.PhotoshopRegisterEvent", "APPLICATION");
    event.extensionId = cs.getExtensionID();
    event.data = registeredEvents.toString();
    // console.log(" event.data = " + registeredEvents.toString() + "\n" + await enzymes.getTypeID("slct", "charID"));
    cs.dispatchEvent(event);


}


EventCaryon.prototype.PhotoshopCallbackUnique = function (csEvent)
{
    // console.log("PhotoshopCallbackUnique");
    // console.log(csEvent);
    try
    {
        // console.log(typeof csEvent.data === "string")
        if (typeof csEvent.data === "string")
        {
            var eventData = csEvent.data.replace("ver1,{", "{");
            var ob = JSON.parse(eventData);


            for (var i in eventCaryon.IDList)
            {
                if (ob.eventID == eventCaryon.IDList[i].id)
                {
                    _do_FUNCS(eventCaryon.IDList[i].funcs, ob)
                    break;
                }

            }

        }
    } catch (e)
    {
        console.log("PhotoshopCallbackUnique catch:" + e);
    }


    function _do_FUNCS(FUNCS, event)
    {
        for (var i = 0; i < FUNCS.length; i++)
        {
            if (FUNCS[i].verify != undefined)
            {
                if (FUNCS[i].verify(event))
                {
                    if (FUNCS[i].sendEvent)
                    {
                        var _agrs = FUNCS[i].agrs.slice(0)
                        _agrs.push(event)
                        FUNCS[i].func.apply(FUNCS[i].inThis,_agrs);
                    } else
                    {
                        FUNCS[i].func.apply(FUNCS[i].inThis, FUNCS[i].agrs);
                    }

                }
            } else
            {
                if (FUNCS[i].sendEvent)
                {

                    var _agrs = FUNCS[i].agrs.slice(0)
                    _agrs.push(event)
                     console.log("_agrs.push(event)",event,_agrs)
                    FUNCS[i].func.apply(FUNCS[i].inThis, _agrs);
                } else
                {
                    FUNCS[i].func.apply(FUNCS[i].inThis, FUNCS[i].agrs);
                }
            }


        }
    }

    // alert(csEvent)
}


/**
 * 简单的发送事件方法
 * @param type
 * @param data
 */
EventCaryon.prototype.sampleEventSend =function (type,data)
{
    var event = new CSEvent(type, "APPLICATION");
    event.extensionId = cs.getExtensionID();
    event.data = data;
    cs.dispatchEvent(event);
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


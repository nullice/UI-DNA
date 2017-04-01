/**
 * Created by nullice on 2017/4/1.
 */

var cs = new CSInterface();


/**
 * 重启事件，200 毫秒秒后打开扩展 UI-DNA
 */
cs.addEventListener("UI-DNA-Shadow:restart",
    function (data)
    {
        console.log("EventListener:UI-DNA-Shadow:restart", data)

        setTimeout(function ()
        {
            cs.requestOpenExtension("UI-DNA")
        },200)

    }
);
